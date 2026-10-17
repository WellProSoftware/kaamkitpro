import Link from "next/link";
import type { Metadata } from "next";
import BrandLogo from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "How to Create an SEO-Friendly URL Slug | KaamKitPro",
  description: "Learn how to turn a page title into a readable URL slug and avoid common URL formatting mistakes.",
  alternates: { canonical: "https://kaamkitpro.com/guides/slug-generator" },
};

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"><BrandLogo /><nav className="flex gap-5 text-sm font-medium text-slate-600"><Link href="/" className="hover:text-slate-900">Tools</Link><Link href="/guides" className="text-slate-900">Guides</Link><Link href="/about" className="hover:text-slate-900">About</Link><Link href="/contact" className="hover:text-slate-900">Contact</Link></nav></div></header>
      <article className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">SEO Tools Guide</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">How to Create an SEO-Friendly URL Slug</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">A URL slug is the readable part of a web address that identifies a page. A clear slug helps people understand what a page covers before they open it.</p>
        <div className="mt-8 rounded-2xl border bg-white p-6"><h2 className="text-xl font-bold">A simple step-by-step workflow</h2><ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-slate-700"><li>Write a concise title that describes the page accurately.</li><li>Generate a lowercase slug with words separated by hyphens.</li><li>Check the final URL for unnecessary words, duplicates and accidental changes to an existing published address.</li></ol><Link href="/tools/slug-generator" className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">Open Free Slug Generator</Link></div>
        <section className="mt-10 space-y-4"><h2 className="text-2xl font-bold">Keep URLs clear</h2><p className="leading-7 text-slate-700">Use meaningful words, hyphens and a consistent lowercase style. Avoid long strings of parameters, repeated punctuation and keywords that do not match the page.</p><h2 className="text-2xl font-bold">Do not change established URLs casually</h2><p className="leading-7 text-slate-700">Changing a URL can break existing links and search listings. If a published page must move, configure a permanent redirect and update internal links and the sitemap.</p><h2 className="text-2xl font-bold">Slug quality is only one SEO factor</h2><p className="leading-7 text-slate-700">Useful content, internal links, page performance, crawlability and matching search intent matter too. A slug alone cannot guarantee rankings or traffic.</p></section>
        <p className="mt-8 leading-7 text-slate-700">Continue with more practical <Link href="/guides" className="font-semibold text-blue-700 underline">free online tool guides</Link> or open the <Link href="/tools/slug-generator" className="font-semibold text-blue-700 underline">related free tool</Link>.</p>
      </article><footer className="border-t bg-white"><div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-500">© 2026 KaamKitPro. All rights reserved.</div></footer>
    </main>
  );
}
