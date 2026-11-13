import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/pricing",
  "/tools",
  "/tools/pdf-merge",
  "/tools/image-rotate",
  "/tools/gst-calculator",
  "/about",
  "/contact",
  "/disclaimer",
  "/login",
];

const viewports = [
  { name: "small mobile", width: 360, height: 800 },
  { name: "standard mobile", width: 390, height: 844 },
  { name: "tablet portrait", width: 768, height: 1024 },
];

test("key staging pages remain usable without horizontal page overflow on mobile and tablet", async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const route of routes) {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.status(), `${viewport.name}: ${route} should load`).toBe(200);
      await expect(page.locator("body")).toBeVisible();

      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        document: document.documentElement.scrollWidth,
        body: document.body.scrollWidth,
      }));

      expect(
        dimensions.document,
        `${viewport.name}: ${route} has horizontal document overflow (${JSON.stringify(dimensions)})`,
      ).toBeLessThanOrEqual(dimensions.viewport + 1);
      expect(
        dimensions.body,
        `${viewport.name}: ${route} has horizontal body overflow (${JSON.stringify(dimensions)})`,
      ).toBeLessThanOrEqual(dimensions.viewport + 1);
    }
  }
});
