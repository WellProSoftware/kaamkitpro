"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import BrandLogo from "@/components/BrandLogo";

type AuthSession = { access_token?: string; refresh_token?: string; expires_in?: number };
type AuthResponse = AuthSession & { msg?: string; message?: string; error_description?: string; user?: { id?: string; identities?: Array<{ id?: string }> | null; email?: string; email_confirmed_at?: string | null } };

export default function LoginPage() {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [signupSent, setSignupSent] = useState(false);
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
        const existingAccount = result.user?.identities?.length === 0;
        if (existingAccount) {
          // Supabase deliberately avoids revealing account state in the signup response.
          // Request a fresh link; verified users can ignore it and use the sign-in form.
          await requestJson("resend", { type: "signup", email: normalizedEmail, options: { emailRedirectTo: redirectTo } });
        }
        if (result.access_token || result.refresh_token) {
          throw new Error("Email confirmation must be enabled in Supabase Auth before signup can continue. Please contact support; do not sign in until your email is verified.");
        }
        setNotice(existingAccount
          ? "An account already exists with this email address. If you have not verified it yet, a fresh verification link has been requested. If your email is already verified, switch to Sign in and use your email and password."
          : "Verification email sent. Please check your inbox (and spam folder), open the verification link within 5 minutes, and create your password to finish setting up your account.");
        setSignupSent(true);
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

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 text-slate-900">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
        <div className="mb-8 flex items-center justify-between gap-4"><BrandLogo /><Link href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-900">Home</Link></div>
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">KaamKitPro account</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight">{mode === "signup" ? "Create your account" : "Welcome back"}</h1>
        <p className="mt-3 leading-7 text-slate-600">{mode === "signup" ? "Enter your name and email address. We’ll send you a verification link so you can verify your email and create your password." : "Sign in with your email address and password."}</p>
        {!signupSent || mode !== "signup" ? <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
          <button type="button" onClick={() => { setMode("signup"); setError(""); setNotice(""); setSignupSent(false); }} className={`min-h-10 rounded-lg px-3 text-sm font-bold ${mode === "signup" ? "bg-white text-blue-700 shadow-sm" : "text-slate-600"}`}>Create account</button>
          <button type="button" onClick={() => { setMode("login"); setError(""); setNotice(""); setSignupSent(false); }} className={`min-h-10 rounded-lg px-3 text-sm font-bold ${mode === "login" ? "bg-white text-blue-700 shadow-sm" : "text-slate-600"}`}>Sign in</button>
        </div> : null}
        {signupSent && mode === "signup" ? <div className="mt-6 rounded-2xl bg-emerald-50 p-5 text-emerald-950" role="status"><h2 className="text-lg font-bold">Check your email</h2><p className="mt-2 text-sm leading-6">{notice}</p><p className="mt-3 text-sm leading-6">Once your email is verified, follow the link to create and confirm your password. You can then sign in to your account.</p><button type="button" onClick={async () => { setError(""); setBusy(true); try { const normalizedEmail = email.trim().toLowerCase(); if (!normalizedEmail) throw new Error("Enter your email address first."); const redirectTo = `${window.location.origin}/auth/callback?flow=signup`; await requestJson("resend", { type: "signup", email: normalizedEmail, options: { emailRedirectTo: redirectTo } }); setNotice("A new verification email has been requested. Please check your inbox and spam folder."); } catch (cause) { setError(cause instanceof Error ? cause.message : "We could not resend the verification email. Please try again later."); } finally { setBusy(false); } }} disabled={busy} className="mt-4 block font-bold text-blue-700 underline disabled:opacity-60">{busy ? "Please wait…" : "Resend verification email"}</button><button type="button" onClick={() => { setMode("login"); setError(""); setNotice(""); setSignupSent(false); }} className="mt-3 font-bold text-blue-700 underline">Already verified? Sign in</button></div> : null}
        {!(signupSent && mode === "signup") ? <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {mode === "signup" ? <label className="block text-sm font-semibold text-slate-700">Full name<input required autoComplete="name" minLength={2} maxLength={100} value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Your full name" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label> : null}
          <label className="block text-sm font-semibold text-slate-700">Email address<input required autoComplete="email" type="email" inputMode="email" maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label>
          {mode === "login" ? <label className="block text-sm font-semibold text-slate-700">Password<input required type="password" autoComplete="current-password" maxLength={128} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your password" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label> : <p className="text-xs leading-5 text-slate-500">You’ll set your password after clicking the verification link in your email.</p>}
          {error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p> : null}
          <button type="submit" disabled={busy} className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">{busy ? "Please wait…" : mode === "signup" ? "Send verification email" : "Sign in"}</button>
        </form> : null}
        <p className="mt-6 text-xs leading-5 text-slate-500">Your account can show your profile, subscription/payment status and account activity. Never share your password or verification link.</p>
      </section>
    </main>
  );
}
