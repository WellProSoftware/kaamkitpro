"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import BrandLogo from "@/components/BrandLogo";

type AuthIdentifier = { email?: string; phone?: string };
type AuthSession = { access_token?: string; refresh_token?: string; expires_in?: number };
type AuthResponse = AuthSession & { msg?: string; message?: string; error_description?: string; user?: { id?: string } };

export default function LoginPage() {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [identifierType, setIdentifierType] = useState<"email" | "phone">("email");
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">("password");
  const [fullName, setFullName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [awaitingOtp, setAwaitingOtp] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  function identifierPayload(value: string): AuthIdentifier {
    return identifierType === "email"
      ? { email: value.trim().toLowerCase() }
      : { phone: value.trim().replace(/[\s()-]/g, "") };
  }

  async function requestJson(path: string, body: Record<string, unknown>): Promise<AuthResponse> {
    if (!supabaseUrl || !publishableKey) throw new Error("Account access is temporarily unavailable. Please try again later.");
    const response = await fetch(`${supabaseUrl}/auth/v1/${path}`, {
      method: "POST",
      headers: { apikey: publishableKey, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const result = (await response.json().catch(() => ({}))) as AuthResponse;
    if (!response.ok) {
      throw new Error(result.message || result.msg || result.error_description || "We could not complete that request. Check your details and try again.");
    }
    return result;
  }

  async function establishSession(result: AuthResponse) {
    if (!result.access_token || !result.refresh_token) return false;
    const response = await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: result.access_token,
        refresh_token: result.refresh_token,
        expires_in: result.expires_in,
      }),
    });
    const payload = (await response.json().catch(() => ({}))) as { error?: string };
    if (!response.ok) throw new Error(payload.error || "We could not start your session. Please try again.");
    window.location.replace("/account");
    return true;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setBusy(true);
    try {
      if (!supabaseUrl || !publishableKey) {
        throw new Error("Account access is temporarily unavailable. Please try again later.");
      }
      const identity = identifierPayload(identifier);
      if (awaitingOtp) {
        if (!/^\d{6}$/.test(otp.trim())) throw new Error("Enter the 6-digit code we sent you.");
        const result = await requestJson("verify", {
          ...identity,
          token: otp.trim(),
          type: identifierType === "phone" ? "sms" : mode === "signup" ? "signup" : "email",
        });
        if (!(await establishSession(result))) {
          throw new Error("The code was accepted but no session was returned. Please request a new code.");
        }
        return;
      }

      if (mode === "signup") {
        if (fullName.trim().length < 2) throw new Error("Enter your name to create your account.");
        if (password.length < 10) throw new Error("Create a password with at least 10 characters.");
        const result = await requestJson("signup", {
          ...identity,
          password,
          data: { full_name: fullName.trim(), display_name: fullName.trim() },
        });
        if (await establishSession(result)) return;
        setAwaitingOtp(true);
        setNotice(`We sent a verification code to your ${identifierType === "email" ? "email" : "mobile"}. Enter it here to finish creating your account.`);
        return;
      }

      if (loginMethod === "password") {
        if (!password) throw new Error("Enter your password.");
        const result = await requestJson("token?grant_type=password", { ...identity, password });
        if (!(await establishSession(result))) throw new Error("Sign-in did not return a valid session.");
        return;
      }

      await requestJson("otp", {
        ...identity,
        create_user: false,
      });
      setAwaitingOtp(true);
      setNotice(`We sent a one-time code to your ${identifierType === "email" ? "email" : "mobile"}. Enter it here to sign in.`);
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
    window.location.assign(
      `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectTo)}`,
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 text-slate-900">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
        <div className="mb-8 flex items-center justify-between gap-4">
          <BrandLogo />
          <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-900">Home</Link>
        </div>

        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">KaamKitPro account</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight">
          {awaitingOtp ? "Verify your code" : mode === "signup" ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-3 leading-7 text-slate-600">
          {awaitingOtp
            ? "Stay on this page and enter the 6-digit code. No sign-in link is needed."
            : "Use email or mobile OTP, a password, or continue securely with Google."}
        </p>

        {!awaitingOtp ? (
          <>
            <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
              <button type="button" onClick={() => { setMode("signup"); setLoginMethod("password"); setError(""); setNotice(""); }} className={`min-h-10 rounded-lg px-3 text-sm font-bold ${mode === "signup" ? "bg-white text-blue-700 shadow-sm" : "text-slate-600"}`}>Create account</button>
              <button type="button" onClick={() => { setMode("login"); setError(""); setNotice(""); }} className={`min-h-10 rounded-lg px-3 text-sm font-bold ${mode === "login" ? "bg-white text-blue-700 shadow-sm" : "text-slate-600"}`}>Sign in</button>
            </div>

            <button type="button" onClick={signInWithGoogle} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-300 px-4 py-3 font-bold transition hover:bg-slate-50">
              <span aria-hidden="true" className="text-lg font-extrabold">G</span> Continue with Google
            </button>
            <div className="my-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-slate-400"><span className="h-px flex-1 bg-slate-200" />or use email/mobile<span className="h-px flex-1 bg-slate-200" /></div>

            <div className="mb-4 flex gap-2">
              <button type="button" onClick={() => { setIdentifierType("email"); setIdentifier(""); setError(""); setNotice(""); }} className={`flex-1 rounded-xl border px-3 py-2 text-sm font-bold ${identifierType === "email" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-300"}`}>Email</button>
              <button type="button" onClick={() => { setIdentifierType("phone"); setIdentifier(""); setError(""); setNotice(""); }} className={`flex-1 rounded-xl border px-3 py-2 text-sm font-bold ${identifierType === "phone" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-300"}`}>Mobile number</button>
            </div>

            {mode === "login" ? (
              <div className="mb-4 flex gap-4 text-sm">
                <label className="flex items-center gap-2"><input type="radio" checked={loginMethod === "password"} onChange={() => setLoginMethod("password")} />Password</label>
                <label className="flex items-center gap-2"><input type="radio" checked={loginMethod === "otp"} onChange={() => setLoginMethod("otp")} />One-time code</label>
              </div>
            ) : null}
          </>
        ) : (
          <div className="mt-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-900">
            <p className="font-bold">Code sent to {identifier}</p>
            <p className="mt-1">If you don't see it, check your inbox or SMS and spam folder.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {!awaitingOtp && mode === "signup" ? (
            <label className="block text-sm font-semibold text-slate-700">
              Full name
              <input required autoComplete="name" minLength={2} maxLength={100} value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Your full name" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
            </label>
          ) : null}
          {!awaitingOtp ? (
            <label className="block text-sm font-semibold text-slate-700">
              {identifierType === "email" ? "Email address" : "Mobile number"}
              <input
                required
                autoComplete={identifierType === "email" ? "email" : "tel"}
                type={identifierType === "email" ? "email" : "tel"}
                inputMode={identifierType === "email" ? "email" : "tel"}
                maxLength={identifierType === "email" ? 254 : 20}
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                placeholder={identifierType === "email" ? "you@example.com" : "+91 98765 43210"}
                className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>
          ) : (
            <label className="block text-sm font-semibold text-slate-700">
              6-digit verification code
              <input required autoComplete="one-time-code" inputMode="numeric" pattern="[0-9]{6}" minLength={6} maxLength={6} value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="123456" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3 text-center text-xl tracking-[0.4em] outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
            </label>
          )}
          {!awaitingOtp && (mode === "signup" || loginMethod === "password") ? (
            <label className="block text-sm font-semibold text-slate-700">
              {mode === "signup" ? "Create password" : "Password"}
              <input required type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={mode === "signup" ? 10 : 1} maxLength={128} value={password} onChange={(event) => setPassword(event.target.value)} placeholder={mode === "signup" ? "At least 10 characters" : "Your password"} className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
              {mode === "signup" ? <span className="mt-1 block text-xs font-normal text-slate-500">Use at least 10 characters. Never share your password or OTP.</span> : null}
            </label>
          ) : null}

          {notice ? <p className="rounded-xl bg-emerald-50 p-3 text-sm leading-6 text-emerald-900" role="status">{notice}</p> : null}
          {error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p> : null}
          <button type="submit" disabled={busy} className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
            {busy ? "Please wait…" : awaitingOtp ? "Verify code and continue" : mode === "signup" ? "Create account and send OTP" : loginMethod === "otp" ? "Send one-time code" : "Sign in"}
          </button>
          {awaitingOtp ? <button type="button" disabled={busy} onClick={() => { setAwaitingOtp(false); setOtp(""); setNotice(""); setError(""); }} className="w-full py-2 text-sm font-bold text-slate-600 underline underline-offset-4">Change details or try again</button> : null}
        </form>

        <p className="mt-6 text-xs leading-5 text-slate-500">
          By continuing, you agree to use your account responsibly. Sessions are maintained securely until sign-out or expiry. Pro checkout remains disabled until payment setup and testing are complete.
        </p>
      </section>
    </main>
  );
}
