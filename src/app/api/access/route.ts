import { NextRequest, NextResponse } from "next/server";
import { getRequestUser, serviceRest } from "@/lib/server-access";

type Grant = {
  access_type: "full_pro" | "pro" | "selected_tools";
  tool_keys: string[];
  starts_at: string;
  expires_at: string | null;
  revoked_at: string | null;
};

function activeGrant(grant: Grant, now: number) {
  return !grant.revoked_at &&
    Date.parse(grant.starts_at) <= now &&
    (!grant.expires_at || Date.parse(grant.expires_at) > now);
}

export async function GET(request: NextRequest) {
  const user = await getRequestUser(request);
  if (!user?.email) {
    return NextResponse.json({
      user: null,
      plan: "free",
      isPro: false,
      adsEnabled: true,
      selectedTools: [],
      message: "Sign in to manage your account and metered tool usage.",
    });
  }

  const configQuery = new URLSearchParams({
    select: "access_type,tool_keys,starts_at,expires_at,revoked_at",
    target_email: `eq.${user.email.toLowerCase()}`,
    revoked_at: "is.null",
    limit: "100",
  });
  const grantsResponse = await serviceRest(`user_access_grants?${configQuery.toString()}`);
  let grants: Grant[] = [];
  if (grantsResponse?.ok) {
    grants = (await grantsResponse.json().catch(() => [])) as Grant[];
  }

  const now = Date.now();
  const active = grants.filter((grant) => activeGrant(grant, now));
  const fullGrant = active.some((grant) => grant.access_type === "full_pro");
  const proGrant = active.some((grant) => grant.access_type === "pro");
  const selectedTools = [...new Set(active
    .filter((grant) => grant.access_type === "selected_tools")
    .flatMap((grant) => grant.tool_keys || []))];

  const subscriptionQuery = new URLSearchParams({
    select: "id,plan_id,status,current_period_end,subscription_plans!inner(status)",
    user_id: `eq.${user.id}`,
    status: "in.(active,trialing)",
    "subscription_plans.status": "eq.active",
    limit: "1",
  });
  const subscriptionResponse = await serviceRest(`subscriptions?${subscriptionQuery.toString()}`);
  const subscriptions = subscriptionResponse?.ok
    ? await subscriptionResponse.json().catch(() => [])
    : [];
  const paidSubscription = Array.isArray(subscriptions) && subscriptions.some((item: { current_period_end?: string | null }) =>
    !item.current_period_end || Date.parse(item.current_period_end) > now
  );

  const isPro = fullGrant || proGrant || paidSubscription;
  return NextResponse.json({
    user: { id: user.id, email: user.email },
    plan: fullGrant ? "admin_full_access" : isPro ? "pro" : selectedTools.length ? "selected_tools" : "free",
    isPro,
    fullAccess: fullGrant,
    adsEnabled: !isPro,
    selectedTools,
    message: isPro
      ? "Pro access is active. Ads are disabled."
      : selectedTools.length
        ? "Special access is active for selected tools."
        : "Free plan is active. Basic tools remain available; metered tools have daily limits.",
  });
}
