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
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      const expiresIn = Number(params.get("expires_in") || 3600);

      window.history.replaceState(null, "", "/auth/callback");

      if (authError) {
        if (!cancelled) {
          setFailed(true);
          setMessage(authError.replace(/\+/g, " "));
        }
        return;
      }

      if (!accessToken || !refreshToken) {
        if (!cancelled) {
          setFailed(true);
          setMessage("This sign-in link is invalid, expired, or not configured for the expected email flow. Request a new link and try again.");
        }
        return;
      }

      try {
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

        if (!cancelled) window.location.replace("/account");
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
