import { NextRequest, NextResponse } from "next/server";
import { getRequestUser, isAuthorizedAdmin, serviceRest } from "@/lib/server-access";

async function requireAdmin(request: NextRequest) {
  const user = await getRequestUser(request);
  if (!user) return { error: NextResponse.json({ error: "Please sign in first." }, { status: 401 }) };
  if (!isAuthorizedAdmin(user.email)) return { error: NextResponse.json({ error: "Admin access required." }, { status: 403 }) };
  return { user };
}

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if ("error" in auth) return auth.error;
  const response = await serviceRest("support_conversations?select=id,user_id,user_email,subject,status,language,created_at,updated_at,support_messages(id,sender_role,body,created_at)&order=updated_at.desc&limit=100");
  if (!response) return NextResponse.json({ error: "Support storage is not configured." }, { status: 503 });
  const rows = await response.json().catch(() => []);
  if (!response.ok) return NextResponse.json({ error: "Could not load support requests." }, { status: 502 });
  return NextResponse.json({ conversations: rows });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin) { try { if (new URL(origin).host !== request.nextUrl.host) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 }); } catch { return NextResponse.json({ error: "Invalid request origin." }, { status: 403 }); } }
  const auth = await requireAdmin(request);
  if ("error" in auth) return auth.error;
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }
  const id = typeof body.conversation_id === "string" && /^[0-9a-f-]{36}$/i.test(body.conversation_id) ? body.conversation_id : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const status = body.status === "resolved" ? "resolved" : "waiting_user";
  if (!id || !message || message.length > 4000) return NextResponse.json({ error: "Choose a ticket and enter a message under 4,000 characters." }, { status: 400 });
  const exists = await serviceRest(`support_conversations?select=id&id=eq.${id}&limit=1`);
  const rows = exists ? await exists.json().catch(() => []) : [];
  if (!exists?.ok || !Array.isArray(rows) || !rows[0]) return NextResponse.json({ error: "Support request not found." }, { status: 404 });
  const saved = await serviceRest("support_messages", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ conversation_id: id, sender_role: "admin", sender_user_id: auth.user.id, body: message }) });
  if (!saved?.ok) return NextResponse.json({ error: "Could not save reply." }, { status: 502 });
  await serviceRest(`support_conversations?id=eq.${id}`, { method: "PATCH", body: JSON.stringify({ status, updated_at: new Date().toISOString() }) });
  return NextResponse.json({ ok: true });
}
