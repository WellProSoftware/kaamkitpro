import { NextRequest, NextResponse } from "next/server";
import { getRequestUser, isAuthorizedAdmin } from "@/lib/server-access";

export async function GET(request: NextRequest) {
  const isStagingBuild = process.env.KAAMKITPRO_STAGING === "true" || process.env.VERCEL_ENV === "preview";
  try {
    const user = await getRequestUser(request);

    // Temporary launch mode: all visitors receive Pro-level tool access for free.
    // Ads eligibility is independent from Pro access; staging intentionally disables ads.
    return NextResponse.json({
      user: user ? { id: user.id, email: user.email } : null,
      plan: "free_pro_access",
      isPro: true,
      fullAccess: false,
      adsEnabled: !isStagingBuild,
      selectedTools: [],
      isAdmin: isAuthorizedAdmin(user?.email),
      message: "All available tools are temporarily free. Ads may be shown where enabled.",
    });
  } catch (error) {
    console.error("[api/access] unexpected handler failure", error);
    return NextResponse.json({
      user: null,
      plan: "access_check_unavailable",
      isPro: false,
      adsEnabled: false,
      selectedTools: [],
      message: "Access status could not be verified. Ads are disabled until the check succeeds.",
    }, { status: 503 });
  }
}
