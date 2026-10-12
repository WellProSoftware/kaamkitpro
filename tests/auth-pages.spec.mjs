import { expect, test } from "@playwright/test";

test.describe("KaamKitPro authentication pages", () => {
  test("signup page offers email/mobile OTP, password and Google sign-in", async ({ page }) => {
    await page.goto("/login");

    await expect(page.getByRole("heading", { name: "Create your account" })).toBeVisible();
    await expect(page.getByLabel("Full name")).toBeVisible();
    await expect(page.getByLabel("Email address")).toHaveAttribute("type", "email");
    await expect(page.getByLabel("Create password")).toHaveAttribute("minlength", "10");
    await expect(page.getByRole("button", { name: "Continue with Google" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Create account and send OTP" })).toBeVisible();

    await page.getByRole("button", { name: "Mobile number" }).click();
    await expect(page.getByLabel("Mobile number")).toHaveAttribute("type", "tel");
  });

  test("signup handles missing public Supabase configuration gracefully", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Full name").fill("Test User");
    await page.getByLabel("Email address").fill("test@example.com");
    await page.getByLabel("Create password").fill("long-enough-test-password");
    await page.getByRole("button", { name: "Create account and send OTP" }).click();

    await expect(page.getByText("Account access is temporarily unavailable", { exact: false })).toBeVisible();
  });

  test("login supports password and one-time-code modes", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();

    await page.getByLabel("One-time code").check();
    await expect(page.getByRole("button", { name: "Send one-time code" })).toBeVisible();
    await expect(page.getByLabel("Password")).toHaveCount(0);
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

  test("free tools stay available anonymously; account-based tools ask for sign-in", async ({ request }) => {
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

    const proOnly = await request.post("/api/tools/usage", {
      data: { tool_key: "bulk-ai-generation", action: "check" },
    });
    expect(proOnly.status()).toBe(401);
    expect(await proOnly.json()).toMatchObject({ allowed: false, requiresSignIn: true });
  });

  test("staging never loads AdSense, even when optional ads consent is accepted", async ({ page, request }) => {
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

  test("pricing page explains that free tools do not need signup", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByRole("heading", { name: "Useful tools. No signup needed." })).toBeVisible();
    await expect(page.getByText("Free tools stay open to everyone without signup.")).toBeVisible();
    await page.getByRole("link", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("heading", { name: "Create your account" })).toBeVisible();
  });
});
