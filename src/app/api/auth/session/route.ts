import { NextRequest, NextResponse } from "next/server";

const ACCESS_COOKIE = "kk_access_token";
const REFRESH_COOKIE = "kk_refresh_token";
const REFRESH_MAX_AGE = 60 * 60 * 24 * 60;

function authConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key };
}

function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

function clearCookies(response: NextResponse) {
  response.cookies.set(ACCESS_COOKIE, "", cookieOptions(0));
  response.cookies.set(REFRESH_COOKIE, "", cookieOptions(0));
}

async function getSupabaseUser(url: string, key: string, accessToken: string) {
  const response = await fetch(`${url}/auth/v1/user`, {
    headers: { apikey: key, Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  if (!response.ok) return null;
  return (await response.json()) as { id?: string; email?: string };
}

export async function POST(request: NextRequest) {
  const config = authConfig();
  if (!config) {
    return NextResponse.json({ error: "Authentication is not configured." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid session payload." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const accessToken = payload.access_token;
  const refreshToken = payload.refresh_token;
  const expiresIn = payload.expires_in;

  if (
    typeof accessToken !== "string" ||
    accessToken.length < 20 ||
    accessToken.length > 8192 ||
    typeof refreshToken !== "string" ||
    refreshToken.length < 20 ||
    refreshToken.length > 2048
  ) {
    return NextResponse.json({ error: "Invalid session tokens." }, { status: 400 });
  }

  const user = await getSupabaseUser(config.url, config.key, accessToken);
  if (!user?.id) {
    return NextResponse.json({ error: "The sign-in link is invalid or expired. Please request a new one." }, { status: 401 });
  }

  const maxAge =
    typeof expiresIn === "number" && Number.isFinite(expiresIn)
      ? Math.max(60, Math.min(Math.floor(expiresIn), 3600))
      : 3600;

  const response = NextResponse.json({
    user: { id: user.id, email: user.email ?? null },
  });
  response.cookies.set(ACCESS_COOKIE, accessToken, cookieOptions(maxAge));
  response.cookies.set(REFRESH_COOKIE, refreshToken, cookieOptions(REFRESH_MAX_AGE));
  return response;
}

export async function GET(request: NextRequest) {
  const config = authConfig();
  if (!config) {
    return NextResponse.json({ error: "Authentication is not configured." }, { status: 503 });
  }

  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  let user = await getSupabaseUser(config.url, config.key, accessToken);
  if (user?.id) {
    return NextResponse.json({ user: { id: user.id, email: user.email ?? null } });
  }

  if (!refreshToken) {
    const response = NextResponse.json({ error: "Session expired. Please sign in again." }, { status: 401 });
    clearCookies(response);
    return response;
  }

  const refreshResponse = await fetch(`${config.url}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST",
    headers: { apikey: config.key, "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
    cache: "no-store",
  });

  if (!refreshResponse.ok) {
    const response = NextResponse.json({ error: "Session expired. Please sign in again." }, { status: 401 });
    clearCookies(response);
    return response;
  }

  const refreshed = (await refreshResponse.json()) as {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    user?: { id?: string; email?: string };
  };

  if (!refreshed.access_token || !refreshed.refresh_token || !refreshed.user?.id) {
    const response = NextResponse.json({ error: "Unable to refresh session." }, { status: 401 });
    clearCookies(response);
    return response;
  }

  user = refreshed.user;
  const response = NextResponse.json({ user: { id: user.id, email: user.email ?? null } });
  response.cookies.set(
    ACCESS_COOKIE,
    refreshed.access_token,
    cookieOptions(
      typeof refreshed.expires_in === "number"
        ? Math.max(60, Math.min(Math.floor(refreshed.expires_in), 3600))
        : 3600,
    ),
  );
  response.cookies.set(REFRESH_COOKIE, refreshed.refresh_token, cookieOptions(REFRESH_MAX_AGE));
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  clearCookies(response);
  return response;
}
