import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

test.describe("staging security regression checks", () => {
  test("server-only Supabase credentials are not exposed in public HTML", async ({ request }) => {
    for (const path of ["/", "/login", "/pricing", "/tools/json-formatter"]) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(200);
      const html = await response.text();
      expect(html, path).not.toMatch(/SUPABASE_SERVICE_ROLE_KEY|service_role|sb_secret_[A-Za-z0-9_-]{12,}/i);
    }
  });

  test("session endpoint fails closed when no session cookie is supplied", async ({ request }) => {
    const response = await request.get("/api/auth/session");
    expect([401, 503]).toContain(response.status());
    const body = await response.json();
    expect(body).toHaveProperty("error");
  });

  test("session endpoint rejects malformed token payloads without issuing cookies", async ({ request }) => {
    const response = await request.post("/api/auth/session", {
      data: { access_token: "", refresh_token: "" },
    });
    expect([400, 503]).toContain(response.status());
    expect(response.headers()["set-cookie"] || "").not.toMatch(/kk_access_token=|kk_refresh_token=/);
  });

  test("admin grant mutation rejects a cross-origin request before authentication", async ({ request }) => {
    const response = await request.post("/api/admin/access", {
      headers: { Origin: "https://attacker.example.invalid" },
      data: {
        email: "staging-test@example.invalid",
        access_type: "pro",
        duration: "30",
        reason: "testing",
        note: "Cross-origin security regression test; no write should occur.",
      },
    });
    expect(response.status()).toBe(403);
    expect(await response.json()).toMatchObject({ error: "Invalid request origin." });
  });

  test("admin grant and revoke endpoints remain protected for signed-out requests", async ({ request }) => {
    const list = await request.get("/api/admin/access");
    expect(list.status()).toBe(401);

    const grant = await request.post("/api/admin/access", {
      data: {
        email: "staging-test@example.invalid",
        access_type: "pro",
        duration: "30",
        reason: "testing",
        note: "Unauthenticated regression test; no write should occur.",
      },
    });
    expect(grant.status()).toBe(401);

    const revoke = await request.patch("/api/admin/access", {
      data: { id: "a80a66cc-5f2f-4cfd-a1bf-7c71ec3d73d8" },
    });
    expect(revoke.status()).toBe(401);
  });

  test("quota API rejects malformed input and does not grant anonymous metered access", async ({ request }) => {
    const malformed = await request.post("/api/tools/usage", {
      data: { action: "check" },
    });
    expect(malformed.status()).toBe(400);
    expect(await malformed.json()).toMatchObject({ error: "A valid tool key is required." });

    const metered = await request.post("/api/tools/usage", {
      data: { tool_key: "ai-tool", action: "consume" },
    });
    expect(metered.status()).toBe(401);
    expect(await metered.json()).toMatchObject({ allowed: false, requiresSignIn: true });
  });

  test("staging SEO exclusion and ad publisher declaration stay present", async ({ request }) => {
    const robotsResponse = await request.get("/robots.txt");
    expect(robotsResponse.status()).toBe(200);
    expect(await robotsResponse.text()).toMatch(/Disallow:\s*\//i);

    const adsResponse = await request.get("/ads.txt");
    expect(adsResponse.status()).toBe(200);
    expect((await adsResponse.text()).trim()).toBe(
      "google.com, pub-6738934686699082, DIRECT, f08c47fec0942fa0",
    );
  });

  test("subscription access fails closed for missing or invalid period-end timestamps", async () => {
    for (const path of [
      "../src/app/api/access/route.ts",
      "../src/app/api/tools/usage/route.ts",
    ]) {
      const source = await readFile(new URL(path, import.meta.url), "utf8");
      expect(source).toContain('typeof item.current_period_end === "string"');
      expect(source).toContain("Number.isFinite(Date.parse(item.current_period_end))");
      expect(source).toContain("Date.parse(item.current_period_end) > now");
      expect(source).not.toContain("!item.current_period_end || Date.parse(item.current_period_end) > now");
    }
  });
});
