import { expect, test } from "@playwright/test";
import { PDFDocument } from "pdf-lib";
import { readFile } from "node:fs/promises";

async function createOnePagePdf() {
  const document = await PDFDocument.create();
  const page = document.addPage([300, 200]);
  page.drawText("PDF compressor download regression", { x: 24, y: 150, size: 12 });
  return Buffer.from(await document.save());
}

test("PDF Compressor downloads a valid one-page PDF", async ({ page }) => {
  await page.goto("/tools/pdf-compressor");
  await expect(page.getByRole("heading", { name: "PDF Compressor", exact: true })).toBeVisible();

  await page.locator("#pdf-compress").setInputFiles({
    name: "source.pdf",
    mimeType: "application/pdf",
    buffer: await createOnePagePdf(),
  });
  await expect(page.getByText("source.pdf", { exact: true })).toBeVisible();

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Compress PDF", exact: true }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe("kaamkitpro-compressed.pdf");
  await expect(page.getByText(/PDF compressed successfully|already optimized/)).toBeVisible();

  const downloadPath = await download.path();
  expect(downloadPath).toBeTruthy();
  const output = await readFile(downloadPath);
  const processed = await PDFDocument.load(output);
  expect(processed.getPageCount()).toBe(1);
});
