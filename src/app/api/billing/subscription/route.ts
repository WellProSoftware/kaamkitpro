import { NextRequest, NextResponse } from "next/server";
import { getRequestUser, serviceRest } from "@/lib/server-access";

type SubscriptionRow = {
  id: string;
  status: string;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  subscription_plans?: {
    name: string;
    billing_interval: "month" | "year";
    amount_minor: number;
    currency: string;
  } | null;
};

export async function GET(request: NextRequest) {
  const user = await getRequestUser(request);
  if (!user?.email) return NextResponse.json({ error: "Please sign in first." }, { status: 401 });

  const query = new URLSearchParams({
    select: "id,status,current_period_end,cancel_at_period_end,subscription_plans(name,billing_interval,amount_minor,currency)",
    user_id: `eq.${user.id}`,
    order: "created_at.desc",
    limit: "1",
  });
  const response = await serviceRest(`subscriptions?${query.toString()}`);
  if (!response?.ok) return NextResponse.json({ error: "Subscription status is temporarily unavailable." }, { status: 503 });

  const rows = await response.json().catch(() => []);
  const row = Array.isArray(rows) ? rows[0] as SubscriptionRow | undefined : undefined;
  if (!row) return NextResponse.json({ subscription: null });

  return NextResponse.json({
    subscription: {
      id: row.id,
      status: row.status,
      currentPeriodEnd: row.current_period_end,
      cancelAtPeriodEnd: row.cancel_at_period_end === true,
      plan: row.subscription_plans ? {
        name: row.subscription_plans.name,
        billingInterval: row.subscription_plans.billing_interval,
        amountMinor: row.subscription_plans.amount_minor,
        currency: row.subscription_plans.currency,
      } : null,
    },
  });
}
