"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BrandLogo from "@/components/BrandLogo";

type AccountUser = { id: string; email: string | null };
type AccountSubscription = {
  id: string;
  status: string;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  plan: { name: string; billingInterval: "month" | "year"; amountMinor: number; currency: string } | null;
};

export default function AccountPage() {
  const [user, setUser] = useState<AccountUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [subscription, setSubscription] = useState<AccountSubscription | null>(null);
  const [cancelBusy, setCancelBusy] = useState(false);
  const [billingMessage, setBillingMessage] = useState("");
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
          const access = (await accessResponse.json().catch(() => ({}))) as { isAdmin?: boolean; isPro?: boolean };
          if (!cancelled) {
            setIsAdmin(access.isAdmin === true);
            setIsPro(access.isPro === true);
          }
        }
        const billingResponse = await fetch("/api/billing/subscription", { cache: "no-store" }).catch(() => null);
        if (billingResponse?.ok) {
          const billing = (await billingResponse.json().catch(() => ({}))) as { subscription?: AccountSubscription | null };
          if (!cancelled) setSubscription(billing.subscription || null);
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

  async function cancelSubscription() {
    if (!subscription || cancelBusy) return;
    const confirmed = window.confirm("Schedule cancellation at the end of your current billing period? Pro access remains active until that period ends.");
    if (!confirmed) return;

    setCancelBusy(true);
    setBillingMessage("");
    try {
      const response = await fetch("/api/billing/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription_id: subscription.id }),
        cache: "no-store",
      });
      const result = await response.json().catch(() => ({})) as { scheduled?: boolean; cancelled?: boolean; error?: string };
      if (!response.ok) throw new Error(result.error || "Cancellation could not be scheduled.");
      setBillingMessage(result.scheduled
        ? "Cancellation is scheduled for the end of your current billing period. Pro access remains active until then."
        : "Your subscription has ended.");
      const refreshed = await fetch("/api/billing/subscription", { cache: "no-store" });
      if (refreshed.ok) {
        const billing = await refreshed.json().catch(() => ({})) as { subscription?: AccountSubscription | null };
        setSubscription(billing.subscription || null);
      }
      const accessResponse = await fetch("/api/access", { cache: "no-store" });
      if (accessResponse.ok) {
        const access = await accessResponse.json().catch(() => ({})) as { isPro?: boolean };
        setIsPro(access.isPro === true);
      }
    } catch (cause) {
      setBillingMessage(cause instanceof Error ? cause.message : "Cancellation could not be scheduled.");
    } finally {
      setCancelBusy(false);
    }
  }

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

          <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            {subscription?.status === "active" ? (
              <>
                <h2 className="font-bold text-emerald-900">Pro subscription active</h2>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {subscription.plan?.name || "KaamKitPro Pro"} — {subscription.plan ? `₹${(subscription.plan.amountMinor / 100).toFixed(0)}/${subscription.plan.billingInterval === "month" ? "month" : "year"}` : "paid plan"}.
                  {subscription.currentPeriodEnd ? ` Current period ends ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}.` : ""}
                </p>
                {subscription.cancelAtPeriodEnd ? (
                  <p className="mt-3 text-sm font-semibold text-amber-800">Cancellation scheduled. Pro access remains active until the current period ends.</p>
                ) : (
                  <button type="button" onClick={() => void cancelSubscription()} disabled={cancelBusy} className="mt-4 rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold hover:border-red-300 hover:text-red-700 disabled:opacity-60">
                    {cancelBusy ? "Scheduling cancellation…" : "Cancel auto-renewal"}
                  </button>
                )}
              </>
            ) : subscription && (subscription.status === "incomplete" || subscription.status === "past_due" || subscription.status === "trialing") ? (
              <>
                <h2 className="font-bold text-amber-950">Subscription confirmation pending</h2>
                <p className="mt-2 text-sm leading-6 text-slate-700">Current status: {subscription.status}. Pro access is enabled only after Razorpay verifies an active subscription.</p>
                <button type="button" onClick={() => window.location.reload()} className="mt-4 rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold">Refresh status</button>
              </>
            ) : isPro ? (
              <>
                <h2 className="font-bold text-emerald-900">Pro access is active</h2>
                <p className="mt-2 text-sm leading-6 text-slate-700">Your account currently has Pro access. All KaamKitPro ads are disabled while the eligible access grant or subscription remains active.</p>
              </>
            ) : (
              <>
                <h2 className="font-bold text-slate-900">Choose Pro for an ad-free experience</h2>
                <p className="mt-2 text-sm leading-6 text-slate-700">Free tools remain available. Pro removes ads site-wide while a verified paid subscription is active.</p>
                <Link href="/pricing" className="mt-4 inline-flex font-bold text-blue-700 underline underline-offset-4">View Pro plans</Link>
              </>
            )}
            {billingMessage ? <p role="status" aria-live="polite" className="mt-4 rounded-xl bg-white p-3 text-sm text-slate-700">{billingMessage}</p> : null}
          </div>
        </section>
      </div>
    </main>
  );
}
