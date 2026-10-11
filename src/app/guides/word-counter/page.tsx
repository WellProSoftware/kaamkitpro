import Link from "next/link";
import type { Metadata } from "next";
import BrandLogo from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "How to Count Words and Characters Online | KaamKitPro",
  description: "Count words, characters, sentences and spaces in drafts, captions and documents with a free browser-based tool.",
  alternates: { canonical: "https://kaamkitpro.com/guides/word-counter" },
};

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"><BrandLogo /><nav className="flex gap-5 text-sm font-medium text-slate-600"><Link href="/" className="hover:text-slate-900">Tools</Link><Link href="/guides" className="text-slate-900">Guides</Link><Link href="/about" className="hover:text-slate-900">About</Link><Link href="/contact" className="hover:text-slate-900">Contact</Link></nav></div></header>
      <article className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Text Tools Guide</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">How to Count Words and Characters Online</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">Word and character limits matter in essays, product listings, social posts, ads and application forms. Counting by eye is unreliable, especially when a draft changes several times.</p>
        <div className="mt-8 rounded-2xl border bg-white p-6"><h2 className="text-xl font-bold">A simple step-by-step workflow</h2><ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-slate-700"><li>Paste or type your text into the word counter.</li><li>Review the word and character totals; check whether the destination counts spaces or limits only visible characters.</li><li>Edit the draft and recount before submitting it.</li></ol><Link href="/tools/word-counter" className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">Open Free Word Counter</Link></div>
        <section className="mt-10 space-y-4"><h2 className="text-2xl font-bold">Words and characters are different</h2><p className="leading-7 text-slate-700">A word count measures separated words, while character count measures individual letters, numbers, punctuation and often spaces. Different platforms may define their limits differently, so use the destination's own counter when the limit is strict.</p><h2 className="text-2xl font-bold">Practical uses</h2><p className="leading-7 text-slate-700">Writers can check essay length, marketers can fit captions and descriptions to platform limits, and sellers can prepare concise product copy. Sentence counts are also useful for spotting overly long drafts.</p><h2 className="text-2xl font-bold">Protect private text</h2><p className="leading-7 text-slate-700">If a draft contains confidential customer, medical, financial or workplace information, avoid pasting it into a service you do not trust. Prefer local browser tools for routine counting.</p></section>
        <p className="mt-8 leading-7 text-slate-700">Continue with more practical <Link href="/guides" className="font-semibold text-blue-700 underline">free online tool guides</Link> or open the <Link href="/tools/word-counter" className="font-semibold text-blue-700 underline">related free tool</Link>.</p>
      </article><footer className="border-t bg-white"><div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-500">© 2026 KaamKitPro. All rights reserved.</div></footer>
    </main>
  );
}
