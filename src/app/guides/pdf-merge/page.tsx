import Link from "next/link";
import type { Metadata } from "next";

import BrandLogo from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "How to Merge PDF Files Online",
  description:
    "Follow a practical guide to combining PDF files, arranging pages, checking the result and troubleshooting common PDF merge problems.",
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
            A PDF merge combines two or more PDF documents into one file. It is
            useful when a report, application or record has been saved as
            separate documents. The important steps are to prepare the files,
            arrange them in the right order and inspect the merged document
            before sharing it.
          </p>

          <div className="mt-8">
            <Link
              href="/tools/pdf-merge"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Open PDF Merge Tool
            </Link>
          </div>

          <div className="mt-12 space-y-10">
            <section>
              <h2 className="text-2xl font-bold">When should you merge PDFs?</h2>
              <p className="mt-3 leading-8 text-slate-600">
                Combining related files can make a document easier to review,
                store or submit. Common examples include joining a cover letter
                and supporting documents, combining sections of a report,
                collecting scanned pages, or placing several invoice copies
                into one reference file. Keep unrelated or confidential
                documents separate when combining them would make access or
                sharing less appropriate.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">Prepare your files first</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-slate-600">
                <li>Make sure each source file opens and displays correctly.</li>
                <li>Rename files clearly if that helps you identify their order.</li>
                <li>Decide where the cover page, main content and appendices belong.</li>
                <li>Keep an untouched copy of the original PDFs until you have checked the result.</li>
                <li>Check whether any document is password-protected or restricted.</li>
              </ul>
              <p className="mt-3 leading-8 text-slate-600">
                If a PDF contains a digital signature, merging or otherwise
                modifying it can affect signature validation. Preserve the
                original signed file when its signature or audit trail matters.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">Step-by-step: merge PDF files</h2>
              <ol className="mt-4 list-decimal space-y-4 pl-6 leading-8 text-slate-600">
                <li>
                  <strong>Open the tool.</strong> Visit the KaamKitPro PDF
                  Merge tool using the button above.
                </li>
                <li>
                  <strong>Select the source PDFs.</strong> Choose the files
                  you intend to combine. Follow the tool&apos;s on-screen
                  instructions if it asks you to add files one at a time.
                </li>
                <li>
                  <strong>Arrange the order.</strong> Check the displayed file
                  list and move files into the sequence you want. The first
                  document in the sequence will appear first in the output.
                </li>
                <li>
                  <strong>Start merging.</strong> Use the merge action and
                  wait for the tool to finish processing. Avoid closing the
                  tab while the operation is running.
                </li>
                <li>
                  <strong>Save the result.</strong> Download the generated PDF
                  and give it a clear filename that identifies its contents.
                </li>
                <li>
                  <strong>Inspect the output.</strong> Open the downloaded
                  document and check its page sequence, orientation,
                  readability and completeness.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold">Worked example: assembling a report</h2>
              <p className="mt-3 leading-8 text-slate-600">
                Suppose a report consists of three files: an introduction with
                2 pages, the main report with 8 pages and an appendix with 3
                pages. Add them in that order. If every page is retained, the
                merged file should contain 2 + 8 + 3 = 13 pages. After merging,
                check that the introduction is first, the main report follows,
                and the appendix is last. This simple page-count check can help
                reveal a missing or duplicated source file.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">Common problems and what to check</h2>
              <div className="mt-4 space-y-5">
                <div>
                  <h3 className="font-bold">A file will not upload or open</h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    Confirm that it is a valid PDF and that it opens in a
                    trusted PDF viewer. If it is damaged, create or obtain a
                    fresh copy before trying again.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold">The pages are in the wrong order</h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    Return to the file list and arrange the source documents
                    before merging. If the tool does not provide reordering,
                    rename or select the files in the intended sequence where
                    supported.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold">The output is incomplete</h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    Compare the output page count with the expected total and
                    open the beginning, middle and end of the document. Retry
                    with a smaller set of files if the browser runs out of
                    memory or the operation does not finish.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold">A protected PDF cannot be processed</h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    Some PDFs restrict editing or require a password. Only
                    proceed if you are authorised to access and modify the
                    document. Do not try to bypass access controls.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold">Privacy and document safety</h2>
              <p className="mt-3 leading-8 text-slate-600">
                Before using any online document service, consider whether the
                files contain personal, financial, medical, employment or
                confidential business information. Use only documents you are
                authorised to process, avoid uploading sensitive records to a
                service unless its handling practices meet your requirements,
                and do not share the resulting file through a public link.
                Check the service&apos;s privacy information if you need to
                understand how files are handled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">Final checklist before sharing</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-slate-600">
                <li>The output opens without an error.</li>
                <li>All expected pages are present and in the correct order.</li>
                <li>Text, images, tables and page orientation remain readable.</li>
                <li>No unrelated or confidential page was included by mistake.</li>
                <li>The filename is clear and the original files are retained if needed.</li>
              </ul>
            </section>

            <section className="rounded-2xl bg-slate-50 p-6">
              <h2 className="text-2xl font-bold">Need to split a PDF instead?</h2>
              <p className="mt-3 leading-8 text-slate-600">
                If you need to separate selected pages into another document,
                open the PDF Split tool.
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
