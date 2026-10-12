import { expect, test } from "@playwright/test";

test("staging privacy and legal pages are reachable and disclose advertising", async ({ page }) => {
  const pages = [
    ["/privacy-policy", "Privacy Policy"],
    ["/terms", "Terms"],
    ["/contact", "Contact"],
    ["/advertise", "Advertise"],
  ];

  for (const [path, heading] of pages) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.getByRole("heading", { name: new RegExp(heading, "i") }).first()).toBeVisible();
  }

  await page.goto("/privacy-policy");
  await expect(page.getByRole("heading", { name: /Advertising/i })).toBeVisible();
  await expect(page.getByText(/Google AdSense/i).first()).toBeVisible();
});

test("staging never injects the live AdSense script, including after navigation", async ({ page }) => {
  for (const path of ["/", "/tools/json-formatter", "/privacy-policy", "/login"]) {
    await page.goto(path);
    await page.waitForTimeout(300);
    await expect(page.locator("#google-adsense")).toHaveCount(0);
    await expect(page.locator('script[src*="pagead2.googlesyndication.com"]')).toHaveCount(0);
  }
});
