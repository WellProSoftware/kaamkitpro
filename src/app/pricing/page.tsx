import Link from "next/link";
import type { Metadata } from "next";
import BrandLogo from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "Plans & Pricing",
  description:
    "Explore KaamKitPro's free tools and planned Pro subscription options, with proposed monthly and annual launch pricing.",
  alternates: { canonical: "https://kaamkitpro.com/pricing" },
};

const plans = [
  {
    name: "Free",
    price: "₹0",
    cadence: "forever",
    summary: "For everyday quick tasks",
    features: [
      "Access to currently available browser tools",
      "No account needed for basic use",
      "PDF, image, calculator, text and developer utilities",
    ],
    action: "Explore free tools",
    href: "/tools",
    featured: false,
  },
  {
    name: "Pro Monthly",
    price: "₹99",
    cadence: "per month",
    summary: "Flexible access as you need it",
    features: [
      "Planned premium batch-processing features",
      "Higher limits for eligible tools as they launch",
      "Planned saved-workspace features",
      "Priority support for subscription customers",
    ],
    action: "Join Pro early-access list",
    href: "mailto:support@kaamkitpro.com?subject=KaamKitPro%20Pro%20early%20access&body=Please%20notify%20me%20when%20KaamKitPro%20Pro%20subscriptions%20are%20available.",
    featured: false,
  },
  {
    name: "Pro Yearly",
    price: "₹699",
    cadence: "per year",
    summary: "Launch offer: save 30% vs ₹999 proposed regular price",
    features: [
      "Everything planned for Pro Monthly",
      "One annual payment instead of monthly renewals",
      "Proposed introductory annual offer",
      "Email notice before the paid plan goes live",
    ],
    action: "Join annual launch offer list",
    href: "mailto:support@kaamkitpro.com?subject=KaamKitPro%20annual%20launch%20offer&body=Please%20notify%20me%20when%20the%20KaamKitPro%20annual%20plan%20is%20available.",
    featured: true,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <BrandLogo />
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold text-blue-700 hover:text-blue-800">
              Sign in
            </Link>
            <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
              ← Home
            </Link>
          </nav>
        </div>
      </header>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Simple plans</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Free tools today. More power with Pro.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Keep basic everyday tools accessible for everyone. Pro is being planned for people who need more processing capacity and productivity features.
          </p>
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left text-sm leading-6 text-amber-950">
            <strong>Important:</strong> These are proposed launch prices and planned features. Subscription checkout is not active yet, and this page does not collect payments. We will publish the final feature list, billing terms and refund/cancellation policy before taking any payment.
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-12 md:grid-cols-3 sm:px-6">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`flex flex-col rounded-3xl border bg-white p-6 shadow-sm ${plan.featured ? "border-blue-400 ring-2 ring-blue-100" : "border-slate-200"}`}
          >
            {plan.featured ? (
              <span className="mb-4 w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
                Proposed launch offer
              </span>
            ) : null}
            <h2 className="text-xl font-bold">{plan.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{plan.summary}</p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold">{plan.price}</span>
              <span className="text-sm text-slate-500">{plan.cadence}</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3 text-sm leading-6 text-slate-700">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span aria-hidden="true" className="font-bold text-blue-600">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href={plan.href}
              className={`mt-8 inline-flex min-h-12 items-center justify-center rounded-xl px-4 py-3 text-center text-sm font-bold transition ${plan.featured ? "bg-blue-600 text-white hover:bg-blue-700" : "border border-slate-300 bg-white text-slate-800 hover:border-blue-400 hover:text-blue-700"}`}
            >
              {plan.action}
            </a>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
        <div className="rounded-3xl border bg-white p-7 sm:p-9">
          <h2 className="text-2xl font-bold">How payments will work</h2>
          <ol className="mt-5 list-decimal space-y-3 pl-5 leading-7 text-slate-600">
            <li>Choose a monthly or annual plan and review the final price and renewal terms.</li>
            <li>Pay through a secure hosted checkout after the payment account is approved and connected.</li>
            <li>For recurring renewals, approve the payment mandate shown by your bank, card issuer or UPI app.</li>
            <li>After the gateway confirms payment, the site will activate the matching plan and email a receipt or status update.</li>
          </ol>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="font-bold text-slate-900">For customers worldwide</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              The planned checkout will support international card payments and eligible recurring subscriptions after merchant approval. We intend to offer supported currencies such as USD, EUR and GBP where enabled by the payment provider. Availability depends on the merchant account, supported currency, customer card and provider rules; international subscription payments may be card-only. Razorpay states international payments settle to Indian merchants in INR after currency conversion.
            </p>
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-500">
            The intended payment provider is Razorpay Subscriptions for India. International card acceptance must be separately approved. The final provider, supported currencies, payment methods and fees depend on merchant approval and current terms. Payment details will be handled by the provider; KaamKitPro should never store raw card or UPI credentials.
          </p>
          <a
            href="https://razorpay.com/subscriptions/"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block font-semibold text-blue-700 underline underline-offset-4"
          >
            Read about Razorpay Subscriptions
          </a>
        </div>
        <div className="mt-6 text-center text-sm text-slate-600">
          Questions about Pro?{" "}
          <a className="font-semibold text-blue-700 underline" href="mailto:support@kaamkitpro.com?subject=KaamKitPro%20Pro%20subscription">
            Contact support@kaamkitpro.com
          </a>
        </div>
      </section>
    </main>
  );
}
