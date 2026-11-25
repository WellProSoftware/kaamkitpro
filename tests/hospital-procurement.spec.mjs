import { expect, test } from "@playwright/test";

test("the broader hospital procurement landing page remains paused until its full rollout", async ({ page }) => {
  const response = await page.goto("/hospital-procurement");
  expect(response?.status()).toBe(404);
});
