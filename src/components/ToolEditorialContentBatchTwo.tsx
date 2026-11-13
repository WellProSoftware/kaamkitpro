"use client";

import { usePathname } from "next/navigation";

type Guide = {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
  steps: string[];
  faqs: { q: string; a: string }[];
};

const guides: Record<string, Guide> = {
  "pdf-merge": {
    title: "Merge PDF Files",
    intro: "Merging PDFs combines multiple documents into one file. It is useful for assembling reports, invoices, study notes, application documents or scanned pages into a single document that is easier to share and archive.",
    sections: [
      { heading: "Prepare the files", body: "Choose the source PDFs and decide their order before merging. Check page orientation, page size and whether any file contains blank or duplicate pages. If the documents contain forms, bookmarks, signatures or accessibility tags, verify whether those features are preserved by the merging process." },
      { heading: "Review the merged document", body: "Open the exported PDF and inspect the beginning, middle and end, including page transitions between source files. Confirm that all expected pages are present and readable. A digital signature on a source file may no longer validate after its contents are combined into a new document." },
      { heading: "Handle sensitive documents carefully", body: "Only process documents you are authorised to use. For confidential financial, identity or employment records, evaluate the service's privacy practices before uploading and follow your organisation's document policy." }
    ],
    steps: ["Select the PDFs you want to combine.", "Arrange them in the intended page order if reordering is supported.", "Start the merge and wait for the output file.", "Open the result and verify page count, order, legibility and important document features."],
    faqs: [
      { q: "Can I change the order of files?", a: "If the tool offers reordering, arrange the files before merging; otherwise select them in the desired order." },
      { q: "Will merged PDFs keep digital signatures?", a: "A new combined file can invalidate existing signatures. Verify signatures and requirements in a suitable PDF application." },
      { q: "Does merging reduce file size?", a: "Not necessarily. Combining files can make the result larger; compression is a separate operation." }
    ]
  },
  "image-compressor": {
    title: "Image Compressor",
    intro: "Image compression reduces the amount of data needed to store or transmit a picture. It can make images faster to upload or display on websites, but the best setting depends on the image, file format and acceptable quality.",
    sections: [
      { heading: "Choose a suitable format", body: "JPEG is commonly used for photographs, PNG often suits graphics with sharp edges or transparency, and WebP can provide efficient web images when supported by the destination. Format choice affects quality, transparency and compatibility." },
      { heading: "Balance size and quality", body: "Lossy compression can reduce file size substantially but may introduce blur, blockiness or colour artefacts. Compare the compressed image with the original at normal viewing size and zoom in on text, fine lines and product details. Repeatedly recompressing a lossy image can compound quality loss." },
      { heading: "Understand dimensions", body: "Compression and resizing are different: compression changes how image data is stored, while resizing changes pixel dimensions. If an image is much larger than its intended display area, resizing may reduce file size further. Keep the original when quality or future editing matters." }
    ],
    steps: ["Choose an image you are allowed to process.", "Select the available quality or output options.", "Compare the preview or downloaded file with the original.", "Check the final dimensions, format and file size before using it."],
    faqs: [
      { q: "Will compression always make an image look worse?", a: "Lossless methods can preserve image data; lossy methods trade some detail for a smaller file. Results depend on settings and image content." },
      { q: "Is compressing the same as resizing?", a: "No. Compression changes storage size; resizing changes the number of pixels." },
      { q: "Which format should I use?", a: "Choose based on the image and destination: photos, transparency, sharp graphics and compatibility have different needs." }
    ]
  },
};

export default function ToolEditorialContentBatchTwo() {
  const pathname = usePathname();
  if (!pathname?.startsWith("/tools/")) return null;
  const slug = pathname.split("/")[2] || "";
  const guide = guides[slug];
  if (!guide) return null;

  return (
    <section aria-labelledby="tool-guide-heading" className="mx-auto mt-8 max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 id="tool-guide-heading" className="text-2xl font-bold text-slate-900">{guide.title}: practical guide</h2>
        <p className="mt-4 leading-7 text-slate-700">{guide.intro}</p>
        {guide.sections.map((section) => (
          <div key={section.heading} className="mt-7">
            <h3 className="text-xl font-semibold text-slate-900">{section.heading}</h3>
            <p className="mt-3 leading-7 text-slate-700">{section.body}</p>
          </div>
        ))}
        <h3 className="mt-7 text-xl font-semibold text-slate-900">How to use this tool</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7 text-slate-700">{guide.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        <h3 className="mt-7 text-xl font-semibold text-slate-900">Frequently asked questions</h3>
        <div className="mt-3 space-y-5">{guide.faqs.map((faq) => <div key={faq.q}><h4 className="font-semibold text-slate-900">{faq.q}</h4><p className="mt-1 leading-7 text-slate-700">{faq.a}</p></div>)}</div>
        <p className="mt-6 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-500">Always verify important results before relying on them. Keep original files and avoid sharing confidential information with tools unless their data-handling practices meet your needs.</p>
      </div>
    </section>
  );
}
