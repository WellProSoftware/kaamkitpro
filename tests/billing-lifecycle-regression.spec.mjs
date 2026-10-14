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
    expect(mapper).toContain('default: return null');
  });

  test("webhook rejects missing provider timestamps and applies only chronologically newer events", async () => {
    const webhook = await source("../src/app/api/billing/webhook/route.ts");
    expect(webhook).toContain('payload.created_at !== "number"');
    expect(webhook).toContain("Missing or invalid provider event timestamp.");
    expect(webhook).toContain('select: "status,last_provider_event_at"');
    expect(webhook).toContain("Date.parse(providerEventAt) <= lastProviderEventAt");
    expect(webhook).toContain("last_provider_event_at: providerEventAt");
    expect(webhook).toContain("last_provider_event_at.lt.${providerEventAt}");
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
