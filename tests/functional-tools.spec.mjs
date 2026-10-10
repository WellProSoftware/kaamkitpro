import { expect, test } from "@playwright/test";
import { PDFDocument } from "pdf-lib";

async function createOnePagePdf(label) {
  const document = await PDFDocument.create();
  const page = document.addPage([300, 200]);
  page.drawText(label, { x: 30, y: 150, size: 18 });
  return Buffer.from(await document.save());
}

test("JSON Formatter formats valid JSON", async ({ page }) => {
  await page.goto("/tools/json-formatter");
  await expect(page.getByRole("heading", { name: "JSON Formatter", exact: true })).toBeVisible();

  await page.getByPlaceholder('{"name":"KaamKitPro","tools":10}').fill('{"name":"KaamKitPro","tools":10}');
  await page.getByRole("button", { name: "Format", exact: true }).click();

  await expect(page.locator("div.whitespace-pre-wrap")).toContainText('"name": "KaamKitPro"');
  await expect(page.locator("div.whitespace-pre-wrap")).toContainText('"tools": 10');
});

test("JSON Formatter reports invalid JSON", async ({ page }) => {
  await page.goto("/tools/json-formatter");
  await page.getByPlaceholder('{"name":"KaamKitPro","tools":10}').fill('{"name":');
  await page.getByRole("button", { name: "Validate", exact: true }).click();

  await expect(page.getByText("Invalid JSON. Please check your JSON syntax.")).toBeVisible();
});

test("PDF Merge lists selected files and supports removing one", async ({ page }) => {
  await page.goto("/tools/pdf-merge");
  await expect(page.getByRole("heading", { name: "PDF Merge Tool" })).toBeVisible();

  await page.locator("#pdf-upload").setInputFiles([
    {
      name: "first.pdf",
      mimeType: "application/pdf",
      buffer: await createOnePagePdf("First test page"),
    },
    {
      name: "second.pdf",
      mimeType: "application/pdf",
      buffer: await createOnePagePdf("Second test page"),
    },
  ]);

  await expect(page.getByText("2 files", { exact: true })).toBeVisible();
  await expect(page.getByText("1. first.pdf")).toBeVisible();
  await expect(page.getByText("2. second.pdf")).toBeVisible();

  await page.getByRole("button", { name: "Remove", exact: true }).first().click();

  await expect(page.getByText("1 files", { exact: true })).toBeVisible();
  await expect(page.getByText("second.pdf", { exact: false })).toBeVisible();
  await expect(page.getByText("first.pdf", { exact: false })).toHaveCount(0);
});

test("PDF Merge creates and downloads a valid merged PDF", async ({ page }) => {
  await page.goto("/tools/pdf-merge");
  await page.locator("#pdf-upload").setInputFiles([
    {
      name: "first.pdf",
      mimeType: "application/pdf",
      buffer: await createOnePagePdf("First test page"),
    },
    {
      name: "second.pdf",
      mimeType: "application/pdf",
      buffer: await createOnePagePdf("Second test page"),
    },
  ]);

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Merge PDFs", exact: true }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe("kaamkitpro-merged.pdf");
  await expect(page.getByText("PDFs merged successfully.")).toBeVisible();

  const downloadPath = await download.path();
  expect(downloadPath).toBeTruthy();
  const mergedBytes = await import("node:fs/promises").then(({ readFile }) => readFile(downloadPath));
  const mergedPdf = await PDFDocument.load(mergedBytes);
  expect(mergedPdf.getPageCount()).toBe(2);
});

test("Image Rotate page renders its upload control", async ({ page }) => {
  await page.goto("/tools/image-rotate");
  await expect(page.getByRole("heading", { name: "Image Rotate Tool" })).toBeVisible();
  await expect(page.getByText("Select Image", { exact: true })).toBeVisible();
  await expect(page.locator("#rotate-file")).toHaveAttribute("accept", "image/*");
});

