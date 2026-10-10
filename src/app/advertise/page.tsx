import Link from "next/link";
import type { Metadata } from "next";
import BrandLogo from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "Advertise & Partner with KaamKitPro",
  description: "Contact KaamKitPro about relevant sponsorships, partnerships, and custom online-tool development.",
  alternates: { canonical: "https://kaamkitpro.com/advertise" },
};

export default function AdvertisePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <BrandLogo />
          <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-slate-900">← Explore tools</Link>
        </div>
      </header>
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Partnerships</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Advertise & Partner with KaamKitPro</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">We build practical online tools for everyday digital tasks. If your product or service genuinely helps people who use PDF, image, developer, calculator, or productivity tools, we are open to discussing a relevant partnership.</p>
          <a href="mailto:support@kaamkitpro.com?subject=KaamKitPro%20partnership%20inquiry" className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Discuss a Partnership</a>
        </div>
      </section>
      <article className="mx-auto max-w-4xl space-y-6 px-6 py-12">
        <section className="rounded-2xl border bg-white p-7">
          <h2 className="text-2xl font-bold">Ways to work together</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-5"><h3 className="font-bold">Relevant sponsorships</h3><p className="mt-2 leading-7 text-slate-600">Tell us about your product, audience fit, campaign goal, timeline, and proposed budget. Any placement is subject to review and availability.</p></div>
            <div className="rounded-xl bg-slate-50 p-5"><h3 className="font-bold">Custom tool development</h3><p className="mt-2 leading-7 text-slate-600">Need a small calculator, file utility, content helper, or other web tool for your workflow? Describe the problem and desired features in your email.</p></div>
            <div className="rounded-xl bg-slate-50 p-5"><h3 className="font-bold">Useful integrations</h3><p className="mt-2 leading-7 text-slate-600">We can consider tools and services that clearly help our users. We do not promise inclusion or recommend products solely because a partnership is proposed.</p></div>
            <div className="rounded-xl bg-slate-50 p-5"><h3 className="font-bold">Audience and campaign details</h3><p className="mt-2 leading-7 text-slate-600">Ask for current audience or campaign information when available. We will not invent traffic figures, engagement statistics, or performance guarantees.</p></div>
          </div>
        </section>
        <section className="rounded-2xl border border-blue-100 bg-blue-50 p-7">
          <h2 className="text-2xl font-bold">Contact</h2>
          <p className="mt-3 leading-7 text-slate-600">Email support@kaamkitpro.com with the subject “Partnership inquiry”. Include your website, product, intended audience, campaign details, and budget if applicable.</p>
          <p className="mt-3 leading-7 text-slate-600">We are an evolving website and do not guarantee traffic, sales, placements, or campaign results. Sponsored or affiliate relationships, if accepted, will be clearly disclosed.</p>
          <a href="mailto:support@kaamkitpro.com?subject=KaamKitPro%20partnership%20inquiry" className="mt-5 inline-block font-semibold text-blue-700 underline underline-offset-4">support@kaamkitpro.com</a>
        </section>
      </article>
    </main>
  );
}
