import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

test.describe("KaamKitPro authentication pages", () => {
  test("signup offers email verification link only; no Google or OTP options", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: "Create your account" })).toBeVisible();
    await expect(page.getByLabel("Full name")).toBeVisible();
    await expect(page.getByLabel("Email address")).toHaveAttribute("type", "email");
    await expect(page.getByRole("button", { name: "Send verification email" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Google|OTP|one-time code|mobile number/i })).toHaveCount(0);
    await expect(page.getByText(/Your account can show your profile/i)).toBeVisible();
    await expect(page.getByLabel("Password")).toHaveCount(0);
  });

  test("signup handles missing public Supabase configuration gracefully", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Full name").fill("Test User");
    await page.getByLabel("Email address").fill("test@example.com");
    await page.getByRole("button", { name: "Send verification email" }).click();
    await expect(page.getByText("Account access is temporarily unavailable", { exact: false })).toBeVisible();
  });

  test("login supports email and password only", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();
    await expect(page.getByLabel("Email address")).toHaveAttribute("type", "email");
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: /Google|OTP|one-time code|mobile number/i })).toHaveCount(0);
  });

  test("callback page rejects a URL without verification tokens", async ({ page }) => {
    await page.goto("/auth/callback");
    await expect(page.getByRole("heading", { name: "Sign-in link not accepted" })).toBeVisible();
    await expect(page.getByText("This sign-in link is invalid, expired", { exact: false })).toBeVisible();
    await expect(page.getByRole("link", { name: "Request a new link" })).toHaveAttribute("href", "/login");
  });

  test("set-password page asks for password confirmation", async ({ page }) => {
    await page.goto("/set-password");
    await expect(page.getByRole("heading", { name: "Create your password" })).toBeVisible();
    await expect(page.locator('input[autocomplete="new-password"]').nth(0)).toHaveAttribute("minlength", "10");
    await expect(page.getByLabel("Confirm password")).toHaveAttribute("minlength", "10");
  });

  test("password API rejects requests without an authenticated session", async ({ request }) => {
    const response = await request.post("/api/auth/password", { data: { password: "test-password-123" } });
    expect([401, 503]).toContain(response.status());
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
    const response = await request.post("/api/billing/checkout", { data: { plan_id: "pro-monthly-inr" } });
    expect(response.status()).toBe(401);
    expect(await response.json()).toMatchObject({ error: "Sign in before starting a subscription." });
  });

  test("subscription status and cancellation APIs reject unauthenticated users", async ({ request }) => {
    const status = await request.get("/api/billing/subscription");
    expect(status.status()).toBe(401);
    expect(await status.json()).toMatchObject({ error: "Please sign in first." });
    const cancel = await request.post("/api/billing/cancel", { data: { subscription_id: "00000000-0000-4000-8000-000000000000" } });
    expect(cancel.status()).toBe(401);
    expect(await cancel.json()).toMatchObject({ error: "Please sign in first." });
    const verify = await request.post("/api/billing/verify", { data: {} });
    expect(verify.status()).toBe(401);
    expect(await verify.json()).toMatchObject({ error: "Sign in before verifying a subscription." });
  });

  test("all tool tiers are temporarily free without sign-in while paid plans are paused", async ({ request }) => {
    for (const tool_key of ["calculator", "ai-tool", "bulk-ai-generation"]) {
      const response = await request.post("/api/tools/usage", { data: { tool_key, action: "check" } });
      expect(response.ok()).toBeTruthy();
      expect(await response.json()).toMatchObject({ allowed: true, tier: "free_pro_access", limited: false });
    }
  });

  test("staging never loads AdSense, even when optional ads consent is accepted", async ({ page, request }) => {
    await page.addInitScript(() => { window.localStorage.setItem("kk_privacy_consent_v1", "accepted"); });
    const adScriptRequests = [];
    page.on("request", event => { if (event.url().includes("googlesyndication.com")) adScriptRequests.push(event.url()); });
    await page.goto("/");
    await page.waitForTimeout(500);
    expect(adScriptRequests).toHaveLength(0);
    await expect(page.locator("#google-adsense")).toHaveCount(0);
    const accessResponse = await request.get("/api/access");
    expect(accessResponse.ok()).toBeTruthy();
    expect((await accessResponse.json()).adsEnabled).toBe(false);
  });

  test("paid plans and checkout remain paused on the pricing page", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByRole("heading", { name: "Paid plans are on hold" })).toBeVisible();
    await expect(page.getByRole("button", { name: /choose monthly|choose yearly|checkout|subscribe|buy now|start trial/i })).toHaveCount(0);
    await expect(page.locator('script[src*="checkout.razorpay.com"]')).toHaveCount(0);
  });

  test("homepage exposes account actions directly and pricing does not gate sign-in", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Create account" }).first()).toHaveAttribute("href", "/login");
    await expect(page.getByRole("link", { name: "Sign in" }).first()).toHaveAttribute("href", "/login?mode=login");
    await page.goto("/pricing");
    await expect(page.getByRole("heading", { name: "Useful tools. No signup needed." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Paid plans are on hold" })).toBeVisible();
    await expect(page.locator("main").getByRole("link", { name: "Sign in" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /choose monthly|choose yearly|checkout|subscribe|buy now|start trial/i })).toHaveCount(0);
  });
});

test("email-link-only callback and password setup copy stays aligned", async () => {
  const callback = await readFile(new URL("../src/app/auth/callback/page.tsx", import.meta.url), "utf8");
  const login = await readFile(new URL("../src/app/login/page.tsx", import.meta.url), "utf8");
  expect(callback).toContain("Sign-in link not accepted");
  expect(callback).toContain("Request a new link");
  expect(login).toMatch(/associated domain.*not verified|domain.*not verified/);
  expect(login).toContain("Email delivery is temporarily unavailable");
  expect(login).toContain('await requestJson("resend"');
});

test("password reset route is available and asks for a verified reset session", async ({ page }) => {
  await page.goto("/reset-password");
  await expect(page.getByRole("heading", { name: "Create a new password" })).toBeVisible();
  await expect(page.getByLabel("New password")).toHaveAttribute("minlength", "10");
  await expect(page.getByLabel("Confirm password")).toHaveAttribute("minlength", "10");
});


test("signed-in navigation and return paths lead users back to tools", async () => {
  const layout = await readFile(new URL("../src/app/layout.tsx", import.meta.url), "utf8");
  const header = await readFile(new URL("../src/components/SiteHeader.tsx", import.meta.url), "utf8");
  const login = await readFile(new URL("../src/app/login/page.tsx", import.meta.url), "utf8");
  const callback = await readFile(new URL("../src/app/auth/callback/page.tsx", import.meta.url), "utf8");
  const setPassword = await readFile(new URL("../src/app/set-password/page.tsx", import.meta.url), "utf8");
  const account = await readFile(new URL("../src/app/account/page.tsx", import.meta.url), "utf8");
  expect(layout).toContain('<SiteHeader />');
  expect(header).toContain('aria-label="Open account menu"');
  expect(header).toContain('href="/account"');
  expect(header).toContain('href="/" className="hover:text-blue-700">Home</Link>');
  expect(header).toContain('href="/" className="whitespace-nowrap">Home</Link>');
  expect(header).toContain('href="/tools"');
  expect(header).toContain('role="menuitem"');
  expect(login).toContain('destination = "/"');
  expect(callback).toContain('flow === "reset" ? "/reset-password" : "/"');
  expect(setPassword).toContain('window.location.replace("/?welcome=1")');
  expect(account).toContain("Back to all tools");
  expect(account).toContain("Historical test subscription (staging)");
});
