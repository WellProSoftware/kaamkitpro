import { expect, test } from "@playwright/test";

test.describe("KaamKitPro authentication pages", () => {
  test("login page explains email magic-link sign-in", async ({ page }) => {
    await page.goto("/login");

    await expect(page.getByRole("heading", { name: "Sign in with email" })).toBeVisible();
    await expect(page.getByLabel("Email address")).toHaveAttribute("type", "email");
    await expect(page.getByRole("button", { name: "Email me a sign-in link" })).toBeVisible();
  });

  test("login page handles missing public Supabase configuration gracefully", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email address").fill("test@example.com");
    await page.getByRole("button", { name: "Email me a sign-in link" }).click();

    await expect(page.getByText("Login is temporarily unavailable", { exact: false })).toBeVisible();
  });

  test("callback page rejects a URL without sign-in tokens", async ({ page }) => {
    await page.goto("/auth/callback");

    await expect(
      page.getByRole("heading", { name: "Sign-in link not accepted" }),
    ).toBeVisible();
    await expect(page.getByText("This sign-in link is invalid, expired", { exact: false })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Request a new link" }),
    ).toHaveAttribute("href", "/login");
  });

  test("admin access page requires a signed-in allowlisted account", async ({ page }) => {
    await page.goto("/admin/access");
    await expect(page).toHaveURL(/\/login$/);
  });

  test("admin grant API rejects requests without an authenticated admin", async ({ request }) => {
    const response = await request.get("/api/admin/access");
    expect(response.status()).toBe(401);
    expect(await response.json()).toMatchObject({ error: "Please sign in first." });
  });

  test("subscription checkout rejects requests without an authenticated user", async ({ request }) => {
    const response = await request.post("/api/billing/checkout", {
      data: { plan_id: "pro-monthly-inr" },
    });
    expect(response.status()).toBe(401);
    expect(await response.json()).toMatchObject({ error: "Sign in before starting a subscription." });
  });

  test("free tools stay available and metered tools require tracked usage", async ({ request }) => {
    const free = await request.post("/api/tools/usage", {
      data: { tool_key: "calculator", action: "check" },
    });
    expect(free.ok()).toBeTruthy();
    expect(await free.json()).toMatchObject({ allowed: true, tier: "free", limited: false });

    const metered = await request.post("/api/tools/usage", {
      data: { tool_key: "ai-tool", action: "check" },
    });
    expect(metered.status()).toBe(401);
    expect(await metered.json()).toMatchObject({ allowed: false, requiresSignIn: true });
  });

  test("signed-out users resolve to Free with live ads disabled on staging", async ({ request }) => {
    const response = await request.get("/api/access");
    expect(response.ok()).toBeTruthy();
    expect(await response.json()).toMatchObject({ plan: "free", isPro: false, adsEnabled: false });
  });

  test("staging never loads AdSense, even when ad consent is accepted", async ({ page, request }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("kk_privacy_consent_v1", "accepted");
    });

    const adScriptRequests = [];
    page.on("request", (requestEvent) => {
      if (requestEvent.url().includes("googlesyndication.com")) {
        adScriptRequests.push(requestEvent.url());
      }
    });

    await page.goto("/");
    await page.waitForTimeout(500);

    expect(adScriptRequests).toHaveLength(0);
    await expect(page.locator("#google-adsense")).toHaveCount(0);

    const accessResponse = await request.get("/api/access");
    expect(accessResponse.ok()).toBeTruthy();
    expect((await accessResponse.json()).adsEnabled).toBe(false);
  });

  test("pricing page links to sign in", async ({ page }) => {
    await page.goto("/pricing");
    await page.getByRole("link", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/login$/);
    await expect(
      page.getByRole("heading", { name: "Sign in with email" }),
    ).toBeVisible();
  });
});
