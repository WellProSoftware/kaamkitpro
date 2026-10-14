import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { serviceRest } from "@/lib/server-access";
import { getServerEnv } from "@/lib/server-env";
import { statusFor } from "@/lib/billing/subscription-status.mjs";
import { shouldApplyProviderEvent } from "@/lib/billing/provider-event-order.mjs";


type Payload = {
  event?: string;
  created_at?: number;
  payload?: { subscription?: { entity?: {
    id?: string;
    status?: string;
    current_start?: number | null;
    current_end?: number | null;
  } } };
};

function validSignature(body: string, signature: string, secret: string) {
  const expected = createHmac("sha256", secret).update(body).digest();
  const actual = Buffer.from(signature, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function dateFromUnix(value?: number | null) {
  return typeof value === "number" && value > 0 ? new Date(value * 1000).toISOString() : null;
}


export async function POST(request: NextRequest) {
  const secret = await getServerEnv("RAZORPAY_WEBHOOK_SECRET");
  if (!secret) return NextResponse.json({ error: "Webhook is not configured." }, { status: 503 });

  const body = await request.text();
  const signature = request.headers.get("x-razorpay-signature") || "";
  const eventId = request.headers.get("x-razorpay-event-id") || "";
  if (!signature || !validSignature(body, signature, secret)) {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 401 });
  }
  if (!eventId || eventId.length > 200) {
    return NextResponse.json({ error: "Missing event identifier." }, { status: 400 });
  }

  let payload: Payload;
  try { payload = JSON.parse(body) as Payload; } catch {
    return NextResponse.json({ error: "Invalid webhook payload." }, { status: 400 });
  }
  if (!payload.event) return NextResponse.json({ error: "Missing event type." }, { status: 400 });
  if (typeof payload.created_at !== "number" || !Number.isFinite(payload.created_at) || payload.created_at <= 0) {
    return NextResponse.json({ error: "Missing or invalid provider event timestamp." }, { status: 400 });
  }
  const providerEventAt = new Date(payload.created_at * 1000).toISOString();

  const saved = await serviceRest("payment_events?on_conflict=provider_event_id", {
    method: "POST",
    headers: { Prefer: "resolution=ignore-duplicates,return=minimal" },
    body: JSON.stringify({ provider: "razorpay", provider_event_id: eventId, event_type: payload.event, payload }),
  });
  if (!saved?.ok) return NextResponse.json({ error: "Could not record webhook event." }, { status: 503 });

  const query = new URLSearchParams({ select: "processed_at", provider_event_id: `eq.${eventId}`, limit: "1" });
  const existing = await serviceRest(`payment_events?${query.toString()}`);
  if (!existing?.ok) return NextResponse.json({ error: "Could not verify event state." }, { status: 503 });
  const rows = await existing.json().catch(() => []);
  const row = Array.isArray(rows) ? rows[0] as { processed_at?: string | null } | undefined : undefined;
  if (!row) return NextResponse.json({ error: "Event record missing." }, { status: 503 });
  if (row.processed_at) return NextResponse.json({ received: true, duplicate: true });

  const now = new Date();
  const staleBefore = new Date(now.getTime() - 5 * 60 * 1000).toISOString();
  const claimQuery = new URLSearchParams({
    provider_event_id: `eq.${eventId}`,
    processed_at: "is.null",
    or: `(processing_started_at.is.null,processing_started_at.lt.${staleBefore})`,
  });
  const claimed = await serviceRest(`payment_events?${claimQuery.toString()}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ processing_started_at: now.toISOString() }),
  });
  if (!claimed?.ok) return NextResponse.json({ error: "Could not claim webhook event." }, { status: 503 });
  const claimedRows = await claimed.json().catch(() => []);
  if (!Array.isArray(claimedRows) || claimedRows.length === 0) {
    const stateQuery = new URLSearchParams({
      select: "processed_at,processing_started_at",
      provider_event_id: `eq.${eventId}`,
      limit: "1",
    });
    const stateResponse = await serviceRest(`payment_events?${stateQuery.toString()}`);
    if (!stateResponse?.ok) return NextResponse.json({ error: "Could not verify event state." }, { status: 503 });
    const states = await stateResponse.json().catch(() => []);
    const state = Array.isArray(states) ? states[0] as { processed_at?: string | null } | undefined : undefined;
    if (state?.processed_at) return NextResponse.json({ received: true, duplicate: true });
    return NextResponse.json({ error: "Webhook event is already being processed; retry later." }, { status: 503 });
  }

  const sub = payload.payload?.subscription?.entity;
  const nextStatus = statusFor(payload.event, sub?.status);
  if (nextStatus && sub?.id) {
    const currentQuery = new URLSearchParams({
      select: "status,last_provider_event_at",
      provider_subscription_id: `eq.${sub.id}`,
      limit: "1",
    });
    const currentResponse = await serviceRest(`subscriptions?${currentQuery.toString()}`);
    if (!currentResponse?.ok) {
      return NextResponse.json({ error: "Could not verify subscription state." }, { status: 503 });
    }
    const currentRows = await currentResponse.json().catch(() => []);
    const current = Array.isArray(currentRows) ? currentRows[0] as { status?: string; last_provider_event_at?: string | null } | undefined : undefined;
    if (!current) return NextResponse.json({ error: "Subscription record missing." }, { status: 503 });

    if (shouldApplyProviderEvent(current, providerEventAt, nextStatus)) {
      // Equal-time terminal events are allowed; stale non-terminal events are not.
      // The status guard always prevents reopening a cancelled/expired subscription.
      const timeFilter = nextStatus === "cancelled" || nextStatus === "expired"
        ? `(last_provider_event_at.is.null,last_provider_event_at.lt.${providerEventAt},last_provider_event_at.eq.${providerEventAt})`
        : `(last_provider_event_at.is.null,last_provider_event_at.lt.${providerEventAt})`;
      const patchQuery = new URLSearchParams({
        provider_subscription_id: `eq.${sub.id}`,
        status: "not.in.(cancelled,expired)",
        or: timeFilter,
      });
      const patch = await serviceRest(`subscriptions?${patchQuery.toString()}`, {
        method: "PATCH",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify({
          status: nextStatus,
          last_provider_event_at: providerEventAt,
          ...(dateFromUnix(sub.current_start) ? { current_period_start: dateFromUnix(sub.current_start) } : {}),
          ...(dateFromUnix(sub.current_end) ? { current_period_end: dateFromUnix(sub.current_end) } : {}),
          updated_at: new Date().toISOString(),
        }),
      });
      if (!patch?.ok) return NextResponse.json({ error: "Could not update subscription." }, { status: 503 });
      const updated = await patch.json().catch(() => []);
      if (!Array.isArray(updated) || updated.length === 0) {
        const verify = await serviceRest(`subscriptions?${currentQuery.toString()}`);
        if (!verify?.ok) return NextResponse.json({ error: "Could not verify subscription state." }, { status: 503 });
        const verifyRows = await verify.json().catch(() => []);
        const latest = Array.isArray(verifyRows) ? verifyRows[0] as { status?: string; last_provider_event_at?: string | null } | undefined : undefined;
        if (!latest) return NextResponse.json({ error: "Subscription record missing." }, { status: 503 });
        const terminal = latest.status === "cancelled" || latest.status === "expired";
        const timestampApplied = latest.last_provider_event_at && Date.parse(latest.last_provider_event_at) >= Date.parse(providerEventAt);
        if (!terminal && !timestampApplied) return NextResponse.json({ error: "Subscription state changed; retry webhook." }, { status: 503 });
      }
    }
  }

  const processed = await serviceRest(`payment_events?provider_event_id=eq.${encodeURIComponent(eventId)}`, {
    method: "PATCH",
    body: JSON.stringify({ processed_at: new Date().toISOString(), processing_error: null }),
  });
  if (!processed?.ok) return NextResponse.json({ error: "Could not mark event processed." }, { status: 503 });
  return NextResponse.json({ received: true });
}
