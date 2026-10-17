import { NextRequest, NextResponse } from "next/server";
import { getRequestUser, isAuthorizedAdmin, serviceRest } from "@/lib/server-access";

const GRANT_COLUMNS = "id,target_email,access_type,tool_keys,starts_at,expires_at,reason,note,granted_by,revoked_at,created_at";

function originIsValid(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.nextUrl.host;
  } catch {
    return false;
  }
}

async function requireAdmin(request: NextRequest) {
  const user = await getRequestUser(request);
  if (!user) return { error: NextResponse.json({ error: "Please sign in first." }, { status: 401 }) };
  if (!isAuthorizedAdmin(user.email)) {
    return { error: NextResponse.json({ error: "Admin access is not enabled for this account." }, { status: 403 }) };
  }
  return { user };
}

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if ("error" in auth) return auth.error;

  const email = (request.nextUrl.searchParams.get("email") || "").trim().toLowerCase();
  const query = new URLSearchParams({
    select: GRANT_COLUMNS,
    order: "created_at.desc",
    limit: "50",
  });
  if (email) query.set("target_email", `eq.${email}`);

  const response = await serviceRest(`user_access_grants?${query.toString()}`);
  if (!response) return NextResponse.json({ error: "Server access storage is not configured." }, { status: 503 });
  const payload = await response.json().catch(() => []);
  if (!response.ok) return NextResponse.json({ error: "Could not load access grants." }, { status: 502 });
  return NextResponse.json({ grants: payload });
}

export async function POST(request: NextRequest) {
  if (!originIsValid(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const auth = await requireAdmin(request);
  if ("error" in auth) return auth.error;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const accessType = body.access_type;
  const reason = body.reason;
  const duration = body.duration;
  const note = typeof body.note === "string" ? body.note.trim().slice(0, 500) : null;
  const toolKeys = Array.isArray(body.tool_keys)
    ? body.tool_keys.filter((value): value is string => typeof value === "string").map((value) => value.trim().toLowerCase()).filter(Boolean).slice(0, 100)
    : [];

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid user email address." }, { status: 400 });
  }
  if (!["full_pro", "pro", "selected_tools"].includes(String(accessType))) {
    return NextResponse.json({ error: "Choose a valid access type." }, { status: 400 });
  }
  if (!["special_user", "testing", "support", "other"].includes(String(reason))) {
    return NextResponse.json({ error: "Choose a reason for the grant." }, { status: 400 });
  }
  if (accessType === "selected_tools" && toolKeys.length === 0) {
    return NextResponse.json({ error: "Add at least one tool key for selected-tool access." }, { status: 400 });
  }

  const startsAt = new Date().toISOString();
  let expiresAt: string | null = null;
  if (duration === "30" || duration === "90") {
    expiresAt = new Date(Date.now() + Number(duration) * 24 * 60 * 60 * 1000).toISOString();
  } else if (duration === "custom") {
    if (typeof body.expires_at !== "string" || !Number.isFinite(Date.parse(body.expires_at)) || Date.parse(body.expires_at) <= Date.now()) {
      return NextResponse.json({ error: "Choose a future expiry date." }, { status: 400 });
    }
    expiresAt = new Date(body.expires_at).toISOString();
  } else if (duration !== "permanent") {
    return NextResponse.json({ error: "Choose a valid duration." }, { status: 400 });
  }

  const row = {
    target_email: email,
    access_type: accessType,
    tool_keys: accessType === "selected_tools" ? toolKeys : [],
    starts_at: startsAt,
    expires_at: expiresAt,
    reason,
    note,
    granted_by: auth.user.id,
  };
  const response = await serviceRest("user_access_grants", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(row),
  });
  if (!response) return NextResponse.json({ error: "Server access storage is not configured." }, { status: 503 });
  const payload = await response.json().catch(() => []);
  if (!response.ok) return NextResponse.json({ error: "Could not create access grant. Apply the access-grants database migration first." }, { status: 502 });
  return NextResponse.json({ grant: Array.isArray(payload) ? payload[0] : payload }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  if (!originIsValid(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const auth = await requireAdmin(request);
  if ("error" in auth) return auth.error;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  const id = typeof body.id === "string" ? body.id : "";
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ error: "A valid grant ID is required." }, { status: 400 });
  }

  const query = new URLSearchParams({ id: `eq.${id}`, revoked_at: "is.null" });
  const response = await serviceRest(`user_access_grants?${query.toString()}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ revoked_at: new Date().toISOString(), revoked_by: auth.user.id }),
  });
  if (!response) return NextResponse.json({ error: "Server access storage is not configured." }, { status: 503 });
  const payload = await response.json().catch(() => []);
  if (!response.ok) return NextResponse.json({ error: "Could not revoke this grant." }, { status: 502 });
  if (!Array.isArray(payload) || payload.length === 0) {
    return NextResponse.json({ error: "Grant was not found or was already revoked." }, { status: 404 });
  }
  return NextResponse.json({ grant: payload[0] });
}
