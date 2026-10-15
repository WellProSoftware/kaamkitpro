import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

const source = async (path) => readFile(new URL(path, import.meta.url), "utf8");

test.describe("Razorpay subscription lifecycle safety", () => {
  test("webhook authenticates the raw body and requires a provider event ID", async () => {
    const webhook = await source("../src/app/api/billing/webhook/route.ts");
    expect(webhook).toContain('createHmac("sha256", secret).update(body).digest()');
    expect(webhook).toContain('request.headers.get("x-razorpay-signature")');
    expect(webhook).toContain('request.headers.get("x-razorpay-event-id")');
    expect(webhook).toContain('if (!eventId || eventId.length > 200)');
    expect(webhook).toContain('if (!signature || !validSignature(body, signature, secret))');
  });

  test("provider event IDs have a database uniqueness constraint", async () => {
    const migration = await source("../supabase/migrations/20261011000000_subscription_billing.sql");
    expect(migration).toMatch(/provider_event_id\s+text\s+not null\s+unique/i);
  });

  test("duplicate deliveries short-circuit after an event is already processed", async () => {
    const webhook = await source("../src/app/api/billing/webhook/route.ts");
    const duplicateGuard = webhook.indexOf("if (row.processed_at) return NextResponse.json({ received: true, duplicate: true })");
    const subscriptionMutation = webhook.indexOf('method: "PATCH"', webhook.indexOf("const currentQuery"));
    expect(webhook).toContain("payment_events?on_conflict=provider_event_id");
    expect(webhook).toContain("resolution=ignore-duplicates,return=minimal");
    expect(duplicateGuard).toBeGreaterThan(-1);
    expect(subscriptionMutation).toBeGreaterThan(duplicateGuard);
  });

  test("concurrent duplicate deliveries use an atomic processing lease and retry safely", async () => {
    const webhook = await source("../src/app/api/billing/webhook/route.ts");
    expect(webhook).toContain("processing_started_at: now.toISOString()");
    expect(webhook).toContain('processed_at: "is.null"');
    expect(webhook).toContain("processing_started_at.lt.");
    expect(webhook).toContain("5 * 60 * 1000");
    expect(webhook).toContain("Webhook event is already being processed; retry later.");
    expect(webhook).toContain("if (state?.processed_at) return NextResponse.json({ received: true, duplicate: true })");
  });

  test("only recognized lifecycle events can update entitlement status", async () => {
    const webhook = await source("../src/app/api/billing/webhook/route.ts");
    expect(webhook).toContain('"subscription.activated", "subscription.charged", "subscription.resumed"');
    expect(webhook).toContain('event === "subscription.halted"');
    expect(webhook).toContain('event === "subscription.cancelled"');
    expect(webhook).toContain('event === "subscription.completed"');
    expect(webhook).toContain("return null");
  });

  test("terminal subscription status cannot be reopened by delayed webhook events", async () => {
    const webhook = await source("../src/app/api/billing/webhook/route.ts");
    expect(webhook).toContain('current.status === "cancelled" || current.status === "expired"');
    expect(webhook).toContain('status: "not.in.(cancelled,expired)"');
    expect(webhook).toContain('latest.status !== "cancelled" && latest.status !== "expired"');
  });

  test("checkout stores provider subscription as incomplete before entitlement is granted", async () => {
    const checkout = await source("../src/app/api/billing/checkout/route.ts");
    expect(checkout).toContain('status: "incomplete"');
    expect(checkout).toContain("provider_subscription_id: providerSubscription.id");
    expect(checkout).toContain("RAZORPAY_LIVE_PAYMENTS_ENABLED");
    expect(checkout).toContain('stagingFlag === "true" || vercelEnv === "preview"');
    expect(checkout).toContain('!keyId.startsWith("rzp_test_")');
  });

  test("verification checks ownership, provider status and a future billing period end", async () => {
    const verify = await source("../src/app/api/billing/verify/route.ts");
    expect(verify).toContain("user_id: `eq.${user.id}`");
    expect(verify).toContain('provider.status !== "active"');
    expect(verify).toContain("Date.parse(periodEnd) <= Date.now()");
    expect(verify).toContain("verified: false, pending: true");
    expect(verify).toContain('status: "not.in.(cancelled,expired)"');
  });

  test("Pro access expires when the verified billing period end is missing, invalid, or past", async () => {
    const access = await source("../src/app/api/access/route.ts");
    expect(access).toContain('typeof item.current_period_end === "string"');
    expect(access).toContain("Number.isFinite(Date.parse(item.current_period_end))");
    expect(access).toContain("Date.parse(item.current_period_end) > now");
    expect(access).toContain("const isPro = fullGrant || proGrant || paidSubscription");
    expect(access).toContain("adsEnabled: !isStagingBuild && !isPro");
  });

  test("manual access grants respect start, expiry and revocation timestamps", async () => {
    const access = await source("../src/app/api/access/route.ts");
    expect(access).toContain("!grant.revoked_at");
    expect(access).toContain("Date.parse(grant.starts_at) <= now");
    expect(access).toContain("Date.parse(grant.expires_at) > now");
  });

  test("cancellation is sent to Razorpay before local status changes", async () => {
    const cancel = await source("../src/app/api/billing/cancel/route.ts");
    expect(cancel).toContain("cancel_at_cycle_end: 1");
    expect(cancel).toContain("if (!providerResponse.ok)");
    expect(cancel).toContain("No local status was changed");
    expect(cancel).toContain("provider.id !== local.provider_subscription_id");
    expect(cancel).toContain("cancel_at_period_end: !ended");
    expect(cancel).toContain('status: "not.in.(cancelled,expired)"');
  });

  test("access lookup failures fail closed instead of granting Pro or enabling ads", async () => {
    const access = await source("../src/app/api/access/route.ts");
    expect(access).toContain('plan: "access_check_unavailable"');
    expect(access).toContain("isPro: false");
    expect(access).toContain("adsEnabled: false");
    expect(access).toContain("}, { status: 503 })");
    expect(access).toContain("if (!grantsResponse?.ok)");
    expect(access).toContain("if (!subscriptionResponse?.ok)");
  });

  test("Pro access disables ads site-wide while selected-tool access remains distinct", async () => {
    const access = await source("../src/app/api/access/route.ts");
    const loader = await source("../src/components/AdSenseLoader.tsx");
    expect(access).toContain('plan: fullGrant ? "admin_full_access" : isPro ? "pro" : selectedTools.length ? "selected_tools" : "free"');
    expect(access).toContain("adsEnabled: !isStagingBuild && !isPro");
    expect(access).toContain("fullAccess: fullGrant");
    expect(loader).toContain("data.adsEnabled !== true");
    expect(loader).toContain('consent !== "accepted"');
  });
});
