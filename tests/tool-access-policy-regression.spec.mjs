import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

const readSource = (path) => readFile(new URL(path, import.meta.url), "utf8");

test.describe("tool quota policy regression checks", () => {
  test("central policy preserves documented Free, Limited Free and Pro-only tiers", async () => {
    const policy = await readSource("../src/lib/tool-access-policy.ts");
    expect(policy).toContain('"ai-tool": { key: "ai-tool", tier: "limited_free", freeDailyLimit: 3, proDailyLimit: 100');
    expect(policy).toContain('"cloud-processing": { key: "cloud-processing", tier: "limited_free", freeDailyLimit: 2, proDailyLimit: 50');
    expect(policy).toContain('"hosted-conversion": { key: "hosted-conversion", tier: "limited_free", freeDailyLimit: 3, proDailyLimit: 100');
    expect(policy).toContain('"bulk-ai-generation": { key: "bulk-ai-generation", tier: "pro_only", freeDailyLimit: 0, proDailyLimit: 100');
    expect(policy).toContain('"premium-analytics": { key: "premium-analytics", tier: "pro_only", freeDailyLimit: 0, proDailyLimit: 100');
    expect(policy).toContain('"pdf-merge": { key: "pdf-merge", tier: "free"');
  });

  test("quota endpoint requires authentication for metered tools and fails closed on access lookup errors", async () => {
    const route = await readSource("../src/app/api/tools/usage/route.ts");
    expect(route).toContain('requiresSignIn: true');
    expect(route).toContain('}, { status: 401 });');
    expect(route).toContain('if (!access)');
    expect(route).toContain('}, { status: 503 });');
    expect(route).toContain('if (policy.tier === "pro_only" && !access.pro)');
  });

  test("usage consumption is delegated to atomic database RPC and returns a limit response when denied", async () => {
    const route = await readSource("../src/app/api/tools/usage/route.ts");
    expect(route).toContain('"rpc/consume_tool_usage"');
    expect(route).toContain('p_daily_limit: dailyLimit');
    expect(route).toContain('status: usage?.allowed ? 200 : 429');
    expect(route).toContain('remaining: Math.max(0, dailyLimit - (Number(usage?.used) || 0))');
  });

  test("Pro entitlement requires a valid future billing period end in both access paths", async () => {
    for (const path of [
      "../src/app/api/access/route.ts",
      "../src/app/api/tools/usage/route.ts",
    ]) {
      const route = await readSource(path);
      expect(route).toContain('typeof item.current_period_end === "string"');
      expect(route).toContain("Number.isFinite(Date.parse(item.current_period_end))");
      expect(route).toContain("Date.parse(item.current_period_end) > now");
    }
  });
});
