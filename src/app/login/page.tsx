"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import BrandLogo from "@/components/BrandLogo";

type AuthSession = { access_token?: string; refresh_token?: string; expires_in?: number };
type AuthResponse = AuthSession & { msg?: string; message?: string; error_description?: string };

export default function LoginPage() {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  async function requestJson(path: string, body: Record<string, unknown>): Promise<AuthResponse> {
    if (!supabaseUrl || !publishableKey) throw new Error("Account access is temporarily unavailable. Please try again later.");
    const response = await fetch(`${supabaseUrl}/auth/v1/${path}`, {
      method: "POST",
      headers: { apikey: publishableKey, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const result = (await response.json().catch(() => ({}))) as AuthResponse;
    if (!response.ok) throw new Error(result.message || result.msg || result.error_description || "We could not complete that request. Check your details and try again.");
    return result;
  }

  function randomTemporaryPassword() {
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join("") + "aA1!";
  }

  async function establishSession(result: AuthResponse, destination = "/account") {
    if (!result.access_token || !result.refresh_token) return false;
    const response = await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_token: result.access_token, refresh_token: result.refresh_token, expires_in: result.expires_in }),
    });
    const payload = (await response.json().catch(() => ({}))) as { error?: string };
    if (!response.ok) throw new Error(payload.error || "We could not start your session. Please try again.");
    window.location.replace(destination);
    return true;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setBusy(true);
    try {
      if (!supabaseUrl || !publishableKey) throw new Error("Account access is temporarily unavailable. Please try again later.");
      const normalizedEmail = email.trim().toLowerCase();
      if (mode === "signup") {
        if (fullName.trim().length < 2) throw new Error("Enter your full name.");
        const redirectTo = `${window.location.origin}/auth/callback?flow=signup`;
        const result = await requestJson(`signup?redirect_to=${encodeURIComponent(redirectTo)}`, {
          email: normalizedEmail,
          password: randomTemporaryPassword(),
          data: { full_name: fullName.trim(), display_name: fullName.trim(), account_setup_required: true },
        });
        if (await establishSession(result, "/set-password")) return;
        setNotice("Verification email sent. Open the link in your email; after verification, you will create your password.");
        return;
      }
      if (!password) throw new Error("Enter your password.");
      const result = await requestJson("token?grant_type=password", { email: normalizedEmail, password });
      if (!(await establishSession(result))) throw new Error("Sign-in did not return a valid session. If email confirmation is enabled, confirm your email first.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function signInWithGoogle() {
    setError("");
    if (!supabaseUrl || !publishableKey) {
      setError("Google sign-in is temporarily unavailable. Please try again later.");
      return;
    }
    const redirectTo = `${window.location.origin}/auth/callback`;
    window.location.assign(`${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectTo)}`);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 text-slate-900">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
        <div className="mb-8 flex items-center justify-between gap-4"><BrandLogo /><Link href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-900">Home</Link></div>
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">KaamKitPro account</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight">{mode === "signup" ? "Create your account" : "Welcome back"}</h1>
        <p className="mt-3 leading-7 text-slate-600">{mode === "signup" ? "Enter your details. We’ll email you a verification link; after you verify, you’ll create your password." : "Sign in with your verified email and password, or continue securely with Google."}</p>
        <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
          <button type="button" onClick={() => { setMode("signup"); setError(""); setNotice(""); }} className={`min-h-10 rounded-lg px-3 text-sm font-bold ${mode === "signup" ? "bg-white text-blue-700 shadow-sm" : "text-slate-600"}`}>Create account</button>
          <button type="button" onClick={() => { setMode("login"); setError(""); setNotice(""); }} className={`min-h-10 rounded-lg px-3 text-sm font-bold ${mode === "login" ? "bg-white text-blue-700 shadow-sm" : "text-slate-600"}`}>Sign in</button>
        </div>
        <button type="button" onClick={signInWithGoogle} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-300 px-4 py-3 font-bold transition hover:bg-slate-50"><span aria-hidden="true" className="text-lg font-extrabold">G</span> Continue with Google</button>
        <div className="my-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-slate-400"><span className="h-px flex-1 bg-slate-200" />or use email and password<span className="h-px flex-1 bg-slate-200" /></div>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {mode === "signup" ? <label className="block text-sm font-semibold text-slate-700">Full name<input required autoComplete="name" minLength={2} maxLength={100} value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Your full name" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label> : null}
          <label className="block text-sm font-semibold text-slate-700">Email address<input required autoComplete="email" type="email" inputMode="email" maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label>
          {mode === "login" ? <label className="block text-sm font-semibold text-slate-700">Password<input required type="password" autoComplete="current-password" maxLength={128} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your password" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label> : <p className="text-xs leading-5 text-slate-500">You’ll set your password after clicking the verification link in your email.</p>}
          {notice ? <p className="rounded-xl bg-emerald-50 p-3 text-sm leading-6 text-emerald-900" role="status">{notice}</p> : null}
          {error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p> : null}
          <button type="submit" disabled={busy} className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">{busy ? "Please wait…" : mode === "signup" ? "Send verification email" : "Sign in"}</button>
        </form>
        <p className="mt-6 text-xs leading-5 text-slate-500">Your account can show your profile, subscription/payment status and account activity. Never share your password or verification link.</p>
      </section>
    </main>
  );
}
