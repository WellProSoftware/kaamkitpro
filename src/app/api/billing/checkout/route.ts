import { NextRequest, NextResponse } from "next/server";
import { getRequestUser, serviceRest } from "@/lib/server-access";


type Plan = {
  id: string;
  name: string;
  billing_interval: "month" | "year";
  amount_minor: number;
  currency: string;
  provider_plan_id: string | null;
};

export async function POST(request: NextRequest) {
  const user = await getRequestUser(request);
  if (!user?.email) {
    return NextResponse.json({ error: "Sign in before starting a subscription." }, { status: 401 });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return NextResponse.json({ error: "Subscription checkout is not configured yet." }, { status: 503 });
  }

  let body: { plan_id?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (typeof body.plan_id !== "string" || !/^[a-z0-9-]{1,80}$/.test(body.plan_id)) {
    return NextResponse.json({ error: "Choose a valid subscription plan." }, { status: 400 });
  }

  const query = new URLSearchParams({
    select: "id,name,billing_interval,amount_minor,currency,provider_plan_id",
    id: `eq.${body.plan_id}`,
    status: "eq.active",
    limit: "1",
  });
  const planResponse = await serviceRest(`subscription_plans?${query.toString()}`);
  if (!planResponse?.ok) {
    return NextResponse.json({ error: "Plan availability could not be verified." }, { status: 503 });
  }
  const plans = await planResponse.json().catch(() => []);
  const plan = Array.isArray(plans) ? plans[0] as Plan | undefined : undefined;
  if (!plan || !plan.provider_plan_id || !Number.isInteger(plan.amount_minor) || plan.amount_minor < 1) {
    return NextResponse.json({ error: "This plan is not available for checkout yet." }, { status: 409 });
  }

  // Keep recurring billing finite and explicit; customers can cancel through the provider.
  const totalCount = plan.billing_interval === "month" ? 120 : 10;
  let providerResponse: Response;
  try {
    providerResponse = await fetch("https://api.razorpay.com/v1/subscriptions", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan_id: plan.provider_plan_id,
        total_count: totalCount,
        quantity: 1,
        customer_notify: 1,
        notes: { app_user_id: user.id, app_plan_id: plan.id, app_user_email: user.email },
      }),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json({ error: "Payment provider is temporarily unreachable." }, { status: 502 });
  }
  if (!providerResponse.ok) {
    // Provider response details may contain internal information; keep them server-side.
    return NextResponse.json({ error: "The payment provider could not create this subscription." }, { status: 502 });
  }

  const providerSubscription = await providerResponse.json().catch(() => null) as
    | { id?: string; status?: string; short_url?: string }
    | null;
  if (!providerSubscription?.id) {
    return NextResponse.json({ error: "The payment provider returned an invalid subscription." }, { status: 502 });
  }

  const saveResponse = await serviceRest("subscriptions", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      user_id: user.id,
      plan_id: plan.id,
      provider: "razorpay",
      provider_subscription_id: providerSubscription.id,
      status: "incomplete",
    }),
  });
  if (!saveResponse?.ok) {
    // Avoid leaving an orphaned provider subscription if local entitlement tracking failed.
    try {
      await fetch(`https://api.razorpay.com/v1/subscriptions/${encodeURIComponent(providerSubscription.id)}/cancel`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cancel_at_cycle_end: 0 }),
        cache: "no-store",
      });
    } catch {
      // Do not expose cancellation failure or grant access; operational logs should be reviewed.
    }
    return NextResponse.json({ error: "Subscription could not be safely recorded. No access has been granted." }, { status: 503 });
  }

  return NextResponse.json({
    key_id: keyId,
    subscription_id: providerSubscription.id,
    name: "KaamKitPro",
    description: plan.name,
    amount: plan.amount_minor,
    currency: plan.currency,
    prefill: { email: user.email },
  });
}
