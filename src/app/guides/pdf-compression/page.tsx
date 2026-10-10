import Link from "next/link";
import type { Metadata } from "next";
import BrandLogo from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "How to Compress a PDF Online",
  description: "Learn how PDF compression works, when to use it, how to check output quality, and ways to reduce document size before uploading or sharing.",
  alternates: { canonical: "https://kaamkitpro.com/guides/pdf-compression" },
};

export default function PdfCompressionGuide() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <BrandLogo />
          <Link href="/guides" className="text-sm font-semibold text-slate-600 hover:text-slate-900">← All Guides</Link>
        </div>
      </header>
      <article className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-3xl bg-white p-7 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">PDF Guide</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">How to Compress a PDF Online</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">A large PDF can be difficult to email, upload to a form, or store on a phone. Compression aims to reduce the file size while keeping the document readable. The amount saved depends on what the PDF contains: scanned pages and embedded images often offer more opportunities for reduction than documents made mostly of selectable text.</p>
          <div className="mt-8"><Link href="/tools/pdf-compressor" className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Open PDF Compressor</Link></div>
          <div className="mt-12 space-y-9">
            <section><h2 className="text-2xl font-bold">1. Check the file before compressing</h2><p className="mt-3 leading-8 text-slate-600">Open the original PDF and confirm that its pages are complete, upright, and readable. If it contains forms or signatures, check whether those elements need to remain interactive after processing. Keep an untouched copy of important documents.</p></section>
            <section><h2 className="text-2xl font-bold">2. Run compression and compare the sizes</h2><p className="mt-3 leading-8 text-slate-600">Use the PDF Compressor and save the processed file. Compare the original and output file sizes rather than assuming every PDF will shrink by the same percentage. A PDF that is already optimized may show little or no reduction.</p></section>
            <section><h2 className="text-2xl font-bold">3. Inspect the output quality</h2><p className="mt-3 leading-8 text-slate-600">Open the new PDF and review pages with small text, diagrams, photographs, and tables. Confirm that links, page order, and any form fields important to your workflow still behave as expected. If the file becomes hard to read, use the original or try a less aggressive approach.</p></section>
            <section><h2 className="text-2xl font-bold">Other ways to reduce PDF size</h2><ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-slate-600"><li>Resize oversized images before adding them to a document.</li><li>When scanning paper, choose a resolution suitable for the intended use.</li><li>Remove pages that are not needed, after checking the document carefully.</li><li>Avoid repeatedly exporting and recompressing the same file, which can reduce image quality.</li></ul></section>
            <section className="rounded-2xl bg-slate-50 p-6"><h2 className="text-2xl font-bold">Privacy and sensitive documents</h2><p className="mt-3 leading-8 text-slate-600">Before uploading any document to an online service, check how that service processes files. Do not use a tool for confidential or regulated documents unless its handling practices meet your requirements. Downloaded results should also be checked before submission.</p></section>
            <section><h2 className="text-2xl font-bold">When compression is not enough</h2><p className="mt-3 leading-8 text-slate-600">If an upload has a strict size limit, verify the exact limit and accepted file type with the receiving website. You may also be able to split a large PDF into smaller files, provided the recipient accepts multiple documents.</p><Link href="/tools/pdf-split" className="mt-4 inline-block font-semibold text-blue-600 hover:text-blue-800">Open PDF Split →</Link></section>
          </div>
        </div>
      </article>
    </main>
  );
}
