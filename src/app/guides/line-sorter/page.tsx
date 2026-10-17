import Link from "next/link";
import type { Metadata } from "next";
import BrandLogo from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "How to Sort Lines of Text Online for Free",
  description:
    "Sort text lines alphabetically or naturally in your browser. Learn how to organize lists, filenames, and spreadsheet data without uploading a file.",
  alternates: {
    canonical: "https://kaamkitpro.com/guides/line-sorter",
  },
};

export default function LineSorterGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <BrandLogo />
          <nav className="flex gap-5 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-slate-900">Tools</Link>
            <Link href="/guides" className="text-slate-900">Guides</Link>
            <Link href="/about" className="hover:text-slate-900">About</Link>
            <Link href="/contact" className="hover:text-slate-900">Contact</Link>
          </nav>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Text Tools Guide</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">How to Sort Lines of Text Online for Free</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          A long list is easier to scan when similar entries sit together. A line sorter can arrange names,
          product codes, filenames, keywords, or copied spreadsheet values without manually moving each row.
        </p>

        <div className="mt-8 rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-bold">Sort a list in three steps</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-slate-700">
            <li>Paste or type one item per line into the sorter.</li>
            <li>Choose the ordering you need, such as ascending or descending, and enable natural sorting for numbered labels when available.</li>
            <li>Review the result, then copy it back into your document, spreadsheet, or workflow.</li>
          </ol>
          <Link href="/tools/line-sorter" className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
            Open Free Line Sorter
          </Link>
        </div>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">Alphabetical vs. natural sorting</h2>
          <p className="leading-7 text-slate-700">
            Alphabetical sorting compares characters as text, so labels like Item 10 may appear before Item 2.
            Natural sorting recognizes the number portion, placing Item 2 before Item 10. Use the order that matches
            how people will read or process your list.
          </p>
          <h2 className="text-2xl font-bold">Useful ways to sort lines</h2>
          <ul className="list-disc space-y-2 pl-5 leading-7 text-slate-700">
            <li>Organize names, keywords, tags, or contact lists.</li>
            <li>Put filenames and numbered items into a more readable order.</li>
            <li>Prepare a list before comparing it, deduplicating it, or pasting it into a spreadsheet.</li>
          </ul>
          <h2 className="text-2xl font-bold">Check the result before using it</h2>
          <p className="leading-7 text-slate-700">
            Sorting changes order, not the meaning of each entry. Check capitalization, blank lines, and any codes
            where order is significant. For sensitive information, use only tools and devices you trust.
          </p>
          <h2 className="text-2xl font-bold">Keep cleaning your list</h2>
          <p className="leading-7 text-slate-700">
            After sorting, you can remove repeated entries with the{" "}
            <Link href="/tools/remove-duplicate-lines" className="font-semibold text-blue-700 underline">Duplicate Line Remover</Link>
            {" "}or compare two versions with the{" "}
            <Link href="/tools/text-diff-checker" className="font-semibold text-blue-700 underline">Text Diff Checker</Link>.
            {" "}These browser-based utilities are free to use.
          </p>
        </section>
      </article>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-500">© 2026 KaamKitPro. All rights reserved.</div>
      </footer>
    </main>
  );
}
