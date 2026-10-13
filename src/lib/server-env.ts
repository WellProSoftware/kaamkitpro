/**
 * Read server-only environment values in both Node.js and Cloudflare Workers.
 * Cloudflare secrets are runtime bindings and may not exist in build-time process.env.
 */
export async function getServerEnv(name: string): Promise<string | undefined> {
  try {
    const runtime = await import("cloudflare:workers") as unknown as {
      env?: Record<string, string | undefined>;
    };
    const value = runtime.env?.[name];
    if (typeof value === "string" && value.length > 0) return value;
  } catch {
    // Local Next.js development does not provide Cloudflare runtime bindings.
  }

  const fallback = process.env[name];
  return typeof fallback === "string" && fallback.length > 0 ? fallback : undefined;
}
