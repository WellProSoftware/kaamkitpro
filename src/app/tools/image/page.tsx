import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

const tools = [
  {
    href: "/tools/image-flip",
    title: "Image Flip",
    description: "Flip images horizontally or vertically directly in your browser.",
  },
  {
    href: "/tools/image-brightness",
    title: "Image Brightness",
    description: "Make images brighter or darker online in your browser.",
  },
  {
    href: "/tools/image-rotate",
    title: "Image Rotate",
    description: "Rotate images by 90, 180 or 270 degrees directly in your browser.",
  },
  {
    href: "/tools/image-grayscale",
    title: "Image Grayscale",
    description: "Convert color images to grayscale online in your browser.",
  },

  {
    href: "/tools/image-compressor",
    title: "Image Compressor",
    description: "Reduce image file size online while keeping useful image quality.",
  },
  {
    href: "/tools/image-resizer",
    title: "Image Resizer",
    description: "Resize images to custom dimensions directly in your browser.",
  },
  {
    href: "/tools/image-converter",
    title: "Image Converter",
    description: "Convert images between common formats online.",
  },
  {
    href: "/tools/image-cropper",
    title: "Image Cropper",
    description: "Crop images to the size and shape you need.",
  },
  {
    href: "/tools/jpg-to-pdf",
    title: "JPG to PDF",
    description: "Convert JPG, JPEG and PNG images into PDF documents.",
  },
];

export const metadata = {
  title: "Free Image Tools Online",
  description:
    "Free online image tools to compress, resize, convert and crop images.",
  keywords: [
    "image tools",
    "free image tools",
    "image compressor",
    "image resizer",
    "image converter",
    "image cropper",
  ],
  alternates: {
    canonical: "https://kaamkitpro.com/tools/image",
  },
};

export default function ImageToolsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Breadcrumbs
        items={[
        { label: "Tools", href: "/tools" },
        { label: "Image Tools" },
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

          <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-slate-500">
            Image Tools
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Free Image Tools Online
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Compress, resize, convert and crop images online with practical
            browser-based tools for everyday digital work.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
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
            Everyday image tasks
          </h2>

          <div className="mt-6 space-y-5 text-slate-600">
            <p className="leading-7">
              Need a smaller image for a website or upload form? Use the{" "}
              <Link
                href="/tools/image-compressor"
                className="font-medium text-slate-900 underline underline-offset-4"
              >
                Image Compressor
              </Link>
              .
            </p>

            <p className="leading-7">
              For exact dimensions, use the{" "}
              <Link
                href="/tools/image-resizer"
                className="font-medium text-slate-900 underline underline-offset-4"
              >
                Image Resizer
              </Link>
              . You can also crop unwanted areas with the{" "}
              <Link
                href="/tools/image-cropper"
                className="font-medium text-slate-900 underline underline-offset-4"
              >
                Image Cropper
              </Link>
              .
            </p>

            <p className="leading-7">
              To change an image format, use the{" "}
              <Link
                href="/tools/image-converter"
                className="font-medium text-slate-900 underline underline-offset-4"
              >
                Image Converter
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
