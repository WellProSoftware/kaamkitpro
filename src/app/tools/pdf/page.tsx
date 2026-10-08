import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

const pdfTools = [
  {
    href: "/tools/pdf-merge",
    title: "PDF Merge Tool",
    description:
      "Merge multiple PDF files into one PDF online. Reorder files before combining them.",
  },
  {
    href: "/tools/pdf-split",
    title: "PDF Split Tool",
    description:
      "Split a PDF into separate pages and download each page as an individual PDF.",
  },
  {
    href: "/tools/jpg-to-pdf",
    title: "JPG to PDF",
    description:
      "Convert JPG, JPEG and PNG images into a PDF document directly in your browser.",
  },
  {
    href: "/tools/pdf-to-jpg",
    title: "PDF to JPG",
    description:
      "Convert PDF pages into JPG images online without installing desktop software.",
  },
  {
    href: "/tools/pdf-compressor",
    title: "PDF Compressor",
    description:
      "Optimize PDF files and reduce unnecessary PDF data directly in your browser.",
  },
  {
    href: "/tools/pdf-rotate",
    title: "PDF Rotate Tool",
    description:
      "Rotate PDF pages by 90°, 180° or 270° directly in your browser.",
  },
  {
    href: "/tools/pdf-page-number",
    title: "PDF Page Number Tool",
    description: "Add page numbers to every page of a PDF online.",
  },
  {
    href: "/tools/pdf-watermark",
    title: "PDF Watermark Tool",
    description: "Add a simple text watermark to every PDF page.",
  },
];

const faqs = [
  {
    question: "Are these PDF tools free?",
    answer:
      "Yes. KaamKitPro provides these PDF utilities free to use online.",
  },
  {
    question: "Do I need to install software?",
    answer:
      "No. These tools are designed to work directly in a modern web browser.",
  },
  {
    question: "Are my PDF files uploaded to a server?",
    answer:
      "The PDF tools are designed for browser-side processing where supported, so your files can be processed locally instead of requiring a traditional upload workflow.",
  },
  {
    question: "Can I use the PDF tools on mobile?",
    answer:
      "Yes. The tools are designed with responsive interfaces so they can be used on phones, tablets and desktop computers.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export const metadata = {
  title: "Free PDF Tools Online",
  description:
    "Use free online PDF tools to merge, split, rotate, compress and convert PDF files. Also convert JPG images to PDF and PDF pages to JPG.",
  keywords: [
    "PDF tools",
    "free PDF tools",
    "online PDF tools",
    "PDF merge",
    "PDF split",
    "PDF compressor",
    "JPG to PDF",
    "PDF to JPG",
  ],
  alternates: {
    canonical: "https://kaamkitpro.com/tools/pdf",
  },
  openGraph: {
    title: "Free PDF Tools Online | KaamKitPro",
    description:
      "Free online tools for merging, splitting, compressing and converting PDF files.",
    url: "https://kaamkitpro.com/tools/pdf",
    type: "website",
  },
};

export default function PdfToolsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs
        items={[
        { label: "Tools", href: "/tools" },
        { label: "PDF Tools" },
        ]}
      />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            ← Back to KaamKitPro
          </Link>

          <div className="mt-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              PDF Tools
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Free PDF Tools Online
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Practical online PDF tools for everyday digital work. Merge,
              split, compress and convert PDF files without installing desktop
              software.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pdfTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-slate-900 group-hover:underline">
                {tool.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {tool.description}
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-slate-900">
                Open tool →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900">
            What can you do with these PDF tools?
          </h2>

          <div className="mt-6 space-y-5 text-slate-600">
            <p className="leading-7">
              KaamKitPro brings common PDF tasks together in one place. If you
              need to combine documents, start with the{" "}
              <Link
                href="/tools/pdf-merge"
                className="font-medium text-slate-900 underline underline-offset-4"
              >
                PDF Merge Tool
              </Link>
              .
            </p>

            <p className="leading-7">
              Need individual pages from a document? Use the{" "}
              <Link
                href="/tools/pdf-split"
                className="font-medium text-slate-900 underline underline-offset-4"
              >
                PDF Split Tool
              </Link>{" "}
              to separate pages into individual PDF files.
            </p>

            <p className="leading-7">
              For image-based documents,{" "}
              <Link
                href="/tools/jpg-to-pdf"
                className="font-medium text-slate-900 underline underline-offset-4"
              >
                JPG to PDF
              </Link>{" "}
              converts JPG, JPEG and PNG images into PDF pages. You can also
              convert PDF pages back into images with{" "}
              <Link
                href="/tools/pdf-to-jpg"
                className="font-medium text-slate-900 underline underline-offset-4"
              >
                PDF to JPG
              </Link>
              .
            </p>

            <p className="leading-7">
              Need numbered pages? Use the{" "}\n              <Link href="/tools/pdf-page-number" className="font-medium text-slate-900 underline underline-offset-4">PDF Page Number Tool</Link>{" "}\n              to add page numbers to every page. You can also add a simple text watermark with the{" "}\n              <Link href="/tools/pdf-watermark" className="font-medium text-slate-900 underline underline-offset-4">PDF Watermark Tool</Link>.\n            </p>\n\n            <p className="leading-7">\n              When a PDF contains unnecessary document data, the{" "}
              <Link
                href="/tools/pdf-compressor"
                className="font-medium text-slate-900 underline underline-offset-4"
              >
                PDF Compressor
              </Link>{" "}
              can optimize the file structure and help reduce unnecessary
              overhead.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Helpful PDF Guide
        </h2>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            How to Merge PDF Files Online
          </h3>

          <p className="mt-2 leading-7 text-slate-600">
            Learn how to combine multiple PDF files into one document using
            KaamKitPro's browser-based PDF Merge Tool.
          </p>

          <Link
            href="/guides/pdf-merge"
            className="mt-4 inline-block font-semibold text-slate-900 underline underline-offset-4"
          >
            Read the PDF Merge Guide →
          </Link>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>

          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5"
              >
                <summary className="cursor-pointer font-semibold text-slate-900">
                  {faq.question}
                </summary>

                <p className="mt-3 leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </main>
  );
}
