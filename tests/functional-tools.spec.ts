import { expect, test } from "@playwright/test";

test.describe("KaamKitPro tool interactions", () => {
  test("JSON Formatter formats valid JSON", async ({ page }) => {
    await page.goto("/tools/json-formatter");

    await expect(page.getByRole("heading", { name: "JSON Formatter" })).toBeVisible();

    await page.getByPlaceholder('{"name":"KaamKitPro","tools":10}').fill('{"name":"KaamKitPro","tools":10}');
    await page.getByRole("button", { name: "Format", exact: true }).click();

    await expect(page.getByText('"name": "KaamKitPro"', { exact: false })).toBeVisible();
    await expect(page.getByText('"tools": 10', { exact: false })).toBeVisible();
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
        buffer: Buffer.from("%PDF-1.4\n% test file one"),
      },
      {
        name: "second.pdf",
        mimeType: "application/pdf",
        buffer: Buffer.from("%PDF-1.4\n% test file two"),
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

  test("Image Rotate explains that an image must be selected", async ({ page }) => {
    await page.goto("/tools/image-rotate");

    await expect(page.getByRole("heading", { name: "Image Rotate Tool" })).toBeVisible();
    await page.getByRole("button", { name: "Rotate & Download" }).count().then(async (count) => {
      expect(count).toBe(0);
    });
  });
});
