import { NextRequest, NextResponse } from "next/server";
import { getRequestUser, serviceRest } from "@/lib/server-access";
import { getToolPolicy, normalizeToolKey } from "@/lib/tool-access-policy";

type Grant = {
  access_type: "full_pro" | "pro" | "selected_tools";
  tool_keys: string[];
  starts_at: string;
  expires_at: string | null;
  revoked_at: string | null;
};

function indiaDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function nextIndiaMidnight() {
  const date = indiaDate();
  const [year, month, day] = date.split("-").map(Number);
  const nextDay = new Date(Date.UTC(year, month - 1, day + 1, 0, 0, 0));
  // India is UTC+05:30; return the corresponding absolute instant.
  return new Date(nextDay.getTime() - (5 * 60 + 30) * 60 * 1000).toISOString();
}

function activeGrant(grant: Grant, now: number) {
  return !grant.revoked_at &&
    Date.parse(grant.starts_at) <= now &&
    (!grant.expires_at || Date.parse(grant.expires_at) > now);
}

async function accessFor(userId: string, email: string) {
  const now = Date.now();
  const grantQuery = new URLSearchParams({
    select: "access_type,tool_keys,starts_at,expires_at,revoked_at",
    target_email: `eq.${email.toLowerCase()}`,
    revoked_at: "is.null",
    limit: "100",
  });
  const grantsResponse = await serviceRest(`user_access_grants?${grantQuery.toString()}`);
  const grants = grantsResponse?.ok
    ? ((await grantsResponse.json().catch(() => [])) as Grant[])
    : [];
  const active = grants.filter((grant) => activeGrant(grant, now));
  const fullAccess = active.some((grant) => grant.access_type === "full_pro");
  const proGrant = active.some((grant) => grant.access_type === "pro");
  const selectedTools = [...new Set(active
    .filter((grant) => grant.access_type === "selected_tools")
    .flatMap((grant) => grant.tool_keys || []))];

  const subscriptionQuery = new URLSearchParams({
    select: "id,plan_id,status,current_period_end,subscription_plans!inner(status)",
    user_id: `eq.${userId}`,
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

  return {
    fullAccess,
    pro: fullAccess || proGrant || paidSubscription,
    selectedTools,
  };
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const toolKey = typeof body.tool_key === "string" ? normalizeToolKey(body.tool_key) : "";
  const action = body.action === "consume" ? "consume" : "check";
  if (!toolKey || toolKey.length > 100) {
    return NextResponse.json({ error: "A valid tool key is required." }, { status: 400 });
  }

  const policy = getToolPolicy(toolKey);
  const user = await getRequestUser(request);

  if (policy.tier === "free") {
    return NextResponse.json({ allowed: true, tier: "free", limited: false, tool_key: toolKey });
  }

  if (!user?.email) {
    return NextResponse.json({
      allowed: false,
      requiresSignIn: true,
      error: "Sign in to use this limited tool so your daily quota can be tracked fairly.",
      tool_key: toolKey,
    }, { status: 401 });
  }

  const access = await accessFor(user.id, user.email);
  const selectedGrant = access.selectedTools.includes(toolKey);
  if (access.fullAccess || selectedGrant) {
    return NextResponse.json({
      allowed: true,
      tier: access.fullAccess ? "admin_full_access" : "selected_tools",
      limited: false,
      tool_key: toolKey,
    });
  }
  if (policy.tier === "pro_only" && !access.pro) {
    return NextResponse.json({
      allowed: false,
      upgradeRequired: true,
      error: "This tool is included with Pro.",
      tool_key: toolKey,
    }, { status: 403 });
  }

  const dailyLimit = access.pro ? (policy.proDailyLimit ?? 100) : (policy.freeDailyLimit ?? 0);
  if (dailyLimit === 0) {
    return NextResponse.json({
      allowed: false,
      upgradeRequired: true,
      error: "This tool requires Pro.",
      tool_key: toolKey,
    }, { status: 403 });
  }

  const usageDate = indiaDate();
  if (action === "check") {
    const query = new URLSearchParams({
      select: "usage_count",
      user_id: `eq.${user.id}`,
      tool_key: `eq.${toolKey}`,
      usage_date: `eq.${usageDate}`,
      limit: "1",
    });
    const response = await serviceRest(`tool_usage_daily?${query.toString()}`);
    if (!response) return NextResponse.json({ error: "Usage storage is not configured." }, { status: 503 });
    const rows = response.ok ? await response.json().catch(() => []) : [];
    const used = Array.isArray(rows) && rows.length ? Number(rows[0].usage_count) || 0 : 0;
    return NextResponse.json({
      allowed: used < dailyLimit,
      upgradeRequired: !access.pro && used >= dailyLimit,
      tool_key: toolKey,
      used,
      remaining: Math.max(0, dailyLimit - used),
      dailyLimit,
      resetsAt: nextIndiaMidnight(),
    });
  }

  const response = await serviceRest("rpc/consume_tool_usage", {
    method: "POST",
    body: JSON.stringify({
      p_user_id: user.id,
      p_tool_key: toolKey,
      p_usage_date: usageDate,
      p_daily_limit: dailyLimit,
    }),
  });
  if (!response) return NextResponse.json({ error: "Usage storage is not configured." }, { status: 503 });
  const result = await response.json().catch(() => []);
  if (!response.ok) return NextResponse.json({ error: "Could not update usage count. Apply the access-grants database migration first." }, { status: 502 });
  const usage = Array.isArray(result) ? result[0] : result;
  return NextResponse.json({
    allowed: Boolean(usage?.allowed),
    upgradeRequired: !access.pro && !usage?.allowed,
    tool_key: toolKey,
    used: Number(usage?.used) || 0,
    dailyLimit,
    remaining: Math.max(0, dailyLimit - (Number(usage?.used) || 0)),
    resetsAt: nextIndiaMidnight(),
  }, { status: usage?.allowed ? 200 : 429 });
}
