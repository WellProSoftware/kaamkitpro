import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getRequestUser, serviceRest } from "@/lib/server-access";

type VerificationBody = {
  razorpay_payment_id?: unknown;
  razorpay_subscription_id?: unknown;
  razorpay_signature?: unknown;
};

type LocalSubscription = {
  id: string;
  status: string;
  current_period_end?: string | null;
};

type ProviderSubscription = {
  id?: string;
  status?: string;
  current_start?: number | null;
  current_end?: number | null;
};

function signatureIsValid(subscriptionId: string, paymentId: string, signature: string, secret: string) {
  if (!/^[a-f0-9]{128}$/i.test(signature)) return false;
  const expected = createHmac("sha256", secret).update(`${subscriptionId}|${paymentId}`).digest();
  const actual = Buffer.from(signature, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function isoDate(value?: number | null) {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? new Date(value * 1000).toISOString()
    : null;
}

export async function POST(request: NextRequest) {
  const user = await getRequestUser(request);
  if (!user?.email) {
    return NextResponse.json({ error: "Sign in before verifying a subscription." }, { status: 401 });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const mode = process.env.RAZORPAY_MODE || "test";
  const stagingOnly = process.env.KAAMKITPRO_STAGING === "true" || process.env.VERCEL_ENV === "preview";

  if (!keyId || !keySecret) {
    return NextResponse.json({ error: "Subscription verification is not configured." }, { status: 503 });
  }
  if (stagingOnly && (mode !== "test" || !keyId.startsWith("rzp_test_"))) {
    return NextResponse.json({ error: "Staging verification is restricted to Razorpay Test Mode." }, { status: 503 });
  }
  if (mode === "test" && !keyId.startsWith("rzp_test_")) {
    return NextResponse.json({ error: "Razorpay Test Mode requires a test key." }, { status: 503 });
  }
  if (mode === "live" && (process.env.RAZORPAY_LIVE_PAYMENTS_ENABLED !== "true" || !keyId.startsWith("rzp_live_"))) {
    return NextResponse.json({ error: "Live payment verification is disabled until a production release is authorized." }, { status: 503 });
  }
  if (mode !== "test" && mode !== "live") {
    return NextResponse.json({ error: "Invalid Razorpay mode." }, { status: 503 });
  }

  let body: VerificationBody;
  try {
    body = await request.json() as VerificationBody;
  } catch {
    return NextResponse.json({ error: "Invalid verification request." }, { status: 400 });
  }

  const paymentId = body.razorpay_payment_id;
  const subscriptionId = body.razorpay_subscription_id;
  const signature = body.razorpay_signature;
  if (
    typeof paymentId !== "string" || !/^pay_[A-Za-z0-9]+$/.test(paymentId) ||
    typeof subscriptionId !== "string" || !/^sub_[A-Za-z0-9]+$/.test(subscriptionId) ||
    typeof signature !== "string" ||
    !signatureIsValid(subscriptionId, paymentId, signature, keySecret)
  ) {
    return NextResponse.json({ error: "Payment signature is invalid." }, { status: 401 });
  }

  const localQuery = new URLSearchParams({
    select: "id,status,current_period_end",
    provider_subscription_id: `eq.${subscriptionId}`,
    user_id: `eq.${user.id}`,
    limit: "1",
  });
  const localResponse = await serviceRest(`subscriptions?${localQuery.toString()}`);
  if (!localResponse?.ok) {
    return NextResponse.json({ error: "Subscription ownership could not be verified." }, { status: 503 });
  }
  const localRows = await localResponse.json().catch(() => []);
  const local = Array.isArray(localRows) ? localRows[0] as LocalSubscription | undefined : undefined;
  if (!local) {
    return NextResponse.json({ error: "Subscription was not found for this account." }, { status: 404 });
  }
  if (local.status === "cancelled" || local.status === "expired") {
    return NextResponse.json({ error: "This subscription is no longer active." }, { status: 409 });
  }

  let providerResponse: Response;
  try {
    providerResponse = await fetch(`https://api.razorpay.com/v1/subscriptions/${encodeURIComponent(subscriptionId)}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });
  } catch {
    return NextResponse.json({ error: "Razorpay could not be reached. The signed webhook will continue processing the payment." }, { status: 503 });
  }
  if (!providerResponse.ok) {
    return NextResponse.json({ error: "Razorpay subscription status could not be verified." }, { status: 503 });
  }

  const provider = await providerResponse.json().catch(() => null) as ProviderSubscription | null;
  if (!provider || provider.id !== subscriptionId) {
    return NextResponse.json({ error: "Razorpay returned an invalid subscription record." }, { status: 502 });
  }

  const periodStart = isoDate(provider.current_start);
  const periodEnd = isoDate(provider.current_end);
  if (provider.status !== "active" || !periodEnd || Date.parse(periodEnd) <= Date.now()) {
    // A valid checkout signature can precede the first charge/activation webhook.
    // Never grant Pro just because the browser returned a signature.
    return NextResponse.json({ verified: false, pending: true }, { status: 202 });
  }

  const patchQuery = new URLSearchParams({
    id: `eq.${local.id}`,
    user_id: `eq.${user.id}`,
    provider_subscription_id: `eq.${subscriptionId}`,
    status: "not.in.(cancelled,expired)",
  });
  const patchResponse = await serviceRest(`subscriptions?${patchQuery.toString()}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({
      status: "active",
      ...(periodStart ? { current_period_start: periodStart } : {}),
      current_period_end: periodEnd,
      updated_at: new Date().toISOString(),
    }),
  });
  if (!patchResponse?.ok) {
    return NextResponse.json({ error: "Verified payment could not update subscription status." }, { status: 503 });
  }
  const updatedRows = await patchResponse.json().catch(() => []);
  if (!Array.isArray(updatedRows) || updatedRows.length === 0) {
    return NextResponse.json({ error: "Subscription status changed; refresh account access." }, { status: 409 });
  }

  return NextResponse.json({ verified: true, pending: false });
}
