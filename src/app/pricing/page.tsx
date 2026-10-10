import Link from "next/link";
import type { Metadata } from "next";
import BrandLogo from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "Free Tools & Access",
  description:
    "KaamKitPro tools are free to use today. Ads may support the free service; paid subscriptions are not available.",
  alternates: { canonical: "https://kaamkitpro.com/pricing" },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <BrandLogo />
          <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
            ← Home
          </Link>
        </div>
      </header>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Free access</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Useful tools. Free to use.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            KaamKitPro is focused on building a large, reliable collection of practical online tools for people around the world. All currently available tools are free to use.
          </p>
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-blue-200 bg-blue-50 p-5 text-left leading-7 text-blue-950">
            <h2 className="font-bold">Our current model</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm sm:text-base">
              <li>All currently available tools are free; no paid subscription is required.</li>
              <li>Ads may be displayed to help support the free service.</li>
              <li>Paid plans and checkout are not available and no payment is being collected.</li>
              <li>If paid options are considered in the future, details will be published only after they are approved and ready.</li>
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
            We are prioritizing dependable tools, clear instructions, privacy-conscious processing and a better experience on mobile and desktop. Many tools process content directly in your browser, so your input does not need to be uploaded to a server.
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
