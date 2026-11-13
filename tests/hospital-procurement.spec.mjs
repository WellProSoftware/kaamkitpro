import { test, expect } from "@playwright/test";

test.describe("Paused hospital procurement tools", () => {
  for (const route of ["/hospital-procurement", "/tools/vendor-quotation-comparison"]) {
    test(`${route} is unavailable while the feature is paused`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(404);
    });
  }
});
