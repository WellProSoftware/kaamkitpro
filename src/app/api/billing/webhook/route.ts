import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { serviceRest } from "@/lib/server-access";

export const runtime = "nodejs";

type Payload = {
  event?: string;
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

function statusFor(event: string, providerStatus?: string) {
  if (["subscription.activated", "subscription.charged", "subscription.resumed", "subscription.authenticated"].includes(event)) return "active";
  if (event === "subscription.halted") return "past_due";
  if (event === "subscription.cancelled") return "cancelled";
  if (event === "subscription.completed") return "expired";
  if (event === "subscription.pending" || event === "subscription.paused") return "incomplete";
  if (providerStatus === "active") return "active";
  if (providerStatus === "halted") return "past_due";
  if (providerStatus === "cancelled") return "cancelled";
  if (providerStatus === "completed") return "expired";
  return null;
}

export async function POST(request: NextRequest) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
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

  const sub = payload.payload?.subscription?.entity;
  const nextStatus = statusFor(payload.event, sub?.status);
  if (nextStatus && sub?.id) {
    const patchQuery = new URLSearchParams({ provider_subscription_id: `eq.${sub.id}` });
    const patch = await serviceRest(`subscriptions?${patchQuery.toString()}`, {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        status: nextStatus,
        ...(dateFromUnix(sub.current_start) ? { current_period_start: dateFromUnix(sub.current_start) } : {}),
        ...(dateFromUnix(sub.current_end) ? { current_period_end: dateFromUnix(sub.current_end) } : {}),
        updated_at: new Date().toISOString(),
      }),
    });
    if (!patch?.ok) return NextResponse.json({ error: "Could not update subscription." }, { status: 503 });
    const updated = await patch.json().catch(() => []);
    if (!Array.isArray(updated) || updated.length === 0) {
      return NextResponse.json({ error: "Subscription record missing." }, { status: 503 });
    }
  }

  const processed = await serviceRest(`payment_events?provider_event_id=eq.${encodeURIComponent(eventId)}`, {
    method: "PATCH",
    body: JSON.stringify({ processed_at: new Date().toISOString(), processing_error: null }),
  });
  if (!processed?.ok) return NextResponse.json({ error: "Could not mark event processed." }, { status: 503 });
  return NextResponse.json({ received: true });
}
