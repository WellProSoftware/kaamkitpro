"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import BrandLogo from "@/components/BrandLogo";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/session", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Your password reset link is missing or expired. Please request a new reset link.");
        if (!cancelled) setReady(true);
      })
      .catch((cause) => {
        if (!cancelled) {
          setError(cause instanceof Error ? cause.message : "Please open the password reset link from your email before setting a new password.");
        }
      });
    return () => { cancelled = true; };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password.length < 10) { setError("Use at least 10 characters for your password."); return; }
    if (password !== confirmPassword) { setError("The passwords do not match."); return; }
    setBusy(true);
    try {
      const response = await fetch("/api/auth/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        cache: "no-store",
      });
      const result = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Password could not be saved. Please try again.");
      window.location.replace("/account?passwordReset=1");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Password could not be saved. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 text-slate-900">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
        <div className="mb-8 flex items-center justify-between gap-4"><BrandLogo /><Link href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-900">Home</Link></div>
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Secure password reset</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Create a new password</h1>
        <p className="mt-3 leading-7 text-slate-600">Your secure reset link is verified. Choose a new password for your existing account.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-sm font-semibold text-slate-700">New password
            <input required type="password" autoComplete="new-password" minLength={10} maxLength={128} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 10 characters" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
          </label>
          <label className="block text-sm font-semibold text-slate-700">Confirm password
            <input required type="password" autoComplete="new-password" minLength={10} maxLength={128} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Enter the same password again" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
          </label>
          {error ? <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
          <button type="submit" disabled={!ready || busy} className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">{busy ? "Saving password…" : ready ? "Save password and continue" : "Checking email verification…"}</button>
        </form>
        <p className="mt-6 text-xs leading-5 text-slate-500">Use at least 10 characters. Never share your password or verification link.</p>
      </section>
    </main>
  );
}
