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

test("PDF Rotate downloads a PDF with the selected page rotation", async ({ page }) => {
  await page.goto("/tools/pdf-rotate");
  const source = await PDFDocument.create();
  source.addPage([300, 400]);
  const input = await source.save();
  await page.locator("#pdf-file").setInputFiles({
    name: "portrait.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from(input),
  });
  await page.locator("#angle").selectOption("90");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Rotate & Download PDF" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("kaamkitpro-rotated.pdf");
  const output = await PDFDocument.load(await readFile(await download.path()));
  expect(output.getPageCount()).toBe(1);
  expect(output.getPage(0).getRotation().angle).toBe(90);
  await expect(page.getByText("PDF rotated 90° successfully.")).toBeVisible();
});


test("PDF Split downloads a valid one-page PDF", async ({ page }) => {
  await page.goto("/tools/pdf-split");
  await page.locator("#pdf-file").setInputFiles({
    name: "single-page.pdf",
    mimeType: "application/pdf",
    buffer: await makePdf(1),
  });
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Split PDF" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("page-1.pdf");
  const output = await PDFDocument.load(await readFile(await download.path()));
  expect(output.getPageCount()).toBe(1);
  await expect(page.getByText("1 page split successfully.")).toBeVisible();
});

test("Image Rotate downloads a valid JPEG after a 90-degree rotation", async ({ page }) => {
  await page.goto("/tools/image-rotate");
  const pngDataUrl = await page.evaluate(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 2;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    context.fillStyle = "#ff0000";
    context.fillRect(0, 0, 2, 1);
    return canvas.toDataURL("image/png");
  });
  const png = Buffer.from(pngDataUrl.split(",")[1], "base64");
  await page.locator("#rotate-file").setInputFiles({
    name: "tiny.png",
    mimeType: "image/png",
    buffer: png,
  });
  await page.locator("select").selectOption("90");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Rotate & Download" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("kaamkitpro-rotated.jpg");
  const output = await readFile(await download.path());
  expect(output[0]).toBe(0xff);
  expect(output[1]).toBe(0xd8);
  const dimensions = await page.evaluate(async (base64) => {
    const image = new Image();
    image.src = `data:image/jpeg;base64,${base64}`;
    await image.decode();
    return { width: image.naturalWidth, height: image.naturalHeight };
  }, output.toString("base64"));
  expect(dimensions).toEqual({ width: 1, height: 2 });
  await expect(page.getByText("Image rotated successfully.")).toBeVisible();
});


test("Image Grayscale preserves dimensions and produces grayscale JPEG pixels", async ({ page }) => {
  await page.goto("/tools/image-grayscale");
  const pngDataUrl = await page.evaluate(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 2;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    context.fillStyle = "#ff0000";
    context.fillRect(0, 0, 2, 1);
    return canvas.toDataURL("image/png");
  });
  await page.locator("#grayscale-file").setInputFiles({
    name: "red-source.png",
    mimeType: "image/png",
    buffer: Buffer.from(pngDataUrl.split(",")[1], "base64"),
  });
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Convert to Grayscale" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("kaamkitpro-grayscale.jpg");
  const output = await readFile(await download.path());
  expect(output[0]).toBe(0xff);
  expect(output[1]).toBe(0xd8);
  const pixels = await page.evaluate(async (base64) => {
    const image = new Image();
    image.src = `data:image/jpeg;base64,${base64}`;
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);
    const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
    return { width: canvas.width, height: canvas.height, red: data[0], green: data[1], blue: data[2] };
  }, output.toString("base64"));
  expect(pixels.width).toBe(2);
  expect(pixels.height).toBe(1);
  expect(Math.max(pixels.red, pixels.green, pixels.blue) - Math.min(pixels.red, pixels.green, pixels.blue)).toBeLessThanOrEqual(8);
  await expect(page.getByText("Grayscale image created successfully.")).toBeVisible();
});
