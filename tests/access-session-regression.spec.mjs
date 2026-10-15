import { expect, test } from "@playwright/test";

test.describe("staging access and session boundaries", () => {
  test("anonymous access response explicitly identifies the Free plan and denies Pro", async ({ request }) => {
    const response = await request.get("/api/access");
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toMatchObject({
      user: null,
      plan: "free",
      isPro: false,
      selectedTools: [],
    });
  });

  test("logout endpoint clears both HttpOnly session cookies", async ({ request }) => {
    const response = await request.delete("/api/auth/session");
    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject({ ok: true });
    const setCookie = response.headers()["set-cookie"] || "";
    expect(setCookie).toContain("kk_access_token=");
    expect(setCookie).toContain("kk_refresh_token=");
    expect(setCookie).toMatch(/kk_access_token=;[^\n]*Max-Age=0/i);
    expect(setCookie).toMatch(/kk_refresh_token=;[^\n]*Max-Age=0/i);
  });

  test("public tool catalogue remains public without implying Pro entitlement", async ({ request }) => {
    const tools = await request.get("/tools");
    expect(tools.status()).toBe(200);
    const html = await tools.text();
    expect(html).toMatch(/Online Tools|Free Online Tools/i);

    const access = await request.get("/api/access");
    expect(access.ok()).toBeTruthy();
    const body = await access.json();
    expect(body.isPro).toBe(false);
    expect(body.plan).toBe("free");
  });
});
