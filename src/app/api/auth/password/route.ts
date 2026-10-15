import { NextRequest, NextResponse } from "next/server";

const ACCESS_COOKIE = "kk_access_token";

export async function POST(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return NextResponse.json({ error: "Authentication is not configured." }, { status: 503 });

  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  if (!accessToken) return NextResponse.json({ error: "Verify your email link before setting a password." }, { status: 401 });

  let body: { password?: unknown };
  try { body = await request.json() as { password?: unknown }; }
  catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }

  if (typeof body.password !== "string" || body.password.length < 10 || body.password.length > 128) {
    return NextResponse.json({ error: "Password must be between 10 and 128 characters." }, { status: 400 });
  }

  const response = await fetch(`${url}/auth/v1/user`, {
    method: "PUT",
    headers: { apikey: key, Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ password: body.password }),
    cache: "no-store",
  });
  if (!response.ok) {
    const result = await response.json().catch(() => ({})) as { message?: string; msg?: string };
    return NextResponse.json({ error: result.message || result.msg || "Password could not be saved. Verify your email link and try again." }, { status: response.status === 401 ? 401 : 400 });
  }
  return NextResponse.json({ ok: true });
}
