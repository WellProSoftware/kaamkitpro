import Link from "next/link";
import type { Metadata } from "next";
import BrandLogo from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "Free Tools & Pro Access",
  description:
    "Use KaamKitPro free tools without signing up. Pro access requires an active paid subscription or an authorized admin grant.",
  alternates: { canonical: "https://kaamkitpro.com/pricing" },
};

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
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Free tools first</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Useful tools. No signup needed.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Open any currently available free tool and start using it immediately. No account, email, or phone number is required for free browser-based tools.
          </p>
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-blue-200 bg-blue-50 p-5 text-left leading-7 text-blue-950">
            <h2 className="font-bold">How access works</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm sm:text-base">
              <li>Free tools remain free permanently and can be used without signup; ads may support the free service.</li>
              <li>Paid-capacity tools offer a small trial allowance: typically 2 uses for heavier cloud processing or 3 uses per day for eligible AI/hosted tools. When the allowance is exhausted, the user is asked to subscribe to Pro to continue.</li>
              <li>Free-plan users see ads across the Free experience when the ad provider serves them. Once a paid Pro subscription is verified, all KaamKitPro ads are disabled site-wide for that account for the active subscription period.</li>
              <li>Pro access is granted only while an eligible paid subscription is active or an authorized admin has explicitly granted access. Admin grants can be scoped to selected tools and can expire or be revoked.</li>
              <li>Checkout is not live yet. The proposed prices are ₹99/month and ₹699/year; real payments will be enabled only after Razorpay test payments, webhook verification and access-grant tests pass.</li>
            </ul>
          </div>
          <Link href="/tools" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700">
            Explore free tools
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9">
          <h2 className="text-2xl font-bold">Built around usefulness first</h2>
          <p className="mt-4 leading-7 text-slate-600">
            We prioritize dependable tools, clear instructions, privacy-conscious processing, and a good experience on mobile and desktop. Many tools process content directly in your browser, so your input does not need to be uploaded to a server.
          </p>
          <p className="mt-4 leading-7 text-slate-600">
            Some pages may display advertising. Ad availability depends on the advertising provider, its approval process, visitor location and its policies. Seeing this page does not mean that an ad is guaranteed to appear.
          </p>
          <p className="mt-4 leading-7 text-slate-600">
            Questions or feedback? Contact{" "}
            <a className="font-semibold text-blue-700 underline" href="mailto:support@kaamkitpro.com">
              support@kaamkitpro.com
            </a>.
          </p>
        </div>
      </section>
    </main>
  );
}
