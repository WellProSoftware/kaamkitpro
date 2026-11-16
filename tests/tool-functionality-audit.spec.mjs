import { expect, test } from "@playwright/test";
import { PDFDocument } from "pdf-lib";
import { readFile } from "node:fs/promises";

async function makePdf(pageCount = 1) {
  const pdf = await PDFDocument.create();
  for (let i = 0; i < pageCount; i++) pdf.addPage([300, 400]);
  return Buffer.from(await pdf.save());
}

test("GST calculator adds and removes GST correctly", async ({ page }) => {
  await page.goto("/tools/gst-calculator");
  await page.locator('input[type="number"]').first().fill("10000");
  await expect(page.getByText("₹1800.00", { exact: true })).toBeVisible();
  await expect(page.getByText("₹11800.00", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Remove GST" }).click();
  await expect(page.getByText("₹1525.42", { exact: true })).toBeVisible();
  await expect(page.getByText("₹10000.00", { exact: true })).toBeVisible();
});

test("BMI calculator returns a numeric result and category", async ({ page }) => {
  await page.goto("/tools/bmi-calculator");
  await page.locator('input[type="number"]').nth(0).fill("70");
  await page.locator('input[type="number"]').nth(1).fill("175");
  await expect(page.locator("p.text-5xl")).toHaveText("22.9");
  await expect(page.locator("div.bg-blue-50 p.text-lg")).toHaveText("Normal");
});

test("SIP calculator handles zero return and calculates invested amount", async ({ page }) => {
  await page.goto("/tools/sip-calculator");
  await page.locator('input[type="number"]').nth(0).fill("5000");
  await page.locator('input[type="number"]').nth(1).fill("0");
  await page.locator('input[type="number"]').nth(2).fill("1");
  await expect(page.locator("div.rounded-2xl.bg-blue-50 p.text-3xl")).toHaveText("₹60,000");
  await expect(page.locator("div.rounded-2xl.bg-emerald-50 p.text-3xl")).toHaveText("₹0");
});

test("age calculator calculates date components and rejects a future date", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-11-16T12:00:00"));
  await page.goto("/tools/age-calculator");
  await page.locator('input[type="date"]').fill("2000-01-01");
  await page.getByRole("button", { name: "Calculate Age" }).click();
  await expect(page.getByText("26", { exact: true })).toBeVisible();
  await expect(page.getByText("10", { exact: true })).toBeVisible();
  await expect(page.getByText("15", { exact: true })).toBeVisible();
  await page.locator('input[type="date"]').fill("2027-01-01");
  await page.getByRole("button", { name: "Calculate Age" }).click();
  await expect(page.getByText("Enter your date of birth to calculate your age.")).toBeVisible();
});

test("PDF Merge downloads a valid PDF containing pages from both inputs", async ({ page }) => {
  await page.goto("/tools/pdf-merge");
  await page.locator("#pdf-upload").setInputFiles([
    { name: "first.pdf", mimeType: "application/pdf", buffer: await makePdf(2) },
    { name: "second.pdf", mimeType: "application/pdf", buffer: await makePdf(1) },
  ]);
  await expect(page.getByText("2 files", { exact: true })).toBeVisible();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Merge PDFs" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("kaamkitpro-merged.pdf");
  const output = await PDFDocument.load(await readFile(await download.path()));
  expect(output.getPageCount()).toBe(3);
  await expect(page.getByText("PDFs merged successfully.")).toBeVisible();
});
