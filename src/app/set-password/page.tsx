"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function SetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if (password.length < 10) { setError("Use at least 10 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setBusy(true);
    try {
      const response = await fetch("/api/auth/password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Could not save your password.");
      window.location.replace("/account");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not save your password. Please try again."); }
    finally { setBusy(false); }
  }
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 text-slate-900"><section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><p className="text-sm font-bold uppercase tracking-widest text-blue-600">Email verified</p><h1 className="mt-3 text-3xl font-extrabold">Create your password</h1><p className="mt-3 text-sm leading-6 text-slate-600">Choose a password to finish setting up your KaamKitPro account. You will use your email and this password to sign in next time.</p><form onSubmit={submit} className="mt-6 space-y-4"><label className="block text-sm font-semibold">Password<input required type="password" autoComplete="new-password" minLength={10} maxLength={128} value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 10 characters" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3" /></label><label className="block text-sm font-semibold">Confirm password<input required type="password" autoComplete="new-password" minLength={10} maxLength={128} value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Enter it again" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3" /></label>{error ? <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}<button disabled={busy} className="min-h-12 w-full rounded-xl bg-blue-600 px-4 py-3 font-bold text-white disabled:opacity-60">{busy ? "Saving…" : "Save password"}</button></form><p className="mt-5 text-sm text-slate-500"><Link href="/login" className="font-semibold text-blue-700 underline">Back to sign in</Link></p></section></main>;
}
