"use client";

import { useState } from "react";

type CheckoutResponse = {
  key_id: string;
  subscription_id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  prefill?: { email?: string };
};

type RazorpaySuccess = {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  subscription_id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  prefill?: { email?: string };
  theme: { color: string };
  handler: (response: RazorpaySuccess) => void | Promise<void>;
  modal: { ondismiss: () => void };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void; on: (event: string, callback: (response: { error?: { description?: string } }) => void) => void };
  }
}

async function loadRazorpayCheckout() {
  if (window.Razorpay) return true;
  const existing = document.querySelector<HTMLScriptElement>('script[data-razorpay-checkout="true"]');
  if (existing) {
    await new Promise<void>((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Razorpay checkout could not load.")), { once: true });
    });
    return Boolean(window.Razorpay);
  }

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.dataset.razorpayCheckout = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Razorpay checkout could not load. Please try again."));
    document.body.appendChild(script);
  });
  return Boolean(window.Razorpay);
}

export default function ProSubscriptionCheckout() {
  const [consent, setConsent] = useState(false);
  const [busyPlan, setBusyPlan] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function startSubscription(planId: "pro-monthly-inr" | "pro-yearly-inr") {
    if (!consent) {
      setMessage("Please accept the recurring billing terms before continuing.");
      return;
    }
    setBusyPlan(planId);
    setMessage("");

    try {
      const checkoutResponse = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan_id: planId }),
        cache: "no-store",
      });
      const checkout = await checkoutResponse.json().catch(() => ({})) as Partial<CheckoutResponse> & { error?: string };
      if (!checkoutResponse.ok || !checkout.key_id || !checkout.subscription_id) {
        throw new Error(checkout.error || "Subscription checkout is not available yet.");
      }
      if (!checkout.key_id.startsWith("rzp_test_")) {
        throw new Error("Staging checkout is restricted to Razorpay Test Mode. No live payment was started.");
      }

      const loaded = await loadRazorpayCheckout();
      if (!loaded || !window.Razorpay) throw new Error("Razorpay checkout could not be initialized.");

      const razorpay = new window.Razorpay({
        key: checkout.key_id,
        subscription_id: checkout.subscription_id,
        name: checkout.name || "KaamKitPro",
        description: checkout.description || "KaamKitPro Pro subscription",
        amount: checkout.amount || 0,
        currency: checkout.currency || "INR",
        prefill: checkout.prefill,
        theme: { color: "#2563eb" },
        handler: async (response) => {
          try {
            const verifyResponse = await fetch("/api/billing/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
              cache: "no-store",
            });
            const verification = await verifyResponse.json().catch(() => ({})) as { verified?: boolean; pending?: boolean; error?: string };
            if (!verifyResponse.ok && verifyResponse.status !== 202) {
              throw new Error(verification.error || "Payment verification could not be completed.");
            }
            if (verification.verified) {
              setMessage("Payment verified. Refreshing your Pro access…");
              window.dispatchEvent(new Event("kaamkitpro:access-changed"));
              window.location.assign("/account?subscription=verified");
              return;
            }
            if (verification.pending) {
              setMessage("Payment confirmation is processing. Pro access will activate after Razorpay verification; please refresh your account shortly.");
              window.location.assign("/account?subscription=pending");
              return;
            }
            throw new Error(verification.error || "Payment is not verified yet. Please check your account before retrying.");
          } catch (error) {
            setMessage(error instanceof Error ? error.message : "Payment verification failed. Please contact support before retrying.");
          } finally {
            setBusyPlan(null);
          }
        },
        modal: {
          ondismiss: () => {
            setBusyPlan(null);
            setMessage("Checkout closed. No Pro access was granted.");
          },
        },
      });
      razorpay.on("payment.failed", (event) => {
        setBusyPlan(null);
        setMessage(event.error?.description || "Payment failed. No Pro access was granted.");
      });
      razorpay.open();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not start subscription checkout.");
      setBusyPlan(null);
    }
  }

  return (
    <section aria-labelledby="pro-plan-heading" className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm sm:p-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">KaamKitPro Pro</p>
        <h2 id="pro-plan-heading" className="mt-2 text-2xl font-extrabold text-slate-900">Use every tool without ads</h2>
        <p className="mt-3 leading-7 text-slate-600">An active, verified Pro subscription removes KaamKitPro ads across the site. Free tools remain available without a subscription.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-900">Monthly Pro</h3>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">₹99<span className="text-base font-semibold text-slate-500">/month</span></p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Recurring subscription. Renewal amount and date are shown during Razorpay authorization.</p>
            <button type="button" disabled={busyPlan !== null} onClick={() => void startSubscription("pro-monthly-inr")} className="mt-4 min-h-11 w-full rounded-xl bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
              {busyPlan === "pro-monthly-inr" ? "Opening checkout…" : "Choose monthly"}
            </button>
          </article>
          <article className="rounded-2xl border border-blue-200 bg-blue-50/50 p-5">
            <h3 className="font-bold text-slate-900">Yearly Pro</h3>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">₹699<span className="text-base font-semibold text-slate-500">/year</span></p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Recurring annual subscription. Renewal amount and date are shown during Razorpay authorization.</p>
            <button type="button" disabled={busyPlan !== null} onClick={() => void startSubscription("pro-yearly-inr")} className="mt-4 min-h-11 w-full rounded-xl bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
              {busyPlan === "pro-yearly-inr" ? "Opening checkout…" : "Choose yearly"}
            </button>
          </article>
        </div>

        <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-700">
          <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 size-4 shrink-0 accent-blue-600" />
          <span>I authorize recurring subscription payments for the plan I select. I have reviewed the renewal amount and frequency shown in Razorpay, and understand that I can manage or cancel the subscription using the available account/provider controls.</span>
        </label>
        <p role="status" aria-live="polite" className="mt-4 min-h-6 text-sm text-slate-700">{message}</p>
        <p className="mt-2 text-xs leading-5 text-slate-500">Checkout is currently guarded for staging Test Mode. A successful browser callback alone does not grant Pro access; server verification and the signed Razorpay webhook control subscription status.</p>
      </div>
    </section>
  );
}
