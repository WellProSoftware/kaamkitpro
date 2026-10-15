import { expect, test } from "@playwright/test";

const CONSENT_KEY = "kk_privacy_consent_v1";

async function stubAccess(page, adsEnabled) {
  await page.route("**/api/access", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ user: null, plan: adsEnabled ? "free" : "pro", isPro: !adsEnabled, adsEnabled, selectedTools: [] }),
    });
  });
}

test.describe("AdSense consent and entitlement regression", () => {
  test("essential-only consent never loads AdSense", async ({ page }) => {
    await page.addInitScript(({ key }) => localStorage.setItem(key, "essential"), { key: CONSENT_KEY });
    await stubAccess(page, true);
    await page.goto("/");
    await expect(page.locator("#google-adsense")).toHaveCount(0);
  });

  test("accepted consent loads AdSense only when access API enables ads", async ({ page }) => {
    await page.addInitScript(({ key }) => localStorage.setItem(key, "accepted"), { key: CONSENT_KEY });
    await stubAccess(page, true);
    await page.route("https://pagead2.googlesyndication.com/**", (route) => route.abort());
    await page.goto("/");
    await expect(page.locator("#google-adsense")).toHaveAttribute(
      "src",
      /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/,
    );
  });

  test("Pro entitlement keeps AdSense disabled even when consent is accepted", async ({ page }) => {
    await page.addInitScript(({ key }) => localStorage.setItem(key, "accepted"), { key: CONSENT_KEY });
    await stubAccess(page, false);
    await page.goto("/");
    await expect(page.locator("#google-adsense")).toHaveCount(0);
  });

  test("access change removes previously loaded AdSense when entitlement changes to Pro", async ({ page }) => {
    await page.addInitScript(({ key }) => localStorage.setItem(key, "accepted"), { key: CONSENT_KEY });
    let adsEnabled = true;
    await page.route("**/api/access", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ user: null, plan: adsEnabled ? "free" : "pro", isPro: !adsEnabled, adsEnabled, selectedTools: [] }),
      });
    });
    await page.route("https://pagead2.googlesyndication.com/**", (route) => route.abort());
    await page.goto("/");
    await expect(page.locator("#google-adsense")).toHaveCount(1);
    adsEnabled = false;
    await page.evaluate(() => window.dispatchEvent(new Event("kaamkitpro:access-changed")));
    await expect(page.locator("#google-adsense")).toHaveCount(0);
  });
});
