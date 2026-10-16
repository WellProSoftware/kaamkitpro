import { NextRequest, NextResponse } from "next/server";
import { normalizeToolKey } from "@/lib/tool-access-policy";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const toolKey = typeof body.tool_key === "string" ? normalizeToolKey(body.tool_key) : "";
  if (!toolKey || toolKey.length > 100) {
    return NextResponse.json({ error: "A valid tool key is required." }, { status: 400 });
  }

  // Temporary launch mode: all tool tiers are free while paid plans are on hold.
  // Do not consume daily quota or require sign-in until paid plans are explicitly launched.
  return NextResponse.json({
    allowed: true,
    tier: "free_pro_access",
    limited: false,
    tool_key: toolKey,
  });
}
