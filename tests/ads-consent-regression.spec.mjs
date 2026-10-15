import { expect, test } from "@playwright/test";

const CONSENT_KEY = "kk_privacy_consent_v1";

async function stubAccess(page, adsEnabled, status = 200) {
  await page.route("**/api/access", async (route) => {
    await route.fulfill({
      status,
      contentType: "application/json",
      body: JSON.stringify({ user: null, plan: adsEnabled ? "free" : "pro", isPro: !adsEnabled, adsEnabled, selectedTools: [] }),
    });
  });
}

test.describe("AdSense consent and entitlement regression", () => {
  test("ads remain disabled when no consent choice has been saved", async ({ page }) => {
    await stubAccess(page, true);
    await page.goto("/");
    await expect(page.locator("#google-adsense")).toHaveCount(0);
  });

  test("essential-only consent never loads AdSense", async ({ page }) => {
    await page.addInitScript(({ key }) => localStorage.setItem(key, "essential"), { key: CONSENT_KEY });
    await stubAccess(page, true);
    await page.goto("/");
    await expect(page.locator("#google-adsense")).toHaveCount(0);
  });

  test("privacy dialog Essential only choice persists and keeps ads disabled", async ({ page }) => {
    await stubAccess(page, true);
    await page.goto("/");
    await page.getByRole("button", { name: "Essential only" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect.poll(() => page.evaluate((key) => localStorage.getItem(key), CONSENT_KEY)).toBe("essential");
    await expect(page.locator("#google-adsense")).toHaveCount(0);
  });

  test("accepted consent still cannot enable ads in the staging build", async ({ page }) => {
    await page.addInitScript(({ key }) => localStorage.setItem(key, "accepted"), { key: CONSENT_KEY });
    await stubAccess(page, true);
    await page.route("https://pagead2.googlesyndication.com/**", (route) => route.abort());
    await page.goto("/");
    // Staging must remain ad-free even if a mocked access response says ads are allowed.
    await expect(page.locator("#google-adsense")).toHaveCount(0);
  });

  test("Pro entitlement keeps AdSense disabled even when consent is accepted", async ({ page }) => {
    await page.addInitScript(({ key }) => localStorage.setItem(key, "accepted"), { key: CONSENT_KEY });
    await stubAccess(page, false);
    await page.goto("/");
    await expect(page.locator("#google-adsense")).toHaveCount(0);
  });

  test("access API failure fails closed and does not load AdSense", async ({ page }) => {
    await page.addInitScript(({ key }) => localStorage.setItem(key, "accepted"), { key: CONSENT_KEY });
    await stubAccess(page, true, 503);
    await page.goto("/");
    await expect(page.locator("#google-adsense")).toHaveCount(0);
  });

  test("login, account, admin and auth routes never load AdSense", async ({ page }) => {
    await page.addInitScript(({ key }) => localStorage.setItem(key, "accepted"), { key: CONSENT_KEY });
    await stubAccess(page, true);
    for (const path of ["/login", "/account", "/admin", "/auth/callback"]) {
      await page.goto(path, { waitUntil: "commit" });
      await expect(page.locator("#google-adsense"), path).toHaveCount(0);
    }
  });
});
