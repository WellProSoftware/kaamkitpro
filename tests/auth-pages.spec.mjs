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

    await expect(page.getByRole("alert")).toContainText(
      "Login is temporarily unavailable",
    );
  });

  test("callback page rejects a URL without sign-in tokens", async ({ page }) => {
    await page.goto("/auth/callback");

    await expect(
      page.getByRole("heading", { name: "Sign-in link not accepted" }),
    ).toBeVisible();
    await expect(page.getByRole("alert")).toContainText(
      "This sign-in link is invalid, expired",
    );
    await expect(
      page.getByRole("link", { name: "Request a new link" }),
    ).toHaveAttribute("href", "/login");
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
