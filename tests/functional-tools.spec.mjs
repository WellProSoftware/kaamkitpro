import { expect, test } from "@playwright/test";
import { PDFDocument } from "pdf-lib";

async function createOnePagePdf(label) {
  const document = await PDFDocument.create();
  const page = document.addPage([300, 200]);
  page.drawText(label, { x: 30, y: 150, size: 18 });
  return Buffer.from(await document.save());
}

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
  await expect(page.getByText("1. second.pdf", { exact: true })).toBeVisible();
  await expect(page.getByText("1. first.pdf", { exact: true })).toHaveCount(0);
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
  await expect(page.locator("#rotate-file")).toBeAttached();
  await page.waitForTimeout(500); // Ensure the client file-change handler is hydrated.
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
  await expect(page.locator("#grayscale-file")).toBeAttached();
  await page.waitForTimeout(500); // Ensure the client file-change handler is hydrated.
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
  await expect(page.locator("#flip-file")).toBeAttached();
  await page.waitForTimeout(500); // Ensure the client file-change handler is hydrated.
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
  await expect(page.locator("#brightness-file")).toBeAttached();
  await page.waitForTimeout(500); // Ensure the client file-change handler is hydrated.
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


test("Homepage search filters tools and can reset to all tools", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "All Tools", exact: true })).toBeVisible();

  const search = page.getByPlaceholder("Search a tool...");
  await search.fill("PDF Merge");
  await expect(page.getByRole("heading", { name: "PDF Merge", exact: true })).toBeVisible();
  await expect(page.getByText("1 tools available", { exact: true })).toBeVisible();

  await search.fill("tool-that-does-not-exist");
  await expect(page.getByRole("heading", { name: "No tool found", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Show All Tools", exact: true }).click();
  await expect(page.getByRole("heading", { name: "All Tools", exact: true })).toBeVisible();
  await expect(page.getByText(/tools available/)).toBeVisible();
});

test("Homepage category filter shows remaining calculator tools", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Calculators", exact: true }).last().click();

  await expect(page.getByRole("heading", { name: "Calculators", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "PDF Merge", exact: true })).toHaveCount(0);
});


test("Staging sitemap does not expose production URLs", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBeTruthy();
  expect(await response.text()).not.toContain("https://kaamkitpro.com/");
});

test("Sitemap lists each new utility route exactly once", async ({ request }) => {
  test.skip(process.env.KAAMKITPRO_STAGING === "true", "Production sitemap route assertions do not apply to staging.");
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBeTruthy();
  const xml = await response.text();
  for (const route of ["json-to-csv", "text-diff-checker"]) {
    const matches = xml.match(new RegExp("https://kaamkitpro\\.com/tools/" + route, "g")) || [];
    expect(matches).toHaveLength(1);
  }
});


test("Pricing page explains Free access and presents Pro checkout only when available", async ({ page }) => {
  await page.goto("/pricing");
  await expect(page.getByRole("heading", { name: /Useful tools\./ })).toBeVisible();
  await expect(page.getByText(/Use the available free tools right away/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Paid plans are on hold" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Sign in", exact: true })).toHaveAttribute("href", "/login");

  const monthlyButton = page.getByRole("button", { name: "Choose monthly" });
  if (await monthlyButton.count()) {
    await expect(page.getByRole("heading", { name: "Use every tool without ads" })).toBeVisible();
    await expect(monthlyButton).toBeVisible();
    await expect(page.getByRole("button", { name: "Choose yearly" })).toBeVisible();
    await expect(page.getByText(/authorize recurring subscription payments/i)).toBeVisible();
  } else {
    await expect(page.getByRole("button", { name: /checkout|subscribe|buy now|start trial/i })).toHaveCount(0);
    await expect(page.getByRole("link", { name: /checkout|subscribe|buy now|start trial/i })).toHaveCount(0);
  }
});

test("Subscription checkout rejects unauthenticated requests", async ({ request }) => {
  const response = await request.post("/api/billing/checkout", {
    data: { plan_id: "pro-monthly-inr" },
  });
  expect(response.status()).toBe(401);
  await expect(response.json()).resolves.toMatchObject({
    error: "Sign in before starting a subscription.",
  });
});

test("Image Compressor creates a downloadable compressed image", async ({ page }) => {
  await page.goto("/tools/image-compressor");
  await expect(page.getByRole("heading", { name: "Image Compressor", exact: true })).toBeVisible();
  await page.locator("#image-file").setInputFiles({
    name: "pixel.png",
    mimeType: "image/png",
    buffer: onePixelPng,
  });
  await expect(page.getByText("pixel.png", { exact: true })).toBeVisible();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Compress Image", exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("kaamkitpro-compressed.jpg");
  await expect(page.getByText("Image compressed successfully.", { exact: true })).toBeVisible();
});


