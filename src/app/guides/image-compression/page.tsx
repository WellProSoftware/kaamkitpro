import Link from "next/link";
import type { Metadata } from "next";
import BrandLogo from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "How to Compress Images Online: Quality, Formats and Tips",
  description:
    "A practical guide to image compression, JPEG quality settings, file formats, transparent images, troubleshooting and safer file handling.",
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
          <Link href="/guides" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
            ← All Guides
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-3xl bg-white p-7 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Image Guide</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            How to Compress Images Online
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Image compression reduces the number of bytes needed to store or send a picture.
            It is useful when a website loads slowly, an email attachment is too large, or an
            upload form enforces a file-size limit. The best result is not simply the smallest
            file: it is a file that meets the size requirement and still looks clear enough
            for its intended use.
          </p>

          <div className="mt-8">
            <Link href="/tools/image-compressor" className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
              Open Image Compressor
            </Link>
          </div>

          <div className="mt-12 space-y-10">
            <section>
              <h2 className="text-2xl font-bold">Compression and resizing are different</h2>
              <p className="mt-3 leading-8 text-slate-600">
                Compression changes how image data is encoded and can reduce the file size
                without changing its pixel width and height. Resizing changes those dimensions.
                A 4000 × 3000 pixel photo may still be unnecessarily large for a small web
                thumbnail even after compression. If the dimensions are the problem, resize
                the image as well.
              </p>
              <Link href="/tools/image-resizer" className="mt-3 inline-block font-semibold text-blue-600 hover:text-blue-800">
                Open Image Resizer →
              </Link>
            </section>

            <section>
              <h2 className="text-2xl font-bold">Understand the quality setting</h2>
              <p className="mt-3 leading-8 text-slate-600">
                The KaamKitPro Image Compressor provides a quality slider from 20% to 100%,
                starting at 70%. A lower setting usually creates a smaller JPEG but can make
                edges, text and fine details look rough. A higher setting usually preserves
                more detail but creates a larger file. The percentage is an encoder setting,
                not a promise that the file will shrink by that percentage.
              </p>
              <p className="mt-3 leading-8 text-slate-600">
                Start near the default setting, inspect the downloaded image at its normal
                display size, and try a higher setting if important details look damaged.
                Use a lower setting only when the file-size limit matters more than small
                visual differences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">Choose the right format for the job</h2>
              <ul className="mt-4 list-disc space-y-3 pl-6 leading-8 text-slate-600">
                <li><strong>JPEG/JPG:</strong> commonly suitable for photographs and images with continuous colour. It uses lossy compression, so repeated re-saving can reduce quality.</li>
                <li><strong>PNG:</strong> useful for sharp graphics, screenshots and transparency. Converting a transparent PNG to JPEG will not preserve its transparent background.</li>
                <li><strong>WebP:</strong> supports lossy and lossless compression and transparency, and is commonly used on websites. Check that the receiving app or form accepts it.</li>
              </ul>
              <p className="mt-3 leading-8 text-slate-600">
                Important: the current KaamKitPro Image Compressor downloads its result as a
                JPEG file named kaamkitpro-compressed.jpg, even when the source image is PNG
                or WebP. Do not use it when you must preserve transparency or keep the original
                file format. Keep the original file as a backup.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">How to use the KaamKitPro Image Compressor</h2>
              <ol className="mt-4 list-decimal space-y-3 pl-6 leading-8 text-slate-600">
                <li>Open the Image Compressor and select an image from your device, or drop it into the file area.</li>
                <li>Check the displayed original file size.</li>
                <li>Move the Quality slider. It ranges from 20% to 100%; 70% is the starting value.</li>
                <li>Select Compress Image. The browser creates a JPEG and starts its download automatically.</li>
                <li>Open the downloaded file. Check small text, edges, colours and the overall appearance before sharing or uploading it.</li>
              </ol>
              <p className="mt-3 leading-8 text-slate-600">
                The tool displays the original size, compressed size and reported savings after
                processing. Results vary with the source image: a photo, a screenshot and an
                image that has already been optimized can behave very differently. Compression
                is not guaranteed to make every file smaller.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">A practical example</h2>
              <p className="mt-3 leading-8 text-slate-600">
                Imagine an upload form that accepts images up to 500 KB. Your original photo
                is 1.2 MB. Compress it, then check the actual downloaded file size. If it is
                still above 500 KB, try a lower quality setting and inspect the new result.
                If the picture becomes visibly poor, use a suitable resize workflow or another
                format accepted by the form. Always follow the receiving website's own file
                type and size rules.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">Common problems and what to check</h2>
              <ul className="mt-4 list-disc space-y-3 pl-6 leading-8 text-slate-600">
                <li><strong>The output is still too large:</strong> try a lower quality setting or reduce oversized pixel dimensions with an image resizer.</li>
                <li><strong>The image looks blurry or blocky:</strong> increase the quality setting and compare again with the original.</li>
                <li><strong>The transparent background is gone:</strong> the compressor outputs JPEG, which does not support transparency. Keep the original PNG or use a workflow that preserves transparency.</li>
                <li><strong>The file is larger than expected:</strong> some images are already optimized or do not compress efficiently as JPEG. Keep the original if the new file is not useful.</li>
                <li><strong>The receiving form rejects the result:</strong> check its permitted formats, maximum dimensions and exact file-size limit. This tool outputs JPG.</li>
                <li><strong>The image cannot be read:</strong> try opening the source image on your device first, then export a standard JPG, PNG or WebP copy and retry.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold">Privacy and safe handling</h2>
              <p className="mt-3 leading-8 text-slate-600">
                The KaamKitPro tool page states that image processing happens locally in your
                browser. This avoids uploading the selected image to a processing server as
                part of the normal compression flow. However, only use a browser and device
                you trust, and do not treat this as a substitute for your organisation's
                confidentiality rules. Keep a separate original copy of important images.
              </p>
              <p className="mt-3 leading-8 text-slate-600">
                Before sharing an image publicly, check it for visible personal details,
                identity documents, addresses, account numbers or other information you did
                not intend to disclose.
              </p>
            </section>

            <section className="rounded-2xl bg-slate-50 p-6">
              <h2 className="text-2xl font-bold">Before you upload or publish</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-slate-600">
                <li>Confirm that the output meets the destination's file-size and format rules.</li>
                <li>Check that the image is readable at the size people will view it.</li>
                <li>Confirm that transparency or other important visual details have not been lost.</li>
                <li>Keep the original until the compressed copy has been accepted and checked.</li>
              </ul>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
