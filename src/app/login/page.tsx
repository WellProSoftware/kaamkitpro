"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import BrandLogo from "@/components/BrandLogo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSent(false);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!supabaseUrl || !publishableKey) {
      setError("Login is temporarily unavailable. Please try again later.");
      return;
    }

    setBusy(true);
    try {
      const redirectTo = `${window.location.origin}/auth/callback`;
      const response = await fetch(
        `${supabaseUrl.replace(/\/$/, "")}/auth/v1/otp?redirect_to=${encodeURIComponent(redirectTo)}`,
        {
          method: "POST",
          headers: {
            apikey: publishableKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email.trim(), create_user: true }),
        },
      );

      if (!response.ok) {
        const detail = (await response.json().catch(() => ({}))) as {
          message?: string;
          msg?: string;
          error_description?: string;
        };
        throw new Error(detail.message || detail.msg || detail.error_description || "Could not send the sign-in email.");
      }

      setSent(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not send the sign-in email. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 text-slate-900">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
        <div className="mb-8 flex items-center justify-between gap-4">
          <BrandLogo />
          <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-900">Home</Link>
        </div>

        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">KaamKitPro account</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Sign in with email</h1>
        <p className="mt-3 leading-7 text-slate-600">
          We’ll email you a secure sign-in link. No password to remember.
        </p>

        {sent ? (
          <div className="mt-7 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900" role="status">
            <strong>Check your inbox.</strong>
            <p className="mt-1">If the address can receive sign-in links, an email is on its way to {email.trim()}. Open it in this browser to finish signing in.</p>
            <button type="button" onClick={() => setSent(false)} className="mt-3 font-bold underline underline-offset-4">Try another email</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700">Email address</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            {error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p> : null}
            <button
              type="submit"
              disabled={busy}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? "Sending link…" : "Email me a sign-in link"}
            </button>
          </form>
        )}

        <p className="mt-6 text-xs leading-5 text-slate-500">
          By signing in, you agree to use your account responsibly. Pro plans and payment checkout are not active yet.
        </p>
      </section>
    </main>
  );
}
