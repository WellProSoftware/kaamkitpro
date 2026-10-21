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
  "json-formatter": {
    title: "JSON Formatter and Validator",
    intro: "JSON (JavaScript Object Notation) is a text format used to exchange structured data between applications. A formatter adds indentation and line breaks so nested objects and arrays are easier to inspect; validation checks whether the text follows JSON syntax.",
    sections: [
      { heading: "What to check before using the result", body: "JSON property names and string values must use double quotes. Commas separate items, but a trailing comma is not valid JSON. Values can be strings, numbers, booleans, null, arrays or objects. If validation fails, use the reported location as a clue and inspect nearby brackets, quotes and commas." },
      { heading: "Common reasons JSON is invalid", body: "Frequent issues include single quotes around strings, missing commas between properties, unmatched braces, comments, and undefined or NaN values. JavaScript object literals can look similar to JSON but are not identical. Formatting makes valid data easier to read; it does not guarantee that the data is correct for your application." },
      { heading: "Privacy and data handling", body: "Avoid pasting passwords, access tokens, personal records or confidential business data into any online tool unless you have checked its data-handling practices. For important configuration files, keep an untouched copy and test the formatted output in the application that will consume it." }
    ],
    steps: ["Paste the JSON text into the formatter input.", "Run formatting or validation and read any error message.", "Check that nested arrays and objects still contain the expected values.", "Copy the result and test it in the destination application."],
    faqs: [
      { q: "Does formatting change the data?", a: "A formatter should change whitespace and indentation, not the represented values. Always compare or test important output." },
      { q: "Why is a JavaScript object rejected as JSON?", a: "JSON requires double-quoted property names and strings and does not allow comments, functions or undefined values." },
      { q: "Can valid JSON still be wrong?", a: "Yes. Syntax validation cannot confirm that property names, values or business rules are correct." }
    ]
  },
  "word-counter": {
    title: "Word and Character Counter",
    intro: "A word counter estimates how many words, characters and sometimes paragraphs appear in a piece of text. It can help prepare articles, application responses, captions, assignments and website copy where length limits matter.",
    sections: [
      { heading: "How counts can differ", body: "Different apps may treat hyphenated words, contractions, emoji, punctuation and languages without spaces differently. Character counts may include or exclude spaces and line breaks. When submitting text to a platform with a strict limit, use that platform's own counter as the final check." },
      { heading: "Use counts as a guide", body: "A target word count is only one measure of readability. Short paragraphs, clear headings and relevant examples can make text easier to follow. Repeated keywords or unnecessary filler may increase length without improving usefulness." },
      { heading: "Check the final version", body: "Paste the complete version you intend to use, including headings if the destination counts them. Recheck after editing because small changes can affect word and character totals." }
    ],
    steps: ["Paste or type the text in the input area.", "Review the displayed word and character totals.", "Check whether your destination includes spaces, headings or line breaks in its limit.", "Recount the final edited text before submitting."],
    faqs: [
      { q: "Why does another app show a different word count?", a: "Apps may use different rules for punctuation, hyphens, contractions, emoji and non-Latin writing systems." },
      { q: "Do spaces count as characters?", a: "That depends on whether the counter displays characters with spaces, without spaces, or both." },
      { q: "Does a word count measure writing quality?", a: "No. It measures length, not accuracy, clarity, originality or usefulness." }
    ]
  },
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
  "qr-code-generator": {
    title: "QR Code Generator",
    intro: "A QR code encodes information that a compatible camera or scanner can read. It can open a website, store short text or provide other supported data, making it useful for posters, menus, product instructions and printed materials.",
    sections: [
      { heading: "Check the encoded destination", body: "Before sharing a QR code, scan it with a phone and confirm that it opens the intended address or displays the correct text. Check URLs carefully for spelling and use HTTPS for websites that support it. A QR code does not make a destination trustworthy; it simply encodes information." },
      { heading: "Make the code easy to scan", body: "Use strong contrast between the code and its background, leave a clear margin around it, and avoid stretching or cropping the image. Test the printed code at the size and distance people will use. Very small codes, low contrast and decorative overlays can make scanning unreliable." },
      { heading: "Plan for long-term use", body: "If a code points to a URL, the destination must remain available for the code to stay useful. Test it on more than one device before printing large quantities. Do not encode sensitive information in a code intended for public display." }
    ],
    steps: ["Enter the URL or text you want the code to represent.", "Generate the QR code and download the image.", "Scan it with a phone to verify the exact content and destination.", "Test the code at the final printed or displayed size before distribution."],
    faqs: [
      { q: "Does a QR code expire?", a: "A static code does not usually expire by itself, but a URL or service it points to can stop working." },
      { q: "Can a QR code be unsafe?", a: "Yes. It can point to a deceptive or harmful destination, so scan and verify the URL before opening it." },
      { q: "Why will a printed code not scan?", a: "Common causes include low contrast, insufficient margin, small print size, blur or a damaged image." }
    ]
  }
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
