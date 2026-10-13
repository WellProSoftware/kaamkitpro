import { expect, test } from "@playwright/test";

test.describe("KaamKitPro authentication pages", () => {
  test("signup page uses email verification and hides Google and OTP options", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: "Create your account" })).toBeVisible();
    await expect(page.getByLabel("Full name")).toBeVisible();
    await expect(page.getByLabel("Email address")).toHaveAttribute("type", "email");
    await expect(page.getByLabel("Create password")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Continue with Google" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Send verification email", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Mobile number" })).toHaveCount(0);
    await expect(page.getByText(/OTP sign-in is not offered/i)).toHaveCount(0);
  });

  test("successful signup replaces the form with email verification instructions", async ({ page }) => {
    await page.route("**/auth/v1/signup**", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ user: { id: "staging-test-user", email: "test@example.com", identities: [{ id: "staging-test-identity" }] } }) });
    });
    await page.goto("/login");
    await page.getByLabel("Full name").fill("Test User");
    await page.getByLabel("Email address").fill("test@example.com");
    await page.getByRole("button", { name: "Send verification email" }).click();

    await expect(page.getByRole("heading", { name: "Check your email" })).toBeVisible();
    await expect(page.getByText(/open the verification link within 2 minutes, and create your password/i)).toBeVisible();
    await expect(page.getByRole("button", { name: "Send verification email" })).toHaveCount(0);
    await expect(page.getByLabel("Full name")).toHaveCount(0);
    await expect(page.getByLabel("Email address")).toHaveCount(0);
  });

  test("repeat signup explains that the email already has an account and requests a fresh link", async ({ page }) => {
    await page.route("**/auth/v1/signup**", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ user: { id: "existing-user", email: "test@example.com", identities: [] } }) });
    });
    await page.route("**/auth/v1/resend**", async (route) => {
      const body = route.request().postDataJSON();
      expect(body.type).toBe("signup");
      expect(body.email).toBe("test@example.com");
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({}) });
    });
    await page.goto("/login");
    await page.getByLabel("Full name").fill("Test User");
    await page.getByLabel("Email address").fill("test@example.com");
    await page.getByRole("button", { name: "Send verification email" }).click();

    await expect(page.getByText(/An account already exists with this email address/i)).toBeVisible();
    await expect(page.getByRole("button", { name: "Resend verification email" })).toBeVisible();
  });

  test("signup displays a clear error when Supabase rejects the signup request", async ({ page }) => {
    await page.route("**/auth/v1/signup**", async (route) => {
      await route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ message: "Account access is temporarily unavailable. Please try again later." }) });
    });
    await page.goto("/login");
    await page.getByLabel("Full name").fill("Test User");
    await page.getByLabel("Email address").fill("test@example.com");
    // Signup password is created only after the email verification link is opened.
    await page.getByRole("button", { name: "Send verification email" }).click();

    await expect(page.getByText("Account access is temporarily unavailable", { exact: false })).toBeVisible();
  });

  test("login supports email and password without Google or one-time-code mode", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();
    await expect(page.getByLabel("Email address")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Continue with Google" })).toHaveCount(0);
    await expect(page.getByLabel("Mobile number")).toHaveCount(0);
    await expect(page.getByLabel("One-time code")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Send one-time code" })).toHaveCount(0);
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

  test("subscription status and cancellation APIs reject unauthenticated users", async ({ request }) => {
    const status = await request.get("/api/billing/subscription");
    expect(status.status()).toBe(401);
    expect(await status.json()).toMatchObject({ error: "Please sign in first." });

    const cancel = await request.post("/api/billing/cancel", {
      data: { subscription_id: "00000000-0000-4000-8000-000000000000" },
    });
    expect(cancel.status()).toBe(401);
    expect(await cancel.json()).toMatchObject({ error: "Please sign in first." });

    const verify = await request.post("/api/billing/verify", {
      data: {},
    });
    expect(verify.status()).toBe(401);
    expect(await verify.json()).toMatchObject({ error: "Sign in before verifying a subscription." });
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


  test("Pro subscription checkout requires explicit recurring billing consent", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByRole("button", { name: "Choose monthly" })).toBeVisible();

    await page.getByRole("button", { name: "Choose monthly" }).click();
    await expect(page.getByRole("status")).toContainText("accept the recurring billing terms");
    await expect(page.locator('script[src*="checkout.razorpay.com"]')).toHaveCount(0);
  });

  test("pricing page explains that free tools do not need signup", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByRole("heading", { name: "Useful tools. No signup needed." })).toBeVisible();
    await expect(page.getByText("Open any currently available free tool and start using it immediately.", { exact: false })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Use every tool without ads" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Choose monthly" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Choose yearly" })).toBeVisible();
    await expect(page.getByText(/authorize recurring subscription payments/i)).toBeVisible();
    await page.getByRole("link", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("heading", { name: "Create your account" })).toBeVisible();
  });
});
