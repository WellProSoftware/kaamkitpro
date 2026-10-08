import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

const categories = [
  {
    title: "PDF Tools",
    href: "/tools/pdf",
    description: "Merge, split, convert and optimize PDF files.",
  },
  {
    title: "Image Tools",
    href: "/tools/image",
    description: "Compress, resize, convert and crop images.",
  },
  {
    title: "Calculators",
    href: "/tools/calculators",
    description: "EMI, GST, SIP, BMI, age and percentage calculators.",
  },
  {
    title: "Text Tools",
    href: "/tools/text",
    description: "Count, convert and clean text quickly.",
  },
  {
    title: "SEO Tools",
    href: "/tools/seo",
    description: "Meta tags, keywords, slugs and sitemap utilities.",
  },
  {
    title: "Social Tools",
    href: "/tools/social",
    description: "Hashtags, captions, YouTube and social tools.",
  },
  {
    title: "Developer Tools",
    href: "/tools/developer",
    description: "Format code, encode URLs, generate hashes and convert colors.",
  },
];

const popularTools = [
  {
    href: "/tools/qr-code-generator",
    title: "QR Code Generator",
    description: "Create QR codes online quickly.",
  },
  {
    href: "/tools/pdf-merge",
    title: "PDF Merge",
    description: "Combine multiple PDF files into one.",
  },
  {
    href: "/tools/image-compressor",
    title: "Image Compressor",
    description: "Reduce image file size in your browser.",
  },
  {
    href: "/tools/word-counter",
    title: "Word Counter",
    description: "Count words and characters in text.",
  },
  {
    href: "/tools/json-formatter",
    title: "JSON Formatter",
    description: "Format and validate JSON data.",
  },
  {
    href: "/tools/emi-calculator",
    title: "EMI Calculator",
    description: "Calculate loan EMI and repayment details.",
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs
        items={[
        { label: "Tools" },
        ]}
      />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            KaamKitPro Tools
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Free Online Tools
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Explore free online tools for PDF files, images, calculations,
            text, SEO, social media and developer tasks. Choose a category
            below or jump directly to a popular utility.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Browse Tools by Category
          </h2>
          <p className="mt-2 text-slate-600">
            Choose the type of online tool you need.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {category.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {category.description}
              </p>

              <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                Browse tools →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Popular Online Tools
          </h2>
          <p className="mt-2 text-slate-600">
            Quickly access some of the most useful KaamKitPro utilities.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <h3 className="font-semibold text-slate-900">
                {tool.title}
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                {tool.description}
              </p>

              <span className="mt-3 inline-block text-sm font-medium text-blue-600">
                Open tool →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Why use KaamKitPro online tools?
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-slate-900">
                Free to use
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use practical online utilities without needing a paid
                subscription for everyday tasks.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                No installation
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Open a tool in your browser and complete the task without
                installing separate desktop software.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Easy to use
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Simple interfaces help you complete common digital tasks
                quickly from desktop or mobile devices.
              </p>
            </div>
          </div>

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            One place for everyday digital work
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            KaamKitPro brings useful browser-based utilities together under
            one platform. Whether you need to work with a PDF, compress an
            image, calculate an EMI, clean text, prepare SEO data, create
            social content or format code, you can find the relevant tool
            through the category pages above.
          </p>
        </div>
      </section>
    </main>
  );
}
