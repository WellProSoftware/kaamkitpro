import { NextRequest, NextResponse } from "next/server";
import { getRequestUser, serviceRest } from "@/lib/server-access";

const columns = "id,subject,status,created_at,updated_at,support_messages(id,sender_role,body,created_at)";

export async function GET(request: NextRequest) {
  const user = await getRequestUser(request);
  if (!user) return NextResponse.json({ error: "Sign in to use support chat." }, { status: 401 });
  const response = await serviceRest(`support_conversations?select=${columns}&user_id=eq.${encodeURIComponent(user.id)}&order=updated_at.desc&limit=1`);
  if (!response) return NextResponse.json({ error: "Support storage is not configured." }, { status: 503 });
  const rows = await response.json().catch(() => []);
  if (!response.ok) return NextResponse.json({ error: "Could not load support messages." }, { status: 502 });
  const conversation = Array.isArray(rows) && rows.length ? rows[0] : null;
  if (conversation?.support_messages) conversation.support_messages.sort((a: { created_at: string }, b: { created_at: string }) => Date.parse(a.created_at) - Date.parse(b.created_at));
  return NextResponse.json({ conversation });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin) {
    try { if (new URL(origin).host !== request.nextUrl.host) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 }); }
    catch { return NextResponse.json({ error: "Invalid request origin." }, { status: 403 }); }
  }
  const user = await getRequestUser(request);
  if (!user?.email) return NextResponse.json({ error: "Sign in to send a support message." }, { status: 401 });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid message." }, { status: 400 }); }
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const language = typeof body.language === "string" ? body.language.slice(0, 20) : "en";
  const conversationId = typeof body.conversation_id === "string" && /^[0-9a-f-]{36}$/i.test(body.conversation_id) ? body.conversation_id : null;
  if (!message || message.length > 4000) return NextResponse.json({ error: "Message must be 1–4,000 characters." }, { status: 400 });

  let conversation: { id: string } | null = null;
  if (conversationId) {
    const existing = await serviceRest(`support_conversations?select=id,user_id&id=eq.${conversationId}&user_id=eq.${encodeURIComponent(user.id)}&limit=1`);
    const rows = existing ? await existing.json().catch(() => []) : [];
    if (!existing?.ok || !Array.isArray(rows) || !rows[0]) return NextResponse.json({ error: "Support conversation not found." }, { status: 404 });
    conversation = rows[0];
  } else {
    const created = await serviceRest("support_conversations", {
      method: "POST", headers: { Prefer: "return=representation" },
      body: JSON.stringify({ user_id: user.id, user_email: user.email, subject: message.slice(0, 100), language }),
    });
    const rows = created ? await created.json().catch(() => []) : [];
    if (!created?.ok || !Array.isArray(rows) || !rows[0]) return NextResponse.json({ error: "Could not open a support ticket." }, { status: 502 });
    conversation = rows[0];
  }
  const inserted = await serviceRest("support_messages", {
    method: "POST", headers: { Prefer: "return=representation" },
    body: JSON.stringify({ conversation_id: conversation.id, sender_role: "user", sender_user_id: user.id, body: message }),
  });
  if (!inserted?.ok) return NextResponse.json({ error: "Could not save the support message." }, { status: 502 });
  await serviceRest(`support_conversations?id=eq.${conversation.id}`, { method: "PATCH", body: JSON.stringify({ updated_at: new Date().toISOString(), status: "open" }) });
  const readback = await serviceRest(`support_conversations?select=${columns}&id=eq.${conversation.id}&limit=1`);
  const rows = readback ? await readback.json().catch(() => []) : [];
  return NextResponse.json({ conversation: Array.isArray(rows) ? rows[0] ?? null : null }, { status: 201 });
}
