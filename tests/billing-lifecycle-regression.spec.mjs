import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { shouldApplyProviderEvent } from "../src/lib/billing/provider-event-order.mjs";

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

  test("webhook records event IDs idempotently and marks completed processing", async () => {
    const webhook = await source("../src/app/api/billing/webhook/route.ts");
    expect(webhook).toContain("payment_events?on_conflict=provider_event_id");
    expect(webhook).toContain("resolution=ignore-duplicates,return=minimal");
    expect(webhook).toContain("if (row.processed_at) return NextResponse.json({ received: true, duplicate: true })");
    expect(webhook).toContain("processing_started_at");
    expect(webhook).toContain("processed_at: new Date().toISOString()");
  });

  test("webhook delegates lifecycle status decisions to the shared allow-listed mapper", async () => {
    const webhook = await source("../src/app/api/billing/webhook/route.ts");
    const mapper = await source("../src/lib/billing/subscription-status.mjs");
    expect(webhook).toContain('import { statusFor } from "@/lib/billing/subscription-status.mjs"');
    expect(webhook).toContain("statusFor(payload.event, sub?.status)");
    expect(mapper).toContain('"subscription.activated", "subscription.charged", "subscription.resumed"');
    expect(mapper).toContain('event === "subscription.halted"');
    expect(mapper).toContain('event === "subscription.cancelled"');
    expect(mapper).toContain('event === "subscription.completed"');
    expect(mapper).toContain("default: return null");
  });

  test("webhook rejects missing provider timestamps and applies only chronologically newer events", async () => {
    const webhook = await source("../src/app/api/billing/webhook/route.ts");
    expect(webhook).toContain('payload.created_at !== "number"');
    expect(webhook).toContain("Missing or invalid provider event timestamp.");
    expect(webhook).toContain('select: "status,last_provider_event_at"');
    expect(webhook).toContain("shouldApplyProviderEvent(current, providerEventAt, nextStatus)");
    expect(webhook).toContain("Subscription identifier is required for this lifecycle event.");
    expect(webhook).toContain("if (nextStatus && !sub?.id)");
    expect(webhook).toContain("last_provider_event_at: providerEventAt");
    expect(webhook).toContain("last_provider_event_at.lt.${providerEventAt}");
  });

  test("terminal subscription status cannot be reopened by delayed webhook events", async () => {
    const webhook = await source("../src/app/api/billing/webhook/route.ts");
    const ordering = await source("../src/lib/billing/provider-event-order.mjs");
    expect(ordering).toContain('current.status === "cancelled" || current.status === "expired"');
    expect(webhook).toContain('status: "not.in.(cancelled,expired)"');
    expect(webhook).toContain('const terminal = latest.status === "cancelled" || latest.status === "expired"');
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

  test("cancellation is sent to Razorpay before local status changes", async () => {
    const cancel = await source("../src/app/api/billing/cancel/route.ts");
    expect(cancel).toContain("cancel_at_cycle_end: 1");
    expect(cancel).toContain("if (!providerResponse.ok)");
    expect(cancel).toContain("No local status was changed");
    expect(cancel).toContain("provider.id !== local.provider_subscription_id");
    expect(cancel).toContain("cancel_at_period_end: !ended");
    expect(cancel).toContain('status: "not.in.(cancelled,expired)"');
  });
});


test.describe("provider event ordering behavior", () => {
  const active = { status: "active", last_provider_event_at: "2026-10-14T10:00:00.000Z" };

  test("rejects stale/equal non-terminal events but accepts a newer event", () => {
    expect(shouldApplyProviderEvent(active, "2026-10-14T09:59:59.000Z", "active")).toBe(false);
    expect(shouldApplyProviderEvent(active, "2026-10-14T10:00:00.000Z", "active")).toBe(false);
    expect(shouldApplyProviderEvent(active, "2026-10-14T10:00:01.000Z", "active")).toBe(true);
  });

  test("equal-time terminal events take priority over non-terminal events", () => {
    const sameTime = "2026-10-14T10:00:00.000Z";
    expect(shouldApplyProviderEvent(active, sameTime, "cancelled")).toBe(true);
    expect(shouldApplyProviderEvent(active, sameTime, "expired")).toBe(true);
    expect(shouldApplyProviderEvent(active, sameTime, "active")).toBe(false);
    expect(shouldApplyProviderEvent(active, sameTime, "past_due")).toBe(false);
  });

  test("accepts the first valid event when no provider timestamp has been recorded", () => {
    expect(shouldApplyProviderEvent({ status: "incomplete", last_provider_event_at: null }, "2026-10-14T10:00:00.000Z", "active")).toBe(true);
    expect(shouldApplyProviderEvent({ status: "incomplete" }, "2026-10-14T10:00:00.000Z", "active")).toBe(true);
  });

  test("never reopens terminal states, even with a newer timestamp", () => {
    for (const status of ["cancelled", "expired"]) {
      expect(shouldApplyProviderEvent({ status, last_provider_event_at: "2026-10-14T10:00:00.000Z" }, "2026-10-15T10:00:00.000Z", "active")).toBe(false);
    }
  });

  test("fails closed for missing rows and invalid timestamps", () => {
    expect(shouldApplyProviderEvent(null, "2026-10-14T10:00:00.000Z", "active")).toBe(false);
    expect(shouldApplyProviderEvent(active, "not-a-date", "active")).toBe(false);
    expect(shouldApplyProviderEvent({ status: "active", last_provider_event_at: "bad-date" }, "2026-10-15T10:00:00.000Z", "active")).toBe(false);
  });

  test("rejects stale terminal events but accepts newer terminal events", () => {
    expect(shouldApplyProviderEvent(active, "2026-10-14T09:59:59.000Z", "cancelled")).toBe(false);
    expect(shouldApplyProviderEvent(active, "2026-10-14T09:59:59.000Z", "expired")).toBe(false);
    expect(shouldApplyProviderEvent(active, "2026-10-14T10:00:01.000Z", "cancelled")).toBe(true);
    expect(shouldApplyProviderEvent(active, "2026-10-14T10:00:01.000Z", "expired")).toBe(true);
  });
});
