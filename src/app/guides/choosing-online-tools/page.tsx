import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "How to Choose and Use Online Tools",
  description: "A practical guide to choosing PDF, image, calculator and business productivity tools, checking results, and handling information safely.",
  alternates: { canonical: "https://kaamkitpro.com/guides/choosing-online-tools" },
};

const steps = [
  ["1. Define the result you need", "Start with the outcome, not the tool name. Decide whether you need to combine PDFs, reduce an image file size, compare text drafts, or estimate a loan payment. A clear goal makes it easier to choose a suitable utility and check its result."],
  ["2. Choose the matching category", "Use PDF tools for document tasks, image tools for editing and conversion, calculators for estimates, and business tools for spreadsheet and healthcare purchasing workflows. Confirm that the selected tool supports your input and desired output."],
  ["3. Prepare a small test first", "Before processing a large file or long list, try a small non-sensitive sample. Check headers, special characters, empty values, page order, image dimensions, and output formatting."],
  ["4. Review the output", "Check totals, units, formatting, page order, image quality, and warnings. Verify calculation assumptions. For SEO metadata, ensure the text accurately describes the page rather than repeating keywords."],
  ["5. Protect private information", "Do not upload confidential, financial, medical, identity, customer, or business files unless you have checked how that specific tool handles data. A browser-based interface does not by itself prove that processing happens locally."],
  ["6. Keep important originals", "Save an original copy before converting, compressing, merging, or editing a file. Reopen the output in its intended application and return to the original if the result is incomplete or unexpected."],
];

export default function ChoosingOnlineToolsGuide() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Breadcrumbs items={[{ label: "Guides", href: "/guides" }, { label: "Choosing Online Tools" }]} />
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">KaamKitPro practical guide</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">How to Choose and Use Online Tools</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">A repeatable workflow for PDF, image, calculator and business productivity tasks—with practical checks to help you use results responsibly.</p>
          <p className="mt-4 text-sm text-slate-500">Estimated reading time: 5 minutes</p>
        </header>
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">A six-step workflow</h2>
          <div className="mt-6 space-y-7">
            {steps.map(([title, body]) => <section key={title}><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 leading-7 text-slate-700">{body}</p></section>)}
          </div>
        </section>
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Examples by task</h2>
          <div className="mt-5 space-y-5">
            <div><h3 className="font-semibold">Combining PDF documents</h3><p className="mt-2 leading-7 text-slate-700">Arrange files in reading order, merge them, then check the page count, orientation, and first and last pages.</p><Link className="mt-2 inline-block font-semibold text-blue-700 hover:underline" href="/tools/pdf-merge">Open PDF Merge →</Link></div>
            <div><h3 className="font-semibold">Preparing an image</h3><p className="mt-2 leading-7 text-slate-700">Choose the required dimensions or output format, preview the result, and inspect image clarity before using it in a document or upload form.</p><Link className="mt-2 inline-block font-semibold text-blue-700 hover:underline" href="/tools/image">Browse image tools →</Link></div>
            <div><h3 className="font-semibold">Working with purchase data</h3><p className="mt-2 leading-7 text-slate-700">Test item descriptions and spreadsheet columns with a small sample. Review matched records and totals before using the output in a purchasing workflow.</p><Link className="mt-2 inline-block font-semibold text-blue-700 hover:underline" href="/tools/item-master-matcher">Open Item Mapping →</Link></div>
            <div><h3 className="font-semibold">Calculating GST</h3><p className="mt-2 leading-7 text-slate-700">Enter the amount, select whether tax is included or excluded, and confirm the applicable GST rate before relying on the estimate.</p><Link className="mt-2 inline-block font-semibold text-blue-700 hover:underline" href="/tools/gst-calculator">Open GST Calculator →</Link></div>
          </div>
        </section>
        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Final checklist</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700"><li>The tool supports the input and output formats I need.</li><li>I tested with a small sample and reviewed the result.</li><li>I kept an original copy of important files.</li><li>I checked data-handling requirements before using sensitive information.</li><li>I independently verified estimates before relying on them.</li></ul>
          <Link href="/tools" className="mt-6 inline-flex rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800">Browse all tools →</Link>
        </section>
      </article>
    </main>
  );
}