test("Image Brightness adjusts an uploaded image and downloads the result", async ({ page }) => {
  await page.goto("/tools/image-brightness");
  await page.locator("#brightness-file").setInputFiles({
    name: "pixel.png",
    mimeType: "image/png",
    buffer: onePixelPng,
  });
  await expect(page.getByText("pixel.png", { exact: true })).toBeVisible();
  await page.locator('input[type="range"]').fill("160");
  await expect(page.getByText("Brightness: 160%", { exact: true })).toBeVisible();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Adjust & Download", exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("kaamkitpro-brightness.jpg");
  await expect(page.getByText("Brightness adjusted successfully.", { exact: true })).toBeVisible();
});


test("Image Grayscale converts an uploaded image and downloads the result", async ({ page }) => {
  await page.goto("/tools/image-grayscale");
  await page.waitForTimeout(500); // File input events must run after client hydration.
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
  await expect(page.getByText("Grayscale image created successfully.", { exact: true })).toBeVisible();
});


test("Image Resizer applies custom dimensions and downloads the result", async ({ page }) => {
  await page.goto("/tools/image-resizer");
  await expect(page.getByRole("heading", { name: "Image Resizer", exact: true })).toBeVisible();
  await expect(page.locator("#resize-file")).toBeAttached();
  await page.waitForTimeout(500); // File input events must run after client hydration.
  await page.locator("#resize-file").setInputFiles({
    name: "pixel.png",
    mimeType: "image/png",
    buffer: onePixelPng,
  });
  await expect(page.getByText("pixel.png", { exact: true })).toBeVisible();
  await expect(page.locator('input[type="number"]').nth(0)).toHaveValue("1");
  await page.getByLabel("Keep aspect ratio").uncheck();
  await page.locator('input[type="number"]').nth(0).fill("2");
  await page.locator('input[type="number"]').nth(1).fill("3");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Resize Image", exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("kaamkitpro-resized.jpg");
  await expect(page.getByText("Image resized successfully.", { exact: true })).toBeVisible();
});


test("Image Cropper validates crop bounds and downloads the cropped image", async ({ page }) => {
  await page.goto("/tools/image-cropper");
  await page.locator("#crop-file").setInputFiles({
    name: "pixel.png",
    mimeType: "image/png",
    buffer: onePixelPng,
  });
  await expect(page.getByText("pixel.png", { exact: true })).toBeVisible();
  await expect(page.getByText("Original size: 1 × 1px", { exact: true })).toBeVisible();
  const numberInputs = page.locator('input[type="number"]');
  await expect(numberInputs).toHaveCount(4);
  await numberInputs.nth(2).fill("2");
  await page.getByRole("button", { name: "Crop Image", exact: true }).click();
  await expect(page.getByText("Crop area is outside the image boundaries.", { exact: true })).toBeVisible();
  await numberInputs.nth(2).fill("1");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Crop Image", exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("kaamkitpro-cropped.jpg");
  await expect(page.getByText("Image cropped successfully.", { exact: true })).toBeVisible();
});


test("Image Converter converts an uploaded image to WebP and downloads the result", async ({ page }) => {
  await page.goto("/tools/image-converter");
  await expect(page.getByRole("heading", { name: "Image Converter", exact: true })).toBeVisible();
  await page.locator("#convert-file").setInputFiles({
    name: "pixel.png",
    mimeType: "image/png",
    buffer: onePixelPng,
  });
  await expect(page.getByText("pixel.png", { exact: true })).toBeVisible();
  await page.locator("select").selectOption("image/webp");

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Convert Image", exact: true }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe("kaamkitpro-converted.webp");
  await expect(page.getByText("Image converted to WEBP successfully.", { exact: true })).toBeVisible();
});


test("Staging robots file blocks indexing", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.ok()).toBeTruthy();
  const body = await response.text();
  expect(body).toContain("Disallow: /");
});

test("Staging access API keeps advertising disabled for anonymous visitors", async ({ request }) => {
  const response = await request.get("/api/access");
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.user).toBeNull();
  expect(body.adsEnabled).toBe(false);
});


