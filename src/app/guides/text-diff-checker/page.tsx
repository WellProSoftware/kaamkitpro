import Link from "next/link";
import type { Metadata } from "next";
import BrandLogo from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "How to Compare Two Texts Online for Free",
  description:
    "Compare two versions of text line by line to find added, removed, and unchanged lines. Learn practical uses for drafts, lists, and configuration files.",
  alternates: {
    canonical: "https://kaamkitpro.com/guides/text-diff-checker",
  },
};

export default function TextDiffGuidePage() {
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
        <h1 className="mt-3 text-4xl font-bold tracking-tight">How to Compare Two Texts Online for Free</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          When a document or list changes, it can be hard to spot small edits by reading both versions.
          A text diff checker lines up the content and highlights additions, removals, and unchanged lines.
        </p>
        <div className="mt-8 rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-bold">Compare text in three steps</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-slate-700">
            <li>Paste the earlier version into the Original text box.</li>
            <li>Paste the newer version into the Updated text box.</li>
            <li>Review the highlighted lines and the added/removed counts, then make any needed edits in your source document.</li>
          </ol>
          <Link href="/tools/text-diff-checker" className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
            Open Free Text Diff Checker
          </Link>
        </div>
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">When is text comparison useful?</h2>
          <ul className="list-disc space-y-2 pl-5 leading-7 text-slate-700">
            <li>Review edits between two drafts, policies, or descriptions.</li>
            <li>Check whether a copied list gained or lost entries.</li>
            <li>Inspect changes to plain-text settings, snippets, or structured text before applying them.</li>
          </ul>
          <h2 className="text-2xl font-bold">How to read the results</h2>
          <p className="leading-7 text-slate-700">
            Added lines appear with a plus sign and removed lines with a minus sign; unchanged lines provide context.
            A line-based comparison is useful for quick review, but it does not prove that a document is correct or safe.
            Verify important changes in the original application before publishing or deploying them.
          </p>
          <h2 className="text-2xl font-bold">Keep lists tidy before comparing</h2>
          <p className="leading-7 text-slate-700">
            If the text is a list, sort it first with the{" "}
            <Link href="/tools/line-sorter" className="font-semibold text-blue-700 underline">Free Line Sorter</Link>
            {" "}or remove repeated entries with the{" "}
            <Link href="/tools/remove-duplicate-lines" className="font-semibold text-blue-700 underline">Duplicate Line Remover</Link>.
            {" "}These browser-based tools can help make changes easier to inspect.
          </p>
        </section>
      </article>
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-500">© 2026 KaamKitPro. All rights reserved.</div>
      </footer>
    </main>
  );
}
