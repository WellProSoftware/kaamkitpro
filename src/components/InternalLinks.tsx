import Link from "next/link";

const toolLinks = [
  { href: "/tools/pdf-merge", label: "PDF Merge" },
  { href: "/tools/pdf-split", label: "PDF Split" },
  { href: "/tools/jpg-to-pdf", label: "JPG to PDF" },
  { href: "/tools/pdf-to-jpg", label: "PDF to JPG" },
  { href: "/tools/pdf-compressor", label: "PDF Compressor" },
  { href: "/tools/image-compressor", label: "Image Compressor" },
  { href: "/tools/qr-code-generator", label: "QR Code Generator" },
  { href: "/tools/word-counter", label: "Word Counter" },
  { href: "/tools/json-formatter", label: "JSON Formatter" },
  { href: "/tools/emi-calculator", label: "EMI Calculator" },
  { href: "/tools/gst-calculator", label: "GST Calculator" },
  { href: "/tools/sip-calculator", label: "SIP Calculator" },
];

const guideLinks = [
  { href: "/guides/pdf-merge", label: "How to Merge PDFs Online" },
  {
    href: "/guides/image-compression",
    label: "How to Compress Images Online",
  },
  { href: "/guides/qr-code", label: "How to Create a QR Code" },
];

export default function InternalLinks() {
  return (
    <section className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Popular Online Tools
            </h2>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
              {toolLinks.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="text-sm text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline"
                >
                  {tool.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Helpful Guides
            </h2>

            <div className="mt-4 flex flex-col gap-3">
              {guideLinks.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="text-sm text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline"
                >
                  {guide.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm leading-6 text-slate-500">
          KaamKitPro provides free online utilities for PDF, image, calculator,
          text, SEO, social media and developer tasks.
        </p>
      </div>
    </section>
  );
}
