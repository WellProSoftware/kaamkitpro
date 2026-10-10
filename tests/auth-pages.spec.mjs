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
    await expect(page).toHaveURL(/\\/login$/);
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

  test("signed-out users resolve to Free with ads enabled", async ({ request }) => {
    const response = await request.get("/api/access");
    expect(response.ok()).toBeTruthy();
    expect(await response.json()).toMatchObject({ plan: "free", isPro: false, adsEnabled: true });
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
