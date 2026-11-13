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
  await expect(page.getByText("source.pdf", { exact: true })).toHaveCount(2);

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Compress PDF", exact: true }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe("kaamkitpro-compressed.pdf");
  const successMessage = page
    .getByText("PDF compressed successfully.", { exact: true })
    .or(page.getByText(
      "The PDF was already optimized, so the file size could not be reduced further without reducing image quality.",
      { exact: true }
    ));
  await expect(successMessage).toBeVisible();

  const downloadPath = await download.path();
  expect(downloadPath).toBeTruthy();
  const output = await readFile(downloadPath);
  const processed = await PDFDocument.load(output);
  expect(processed.getPageCount()).toBe(1);
});

test("PDF Split downloads every source page as a valid separate PDF", async ({ page }) => {
  const source = await PDFDocument.create();
  source.addPage([300, 200]).drawText("Page one", { x: 24, y: 150, size: 12 });
  source.addPage([300, 200]).drawText("Page two", { x: 24, y: 150, size: 12 });

  await page.goto("/tools/pdf-split");
  await expect(page.getByRole("heading", { name: "PDF Split Tool", exact: true })).toBeVisible();

  // Set the file directly on the input. Clicking the styled dropzone is flaky
  // in Chromium because the hidden input is covered by the dropzone and sticky header.
  await page.locator("#pdf-file").setInputFiles({
    name: "two-pages.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from(await source.save()),
  });
  await expect(page.getByText("two-pages.pdf", { exact: true })).toBeVisible();

  const downloads = [];
  page.on("download", (download) => downloads.push(download));
  await page.getByRole("button", { name: "Split PDF", exact: true }).click();
  await expect(page.getByText("2 pages split successfully.", { exact: true })).toBeVisible();

  expect(downloads).toHaveLength(2);
  expect(downloads.map((download) => download.suggestedFilename())).toEqual([
    "page-1.pdf",
    "page-2.pdf",
  ]);

  for (const download of downloads) {
    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    const output = await readFile(downloadPath);
    const splitPage = await PDFDocument.load(output);
    expect(splitPage.getPageCount()).toBe(1);
  }
});
