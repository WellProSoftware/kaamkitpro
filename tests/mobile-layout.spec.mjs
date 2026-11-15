import { expect, test } from "@playwright/test";

const mobileRoutes = [
  "/",
  "/tools",
  "/tools/pdf-merge",
  "/tools/image-rotate",
  "/tools/gst-calculator",
  "/login",
  "/pricing",
];

for (const viewport of [
  { width: 390, height: 844, label: "standard mobile" },
  { width: 320, height: 740, label: "narrow mobile" },
]) {
  test.describe(`mobile layout: ${viewport.label}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of mobileRoutes) {
      test(`${route} fits the viewport without page-level horizontal overflow`, async ({ page }) => {
        const response = await page.goto(route);
        expect(response?.status(), route).toBe(200);
        await expect(page.locator("meta[name='viewport']")).toHaveAttribute("content", /width=device-width/);
        await expect.poll(() => page.evaluate(() => ({
          viewport: document.documentElement.clientWidth,
          document: document.documentElement.scrollWidth,
          body: document.body.scrollWidth,
        }))).toMatchObject({
          viewport: viewport.width,
          document: expect.any(Number),
          body: expect.any(Number),
        });
        const dimensions = await page.evaluate(() => ({
          viewport: document.documentElement.clientWidth,
          document: document.documentElement.scrollWidth,
          body: document.body.scrollWidth,
        }));
        expect(dimensions.document, `${route} document width: ${JSON.stringify(dimensions)}`).toBeLessThanOrEqual(dimensions.viewport + 1);
        expect(dimensions.body, `${route} body width: ${JSON.stringify(dimensions)}`).toBeLessThanOrEqual(dimensions.viewport + 1);
      });
    }
  });
}
