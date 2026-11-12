import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

test.describe("HospitalProcure staging MVP", () => {
  test("renders isolated procurement workspace and navigation", async ({ page }) => {
    await page.goto("/hospital-procurement");
    await expect(page.getByRole("heading", { name: "HospitalProcure" })).toBeVisible();
    await expect(page.getByText(/SAMPLE DATA ONLY · NO LIVE PAYMENTS/i)).toBeVisible();
    await page.getByRole("button", { name: /Quotation comparison/i }).click();
    await expect(page.getByRole("heading", { name: /Vendor quotation comparison/i })).toBeVisible();
  });

  test("calculates landed costs and responds to quantity and rate changes", async ({ page }) => {
    await page.goto("/hospital-procurement");
    await page.getByRole("button", { name: /Quotation comparison/i }).click();
    await expect(page.getByText("Lowest landed rate")).toBeVisible();
    await page.getByLabel("Required quantity").fill("200");
    await expect(page.getByText(/200 ×/)).toBeVisible();
    await page.getByLabel("Base rate 2").fill("1000");
    await expect(page.getByText("CareSource Distributors")).toBeVisible();
    await page.getByRole("button", { name: /Export CSV/i }).click();
    await expect(page.getByRole("status")).toContainText("exported as CSV");
  });

  test("shows purchase order and inventory modules", async ({ page }) => {
    await page.goto("/hospital-procurement");
    await page.getByRole("button", { name: /Purchase orders/i }).click();
    await expect(page.getByText("PO-2026-0142")).toBeVisible();
    await page.getByRole("button", { name: /Inventory watch/i }).click();
    await expect(page.getByText("Nitrile Examination Gloves")).toBeVisible();
  });

  test("mobile layout remains within viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/hospital-procurement");
    await expect(page.getByRole("heading", { name: "HospitalProcure" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  });

  test("clamps discount and GST percentages to valid ranges", async ({ page }) => {
    await page.goto("/hospital-procurement");
    await page.getByRole("button", { name: /Quotation comparison/i }).click();
    await page.getByLabel("Discount 1").fill("150");
    await expect(page.getByLabel("Discount 1")).toHaveValue("100");
    await page.getByLabel("GST 1").fill("150");
    await expect(page.getByLabel("GST 1")).toHaveValue("100");
    await expect(page.getByText(/-₹/)).toHaveCount(0);
  });

  test("CSV export neutralizes spreadsheet formulas in vendor names", async ({ page }) => {
    await page.goto("/hospital-procurement");
    await page.getByRole("button", { name: /Quotation comparison/i }).click();
    await page.getByLabel("Vendor name 1").fill('=HYPERLINK("https://attacker.invalid","open")');
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: /Export CSV/i }).click();
    const download = await downloadPromise;
    const path = await download.path();
    expect(path).toBeTruthy();
    const csv = await readFile(path!, "utf8");
    expect(csv).toContain('"\'=HYPERLINK(""https://attacker.invalid""');
  });
});
