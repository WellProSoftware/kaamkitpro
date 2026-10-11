import { expect, test } from "@playwright/test";

const ADS_TXT_LINE = "google.com, pub-6738934686699082, DIRECT, f08c47fec0942fa0";

test("staging pages explicitly opt out of search indexing", async ({ page, request }) => {
  await page.goto("/");
  const robotsMeta = page.locator('meta[name="robots"]');
  await expect(robotsMeta).toHaveAttribute("content", /noindex/);

  const response = await request.get("/robots.txt");
  expect(response.ok()).toBeTruthy();
  const robots = await response.text();
  expect(robots).toMatch(/Disallow:\s*\//i);
  expect(robots).not.toContain("Sitemap:");
});

test("pricing stays free-only and does not expose checkout", async ({ page }) => {
  await page.goto("/pricing");
  await expect(page.getByRole("heading", { name: "Useful tools. Free to use." })).toBeVisible();
  await expect(page.getByText(/All currently available tools are free/i).first()).toBeVisible();
  await expect(page.getByText(/Paid plans and checkout are not available/i)).toBeVisible();
  await expect(page.getByText("Pro Monthly", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Pro Yearly", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("link", { name: /checkout|subscribe|buy now|start trial/i })).toHaveCount(0);
});

test("ads.txt remains byte-for-byte consistent in its publisher entry", async ({ request }) => {
  const response = await request.get("/ads.txt");
  expect(response.status()).toBe(200);
  expect((await response.text()).trim()).toBe(ADS_TXT_LINE);
});

test("SEO sitemap contains the utility and guide routes exactly once", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBeTruthy();
  const xml = await response.text();

  for (const route of [
    "tools/line-sorter",
    "tools/remove-duplicate-lines",
    "tools/csv-to-json",
    "tools/json-to-csv",
    "tools/text-diff-checker",
    "guides/csv-to-json",
    "guides/json-to-csv",
    "guides/line-sorter",
  ]) {
    const matches = xml.match(new RegExp("https://kaamkitpro\\.com/" + route, "g")) || [];
    expect(matches, route).toHaveLength(1);
  }
});

test("login and invalid callback pages render without a Supabase session", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Sign in with email" })).toBeVisible();

  await page.waitForTimeout(250);
  await expect(page.locator("#google-adsense")).toHaveCount(0);

  await page.goto("/auth/callback");
  await expect(page.getByRole("heading", { name: "Sign-in link not accepted" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Request a new link" })).toHaveAttribute("href", "/login");
  await page.waitForTimeout(250);
  await expect(page.locator("#google-adsense")).toHaveCount(0);
});

test("admin page and account routes redirect signed-out users safely", async ({ page }) => {
  await page.goto("/admin/access");
  await expect(page).toHaveURL(/\/login$/);
  await page.goto("/account");
  await expect(page).toHaveURL(/\/login$/);
});

test("signed-out access API resolves to Free and ads can load on the public homepage", async ({ request, page }) => {
  const response = await request.get("/api/access");
  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toMatchObject({
    user: null,
    plan: "free",
    isPro: false,
    adsEnabled: true,
    selectedTools: [],
  });

  // Intercept the remote ad script so the test never depends on or executes a third-party ad request.
  await page.route("https://pagead2.googlesyndication.com/**", route =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "/* intercepted in staging test */" }),
  );
  await page.goto("/");
  await expect(page.locator("#google-adsense")).toHaveAttribute(
    "data-ad-client",
    "ca-pub-6738934686699082",
  );
});

test("admin grant and revoke mutations reject unauthenticated callers", async ({ request }) => {
  const list = await request.get("/api/admin/access");
  expect(list.status()).toBe(401);

  const create = await request.post("/api/admin/access", {
    data: {
      email: "staging-test@example.invalid",
      access_type: "pro",
      duration: "30",
      reason: "testing",
      note: "Unauthenticated safety test; no database write should occur.",
    },
  });
  expect(create.status()).toBe(401);

  const revoke = await request.patch("/api/admin/access", {
    data: { id: "a80a66cc-5f2f-4cfd-a1bf-7c71ec3d73d8" },
  });
  expect(revoke.status()).toBe(401);
});

test("free quota policy stays open while metered quota requires authentication", async ({ request }) => {
  const free = await request.post("/api/tools/usage", {
    data: { tool_key: "calculator", action: "check" },
  });
  expect(free.ok()).toBeTruthy();
  expect(await free.json()).toMatchObject({
    allowed: true,
    tier: "free",
    limited: false,
  });

  const metered = await request.post("/api/tools/usage", {
    data: { tool_key: "ai-tool", action: "check" },
  });
  expect(metered.status()).toBe(401);
  expect(await metered.json()).toMatchObject({
    allowed: false,
    requiresSignIn: true,
  });
});

test("billing checkout refuses unauthenticated requests without reaching a payment provider", async ({ request }) => {
  const response = await request.post("/api/billing/checkout", {
    data: { plan_id: "pro-monthly-inr" },
  });
  expect(response.status()).toBe(401);
  expect(await response.json()).toMatchObject({
    error: "Sign in before starting a subscription.",
  });
});

test("free text utility works in the vinext preview runtime", async ({ page }) => {
  await page.goto("/tools/line-sorter");
  await expect(page.getByRole("heading", { name: "Online Line Sorter" })).toBeVisible();
  await page.locator("#line-input").fill("Item 10\nitem 2\nApple");
  await expect(page.locator("#line-output")).toHaveValue("Apple\nitem 2\nItem 10");
});

test("CSV to JSON converter works in the vinext preview runtime", async ({ page }) => {
  await page.goto("/tools/csv-to-json");
  await page.locator("#csv-input").fill('name,city,note\nAsha,Mumbai,"Likes tea, coffee"');
  await expect(page.locator("#json-output")).toHaveValue(
    JSON.stringify([{ name: "Asha", city: "Mumbai", note: "Likes tea, coffee" }], null, 2),
  );
});
