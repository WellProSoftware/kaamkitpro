"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AuthCallbackPage() {
  const [message, setMessage] = useState("Verifying your sign-in link…");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function completeSignIn() {
      const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const query = new URLSearchParams(window.location.search);
      const authError = params.get("error_description") || query.get("error_description") || query.get("error");
      let accessToken = params.get("access_token");
      let refreshToken = params.get("refresh_token");
      let expiresIn = Number(params.get("expires_in") || 3600);

      const flow = query.get("flow");
      const tokenHash = query.get("token_hash");
      const otpType = query.get("type") || "email";
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
      const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

      // Remove one-time credentials from browser history as soon as they are read.
      window.history.replaceState(null, "", "/auth/callback");

      if (authError) {
        if (!cancelled) {
          setFailed(true);
          setMessage(authError.replace(/\+/g, " "));
        }
        return;
      }

      try {
        // Support Supabase email templates that redirect with token_hash/type (PKCE-style
        // confirmation) as well as the existing implicit-flow token hash.
        if (!accessToken && tokenHash && supabaseUrl && publishableKey) {
          const verifyResponse = await fetch(`${supabaseUrl}/auth/v1/verify`, {
            method: "POST",
            headers: {
              apikey: publishableKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token_hash: tokenHash, type: otpType }),
            cache: "no-store",
          });
          const verified = (await verifyResponse.json().catch(() => ({}))) as {
            access_token?: string;
            refresh_token?: string;
            expires_in?: number;
            msg?: string;
            message?: string;
          };
          if (!verifyResponse.ok) {
            throw new Error(verified.msg || verified.message || "The sign-in link is invalid or expired. Request a new one.");
          }
          accessToken = verified.access_token || null;
          refreshToken = verified.refresh_token || null;
          expiresIn = Number(verified.expires_in || 3600);
        }

        if (!accessToken || !refreshToken) {
          throw new Error("This sign-in link is invalid, expired, or not configured for the expected email flow. Request a new link and try again.");
        }

        const response = await fetch("/api/auth/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: expiresIn,
          }),
        });
        const result = (await response.json().catch(() => ({}))) as { error?: string };
        if (!response.ok) throw new Error(result.error || "Could not complete sign-in.");

        if (!cancelled) window.location.replace(flow === "signup" ? "/set-password" : flow === "reset" ? "/reset-password" : "/account");
      } catch (cause) {
        if (!cancelled) {
          setFailed(true);
          setMessage(cause instanceof Error ? cause.message : "Could not complete sign-in. Please request a new link.");
        }
      }
    }

    void completeSignIn();
    return () => { cancelled = true; };
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 text-slate-900">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${failed ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`} aria-hidden="true">
          {failed ? "!" : "✓"}
        </div>
        <h1 className="mt-5 text-2xl font-extrabold">{failed ? "Sign-in link not accepted" : "Signing you in"}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600" role={failed ? "alert" : "status"}>{message}</p>
        {failed ? <Link href="/login" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700">Request a new link</Link> : null}
      </section>
    </main>
  );
}
