import Link from "next/link";
import type { Metadata } from "next";

import BrandLogo from "@/components/BrandLogo";
export const metadata: Metadata = {
  title: "Online Tools Guides",
  description:
    "Original, practical guides for PDF compression, merging files, GST calculations, JSON formatting, image optimization and QR codes.",
  alternates: {
    canonical: "https://kaamkitpro.com/guides",
  },
};

const guides = [
  {
    title: "How to Merge PDF Files Online",
    description:
      "Learn how to combine multiple PDF files into one document quickly using a free browser-based tool.",
    href: "/guides/pdf-merge",
    tool: "/tools/pdf-merge",
    category: "PDF Tools",
  },
  {
    title: "How to Compress Images Online",
    description:
      "Learn simple ways to reduce image file size while keeping images useful for websites, sharing and uploads.",
    href: "/guides/image-compression",
    tool: "/tools/image-compressor",
    category: "Image Tools",
  },
  {
    title: "How to Create a QR Code Online",
    description:
      "Learn how to create a QR code for a website, text, contact information or other useful content.",
    href: "/guides/qr-code",
    tool: "/tools/qr-code-generator",
    category: "Everyday Tools",
  },
  {
    title: "How to Compress a PDF Online",
    description: "Compare file sizes, check document quality, and learn practical ways to reduce PDF size.",
    href: "/guides/pdf-compression",
    tool: "/tools/pdf-compressor",
    category: "PDF Tools",
  },
  {
    title: "How to Calculate GST on a Price",
    description: "Understand GST-exclusive and GST-inclusive prices with formulas and worked examples.",
    href: "/guides/gst-calculator",
    tool: "/tools/gst-calculator",
    category: "Calculators",
  },
  {
    title: "How to Format and Validate JSON",
    description: "Learn JSON syntax, fix common parsing errors, and understand formatting versus schema validation.",
    href: "/guides/json-formatting",
    tool: "/tools/json-formatter",
    category: "Developer Tools",
  },
];

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <BrandLogo />

          <nav className="flex gap-5 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-slate-900">
              Tools
            </Link>
            <Link href="/guides" className="text-slate-900">
              Guides
            </Link>
            <Link href="/about" className="hover:text-slate-900">
              About
            </Link>
            <Link href="/contact" className="hover:text-slate-900">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            KaamKitPro Guides
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Simple Guides for Everyday Digital Work
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Practical, beginner-friendly guides that show you how to complete
            common digital tasks using free online tools.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <article
              key={guide.href}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-semibold text-blue-600">
                {guide.category}
              </p>

              <h2 className="mt-3 text-xl font-bold">{guide.title}</h2>

              <p className="mt-3 leading-7 text-slate-600">
                {guide.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={guide.href}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                >
                  Read Guide
                </Link>

                <Link
                  href={guide.tool}
                  className="rounded-lg border px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Use Tool
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center">
          <h2 className="text-2xl font-bold">
            Need a tool instead?
          </h2>

          <p className="mt-3 text-slate-600">
            Explore the complete collection of free online utilities on
            KaamKitPro.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Explore All Tools
          </Link>
        </div>
      </section>

      <footer className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-500">
          © 2026 KaamKitPro. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