test("Image Rotate processes an image and downloads the rotated result", async ({ page }) => {
  await page.goto("/tools/image-rotate");
  await page.locator("#rotate-file").setInputFiles({
    name: "pixel.png",
    mimeType: "image/png",
    // Valid 1x1 transparent PNG.
    buffer: Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p6sAAAAASUVORK5CYII=",
      "base64",
    ),
  });

  await expect(page.getByText("pixel.png", { exact: true })).toBeVisible();
  await page.locator("select").selectOption("90");

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Rotate & Download", exact: true }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe("kaamkitpro-rotated.jpg");
  await expect(page.getByText("Image rotated successfully.")).toBeVisible();
});


const onePixelPng = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p6sAAAAASUVORK5CYII=",
  "base64",
);

test("Image Grayscale processes an uploaded image and downloads the result", async ({ page }) => {
  await page.goto("/tools/image-grayscale");
  await page.locator("#grayscale-file").setInputFiles({
    name: "pixel.png",
    mimeType: "image/png",
    buffer: onePixelPng,
  });

  await expect(page.getByText("pixel.png", { exact: true })).toBeVisible();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Convert to Grayscale", exact: true }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe("kaamkitpro-grayscale.jpg");
  await expect(page.getByText("Grayscale image created successfully.")).toBeVisible();
});

test("Image Flip processes an uploaded image and downloads the result", async ({ page }) => {
  await page.goto("/tools/image-flip");
  await page.locator("#flip-file").setInputFiles({
    name: "pixel.png",
    mimeType: "image/png",
    buffer: onePixelPng,
  });

  await expect(page.getByText("pixel.png", { exact: true })).toBeVisible();
  await page.locator("select").selectOption("vertical");

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Flip & Download", exact: true }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe("kaamkitpro-flipped.jpg");
  await expect(page.getByText("Image flipped successfully.")).toBeVisible();
});

test("Image Brightness processes an uploaded image and downloads the result", async ({ page }) => {
  await page.goto("/tools/image-brightness");
  await page.locator("#brightness-file").setInputFiles({
    name: "pixel.png",
    mimeType: "image/png",
    buffer: onePixelPng,
  });

  await expect(page.getByText("pixel.png", { exact: true })).toBeVisible();
  await page.getByRole("slider").fill("140");
  await expect(page.getByText("Brightness: 140%")).toBeVisible();

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Adjust & Download", exact: true }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe("kaamkitpro-brightness.jpg");
  await expect(page.getByText("Brightness adjusted successfully.")).toBeVisible();
});

test("Percentage Calculator updates all three calculations", async ({ page }) => {
  await page.goto("/tools/percentage-calculator");
  await expect(page.getByRole("heading", { name: "Percentage Calculator", exact: true })).toBeVisible();

  const fields = page.locator('input[type="number"]');
  await fields.nth(0).fill("25");
  await fields.nth(1).fill("80");
  await expect(page.getByText("20", { exact: true })).toBeVisible();

  await fields.nth(2).fill("30");
  await fields.nth(3).fill("120");
  await expect(page.getByText("25%", { exact: true })).toBeVisible();

  await fields.nth(4).fill("80");
  await fields.nth(5).fill("100");
  await expect(page.getByText("+25%", { exact: true })).toBeVisible();
});

test("PDF Protect clearly reports unsupported encryption and does not download a false protected file", async ({ page }) => {
  await page.goto("/tools/pdf-protect");
  await expect(page.getByRole("heading", { name: "PDF Protect Tool" })).toBeVisible();
  await page.locator("#pdf-file").setInputFiles({
    name: "private-document.pdf",
    mimeType: "application/pdf",
    buffer: await createOnePagePdf("Private test document"),
  });
  await page.getByLabel("Password you intended to use").fill("test-password");
  const downloadPromise = page.waitForEvent("download", { timeout: 1500 }).catch(() => null);
  await page.getByRole("button", { name: "Check protection support" }).click();
  await expect(page.getByRole("status")).toContainText("Password encryption is not supported");
  await expect(page.getByRole("status")).toContainText("No file was changed or downloaded");
  expect(await downloadPromise).toBeNull();
});
