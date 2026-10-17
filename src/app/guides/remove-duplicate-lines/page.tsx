import Link from "next/link";
import type { Metadata } from "next";
import BrandLogo from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "How to Remove Duplicate Lines from a List | KaamKitPro",
  description: "Clean repeated names, keywords, IDs and copied spreadsheet lines while choosing how whitespace and letter case should be treated.",
  alternates: { canonical: "https://kaamkitpro.com/guides/remove-duplicate-lines" },
};

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"><BrandLogo /><nav className="flex gap-5 text-sm font-medium text-slate-600"><Link href="/" className="hover:text-slate-900">Tools</Link><Link href="/guides" className="text-slate-900">Guides</Link><Link href="/about" className="hover:text-slate-900">About</Link><Link href="/contact" className="hover:text-slate-900">Contact</Link></nav></div></header>
      <article className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Text Tools Guide</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">How to Remove Duplicate Lines from a List</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">Copied lists often contain repeated values from exports, spreadsheets, research notes or keyword collections. Removing duplicates makes the list easier to review and can prevent repeated entries in later workflows.</p>
        <div className="mt-8 rounded-2xl border bg-white p-6"><h2 className="text-xl font-bold">A simple step-by-step workflow</h2><ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-slate-700"><li>Paste one entry per line into the duplicate-line remover.</li><li>Choose whether differences in capitalization or surrounding whitespace should count as the same entry.</li><li>Review the cleaned list and copy or download it for your next step.</li></ol><Link href="/tools/remove-duplicate-lines" className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">Open Free Duplicate Line Remover</Link></div>
        <section className="mt-10 space-y-4"><h2 className="text-2xl font-bold">Choose matching rules carefully</h2><p className="leading-7 text-slate-700">Treating Apple and apple as the same value may be useful for ordinary words but incorrect for case-sensitive identifiers. Trimming whitespace can remove accidental spaces, but preserve them when spaces carry meaning in your data.</p><h2 className="text-2xl font-bold">Keep the first occurrence</h2><p className="leading-7 text-slate-700">Many list-cleaning tasks preserve the first appearance of each unique line so the remaining entries stay in their original order. Check the output when sequence matters.</p><h2 className="text-2xl font-bold">Verify important data</h2><p className="leading-7 text-slate-700">Before replacing a source list, compare the number of input and output lines and spot-check important IDs, codes or records. Keep a backup of business-critical data.</p></section>
        <p className="mt-8 leading-7 text-slate-700">Continue with more practical <Link href="/guides" className="font-semibold text-blue-700 underline">free online tool guides</Link> or open the <Link href="/tools/remove-duplicate-lines" className="font-semibold text-blue-700 underline">related free tool</Link>.</p>
      </article><footer className="border-t bg-white"><div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-500">© 2026 KaamKitPro. All rights reserved.</div></footer>
    </main>
  );
}
