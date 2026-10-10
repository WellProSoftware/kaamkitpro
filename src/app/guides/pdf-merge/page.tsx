import Link from "next/link";
import type { Metadata } from "next";

import BrandLogo from "@/components/BrandLogo";
export const metadata: Metadata = {
  title: "How to Merge PDF Files Online",
  description:
    "Learn how to merge multiple PDF files into one document online using a simple free browser-based PDF merger.",
  alternates: {
    canonical: "https://kaamkitpro.com/guides/pdf-merge",
  },
};

export default function PdfMergeGuide() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <BrandLogo />

          <Link
            href="/guides"
            className="text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            ← All Guides
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-3xl bg-white p-7 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            PDF Guide
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            How to Merge PDF Files Online
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Merging PDF files is useful when you need to combine invoices,
            reports, applications, assignments or scanned documents into one
            file. With a browser-based PDF merger, you can complete the task
            without installing desktop software.
          </p>

          <div className="mt-8">
            <Link
              href="/tools/pdf-merge"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Merge PDFs Now
            </Link>
          </div>

          <div className="mt-12 space-y-10">
            <section>
              <h2 className="text-2xl font-bold">
                1. Open the PDF merge tool
              </h2>
              <p className="mt-3 leading-8 text-slate-600">
                Open the KaamKitPro PDF Merge tool in your browser. You can use
                it on a desktop, laptop, tablet or modern mobile browser.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">
                2. Select your PDF files
              </h2>
              <p className="mt-3 leading-8 text-slate-600">
                Choose the PDF documents you want to combine. Select them in
                the order you want them to appear, or adjust their order
                before merging.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">
                3. Check the document order
              </h2>
              <p className="mt-3 leading-8 text-slate-600">
                Before creating the final document, check that the files are
                arranged correctly. This is especially useful for applications,
                reports and multi-page submissions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">
                4. Merge the PDFs
              </h2>
              <p className="mt-3 leading-8 text-slate-600">
                Start the merge process and wait for the combined PDF to be
                generated. The resulting document can then be saved to your
                device.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">
                5. Check the final PDF
              </h2>
              <p className="mt-3 leading-8 text-slate-600">
                Open the downloaded PDF and quickly check the pages, order and
                readability before sharing or submitting it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">
                Common reasons to merge PDFs
              </h2>

              <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-slate-600">
                <li>Combining multiple documents for an application</li>
                <li>Creating one report from separate PDF files</li>
                <li>Combining scanned pages into one document</li>
                <li>Preparing documents for online submission</li>
                <li>Organizing related files into a single PDF</li>
              </ul>
            </section>

            <section className="rounded-2xl bg-slate-50 p-6">
              <h2 className="text-2xl font-bold">Need to split a PDF?</h2>

              <p className="mt-3 leading-8 text-slate-600">
                If you need individual files from a PDF instead, use the
                KaamKitPro PDF Split tool.
              </p>

              <Link
                href="/tools/pdf-split"
                className="mt-4 inline-block font-semibold text-blue-600 hover:text-blue-800"
              >
                Open PDF Split Tool →
              </Link>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