test("Admin access API rejects anonymous grant listing and mutations", async ({ request }) => {
  const listResponse = await request.get("/api/admin/access");
  expect(listResponse.status()).toBe(401);
  await expect(listResponse.json()).resolves.toMatchObject({ error: "Please sign in first." });

  const grantResponse = await request.post("/api/admin/access", {
    data: {
      email: "staging-test@example.com",
      access_type: "selected_tools",
      tool_keys: ["json-formatter"],
      reason: "testing",
      duration: "30",
    },
  });
  expect(grantResponse.status()).toBe(401);
  await expect(grantResponse.json()).resolves.toMatchObject({ error: "Please sign in first." });

  const revokeResponse = await request.patch("/api/admin/access", {
    data: { id: "00000000-0000-4000-8000-000000000000" },
  });
  expect(revokeResponse.status()).toBe(401);
  await expect(revokeResponse.json()).resolves.toMatchObject({ error: "Please sign in first." });
});

test("Admin access API rejects cross-origin grant mutations", async ({ request }) => {
  const response = await request.post("/api/admin/access", {
    headers: { origin: "https://attacker.invalid" },
    data: {
      email: "staging-test@example.com",
      access_type: "selected_tools",
      tool_keys: ["json-formatter"],
      reason: "testing",
      duration: "30",
    },
  });
  expect(response.status()).toBe(403);
  await expect(response.json()).resolves.toMatchObject({ error: "Invalid request origin." });
});


test("Anonymous access response grants temporary free-Pro access but keeps staging ads disabled", async ({ request }) => {
  const response = await request.get("/api/access");
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body).toMatchObject({
    user: null,
    plan: "free_pro_access",
    isPro: true,
    adsEnabled: false,
    selectedTools: [],
  });
});

test("Admin access API rejects cross-origin revoke requests before authentication", async ({ request }) => {
  const response = await request.patch("/api/admin/access", {
    headers: { origin: "https://attacker.invalid" },
    data: { id: "00000000-0000-4000-8000-000000000000" },
  });
  expect(response.status()).toBe(403);
  await expect(response.json()).resolves.toMatchObject({ error: "Invalid request origin." });
});

test("GST Calculator correctly adds and removes GST", async ({ page }) => {
  await page.goto("/tools/gst-calculator");
  await expect(page.getByRole("heading", { name: "GST Calculator", exact: true })).toBeVisible();

  await page.locator('input[type="number"]').fill("10000");
  await page.getByRole("button", { name: "Add GST", exact: true }).click();
  await expect(page.getByText("₹10000.00", { exact: true })).toBeVisible();
  await expect(page.getByText("₹1800.00", { exact: true })).toBeVisible();
  await expect(page.getByText("₹11800.00", { exact: true })).toBeVisible();

  await page.locator('input[type="number"]').fill("11800");
  await page.getByRole("button", { name: "Remove GST", exact: true }).click();
  await expect(page.getByText("₹10000.00", { exact: true })).toBeVisible();
  await expect(page.getByText("₹1800.00", { exact: true })).toBeVisible();
  await expect(page.getByText("₹11800.00", { exact: true })).toBeVisible();
});

test("BMI Calculator updates BMI and category from entered measurements", async ({ page }) => {
  await page.goto("/tools/bmi-calculator");
  await expect(page.getByRole("heading", { name: "BMI Calculator", exact: true })).toBeVisible();
  const fields = page.locator('input[type="number"]');
  await fields.nth(0).fill("70");
  await fields.nth(1).fill("175");
  await expect(page.getByText("22.9", { exact: true })).toBeVisible();
  await expect(page.getByText("Normal", { exact: true }).first()).toBeVisible();
});


test("Age Calculator shows years, months, and days after a birth date is entered", async ({ page }) => {
  await page.goto("/tools/age-calculator");
  await expect(page.getByRole("heading", { name: "Age Calculator", exact: true })).toBeVisible();
  await page.getByLabel("Date of Birth").fill("2000-01-01");
  await page.getByRole("button", { name: "Calculate Age", exact: true }).click();
  await expect(page.getByText("Years", { exact: true })).toBeVisible();
  await expect(page.getByText("Months", { exact: true })).toBeVisible();
  await expect(page.getByText("Days", { exact: true })).toBeVisible();
  await expect(page.locator("main").getByText("26", { exact: true })).toBeVisible();
});


test("Age Calculator does not display an age for a future birth date", async ({ page }) => {
  await page.goto("/tools/age-calculator");
  await page.getByLabel("Date of Birth").fill("2099-01-01");
  await page.getByRole("button", { name: "Calculate Age", exact: true }).click();
  await expect(page.getByText("Enter your date of birth to calculate your age.", { exact: true })).toBeVisible();
  await expect(page.getByText("Years", { exact: true })).toHaveCount(0);
});



