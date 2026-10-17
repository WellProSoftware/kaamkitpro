/**
 * Central KaamKitPro tool access policy.
 *
 * Register every new tool here. Browser-only tools that run entirely on a
 * visitor's device stay Free; quotas are for premium/high-cost capabilities.
 * The server must enforce these values; UI-only checks are not security controls.
 */
export type ToolAccessTier = "free" | "limited_free" | "pro_only";

export type ToolPolicy = {
  key: string;
  tier: ToolAccessTier;
  freeDailyLimit: number | null;
  proDailyLimit: number | null;
  category: "basic" | "pdf" | "image" | "seo" | "ai" | "heavy";
};

const POLICIES: Record<string, ToolPolicy> = {
  // Existing browser-side utilities stay Free and do not consume quota.
  "text-utility": { key: "text-utility", tier: "free", freeDailyLimit: null, proDailyLimit: null, category: "basic" },
  "calculator": { key: "calculator", tier: "free", freeDailyLimit: null, proDailyLimit: null, category: "basic" },
  "color-tool": { key: "color-tool", tier: "free", freeDailyLimit: null, proDailyLimit: null, category: "basic" },
  "pdf-merge": { key: "pdf-merge", tier: "free", freeDailyLimit: null, proDailyLimit: null, category: "pdf" },
  "pdf-split": { key: "pdf-split", tier: "free", freeDailyLimit: null, proDailyLimit: null, category: "pdf" },
  "pdf-convert": { key: "pdf-convert", tier: "free", freeDailyLimit: null, proDailyLimit: null, category: "pdf" },
  "pdf-compress": { key: "pdf-compress", tier: "free", freeDailyLimit: null, proDailyLimit: null, category: "pdf" },
  "image-resize": { key: "image-resize", tier: "free", freeDailyLimit: null, proDailyLimit: null, category: "image" },
  "image-convert": { key: "image-convert", tier: "free", freeDailyLimit: null, proDailyLimit: null, category: "image" },
  "seo-tool": { key: "seo-tool", tier: "free", freeDailyLimit: null, proDailyLimit: null, category: "seo" },

  // Metered tiers are for features that need hosted compute, paid APIs, or premium capacity.
  "ai-tool": { key: "ai-tool", tier: "limited_free", freeDailyLimit: 3, proDailyLimit: 100, category: "ai" },
  "cloud-processing": { key: "cloud-processing", tier: "limited_free", freeDailyLimit: 2, proDailyLimit: 50, category: "heavy" },
  "hosted-conversion": { key: "hosted-conversion", tier: "limited_free", freeDailyLimit: 3, proDailyLimit: 100, category: "heavy" },
  "bulk-ai-generation": { key: "bulk-ai-generation", tier: "pro_only", freeDailyLimit: 0, proDailyLimit: 100, category: "ai" },
  "premium-analytics": { key: "premium-analytics", tier: "pro_only", freeDailyLimit: 0, proDailyLimit: 100, category: "heavy" },
};

export function normalizeToolKey(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").slice(0, 100);
}

/**
 * Classify common high-cost future tools conservatively. Unknown tools remain
 * Free until reviewed; do not infer that a browser-only tool has server costs.
 */
export function getToolPolicy(toolKey: string): ToolPolicy {
  const key = normalizeToolKey(toolKey);
  if (POLICIES[key]) return POLICIES[key];

  if (/\b(bulk-ai|ai-bulk|batch-ai|ai-generation)\b/.test(key)) {
    return { ...POLICIES["bulk-ai-generation"], key };
  }
  if (/\b(ai|llm|gpt|prompt|chatbot)\b/.test(key)) {
    return { ...POLICIES["ai-tool"], key };
  }
  if (/\b(cloud|hosted|server-side|api-processing)\b/.test(key)) {
    return { ...POLICIES["cloud-processing"], key };
  }
  if (/\b(premium-analytics|advanced-analytics)\b/.test(key)) {
    return { ...POLICIES["premium-analytics"], key };
  }

  return {
    key,
    tier: "free",
    freeDailyLimit: null,
    proDailyLimit: null,
    category: "basic",
  };
}

export const TOOL_POLICY_DEFAULTS = Object.values(POLICIES);
