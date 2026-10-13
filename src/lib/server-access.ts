import { NextRequest } from "next/server";

export type SupabaseUser = { id: string; email: string | null };

export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url, key, serviceKey };
}

export async function getRequestUser(request: NextRequest): Promise<SupabaseUser | null> {
  const config = getSupabaseConfig();
  const token = request.cookies.get("kk_access_token")?.value;
  if (!config || !token) return null;
  try {
    const response = await fetch(`${config.url}/auth/v1/user`, {
      headers: { apikey: config.key, Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!response.ok) return null;
    const user = (await response.json()) as { id?: string; email?: string };
    if (!user.id) return null;
    return { id: user.id, email: user.email ?? null };
  } catch {
    return null;
  }
}

export function isAuthorizedAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  const allowed = (process.env.KAAMKITPRO_ADMIN_EMAILS || "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.toLowerCase());
}

export async function serviceRest(
  path: string,
  init: RequestInit = {},
): Promise<Response | null> {
  const config = getSupabaseConfig();
  if (!config) return null;

  // Cloudflare Worker secrets are runtime bindings, not build-time process.env values.
  // Never inline the service-role key into the client or server bundle.
  let serviceKey = config.serviceKey;
  if (!serviceKey) {
    try {
      const runtime = await import("cloudflare:workers") as unknown as {
        env?: Record<string, string | undefined>;
      };
      serviceKey = runtime.env?.SUPABASE_SERVICE_ROLE_KEY;
    } catch {
      // Local Next.js development has no Cloudflare runtime binding.
    }
  }
  if (!serviceKey) return null;

  try {
    return await fetch(`${config.url}/rest/v1/${path}`, {
      ...init,
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
        ...(init.headers || {}),
      },
      cache: "no-store",
    });
  } catch {
    // Let API routes return their explicit fail-closed JSON response instead of
    // an unhandled Worker exception that becomes an empty HTTP 503.
    return null;
  }
}
