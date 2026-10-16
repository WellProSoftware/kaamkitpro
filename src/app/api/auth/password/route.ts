import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const accessToken = request.cookies.get("kk_access_token")?.value;
  if (!url || !key) return NextResponse.json({ error: "Authentication is not configured." }, { status: 503 });
  if (!accessToken) return NextResponse.json({ error: "Please open the email verification link again." }, { status: 401 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }
  const password = body && typeof body === "object" ? (body as Record<string, unknown>).password : null;
  if (typeof password !== "string" || password.length < 10 || password.length > 128) return NextResponse.json({ error: "Use a password between 10 and 128 characters." }, { status: 400 });
  const response = await fetch(`${url}/auth/v1/user`, { method: "PUT", headers: { apikey: key, Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" }, body: JSON.stringify({ password }), cache: "no-store" });
  const result = await response.json().catch(() => ({})) as { message?: string; msg?: string; error_description?: string };
  if (!response.ok) return NextResponse.json({ error: result.message || result.msg || result.error_description || "Could not set your password. Please try again." }, { status: response.status });
  return NextResponse.json({ ok: true });
}