test("BMI Calculator keeps the result empty for zero or missing measurements", async ({ page }) => {
  await page.goto("/tools/bmi-calculator");
  await expect(page.getByRole("heading", { name: "BMI Calculator", exact: true })).toBeVisible();
  await expect(page.getByText("—", { exact: true })).toBeVisible();
  await expect(page.getByText("Enter valid height and weight", { exact: true })).toBeVisible();
  const fields = page.locator('input[type="number"]');
  await fields.nth(0).fill("70");
  await fields.nth(1).fill("0");
  await expect(page.getByText("—", { exact: true })).toBeVisible();
  await expect(page.getByText("Enter valid height and weight", { exact: true })).toBeVisible();
});


test("BMI Calculator updates each weight category when measurements change", async ({ page }) => {
  await page.goto("/tools/bmi-calculator");
  const fields = page.locator('input[type="number"]');
  await fields.nth(0).fill("70");

  await fields.nth(1).fill("200");
  await expect(page.getByText("Underweight", { exact: true }).first()).toBeVisible();

  await fields.nth(1).fill("175");
  await expect(page.getByText("Normal", { exact: true }).first()).toBeVisible();

  await fields.nth(1).fill("160");
  await expect(page.getByText("Overweight", { exact: true }).first()).toBeVisible();

  await fields.nth(1).fill("150");
  await expect(page.getByText("Obesity", { exact: true }).first()).toBeVisible();
});



test("Age Calculator returns zero years, months, and days for today's birth date", async ({ page }) => {
  await page.goto("/tools/age-calculator");
  await page.waitForTimeout(500); // Wait for client hydration before entering the date.
  const today = await page.evaluate(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });
  await page.getByLabel("Date of Birth").fill(today);
  await page.getByRole("button", { name: "Calculate Age", exact: true }).click();
  // Select the result grid by its content instead of assuming it is the last grid
  // in the page (navigation/footer layout may add other grids).
  await expect(page.locator("main").getByText("Years", { exact: true })).toBeVisible();
  await expect(page.locator("main").getByText("Months", { exact: true })).toBeVisible();
  await expect(page.locator("main").getByText("Days", { exact: true })).toBeVisible();
  await expect(page.locator("main").getByText("0", { exact: true })).toHaveCount(3);
});


test("GST Calculator calculates each supported GST rate", async ({ page }) => {
  await page.goto("/tools/gst-calculator");
  await expect(page.getByRole("heading", { name: "GST Calculator", exact: true })).toBeVisible();

  const amount = page.locator('input[type="number"]');
  const rate = page.locator("select");
  await amount.fill("1000");

  for (const [gstRate, tax, total] of [
    ["5", "₹50.00", "₹1050.00"],
    ["12", "₹120.00", "₹1120.00"],
    ["18", "₹180.00", "₹1180.00"],
    ["28", "₹280.00", "₹1280.00"],
  ]) {
    await rate.selectOption(gstRate);
    await expect(page.getByText(tax, { exact: true })).toBeVisible();
    await expect(page.getByText(total, { exact: true })).toBeVisible();
  }
});

test("GST Calculator handles a zero amount without producing invalid values", async ({ page }) => {
  await page.goto("/tools/gst-calculator");
  await page.locator('input[type="number"]').fill("0");
  await page.getByRole("button", { name: "Add GST", exact: true }).click();

  await expect(page.getByText("₹0.00", { exact: true })).toHaveCount(3);
  await expect(page.getByText(/NaN|Infinity/)).toHaveCount(0);
});




test("GST Calculator shows unavailable results until a valid amount is entered", async ({ page }) => {
  await page.goto("/tools/gst-calculator");
  await page.waitForTimeout(500); // Wait for client hydration before entering the amount.
  await expect(page.getByText("₹—", { exact: true })).toHaveCount(3);
  await page.locator('input[type="number"]').fill("1000");
  await expect(page.getByText("₹1180.00", { exact: true })).toBeVisible();
});


test("SIP Calculator handles a zero-return estimate without adding gains", async ({ page }) => {
  await page.goto("/tools/sip-calculator");
  const fields = page.locator('input[type="number"]');
  await fields.nth(0).fill("5000");
  await fields.nth(1).fill("0");
  await fields.nth(2).fill("1");
  await expect(page.getByText("₹60,000", { exact: true })).toHaveCount(2);
  await expect(page.getByText("₹0", { exact: true })).toBeVisible();
});


