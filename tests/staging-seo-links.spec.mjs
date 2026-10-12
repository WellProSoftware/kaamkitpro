import { expect, test } from "@playwright/test";

test("homepage internal links lead to reachable staging routes", async ({ page, request }) => {
  await page.goto("/");
  const hrefs = await page.locator('a[href^="/"]').evaluateAll(anchors =>
    [...new Set(anchors.map(anchor => anchor.getAttribute("href")).filter(Boolean))]
      .filter(href => href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/#") && !href.includes("?"))
  );

  const checked = new Set();
  const failures = [];
  for (const href of hrefs) {
    if (checked.has(href) || href === "/login" || href === "/account" || href === "/admin/access" || href.startsWith("/auth/")) continue;
    checked.add(href);
    try {
      const response = await request.get(href, { maxRedirects: 5 });
      if (response.status() >= 400) failures.push(`${href} returned HTTP ${response.status()}`);
    } catch (error) {
      failures.push(`${href} request failed: ${String(error)}`);
    }
  }

  expect(failures, failures.join("\n")).toEqual([]);
});

test("public SEO pages expose canonical URLs and staging noindex", async ({ page }) => {
  for (const path of ["/", "/tools", "/pricing", "/about", "/contact", "/privacy-policy", "/terms", "/advertise"]) {
    await page.goto(path);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/i);
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical, `canonical tag for ${path}`).toHaveCount(1);
    const href = await canonical.getAttribute("href");
    expect(href, `canonical for ${path}`).toMatch(/^https:\/\/kaamkitpro\.com(?:\/.*)?$/);
  }
});
