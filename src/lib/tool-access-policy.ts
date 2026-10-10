/**
 * Central KaamKitPro tool access policy.
 *
 * Register new tools here when adding them. Keep low-cost browser utilities free;
 * use limited-free for compute-heavy tools and pro-only for premium capabilities.
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
  "text-utility": { key: "text-utility", tier: "free", freeDailyLimit: null, proDailyLimit: null, category: "basic" },
  "calculator": { key: "calculator", tier: "free", freeDailyLimit: null, proDailyLimit: null, category: "basic" },
  "color-tool": { key: "color-tool", tier: "free", freeDailyLimit: null, proDailyLimit: null, category: "basic" },
  "pdf-merge": { key: "pdf-merge", tier: "limited_free", freeDailyLimit: 5, proDailyLimit: 100, category: "pdf" },
  "pdf-split": { key: "pdf-split", tier: "limited_free", freeDailyLimit: 5, proDailyLimit: 100, category: "pdf" },
  "pdf-convert": { key: "pdf-convert", tier: "limited_free", freeDailyLimit: 3, proDailyLimit: 100, category: "pdf" },
  "pdf-compress": { key: "pdf-compress", tier: "limited_free", freeDailyLimit: 3, proDailyLimit: 100, category: "pdf" },
  "image-resize": { key: "image-resize", tier: "limited_free", freeDailyLimit: 5, proDailyLimit: 100, category: "image" },
  "image-convert": { key: "image-convert", tier: "limited_free", freeDailyLimit: 5, proDailyLimit: 100, category: "image" },
  "seo-tool": { key: "seo-tool", tier: "limited_free", freeDailyLimit: 10, proDailyLimit: 200, category: "seo" },
  "ai-tool": { key: "ai-tool", tier: "limited_free", freeDailyLimit: 3, proDailyLimit: 100, category: "ai" },
  "heavy-processing": { key: "heavy-processing", tier: "limited_free", freeDailyLimit: 2, proDailyLimit: 50, category: "heavy" },
};

export function normalizeToolKey(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").slice(0, 100);
}

/** Known aliases are mapped explicitly; unknown tools default to Free, not paid by surprise. */
export function getToolPolicy(toolKey: string): ToolPolicy {
  const key = normalizeToolKey(toolKey);
  if (POLICIES[key]) return POLICIES[key];

  if (/\b(ai|llm|gpt|prompt|chatbot)\b/.test(key)) {
    return { ...POLICIES["ai-tool"], key };
  }
  if (/\b(pdf|document|file)\b/.test(key)) {
    return { ...POLICIES["pdf-convert"], key };
  }
  if (/\b(image|photo|resize|compress)\b/.test(key)) {
    return { ...POLICIES["image-resize"], key };
  }
  if (/\b(seo|keyword|meta|schema)\b/.test(key)) {
    return { ...POLICIES["seo-tool"], key };
  }
  if (/\b(batch|bulk|video|audio|process)\b/.test(key)) {
    return { ...POLICIES["heavy-processing"], key };
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