test("Vendor Quotation Comparison excludes incomplete quotes from lowest-total ranking", async ({ page }) => {
  await page.goto("/tools/vendor-quotation-comparison");
  await expect(page.getByText("Lowest total", { exact: true })).toHaveCount(1);

  await page.getByLabel("Vendor B unit rate").fill("");
  const vendorBCard = page.getByRole("heading", { name: "Vendor B" }).locator("..").locator("..");

  await expect(vendorBCard.getByText("Incomplete quote", { exact: true })).toBeVisible();
  await expect(vendorBCard).toContainText("excluded from lowest-total ranking");
  await expect(page.getByText("Lowest total", { exact: true })).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "Vendor A" }).locator("..").locator("..")).toContainText("Lowest total");
});


test("Item Mapping loads a CSV master, matches items and exports results", async ({ page }) => {
  await page.goto("/tools/item-master-matcher");
  await expect(page.getByRole("heading", { name: "Item Mapping" })).toBeVisible();
  // The import control stays disabled until the signed-in or guest workspace is initialized.
  await expect(page.getByLabel("Item master file")).toBeEnabled();
  await page.getByLabel("Item master file").setInputFiles({
    name: "item-master.csv",
    mimeType: "text/csv",
    buffer: Buffer.from("Item No,Item Id,Item Name,Category,Unit Name\n1001,MED001,PARACETAMOL 500 MG TABLET,Medicine,TABLET\n1002,MED002,AMOXICILLIN 250 MG CAPSULE,Medicine,CAPSULE"),
  });
  await expect(page.getByText(/2 items loaded in this temporary guest session — not saved/)).toBeVisible();

  await page.getByLabel("Single item name").fill("PARACETAMOL 500MG TABLET");
  await page.getByRole("button", { name: "Check item" }).click();
  await expect(page.getByText("PARACETAMOL 500 MG TABLET")).toBeVisible();

  await page.getByLabel("Bulk item names").fill("PARACETAMOL 500 MG TABLET\nUNKNOWN SURGICAL ITEM");
  await page.getByRole("button", { name: "Run bulk check" }).click();
  await expect(page.getByRole("heading", { name: "4. Match results" })).toBeVisible();
  await expect(page.getByText("NEW ITEM", { exact: true })).toBeVisible();

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download Excel results" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("KaamKitPro_Item_Match_Result.xlsx");

  // Signed-out guest workspaces are page-session only and must not survive a reload.
  await page.reload();
  await expect(page.getByText("0 master items ready", { exact: true })).toBeVisible();
});


test("Excel Merge combines CSV files by header and downloads an Excel workbook", async ({ page }) => {
  await page.goto("/tools/excel-combiner");
  await expect(page.getByRole("heading", { name: "Excel Merge", exact: true })).toBeVisible();
  await expect(page.locator("main").getByText(/Excel engine ready\./)).toBeVisible();

  await page.getByLabel("Select Excel and CSV files").setInputFiles([
    {
      name: "vendor-a.csv",
      mimeType: "text/csv",
      buffer: Buffer.from("Item Name,Quantity\nParacetamol,10\nGrand Total,10"),
    },
    {
      name: "vendor-b.csv",
      mimeType: "text/csv",
      buffer: Buffer.from("Quantity,Item Name\n20,Amoxicillin"),
    },
  ]);

  await expect(page.getByText("vendor-a.csv · 1 sheet(s)", { exact: true })).toBeVisible();
  await expect(page.getByText("vendor-b.csv · 1 sheet(s)", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Combine files", exact: true }).click();

  await expect(page.getByText("Combined 2 file(s) into 2 row(s). 1 total row(s) removed.", { exact: true })).toBeVisible();
  await expect(page.getByRole("cell", { name: "Paracetamol", exact: true })).toBeVisible();
  await expect(page.getByRole("cell", { name: "Amoxicillin", exact: true })).toBeVisible();

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download Excel", exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("KaamKitPro_Combined.xlsx");
});


test("PDF converters do not create empty files for scanned PDFs without selectable text", async ({ page }) => {
  const document = await PDFDocument.create();
  document.addPage([300, 200]);
  const blankPdf = Buffer.from(await document.save());

  for (const route of ["/tools/pdf-to-excel", "/tools/pdf-to-word"]) {
    await page.goto(route);
    await page.locator("#converter-file").setInputFiles({
      name: "scanned.pdf",
      mimeType: "application/pdf",
      buffer: blankPdf,
    });
    const downloadPromise = page.waitForEvent("download", { timeout: 2000 }).catch(() => null);
    await page.getByRole("button", { name: route.endsWith("excel") ? "Convert to Excel" : "Convert to Word" }).click();
    await expect(page.getByRole("status")).toContainText("No selectable text was found");
    await expect(page.getByRole("status")).toContainText("No output file was created");
    expect(await downloadPromise).toBeNull();
  }
});