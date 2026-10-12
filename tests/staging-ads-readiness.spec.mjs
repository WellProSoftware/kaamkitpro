import { expect, test } from "@playwright/test";

test("staging privacy and legal pages are reachable and disclose advertising", async ({ page }) => {
  const pages = [
    ["/privacy-policy", "Privacy Policy"],
    ["/terms", "Terms"],
    ["/contact", "Contact"],
    ["/advertise", "Advertise"],
  ];

  for (const [path, heading] of pages) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.getByRole("heading", { name: new RegExp(heading, "i") }).first()).toBeVisible();
  }

  await page.goto("/privacy-policy");
  await expect(page.getByRole("heading", { name: /Advertising/i })).toBeVisible();
  await expect(page.getByText(/Google AdSense/i).first()).toBeVisible();
});

test("staging never injects the live AdSense script, including after navigation", async ({ page }) => {
  for (const path of ["/", "/tools/json-formatter", "/privacy-policy", "/login"]) {
    await page.goto(path);
    await page.waitForTimeout(300);
    await expect(page.locator("#google-adsense")).toHaveCount(0);
    await expect(page.locator('script[src*="pagead2.googlesyndication.com"]')).toHaveCount(0);
  }
});

test("anonymous staging access API stays free and keeps ads disabled", async ({ request }) => {
  const response = await request.get("/api/access");
  expect(response.status()).toBe(200);
  await expect(response.json()).resolves.toMatchObject({
    user: null,
    plan: "free",
    isPro: false,
    adsEnabled: false,
    selectedTools: [],
  });
});

test("privacy consent choices persist and staging never loads optional trackers", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.localStorage.removeItem("kk_privacy_consent_v1"));
  await page.reload();
  const dialog = page.getByRole("dialog", { name: /Your privacy choices/i });
  await expect(dialog).toBeVisible();
  await page.getByRole("button", { name: "Essential only" }).click();
  await expect(dialog).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => window.localStorage.getItem("kk_privacy_consent_v1"))).toBe("essential");
  await page.reload();
  await expect(page.getByRole("dialog", { name: /Your privacy choices/i })).toHaveCount(0);
  await expect(page.locator("#google-analytics-script, #google-adsense")).toHaveCount(0);

  await page.evaluate(() => window.localStorage.removeItem("kk_privacy_consent_v1"));
  await page.reload();
  await expect(page.getByRole("dialog", { name: /Your privacy choices/i })).toBeVisible();
  await page.getByRole("button", { name: "Accept analytics & ads" }).click();
  await expect.poll(() => page.evaluate(() => window.localStorage.getItem("kk_privacy_consent_v1"))).toBe("accepted");
  await expect(page.getByRole("dialog", { name: /Your privacy choices/i })).toHaveCount(0);
  await expect(page.locator("#google-analytics-script, #google-adsense")).toHaveCount(0);
  await expect(page.locator('script[src*="googletagmanager.com/gtag/js"], script[src*="pagead2.googlesyndication.com"]')).toHaveCount(0);
});
