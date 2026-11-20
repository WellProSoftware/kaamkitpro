import { expect, test } from "@playwright/test";

test("the broader hospital procurement landing page remains paused until its full rollout", async ({ page }) => {
  const response = await page.goto("/hospital-procurement");
  expect(response?.status()).toBe(404);
});

test("Vendor Quotation Comparison calculates landed costs and identifies the lowest quote", async ({ page }) => {
  await page.goto("/tools/vendor-quotation-comparison");
  await expect(page.getByRole("heading", { level: 1, name: "Vendor Quotation Comparison" })).toBeVisible();

  for (const [index, supplier, price] of [
    [1, "Supplier A", "10.00"],
    [2, "Supplier B", "9.80"],
  ]) {
    await page.getByLabel(`Item name, quote ${index}`).fill("Paracetamol 500 mg");
    await page.getByLabel(`Pack / unit, quote ${index}`).fill("10 tablets");
    await page.getByLabel(`Supplier name, quote ${index}`).fill(supplier);
    await page.getByLabel(`Quantity, quote ${index}`).fill("100");
    await page.getByLabel(`Unit price, quote ${index}`).fill(price);
  }

  await expect(page.getByText("Lowest landed cost", { exact: true })).toHaveCount(1);
  await expect(page.getByText("Supplier B", { exact: true })).toBeVisible();
  await expect(page.getByText("₹10.29", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "Export comparison CSV" }).click();
  await expect(page.getByRole("status")).toHaveText("Comparison exported successfully.");
});
