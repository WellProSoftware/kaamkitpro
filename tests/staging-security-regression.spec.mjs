import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { statusFor } from "../src/lib/billing/subscription-status.mjs";

test.describe("staging security regression checks", () => {
  test("server-only Supabase credentials are not exposed in public HTML", async ({ request }) => {
    for (const path of ["/", "/login", "/pricing", "/tools/json-formatter"]) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(200);
      const html = await response.text();
      expect(html, path).not.toMatch(/SUPABASE_SERVICE_ROLE_KEY|service_role|sb_secret_[A-Za-z0-9_-]{12,}/i);
    }
  });

  test("session endpoint fails closed when no session cookie is supplied", async ({ request }) => {
    const response = await request.get("/api/auth/session");
    expect([401, 503]).toContain(response.status());
    const body = await response.json();
    expect(body).toHaveProperty("error");
  });

  test("session endpoint rejects malformed token payloads without issuing cookies", async ({ request }) => {
    const response = await request.post("/api/auth/session", {
      data: { access_token: "", refresh_token: "" },
    });
    expect([400, 503]).toContain(response.status());
    expect(response.headers()["set-cookie"] || "").not.toMatch(/kk_access_token=|kk_refresh_token=/);
  });

  test("admin grant mutation rejects a cross-origin request before authentication", async ({ request }) => {
    const response = await request.post("/api/admin/access", {
      headers: { Origin: "https://attacker.example.invalid" },
      data: {
        email: "staging-test@example.invalid",
        access_type: "pro",
        duration: "30",
        reason: "testing",
        note: "Cross-origin security regression test; no write should occur.",
      },
    });
    expect(response.status()).toBe(403);
    expect(await response.json()).toMatchObject({ error: "Invalid request origin." });
  });

  test("admin grant and revoke endpoints remain protected for signed-out requests", async ({ request }) => {
    const list = await request.get("/api/admin/access");
    expect(list.status()).toBe(401);

    const grant = await request.post("/api/admin/access", {
      data: {
        email: "staging-test@example.invalid",
        access_type: "pro",
        duration: "30",
        reason: "testing",
        note: "Unauthenticated regression test; no write should occur.",
      },
    });
    expect(grant.status()).toBe(401);

    const revoke = await request.patch("/api/admin/access", {
      data: { id: "a80a66cc-5f2f-4cfd-a1bf-7c71ec3d73d8" },
    });
    expect(revoke.status()).toBe(401);
  });

  test("quota API rejects malformed input and does not grant anonymous metered access", async ({ request }) => {
    const malformed = await request.post("/api/tools/usage", {
      data: { action: "check" },
    });
    expect(malformed.status()).toBe(400);
    expect(await malformed.json()).toMatchObject({ error: "A valid tool key is required." });

    const metered = await request.post("/api/tools/usage", {
      data: { tool_key: "ai-tool", action: "consume" },
    });
    expect(metered.status()).toBe(401);
    expect(await metered.json()).toMatchObject({ allowed: false, requiresSignIn: true });
  });

  test("billing checkout and account routes reject signed-out requests", async ({ request }) => {
    const checkout = await request.post("/api/billing/checkout", {
      data: { plan_id: "pro-monthly-inr" },
    });
    expect(checkout.status()).toBe(401);

    const verify = await request.post("/api/billing/verify", {
      data: {
        razorpay_payment_id: "pay_test123",
        razorpay_subscription_id: "sub_test123",
        razorpay_signature: "0".repeat(64),
      },
    });
    expect(verify.status()).toBe(401);

    const subscription = await request.get("/api/billing/subscription");
    expect(subscription.status()).toBe(401);

    const cancel = await request.post("/api/billing/cancel", {
      data: { subscription_id: "a80a66cc-5f2f-4cfd-a1bf-7c71ec3d73d8" },
    });
    expect(cancel.status()).toBe(401);
  });

  test("billing webhook fails closed without a valid provider signature", async ({ request }) => {
    const response = await request.post("/api/billing/webhook", {
      headers: {
        "x-razorpay-event-id": "staging-security-regression",
      },
      data: { event: "subscription.activated" },
    });
    expect([401, 503]).toContain(response.status());
    expect(response.status()).not.toBe(200);
  });

  test("staging SEO exclusion and ad publisher declaration stay present", async ({ request }) => {
    const robotsResponse = await request.get("/robots.txt");
    expect(robotsResponse.status()).toBe(200);
    expect(await robotsResponse.text()).toContain("Disallow: /");

    const adsResponse = await request.get("/ads.txt");
    expect(adsResponse.status()).toBe(200);
    expect((await adsResponse.text()).trim()).toBe(
      "google.com, pub-6738934686699082, DIRECT, f08c47fec0942fa0",
    );
  });

  test("subscription access fails closed for missing or invalid period-end timestamps", async () => {
    for (const path of [
      "../src/app/api/access/route.ts",
      "../src/app/api/tools/usage/route.ts",
    ]) {
      const source = await readFile(new URL(path, import.meta.url), "utf8");
      expect(source).toContain('typeof item.current_period_end === "string"');
      expect(source).toContain("Number.isFinite(Date.parse(item.current_period_end))");
      expect(source).toContain("Date.parse(item.current_period_end) > now");
      expect(source).not.toContain("!item.current_period_end || Date.parse(item.current_period_end) > now");
    }
  });
  test("staging does not load the live AdSense script", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('script[src*="pagead2.googlesyndication.com"]')).toHaveCount(0);
  });

  test("staging pages are noindex and staging sitemap does not publish production URLs", async ({ request }) => {
    const home = await request.get("/");
    expect(home.status()).toBe(200);
    const html = await home.text();
    expect(html).toMatch(/name="robots"[^>]*content="[^"]*noindex/i);

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const sitemapBody = await sitemap.text();
    expect(sitemapBody).not.toContain("https://kaamkitpro.com/");
  });

  test("AdSense loader is fail-closed and staging-gated in source", async () => {
    const loader = await readFile(new URL("../src/components/AdSenseLoader.tsx", import.meta.url), "utf8");
    const layout = await readFile(new URL("../src/app/layout.tsx", import.meta.url), "utf8");
    const access = await readFile(new URL("../src/app/api/access/route.ts", import.meta.url), "utf8");
    expect(loader).toContain("data.adsEnabled !== true");
    expect(loader).toContain('consent !== "accepted"');
    expect(loader).toContain("if (!response.ok)");
    expect(layout).toContain('<AdSenseLoader disabled={isStagingBuild} />');
    expect(access).toContain("adsEnabled: !isStagingBuild && !isPro");
    expect(access).toContain("adsEnabled: false");
  });

  test("public trust and monetization pages remain reachable and listed in the production sitemap source", async ({ request }) => {
    const paths = ["/about", "/contact", "/advertise", "/privacy-policy", "/terms", "/pricing", "/guides"];
    for (const path of paths) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(200);
    }

    const sitemap = await readFile(new URL("../src/app/sitemap.ts", import.meta.url), "utf8");
    for (const path of paths) {
      expect(sitemap, `production sitemap should include ${path}`).toContain(`"${path}"`);
    }

    const privacy = await request.get("/privacy-policy");
    expect(await privacy.text()).toMatch(/Advertising/i);
    const advertise = await request.get("/advertise");
    expect(await advertise.text()).toMatch(/Partnership/i);
  });

});

