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
  if (!config?.serviceKey) return null;
  return fetch(`${config.url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: config.serviceKey,
      Authorization: `Bearer ${config.serviceKey}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
}
