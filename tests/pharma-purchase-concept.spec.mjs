import { test, expect } from "@playwright/test";

test.describe("Pharma purchase concept (isolated preview)", () => {
  test("shows concept safeguards and filters tools", async ({ page }) => {
    await page.goto("/pharma-purchase");
    await expect(page.getByRole("heading", { name: /Smarter pharma purchasing/i })).toBeVisible();
    await expect(page.getByText(/No live payments · No business data is collected/i)).toBeVisible();

    await page.getByPlaceholder("Search purchase tools...").fill("Vendor Quotation");
    await expect(page.locator("#tools article")).toHaveCount(1);
    await expect(page.locator("#tools article").first()).toContainText("Vendor Quotation Comparison");

    await page.getByPlaceholder("Search purchase tools...").fill("nothing-matches-this");
    await expect(page.getByText("No matching tools")).toBeVisible();
    await page.getByPlaceholder("Search purchase tools...").fill("");
    await page.getByRole("button", { name: "Inventory", exact: true }).click();
    await expect(page.locator("#tools article")).toHaveCount(2);
  });

  test("pricing is informational, not a checkout", async ({ page }) => {
    await page.goto("/pharma-purchase");
    await expect(page.locator("#pricing")).toContainText("No checkout, subscription or payment is active");
    await expect(page.locator("#pricing")).toContainText("₹499");
    await page.getByRole("button", { name: /Yearly · 2 months free/ }).click();
    await expect(page.locator("#pricing")).toContainText("₹4,990");
    await expect(page.locator("#pricing")).toContainText("₹39,990");
  });

  test("mobile viewport renders the preview without horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/pharma-purchase");
    await expect(page.getByRole("heading", { name: /Smarter pharma purchasing/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Request a demo/i })).toBeVisible();
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width).toBeLessThanOrEqual(390);
  });
});
