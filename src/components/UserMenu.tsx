"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type SessionUser = { id: string; email: string | null; fullName?: string | null };
type AccessInfo = { isAdmin?: boolean; isPro?: boolean; plan?: string };
type SubscriptionInfo = {
  status?: string;
  currentPeriodEnd?: string | null;
  plan?: { name?: string; billingInterval?: "month" | "year"; amountMinor?: number; currency?: string } | null;
};

function displayAmount(subscription: SubscriptionInfo | null) {
  if (!subscription?.plan || typeof subscription.plan.amountMinor !== "number") return null;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: subscription.plan.currency || "INR",
    maximumFractionDigits: 0,
  }).format(subscription.plan.amountMinor / 100);
}

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [access, setAccess] = useState<AccessInfo | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [signingOut, setSigningOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    async function loadAccount() {
      try {
        const response = await fetch("/api/auth/session", { cache: "no-store" });
        if (!response.ok) {
          if (active) setUser(null);
          return;
        }
        const data = await response.json().catch(() => ({})) as { user?: SessionUser };
        if (!active || !data.user) return;
        setUser(data.user);
        const [accessResponse, billingResponse] = await Promise.all([
          fetch("/api/access", { cache: "no-store" }).catch(() => null),
          fetch("/api/billing/subscription", { cache: "no-store" }).catch(() => null),
        ]);
        if (accessResponse?.ok) {
          const value = await accessResponse.json().catch(() => ({})) as AccessInfo;
          if (active) setAccess(value);
        }
        if (billingResponse?.ok) {
          const value = await billingResponse.json().catch(() => ({})) as { subscription?: SubscriptionInfo | null };
          if (active) setSubscription(value.subscription || null);
        }
      } catch {
        if (active) setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    }
    void loadAccount();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) setOpen(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  async function signOut() {
    setSigningOut(true);
    try { await fetch("/api/auth/session", { method: "DELETE" }); } catch { /* Redirect also clears the visible signed-in state. */ }
    window.location.replace("/");
  }

  const name = user?.fullName?.trim() || user?.email?.split("@")[0] || "My account";
  const initials = name.split(/[\s._-]+/).filter(Boolean).slice(0, 2).map(part => part[0]?.toUpperCase()).join("") || "U";
  const amount = displayAmount(subscription);
  const interval = subscription?.plan?.billingInterval === "year" ? "/year" : subscription?.plan?.billingInterval === "month" ? "/month" : "";

  return (
    <div ref={menuRef} className="fixed right-4 top-4 z-[120] sm:right-6 sm:top-5">
      <button
        type="button"
        onClick={() => setOpen(value => !value)}
        aria-label={loading ? "Account menu loading" : user ? "Open account menu" : "Login or create account"}
        aria-expanded={open}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-bold text-slate-800 shadow-lg transition hover:border-blue-400 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
      >
        {user ? initials : <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.5-4 3-6 7-6s6.5 2 7 6"/></svg>}
      </button>

      {open ? (
        <div className="absolute right-0 mt-2 w-[min(88vw,320px)] overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl">
          {user ? (
            <>
              <div className="border-b border-slate-100 bg-slate-50 px-4 py-4">
                <p className="font-semibold">{name}</p>
                <p className="mt-0.5 break-all text-xs text-slate-500">{user.email}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${access?.isPro ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"}`}>{access?.isAdmin ? "Admin access" : access?.isPro ? "Pro plan" : "Free plan"}</span>
                  {subscription?.status ? <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800">{subscription.status.replaceAll("_", " ")}</span> : null}
                </div>
                {subscription?.plan ? <p className="mt-2 text-xs text-slate-600">{subscription.plan.name || "Subscription"}{amount ? ` · ${amount}${interval}` : ""}</p> : null}
                {subscription?.currentPeriodEnd ? <p className="mt-1 text-xs text-slate-500">Current period ends: {new Date(subscription.currentPeriodEnd).toLocaleDateString("en-IN")}</p> : null}
              </div>
              <nav aria-label="Account menu" className="p-2">
                <Link href="/account" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm hover:bg-slate-100">My Account & Payment Details</Link>
                {!access?.isPro && !access?.isAdmin ? <Link href="/pricing" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50">Upgrade Plan</Link> : null}
                {access?.isAdmin ? <>
                  <Link href="/admin/access" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm hover:bg-slate-100">Admin Access Management</Link>
                  <Link href="/admin/support" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm hover:bg-slate-100">Support Inbox</Link>
                </> : null}
                <button type="button" onClick={signOut} disabled={signingOut} className="mt-1 block w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60">{signingOut ? "Signing out…" : "Logout / Sign out"}</button>
              </nav>
            </>
          ) : (
            <div className="p-4">
              <p className="font-semibold">Welcome to KaamKitPro</p>
              <p className="mt-1 text-sm text-slate-600">Sign in to manage your account, plan and support messages.</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link href="/login?mode=login" onClick={() => setOpen(false)} className="rounded-xl bg-blue-600 px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-700">Login</Link>
                <Link href="/login?mode=signup" onClick={() => setOpen(false)} className="rounded-xl border border-slate-300 px-3 py-2.5 text-center text-sm font-semibold hover:bg-slate-50">Sign up</Link>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
