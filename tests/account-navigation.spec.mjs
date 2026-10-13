import { expect, test } from "@playwright/test";

test("signed-in account page provides clear homepage and plan navigation", async ({ page }) => {
  await page.route("**/api/auth/session", route =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        user: { id: "staging-navigation-test", email: "navigation-test@example.invalid", fullName: "Navigation Test" },
      }),
    }),
  );
  await page.route("**/api/access", route =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ isAdmin: false, isPro: false, plan: "free", adsEnabled: false }),
    }),
  );
  await page.route("**/api/billing/subscription", route =>
    route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ subscription: null }) }),
  );

  await page.goto("/account");
  await expect(page.getByRole("heading", { name: "Welcome to KaamKitPro" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Home / Tools" })).toHaveAttribute("href", "/");
  await expect(page.getByRole("link", { name: "Explore tools / Go to homepage" })).toHaveAttribute("href", "/");
  await expect(page.getByRole("link", { name: "View plans" })).toHaveAttribute("href", "/pricing");
});