test("Razorpay subscription verification signs payment ID before subscription ID", async () => {
  const source = await readFile(new URL("../src/app/api/billing/verify/route.ts", import.meta.url), "utf8");
  expect(source).toContain('update(`${paymentId}|${subscriptionId}`)');
  expect(source).not.toContain('update(`${subscriptionId}|${paymentId}`)');
});

test("live subscription cancellation is gated by explicit live-payments authorization", async () => {
  const source = await readFile(new URL("../src/app/api/billing/cancel/route.ts", import.meta.url), "utf8");
  expect(source).toContain('getServerEnv("RAZORPAY_LIVE_PAYMENTS_ENABLED")');
  expect(source).toContain('mode === "live" && livePaymentsEnabled !== "true"');
});

test("subscription.updated maps recognized Razorpay statuses behaviorally", () => {
  const cases = [
    ["active", "active"],
    ["pending", "incomplete"],
    ["authenticated", "incomplete"],
    ["halted", "past_due"],
    ["cancelled", "cancelled"],
    ["completed", "expired"],
    ["expired", "expired"],
  ];
  for (const [providerStatus, expected] of cases) {
    expect(statusFor("subscription.updated", providerStatus), providerStatus).toBe(expected);
  }
  for (const unknown of [undefined, "", "unknown", "created", "paused", "authorized"]) {
    expect(statusFor("subscription.updated", unknown), String(unknown)).toBeNull();
  }
  expect(statusFor("unrecognized.event", "active")).toBeNull();
});

test("recognized subscription lifecycle events retain their established mappings", () => {
  expect(statusFor("subscription.activated")).toBe("active");
  expect(statusFor("subscription.charged")).toBe("active");
  expect(statusFor("subscription.resumed")).toBe("active");
  expect(statusFor("subscription.halted")).toBe("past_due");
  expect(statusFor("subscription.cancelled")).toBe("cancelled");
  expect(statusFor("subscription.completed")).toBe("expired");
  expect(statusFor("subscription.pending")).toBe("incomplete");
  expect(statusFor("subscription.paused")).toBe("incomplete");
});
