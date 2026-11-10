import { expect, test } from "@playwright/test";
import { PDFDocument } from "pdf-lib";

const uncoveredDocumentTools = [
  { route: "/tools/jpg-to-excel", heading: "JPG to Excel", input: "#converter-file", accept: /jpg|jpeg/i },
  { route: "/tools/jpg-to-pdf", heading: "JPG to PDF Converter", input: "#image-files", accept: /jpg|jpeg|png/i },
  { route: "/tools/jpg-to-word", heading: "JPG to Word", input: "#converter-file", accept: /jpg|jpeg/i },
  { route: "/tools/pdf-compressor", heading: "PDF Compressor", input: "#pdf-compress", accept: /pdf/i },
  { route: "/tools/pdf-extract-text", heading: "PDF Text Extractor", input: "#pdf-file", accept: /pdf/i },
  { route: "/tools/pdf-metadata", heading: "PDF Metadata Editor", input: "#pdf-file", accept: /pdf/i },
  { route: "/tools/pdf-page-number", heading: "PDF Page Number Tool", input: "#pdf-file", accept: /pdf/i },
  { route: "/tools/pdf-rotate", heading: "PDF Rotate Tool", input: "#pdf-file", accept: /pdf/i },
  { route: "/tools/pdf-split", heading: "PDF Split Tool", input: "#pdf-file", accept: /pdf/i },
  { route: "/tools/pdf-to-jpg", heading: "PDF to JPG Converter", input: "#pdf-file", accept: /pdf/i },
  { route: "/tools/pdf-watermark", heading: "PDF Watermark Tool", input: "#pdf-file", accept: /pdf/i },
];

for (const tool of uncoveredDocumentTools) {
  test(`${tool.route} renders its document tool and matching upload control`, async ({ page }) => {
    const response = await page.goto(tool.route);
    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { name: tool.heading, exact: true })).toBeVisible();
    const upload = page.locator(tool.input);
    await expect(upload).toBeAttached();
    await expect(upload).toHaveAttribute("accept", tool.accept);
  });
}

test("JPG to PDF converts an uploaded image into a valid one-page PDF", async ({ page }) => {
  await page.goto("/tools/jpg-to-pdf");
  await expect(page.locator("#image-files")).toBeAttached();
  await page.waitForFunction(() => {
    const input = document.querySelector("#image-files");
    return input && Object.keys(input).some((key) =>
      key.startsWith("__reactProps$") && typeof input[key]?.onChange === "function"
    );
  }, { timeout: 10000 }); // Wait for React to attach the upload handler before selecting a file.
  await page.locator("#image-files").setInputFiles({
    name: "pixel.png",
    mimeType: "image/png",
    buffer: Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p6sAAAAASUVORK5CYII=",
      "base64",
    ),
  });

  await expect(page.getByText(/1\. pixel\.png/)).toBeVisible();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Convert to PDF", exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("kaamkitpro-images.pdf");

  const downloadPath = await download.path();
  expect(downloadPath).toBeTruthy();
  const bytes = await import("node:fs/promises").then(({ readFile }) => readFile(downloadPath));
  const output = await PDFDocument.load(bytes);
  expect(output.getPageCount()).toBe(1);
});
