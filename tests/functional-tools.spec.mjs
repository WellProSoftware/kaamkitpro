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


test("OG Preview Generator escapes special characters in generated meta attributes", async ({ page }) => {
  await page.goto("/tools/og-preview-generator");
  await expect(page.getByRole("heading", { name: "OG Preview Generator", exact: true })).toBeVisible();

  await page.getByPlaceholder("Page title").fill('Title "quoted" & <b>bold</b> \'single\'');
  await page.getByPlaceholder("Page description").fill('Description "quoted" & <script>alert(1)</script> \'single\'');
  await page.getByPlaceholder("https://example.com").fill('https://example.com/?a=1&b="two"');
  await page.getByPlaceholder("Image URL (optional)").fill('https://example.com/image.png?x=1&y="two"');

  const generatedTags = await page.locator("pre").innerText();
  expect(generatedTags).toContain('Title &quot;quoted&quot; &amp; &lt;b&gt;bold&lt;/b&gt; &#39;single&#39;');
  expect(generatedTags).toContain('Description &quot;quoted&quot; &amp; &lt;script&gt;alert(1)&lt;/script&gt; &#39;single&#39;');
  expect(generatedTags).toContain('https://example.com/?a=1&amp;b=&quot;two&quot;');
  expect(generatedTags).toContain('https://example.com/image.png?x=1&amp;y=&quot;two&quot;');
  expect(generatedTags).not.toContain('<script>alert(1)</script>');
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

test("Homepage category filter shows matching tools", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Calculators", exact: true }).last().click();

  await expect(page.getByRole("heading", { name: "Calculators", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Percentage Calculator", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "PDF Merge", exact: true })).toHaveCount(0);
});


test("Line Sorter sorts naturally and ignores case when selected", async ({ page }) => {
  await page.goto("/tools/line-sorter");
  await expect(page.getByRole("heading", { name: "Online Line Sorter" })).toBeVisible();
  await page.locator("#line-input").fill("Item 10\nitem 2\nApple");
  await expect(page.locator("#line-output")).toHaveValue("Apple\nitem 2\nItem 10");
});

test("Duplicate Line Remover preserves first occurrence", async ({ page }) => {
  await page.goto("/tools/remove-duplicate-lines");
  await page.locator("#duplicate-input").fill("apple\nbanana\napple");
  await expect(page.locator("#duplicate-output")).toHaveValue("apple\nbanana");
  await expect(page.getByText("2 kept · 1 removed")).toBeVisible();
});

test("CSV to JSON converts quoted fields and commas", async ({ page }) => {
  await page.goto("/tools/csv-to-json");
  await page.locator("#csv-input").fill('name,city,note\nAsha,Mumbai,"Likes tea, coffee"');
  await expect(page.locator("#json-output")).toHaveValue(JSON.stringify([{ name: "Asha", city: "Mumbai", note: "Likes tea, coffee" }], null, 2));
});

test("JSON to CSV converts object arrays and escapes commas", async ({ page }) => {
  await page.goto("/tools/json-to-csv");
  await expect(page.getByRole("heading", { name: "JSON to CSV Converter" })).toBeVisible();
  await page.locator("#json-csv-input").fill('[{"name":"Asha","note":"Tea, coffee"},{"name":"Sam","note":"Hello"}]');
  await expect(page.locator("#csv-output")).toHaveValue('name,note\nAsha,"Tea, coffee"\nSam,Hello');
});

test("Text Diff Checker reports added and removed lines", async ({ page }) => {
  await page.goto("/tools/text-diff-checker");
  await expect(page.getByRole("heading", { name: "Text Diff Checker" })).toBeVisible();
  await page.locator("#diff-before").fill("alpha\nbeta");
  await page.locator("#diff-after").fill("alpha\ngamma");
  await expect(page.getByText("+ 1 added")).toBeVisible();
  await expect(page.getByText("− 1 removed")).toBeVisible();
  await expect(page.locator("pre")).toContainText("+ gamma");
  await expect(page.locator("pre")).toContainText("− beta");
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


test("CSV to JSON guide is discoverable and included once in the sitemap", async ({ page }) => {
  test.skip(process.env.KAAMKITPRO_STAGING === "true", "Production sitemap assertions do not apply to staging.");
  await page.goto("/guides/csv-to-json");
  await expect(page.getByRole("heading", { name: "How to Convert CSV to JSON Online for Free", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open Free CSV to JSON Converter" })).toHaveAttribute("href", "/tools/csv-to-json");

  const sitemapResponse = await page.request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBeTruthy();
  const sitemap = await sitemapResponse.text();
  expect(sitemap.match(/https:\/\/kaamkitpro\.com\/guides\/csv-to-json/g)).toHaveLength(1);
});


test("JSON to CSV guide is discoverable and included once in the sitemap", async ({ page }) => {
  test.skip(process.env.KAAMKITPRO_STAGING === "true", "Production sitemap assertions do not apply to staging.");
  await page.goto("/guides/json-to-csv");
  await expect(page.getByRole("heading", { name: "How to Convert JSON to CSV Online for Free", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open Free JSON to CSV Converter" })).toHaveAttribute("href", "/tools/json-to-csv");

  const sitemapResponse = await page.request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBeTruthy();
  const sitemap = await sitemapResponse.text();
  expect(sitemap.match(/https:\/\/kaamkitpro\.com\/guides\/json-to-csv/g)).toHaveLength(1);
});


test("Line sorter guide is discoverable and included once in the sitemap", async ({ page }) => {
  test.skip(process.env.KAAMKITPRO_STAGING === "true", "Production sitemap assertions do not apply to staging.");
  await page.goto("/guides/line-sorter");
  await expect(page.getByRole("heading", { name: "How to Sort Lines of Text Online for Free", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open Free Line Sorter" })).toHaveAttribute("href", "/tools/line-sorter");
  await expect(page.getByRole("link", { name: "Duplicate Line Remover" })).toHaveAttribute("href", "/tools/remove-duplicate-lines");

  const sitemapResponse = await page.request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBeTruthy();
  const sitemap = await sitemapResponse.text();
  expect(sitemap.match(/https:\/\/kaamkitpro\.com\/guides\/line-sorter/g)).toHaveLength(1);
});


test("Text diff guide is discoverable and included once in the sitemap", async ({ page }) => {
  test.skip(process.env.KAAMKITPRO_STAGING === "true", "Production sitemap assertions do not apply to staging.");
  await page.goto("/guides/text-diff-checker");
  await expect(page.getByRole("heading", { name: "How to Compare Two Texts Online for Free", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open Free Text Diff Checker" })).toHaveAttribute("href", "/tools/text-diff-checker");
  await expect(page.getByRole("link", { name: "Free Line Sorter" })).toHaveAttribute("href", "/tools/line-sorter");

  const sitemapResponse = await page.request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBeTruthy();
  const sitemap = await sitemapResponse.text();
  expect(sitemap.match(/https:\/\/kaamkitpro\.com\/guides\/text-diff-checker/g)).toHaveLength(1);
});


test("Word counter guide is discoverable and included once in the sitemap", async ({ page }) => {
  test.skip(process.env.KAAMKITPRO_STAGING === "true", "Production sitemap assertions do not apply to staging.");
  await page.goto("/guides/word-counter");
  await expect(page.getByRole("heading", { name: "How to Count Words and Characters Online", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open Free Word Counter" })).toHaveAttribute("href", "/tools/word-counter");

  const sitemapResponse = await page.request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBeTruthy();
  expect((await sitemapResponse.text()).match(/https:\/\/kaamkitpro\.com\/guides\/word-counter/g)).toHaveLength(1);
});

test("Slug generator guide is discoverable and included once in the sitemap", async ({ page }) => {
  test.skip(process.env.KAAMKITPRO_STAGING === "true", "Production sitemap assertions do not apply to staging.");
  await page.goto("/guides/slug-generator");
  await expect(page.getByRole("heading", { name: "How to Create an SEO-Friendly URL Slug", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open Free Slug Generator" })).toHaveAttribute("href", "/tools/slug-generator");

  const sitemapResponse = await page.request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBeTruthy();
  expect((await sitemapResponse.text()).match(/https:\/\/kaamkitpro\.com\/guides\/slug-generator/g)).toHaveLength(1);
});

test("Duplicate-line guide is discoverable and included once in the sitemap", async ({ page }) => {
  test.skip(process.env.KAAMKITPRO_STAGING === "true", "Production sitemap assertions do not apply to staging.");
  await page.goto("/guides/remove-duplicate-lines");
  await expect(page.getByRole("heading", { name: "How to Remove Duplicate Lines from a List", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open Free Duplicate Line Remover" })).toHaveAttribute("href", "/tools/remove-duplicate-lines");

  const sitemapResponse = await page.request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBeTruthy();
  expect((await sitemapResponse.text()).match(/https:\/\/kaamkitpro\.com\/guides\/remove-duplicate-lines/g)).toHaveLength(1);
});


test("Pricing page keeps tools free, checkout inactive, and sign-in available", async ({ page }) => {
  await page.goto("/pricing");
  await expect(page.getByRole("heading", { name: "Useful tools. Free to use." })).toBeVisible();
  await expect(page.getByText("All currently available tools are free; no paid subscription is required.", { exact: false })).toBeVisible();
  await expect(page.getByText("Paid plans and checkout are not available and no payment is being collected.", { exact: false })).toBeVisible();
  await expect(page.getByRole("link", { name: "Sign in", exact: true })).toHaveAttribute("href", "/login");
  await expect(page.getByRole("link", { name: /checkout|subscribe|buy now|start trial/i })).toHaveCount(0);
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

test("Word Counter counts paragraphs by blank-line separation", async ({ page }) => {
  await page.goto("/tools/word-counter");
  await expect(page.getByRole("heading", { name: "Word Counter", exact: true })).toBeVisible();

  const editor = page.locator("textarea").first();
  const countFor = (count) =>
    page.getByText("Paragraphs", { exact: true })
      .locator("xpath=..")
      .getByText(String(count), { exact: true });

  await editor.fill("First line\ncontinued in the same paragraph\n\nSecond paragraph");
  await expect(countFor(2)).toBeVisible();

  await editor.fill("One paragraph only");
  await expect(countFor(1)).toBeVisible();

  await editor.fill("");
  await expect(countFor(0)).toBeVisible();
});

test("tool pages publish page-specific canonical URLs", async ({ page }) => {
  const paths = [
    "/tools",
    "/tools/word-counter",
    "/tools/json-formatter",
    "/tools/qr-code-generator",
    "/tools/image-compressor",
    "/tools/pdf-merge",
    "/tools/image-brightness",
    "/tools/image-flip",
    "/tools/image-grayscale",
    "/tools/image-rotate",
    "/tools/line-sorter",
    "/tools/remove-duplicate-lines",
    "/tools/csv-to-json",
    "/tools/json-to-csv",
    "/tools/text-diff-checker",
  ];

  for (const path of paths) {
    await page.goto(path);
    await expect(page.locator('link[rel="canonical"]'), path).toHaveAttribute(
      "href",
      `https://kaamkitpro.com${path}`,
    );
  }
});

test("QR Code Generator creates a downloadable QR code for entered text", async ({ page }) => {
  await page.goto("/tools/qr-code-generator");
  await expect(page.getByRole("heading", { name: "QR Code Generator", exact: true })).toBeVisible();
  const input = page.locator("#qr-text");
  await expect(page.getByRole("button", { name: "Download QR Code" })).toBeDisabled();
  await input.fill("https://example.com/kaamkitpro-test");
  await expect(page.getByText("Your QR code is ready")).toBeVisible();
  await expect(page.locator("#qr-code")).toBeVisible();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download QR Code" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("kaamkitpro-qr-code.png");
});

test("Slug Generator converts a title into a clean URL slug", async ({ page }) => {
  await page.goto("/tools/slug-generator");
  await expect(page.getByRole("heading", { name: "Slug Generator", exact: true })).toBeVisible();
  await page.getByPlaceholder("Example: Best Free Online Tools for Students").fill("  Crème & Coffee — Best Online Tools!  ");
  await page.getByRole("button", { name: "Generate Slug" }).click();
  await expect(page.getByText("creme-coffee-best-online-tools", { exact: true })).toBeVisible();
});


test("JSON Formatter minifies valid JSON without changing its data", async ({ page }) => {
  await page.goto("/tools/json-formatter");
  await page.getByPlaceholder('{"name":"KaamKitPro","tools":10}').fill(`{
  "name": "KaamKitPro",
  "tools": 10
}`);
  await page.getByRole("button", { name: "Minify", exact: true }).click();
  await expect(page.locator("div.whitespace-pre-wrap")).toContainText('{"name":"KaamKitPro","tools":10}');
});

test("JSON Formatter gives a clear message for empty input", async ({ page }) => {
  await page.goto("/tools/json-formatter");
  await page.getByRole("button", { name: "Format", exact: true }).click();
  await expect(page.getByText("Please enter some JSON first.", { exact: true })).toBeVisible();
});

test("Slug Generator normalizes repeated spaces and punctuation", async ({ page }) => {
  await page.goto("/tools/slug-generator");
  await page.getByPlaceholder("Example: Best Free Online Tools for Students").fill("  Hello---World !!!  SEO   Tools  ");
  await page.getByRole("button", { name: "Generate Slug" }).click();
  await expect(page.getByText("hello-world-seo-tools", { exact: true })).toBeVisible();
});


test("Text Diff Checker updates added and removed line counts", async ({ page }) => {
  await page.goto("/tools/text-diff-checker");
  await expect(page.getByRole("heading", { name: "Text Diff Checker", exact: true })).toBeVisible();
  await page.locator("#diff-before").fill("alpha\nbeta");
  await page.locator("#diff-after").fill("alpha\ngamma");
  await expect(page.getByText("+ 1 added", { exact: true })).toBeVisible();
  await expect(page.getByText("− 1 removed", { exact: true })).toBeVisible();
  await expect(page.locator("pre")).toContainText("+ gamma");
  await expect(page.locator("pre")).toContainText("− beta");
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


test("CSV to JSON handles commas inside quoted fields", async ({ page }) => {
  await page.goto("/tools/csv-to-json");
  await page.locator("#csv-input").fill('name,city,note\nAsha,Mumbai,"Likes tea, coffee"');
  await expect(page.locator("#json-output")).toContainText('"note": "Likes tea, coffee"');
  await expect(page.getByRole("alert")).toHaveCount(0);
});

test("CSV to JSON reports unclosed quoted fields", async ({ page }) => {
  await page.goto("/tools/csv-to-json");
  await page.locator("#csv-input").fill('name,note\nAsha,"not closed');
  await expect(page.getByRole("alert")).toContainText("CSV has an unclosed quoted field.");
});

test("JSON to CSV escapes commas and quotes and rejects invalid shape", async ({ page }) => {
  await page.goto("/tools/json-to-csv");
  await page.locator("#json-csv-input").fill('[{"name":"Asha","note":"tea, \\"coffee\\""}]');
  await expect(page.locator("#csv-output")).toContainText('"tea, ""coffee"""');
  await page.locator("#json-csv-input").fill('{"name":"Asha"}');
  await expect(page.getByRole("alert")).toContainText("JSON must be an array of objects or arrays.");
});


test("Line Sorter sorts numeric labels naturally and can remove blank lines", async ({ page }) => {
  await page.goto("/tools/line-sorter");
  await expect(page.getByRole("heading", { name: "Online Line Sorter" })).toBeVisible();
  await page.locator("#line-input").fill("Item 10\nItem 2\nApple\n");
  await page.getByLabel("Remove blank lines").check();
  await expect(page.locator("#line-output")).toHaveValue("Apple\nItem 2\nItem 10");
});

test("Remove Duplicate Lines keeps first occurrence and supports case-insensitive matching", async ({ page }) => {
  await page.goto("/tools/remove-duplicate-lines");
  await page.locator("#duplicate-input").fill("Apple\napple\nBanana\nApple");
  await page.getByLabel("Treat uppercase/lowercase as same").check();
  await expect(page.locator("#duplicate-output")).toHaveValue("Apple\nBanana");
  await expect(page.getByText("2 kept · 2 removed", { exact: true })).toBeVisible();
});


test("Remove Extra Spaces collapses repeated spaces and preserves words and line breaks", async ({ page }) => {
  await page.goto("/tools/remove-extra-spaces");
  await page.locator("textarea").fill("  Hello   world  \n\n  Keep\tthese   words  ");
  await page.getByRole("button", { name: "Remove Extra Spaces", exact: true }).click();
  await expect(page.locator("div.whitespace-pre-wrap")).toContainText("Hello world\n\nKeep these words");
  await expect(page.getByText("Cleaned Words", { exact: true }).locator("xpath=..")).toContainText("5");
});

test("Case Converter reports line count instead of character count", async ({ page }) => {
  await page.goto("/tools/case-converter");
  await page.getByPlaceholder("Type or paste your text here...").fill("Hello\nworld");
  const stats = page.getByText("Lines", { exact: true }).locator("xpath=..");
  await expect(stats).toContainText("2");
  await page.getByRole("button", { name: "UPPERCASE", exact: true }).click();
  await expect(page.locator("textarea")).toHaveValue("HELLO\nWORLD");
  await expect(stats).toContainText("2");
});

test("Base64 encoder and decoder preserve Hindi and emoji text", async ({ page }) => {
  await page.goto("/tools/base64");
  const input = page.getByPlaceholder("Enter text here...");
  await input.fill("नमस्ते KaamKitPro 🌟");
  await page.getByRole("button", { name: "Encode to Base64", exact: true }).click();
  const encoded = await page.locator("div.whitespace-pre-wrap.break-words").innerText();
  expect(encoded).toBe(Buffer.from("नमस्ते KaamKitPro 🌟", "utf8").toString("base64"));
  await input.fill(encoded);
  await page.getByRole("button", { name: "Decode from Base64", exact: true }).click();
  await expect(page.locator("div.whitespace-pre-wrap.break-words")).toContainText("नमस्ते KaamKitPro 🌟");
});

test("Base64 decoder reports malformed input", async ({ page }) => {
  await page.goto("/tools/base64");
  await page.getByPlaceholder("Enter text here...").fill("%%%not-base64%%%");
  await page.getByRole("button", { name: "Decode from Base64", exact: true }).click();
  await expect(page.getByText("Invalid Base64 input.", { exact: true })).toBeVisible();
});


test("URL Encoder and Decoder preserve reserved and Unicode characters", async ({ page }) => {
  await page.goto("/tools/url-encoder-decoder");
  const input = page.getByPlaceholder("Enter text or encoded URL...");
  const original = "hello world & नमस्ते/KaamKitPro?";
  await input.fill(original);
  await page.getByRole("button", { name: "Encode URL", exact: true }).click();
  const output = page.locator("textarea[readonly]");
  await expect(output).toHaveValue(encodeURIComponent(original));
  await page.getByRole("button", { name: "URL Decode", exact: true }).click();
  await input.fill(encodeURIComponent(original));
  await page.getByRole("button", { name: "Decode URL", exact: true }).click();
  await expect(output).toHaveValue(original);
  await input.fill("%E0%A4%A");
  await page.getByRole("button", { name: "Decode URL", exact: true }).click();
  await expect(page.getByText("Invalid URL encoded text.", { exact: true })).toBeVisible();
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
