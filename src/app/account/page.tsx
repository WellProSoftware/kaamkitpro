"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BrandLogo from "@/components/BrandLogo";

type AccountUser = { id: string; email: string | null };

export default function AccountPage() {
  const [user, setUser] = useState<AccountUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/session", { cache: "no-store" })
      .then(async (response) => {
        const result = (await response.json().catch(() => ({}))) as { user?: AccountUser; error?: string };
        if (response.status === 401) {
          window.location.replace("/login");
          return;
        }
        if (!response.ok || !result.user) throw new Error(result.error || "Unable to load your account.");
        if (!cancelled) setUser(result.user);
        const accessResponse = await fetch("/api/access", { cache: "no-store" }).catch(() => null);
        if (accessResponse?.ok) {
          const access = (await accessResponse.json().catch(() => ({}))) as { isAdmin?: boolean };
          if (!cancelled) setIsAdmin(access.isAdmin === true);
        }
      })
      .catch((cause) => {
        if (!cancelled) setError(cause instanceof Error ? cause.message : "Unable to load your account.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  async function signOut() {
    await fetch("/api/auth/session", { method: "DELETE" }).catch(() => undefined);
    window.location.replace("/login");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <header className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4">
          <BrandLogo />
          <div className="flex items-center gap-3">
            {isAdmin ? <Link href="/admin/access" className="text-sm font-bold text-blue-700 hover:underline">Admin access</Link> : null}
            <button onClick={signOut} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold hover:border-blue-400 hover:text-blue-700">Sign out</button>
          </div>
        </header>

        <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Your account</p>
          <h1 className="mt-3 text-3xl font-extrabold">Welcome to KaamKitPro</h1>
          {loading ? <p className="mt-5 text-slate-600" role="status">Loading your account…</p> : null}
          {error ? <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p> : null}
          {user ? (
            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Signed in as</p>
              <p className="mt-1 break-all font-semibold">{user.email || "Email not available"}</p>
              <p className="mt-2 text-xs text-slate-500">Account ID: {user.id}</p>
            </div>
          ) : null}

          <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="font-bold text-amber-950">Pro subscriptions are not active yet</h2>
            <p className="mt-2 text-sm leading-6 text-amber-900">
              Your account is ready. We’ll enable checkout only after Razorpay test verification, webhook handling and subscription access checks are complete.
            </p>
            <Link href="/pricing" className="mt-4 inline-flex font-bold text-blue-700 underline underline-offset-4">View planned plans</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
