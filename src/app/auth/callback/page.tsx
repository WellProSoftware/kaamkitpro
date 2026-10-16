"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AuthCallbackPage() {
  const [message, setMessage] = useState("Verifying your email link…");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function complete() {
      const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const query = new URLSearchParams(window.location.search);
      const flow = query.get("flow");
      const authError = params.get("error_description") || query.get("error_description") || query.get("error");
      let accessToken = params.get("access_token");
      let refreshToken = params.get("refresh_token");
      let expiresIn = Number(params.get("expires_in") || 3600);
      const tokenHash = query.get("token_hash");
      const otpType = query.get("type") || "email";
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
      const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
      window.history.replaceState(null, "", "/auth/callback");
      if (authError) { if (!cancelled) { setFailed(true); setMessage(authError.replace(/\+/g, " ")); } return; }
      try {
        if (!accessToken && tokenHash && url && key) {
          const response = await fetch(`${url}/auth/v1/verify`, { method: "POST", headers: { apikey: key, "Content-Type": "application/json" }, body: JSON.stringify({ token_hash: tokenHash, type: otpType }), cache: "no-store" });
          const verified = await response.json() as { access_token?: string; refresh_token?: string; expires_in?: number; msg?: string; message?: string };
          if (!response.ok) throw new Error(verified.msg || verified.message || "The verification link is invalid or expired. Request a new one.");
          accessToken = verified.access_token || null;
          refreshToken = verified.refresh_token || null;
          expiresIn = Number(verified.expires_in || 3600);
        }
        if (!accessToken || !refreshToken) throw new Error("This verification link is invalid or expired. Request a new link and try again.");
        const response = await fetch("/api/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ access_token: accessToken, refresh_token: refreshToken, expires_in: expiresIn }) });
        const result = await response.json() as { error?: string };
        if (!response.ok) throw new Error(result.error || "Could not complete email verification.");
        if (!cancelled) window.location.replace(flow === "signup" ? "/set-password" : "/account");
      } catch (cause) {
        if (!cancelled) { setFailed(true); setMessage(cause instanceof Error ? cause.message : "Could not verify your email. Please request a new link."); }
      }
    }
    void complete();
    return () => { cancelled = true; };
  }, []);

  return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 text-slate-900"><section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm"><div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${failed ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`} aria-hidden="true">{failed ? "!" : "✓"}</div><h1 className="mt-5 text-2xl font-extrabold">{failed ? "Verification link not accepted" : "Verifying your email"}</h1><p className="mt-3 text-sm leading-6 text-slate-600" role={failed ? "alert" : "status"}>{message}</p>{failed ? <Link href="/login" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700">Return to sign in</Link> : null}</section></main>;
}
