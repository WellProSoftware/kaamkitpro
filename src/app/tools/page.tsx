import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Free Online Tools Directory",
  description: "Browse KaamKitPro tools for PDFs, images, calculators, text, SEO and developer workflows.",
  alternates: { canonical: "https://kaamkitpro.com/tools" },
};

const categories = [
  { title: "PDF Tools", href: "/tools/pdf", description: "Merge, split, convert and optimize PDF files." },
  { title: "Image Tools", href: "/tools/image", description: "Compress, resize, convert and crop images." },
  { title: "Calculators", href: "/tools/calculators", description: "EMI, GST, SIP, BMI, age and percentage calculators." },
  { title: "Text Tools", href: "/tools/text", description: "Count, convert and clean text quickly." },
  { title: "SEO Tools", href: "/tools/seo", description: "Meta tags, keywords, slugs and sitemap utilities." },
  { title: "Social Tools", href: "/tools/social", description: "Hashtags, captions, YouTube and social tools." },
  { title: "Developer Tools", href: "/tools/developer", description: "Format code, encode URLs, generate hashes and convert colors." },
];

const popularTools = [
  { href: "/tools/qr-code-generator", title: "QR Code Generator", description: "Create QR codes from text or a web link, then scan the result before sharing it." },
  { href: "/tools/pdf-merge", title: "PDF Merge", description: "Combine multiple PDF files into one document and check the page order afterward." },
  { href: "/tools/image-compressor", title: "Image Compressor", description: "Reduce image file size while checking that the result remains clear enough for its intended use." },
  { href: "/tools/word-counter", title: "Word Counter", description: "Measure words and characters before submitting text to a form, editor, or publishing platform." },
  { href: "/tools/json-formatter", title: "JSON Formatter", description: "Format JSON so it is easier to read and validate its syntax before using it in an application." },
  { href: "/tools/emi-calculator", title: "EMI Calculator", description: "Estimate monthly loan payments from principal, interest rate, and tenure; verify actual terms with the lender." },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs items={[{ label: "Tools" }]} />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">KaamKitPro Tools</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Free Online Tools</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Find a utility by the task you need to complete. Browse PDF and image tools, calculators, text utilities, SEO helpers, social media tools, and developer utilities. Each tool should be checked with your own input and requirements before you rely on its output.
          </p>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            For the best results, start with a small sample, review the output, and keep an original copy of important files. Do not enter confidential information unless you have checked the data-handling details for the specific tool.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Browse Tools by Category</h2>
          <p className="mt-2 text-slate-600">Choose a category based on the job you need to finish.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.href} href={category.href} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md">
              <h3 className="text-lg font-semibold text-slate-900">{category.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-blue-600">Browse tools →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Popular Online Tools</h2>
          <p className="mt-2 text-slate-600">Start with a common task and check the result before using it elsewhere.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularTools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md">
              <h3 className="font-semibold text-slate-900">{tool.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
              <span className="mt-3 inline-block text-sm font-medium text-blue-600">Open tool →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Practical guide</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">How to choose and use online tools</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">
            Learn a simple workflow for selecting a tool, testing a small sample, checking results, protecting private information, and keeping original files. The guide includes examples for PDF merging, text counting, JSON validation, and loan-payment estimates.
          </p>
          <Link href="/guides/choosing-online-tools" className="mt-5 inline-flex rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800">
            Read the practical guide →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">How to get reliable results</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-slate-900">Match the task</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Check supported formats, input limits, units, and output types before starting. A tool designed for one file type may not preserve every feature of another.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Test and inspect</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Use a small sample first. Inspect the converted file, calculation inputs, formatting, or generated text instead of assuming the first result is correct.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Protect your work</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Keep a copy of important originals and avoid submitting sensitive data until you understand how the particular tool handles it.</p>
            </div>
          </div>
          <h2 className="mt-10 text-2xl font-bold text-slate-900">One place for everyday digital work</h2>
          <p className="mt-4 leading-7 text-slate-600">
            KaamKitPro groups browser-based utilities by practical task so you can move from a goal to a relevant tool without searching through unrelated pages. Use the category descriptions to narrow your options, follow the instructions on the selected tool, and independently verify results that affect business, financial, or published work.
          </p>
        </div>
      </section>
    </main>
  );
}
