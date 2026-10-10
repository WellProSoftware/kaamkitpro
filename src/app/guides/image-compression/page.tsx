import Link from "next/link";
import type { Metadata } from "next";

import BrandLogo from "@/components/BrandLogo";
export const metadata: Metadata = {
  title: "How to Compress Images Online",
  description:
    "Learn how to reduce image file size online for websites, uploads, email and sharing while keeping images useful.",
  alternates: {
    canonical: "https://kaamkitpro.com/guides/image-compression",
  },
};

export default function ImageCompressionGuide() {
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
            Image Guide
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            How to Compress Images Online
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Large images can make websites slower and can also cause problems
            when an upload service has a file-size limit. Image compression
            helps reduce file size and makes images easier to share and upload.
          </p>

          <div className="mt-8">
            <Link
              href="/tools/image-compressor"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Compress an Image
            </Link>
          </div>

          <div className="mt-12 space-y-10">
            <section>
              <h2 className="text-2xl font-bold">
                What does image compression do?
              </h2>

              <p className="mt-3 leading-8 text-slate-600">
                Image compression reduces the amount of data needed to store
                an image. Depending on the format and compression settings,
                this can significantly reduce the final file size.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">
                1. Choose the image
              </h2>

              <p className="mt-3 leading-8 text-slate-600">
                Open the KaamKitPro Image Compressor and select the image you
                want to optimize.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">
                2. Choose suitable compression settings
              </h2>

              <p className="mt-3 leading-8 text-slate-600">
                Higher compression generally produces a smaller file, while
                lower compression can preserve more visual detail. Choose the
                balance that fits your purpose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">
                3. Compare the result
              </h2>

              <p className="mt-3 leading-8 text-slate-600">
                Check the compressed image before using it. For websites,
                documents and online forms, a smaller file can often be more
                convenient.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">
                When should you compress an image?
              </h2>

              <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-slate-600">
                <li>Before uploading images to a website</li>
                <li>When an online form has a file-size limit</li>
                <li>When sending multiple images by email</li>
                <li>When preparing images for online applications</li>
                <li>When reducing storage requirements</li>
              </ul>
            </section>

            <section className="rounded-2xl bg-slate-50 p-6">
              <h2 className="text-2xl font-bold">
                Need to change image dimensions?
              </h2>

              <p className="mt-3 leading-8 text-slate-600">
                Compression reduces file size. If you need to change the width
                or height of an image, use the Image Resizer.
              </p>

              <Link
                href="/tools/image-resizer"
                className="mt-4 inline-block font-semibold text-blue-600 hover:text-blue-800"
              >
                Open Image Resizer →
              </Link>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
