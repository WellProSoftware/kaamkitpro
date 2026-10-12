import { NextRequest, NextResponse } from "next/server";
import { getRequestUser, serviceRest } from "@/lib/server-access";
import { getServerEnv } from "@/lib/server-env";

type LocalSubscription = {
  id: string;
  status: string;
  provider_subscription_id: string | null;
  cancel_at_period_end: boolean;
};

type ProviderSubscription = {
  id?: string;
  status?: string;
  cancel_at_cycle_end?: boolean | number;
};

export async function POST(request: NextRequest) {
  const user = await getRequestUser(request);
  if (!user?.email) return NextResponse.json({ error: "Please sign in first." }, { status: 401 });

  const [keyId, keySecret, configuredMode, livePaymentsEnabled, stagingFlag, vercelEnv] = await Promise.all([
    getServerEnv("RAZORPAY_KEY_ID"),
    getServerEnv("RAZORPAY_KEY_SECRET"),
    getServerEnv("RAZORPAY_MODE"),
    getServerEnv("RAZORPAY_LIVE_PAYMENTS_ENABLED"),
    getServerEnv("KAAMKITPRO_STAGING"),
    getServerEnv("VERCEL_ENV"),
  ]);
  const mode = configuredMode || "test";
  const stagingOnly = stagingFlag === "true" || vercelEnv === "preview";
  if (!keyId || !keySecret) return NextResponse.json({ error: "Subscription management is not configured." }, { status: 503 });
  if (stagingOnly && (mode !== "test" || !keyId.startsWith("rzp_test_"))) {
    return NextResponse.json({ error: "Staging subscription management is restricted to Razorpay Test Mode." }, { status: 503 });
  }
  if ((mode === "test" && !keyId.startsWith("rzp_test_")) || (mode === "live" && !keyId.startsWith("rzp_live_"))) {
    return NextResponse.json({ error: "Razorpay key does not match the configured mode." }, { status: 503 });
  }
  if (mode === "live" && livePaymentsEnabled !== "true") {
    return NextResponse.json({ error: "Live subscription management is disabled until a production release is authorized." }, { status: 503 });
  }
  if (mode !== "test" && mode !== "live") return NextResponse.json({ error: "Invalid Razorpay mode." }, { status: 503 });

  let body: { subscription_id?: unknown };
  try {
    body = await request.json() as { subscription_id?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid cancellation request." }, { status: 400 });
  }
  if (typeof body.subscription_id !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.subscription_id)) {
    return NextResponse.json({ error: "Choose a valid subscription." }, { status: 400 });
  }

  const query = new URLSearchParams({
    select: "id,status,provider_subscription_id,cancel_at_period_end",
    id: `eq.${body.subscription_id}`,
    user_id: `eq.${user.id}`,
    limit: "1",
  });
  const localResponse = await serviceRest(`subscriptions?${query.toString()}`);
  if (!localResponse?.ok) return NextResponse.json({ error: "Subscription ownership could not be verified." }, { status: 503 });
  const rows = await localResponse.json().catch(() => []);
  const local = Array.isArray(rows) ? rows[0] as LocalSubscription | undefined : undefined;
  if (!local || !local.provider_subscription_id) return NextResponse.json({ error: "Subscription not found for this account." }, { status: 404 });
  if (local.status === "cancelled" || local.status === "expired") {
    return NextResponse.json({ cancelled: true, alreadyEnded: true });
  }
  if (local.cancel_at_period_end) return NextResponse.json({ cancelled: false, scheduled: true });

  let providerResponse: Response;
  try {
    providerResponse = await fetch(`https://api.razorpay.com/v1/subscriptions/${encodeURIComponent(local.provider_subscription_id)}/cancel`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cancel_at_cycle_end: 1 }),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json({ error: "Razorpay could not be reached. Please retry from your account." }, { status: 502 });
  }
  if (!providerResponse.ok) return NextResponse.json({ error: "Razorpay could not schedule cancellation. No local status was changed." }, { status: 502 });

  const provider = await providerResponse.json().catch(() => null) as ProviderSubscription | null;
  if (!provider || provider.id !== local.provider_subscription_id) {
    return NextResponse.json({ error: "Razorpay returned an invalid subscription record." }, { status: 502 });
  }

  const ended = provider.status === "cancelled" || provider.status === "completed" || provider.status === "expired";
  const patchQuery = new URLSearchParams({
    id: `eq.${local.id}`,
    user_id: `eq.${user.id}`,
    provider_subscription_id: `eq.${local.provider_subscription_id}`,
    status: "not.in.(cancelled,expired)",
  });
  const patch = await serviceRest(`subscriptions?${patchQuery.toString()}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({
      cancel_at_period_end: !ended,
      ...(ended ? { status: provider.status === "completed" || provider.status === "expired" ? "expired" : "cancelled" } : {}),
      updated_at: new Date().toISOString(),
    }),
  });
  if (!patch?.ok) return NextResponse.json({ error: "Cancellation was sent to Razorpay, but local status could not be saved. Please refresh before retrying." }, { status: 503 });
  const updated = await patch.json().catch(() => []);
  if (!Array.isArray(updated) || updated.length === 0) {
    return NextResponse.json({ error: "Subscription state changed. Refresh your account to confirm the current status." }, { status: 409 });
  }

  return NextResponse.json({ cancelled: ended, scheduled: !ended, accessEndsAt: local.status === "active" ? "current billing period end" : null });
}
