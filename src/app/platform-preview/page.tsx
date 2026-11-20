"use client";

import { useMemo, useState } from "react";

type Tool = { name: string; category: string; description: string; href: string };

const tools: Tool[] = [
  { name: "PDF Merge", category: "PDF", description: "Combine multiple PDF files into one document.", href: "/tools/pdf-merge" },
  { name: "PDF Split", category: "PDF", description: "Separate selected pages into new PDF files.", href: "/tools/pdf-split" },
  { name: "PDF Compressor", category: "PDF", description: "Reduce PDF file size for easier sharing.", href: "/tools/pdf-compressor" },
  { name: "Image Compressor", category: "Image", description: "Reduce image size while keeping quality clear.", href: "/tools/image-compressor" },
  { name: "Image Resizer", category: "Image", description: "Resize images to the dimensions you need.", href: "/tools/image-resizer" },
  { name: "Image Converter", category: "Image", description: "Convert common image formats.", href: "/tools/image-converter" },
  { name: "GST Calculator", category: "Calculators", description: "Calculate GST amounts and inclusive or exclusive totals.", href: "/tools/gst-calculator" },
  { name: "BMI Calculator", category: "Calculators", description: "Calculate body mass index from height and weight.", href: "/tools/bmi-calculator" },
  { name: "Age Calculator", category: "Calculators", description: "Calculate age between two dates.", href: "/tools/age-calculator" },
  { name: "Word Counter", category: "Text", description: "Count words, characters and paragraphs.", href: "/tools/word-counter" },
  { name: "Character Counter", category: "Text", description: "Check character and text length instantly.", href: "/tools/character-counter" },
  { name: "Case Converter", category: "Text", description: "Convert text between common letter cases.", href: "/tools/case-converter" },
  { name: "Meta Tag Generator", category: "SEO", description: "Create search and social metadata for a page.", href: "/tools/meta-tag-generator" },
  { name: "Keyword Density Checker", category: "SEO", description: "Review keyword frequency in your text.", href: "/tools/keyword-density-checker" },
  { name: "Hashtag Generator", category: "Social", description: "Generate relevant hashtag ideas for a topic.", href: "/tools/hashtag-generator" },
  { name: "Instagram Caption Generator", category: "Social", description: "Create editable caption ideas for posts.", href: "/tools/instagram-caption-generator" },
  { name: "HTML Formatter", category: "Developer", description: "Format HTML for easier reading and editing.", href: "/tools/html-formatter" },
  { name: "CSS Formatter", category: "Developer", description: "Format CSS with consistent indentation.", href: "/tools/css-formatter" },
  { name: "Hash Generator", category: "Developer", description: "Generate SHA-256, SHA-384 and SHA-512 hashes.", href: "/tools/hash-generator" },
  { name: "Color Converter", category: "Developer", description: "Convert HEX and RGB color values.", href: "/tools/color-converter" },
  { name: "Base64 Encoder & Decoder", category: "Developer", description: "Encode and decode Base64 text.", href: "/tools/base64" },
  { name: "JSON Formatter", category: "Developer", description: "Format and validate JSON data.", href: "/tools/json-formatter" },
  { name: "JavaScript Formatter", category: "Developer", description: "Format JavaScript for readability.", href: "/tools/js-formatter" },
  { name: "URL Encoder & Decoder", category: "Developer", description: "Encode or decode URL components.", href: "/tools/url-encoder-decoder" },
  { name: "UUID Generator", category: "Developer", description: "Generate universally unique identifiers.", href: "/tools/uuid-generator" },
  { name: "Timestamp Converter", category: "Developer", description: "Convert timestamps and readable dates.", href: "/tools/timestamp-converter" },
  { name: "QR Code Generator", category: "Developer", description: "Create QR codes from text and links.", href: "/tools/qr-code-generator" },
  { name: "Password Generator", category: "Developer", description: "Generate strong random passwords.", href: "/tools/password-generator" },
  { name: "PDF to JPG", category: "PDF", description: "Convert PDF pages into JPG images.", href: "/tools/pdf-to-jpg" },
  { name: "JPG to PDF", category: "PDF", description: "Create a PDF from JPG images.", href: "/tools/jpg-to-pdf" },
  { name: "PDF Rotate", category: "PDF", description: "Rotate PDF pages to the correct orientation.", href: "/tools/pdf-rotate" },
  { name: "PDF Extract Text", category: "PDF", description: "Extract selectable text from a PDF.", href: "/tools/pdf-extract-text" },
  { name: "PDF Page Number", category: "PDF", description: "Add page numbers to PDF documents.", href: "/tools/pdf-page-number" },
  { name: "PDF Watermark", category: "PDF", description: "Add a watermark to PDF pages.", href: "/tools/pdf-watermark" },
  { name: "PDF Metadata", category: "PDF", description: "View and edit PDF document metadata.", href: "/tools/pdf-metadata" },
  { name: "PDF Protect", category: "PDF", description: "Protect PDF files with a password.", href: "/tools/pdf-protect" },
  { name: "Image Brightness", category: "Image", description: "Adjust image brightness.", href: "/tools/image-brightness" },
  { name: "Image Cropper", category: "Image", description: "Crop an image to a selected area.", href: "/tools/image-cropper" },
  { name: "Image Rotate", category: "Image", description: "Rotate images to the right orientation.", href: "/tools/image-rotate" },
  { name: "Image Flip", category: "Image", description: "Flip images horizontally or vertically.", href: "/tools/image-flip" },
  { name: "Image Grayscale", category: "Image", description: "Convert images to grayscale.", href: "/tools/image-grayscale" },
  { name: "SIP Calculator", category: "Calculators", description: "Estimate SIP investment growth.", href: "/tools/sip-calculator" },
  { name: "Remove Extra Spaces", category: "Text", description: "Clean repeated spaces from text.", href: "/tools/remove-extra-spaces" },
  { name: "Meta Description Generator", category: "SEO", description: "Write concise search descriptions.", href: "/tools/meta-description-generator" },
  { name: "Slug Generator", category: "SEO", description: "Create clean URL slugs from text.", href: "/tools/slug-generator" },
  { name: "Sitemap Generator", category: "SEO", description: "Generate sitemap XML content.", href: "/tools/sitemap-generator" },
  { name: "Open Graph Preview", category: "Social", description: "Preview social sharing metadata.", href: "/tools/og-preview-generator" },
  { name: "YouTube Title Generator", category: "Social", description: "Generate editable YouTube title ideas.", href: "/tools/youtube-title-generator" },
  { name: "YouTube Description Generator", category: "Social", description: "Create YouTube description drafts.", href: "/tools/youtube-description-generator" },
  { name: "Item Master Matcher", category: "Business", description: "Match hospital purchase items to your item master.", href: "/tools/item-master-matcher" },
  { name: "Vendor Quotation Comparison", category: "Business", description: "Compare supplier quotations side by side.", href: "/tools/vendor-quotation-comparison" },
  { name: "Excel Combiner", category: "Data", description: "Combine Excel and CSV files into one workbook.", href: "/tools/excel-combiner" },
  { name: "CSV to JSON", category: "Data", description: "Convert CSV rows into structured JSON.", href: "/tools/csv-to-json" },
  { name: "JSON to CSV", category: "Data", description: "Convert JSON records into CSV format.", href: "/tools/json-to-csv" },
  { name: "PDF to Excel", category: "PDF", description: "Convert supported PDF tables into spreadsheet data.", href: "/tools/pdf-to-excel" },
  { name: "PDF to Word", category: "PDF", description: "Convert PDF documents into editable Word files.", href: "/tools/pdf-to-word" },
  { name: "JPG to Excel", category: "Image", description: "Extract table data from images into spreadsheets.", href: "/tools/jpg-to-excel" },
  { name: "JPG to Word", category: "Image", description: "Convert image text into editable documents.", href: "/tools/jpg-to-word" },
  { name: "Remove Duplicate Lines", category: "Text", description: "Remove repeated lines from text.", href: "/tools/remove-duplicate-lines" },
  { name: "Line Sorter", category: "Text", description: "Sort text lines alphabetically or numerically.", href: "/tools/line-sorter" },
  { name: "Text Diff Checker", category: "Text", description: "Compare two text blocks and find differences.", href: "/tools/text-diff-checker" },
];

const categories = ["All", "PDF", "Image", "Calculators", "Text", "SEO", "Social", "Developer", "Business", "Data"];

const products = [
  { number: "01", title: "Hospital Purchase Management Kit", description: "Practical procurement trackers, purchase workflows and vendor comparison templates.", tag: "Healthcare operations" },
  { number: "02", title: "Pharmacy Inventory & Expiry Kit", description: "Structured stock, expiry monitoring and reorder planning templates.", tag: "Pharmacy operations" },
  { number: "03", title: "Vendor Quotation Comparison", description: "Compare supplier offers with a consistent, decision-ready format.", tag: "Procurement" },
  { number: "04", title: "Business Financial Projection Kit", description: "Organise assumptions, forecasts and business planning in one workbook.", tag: "Business planning" },
];

function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function PlatformPreviewPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [mobileOpen, setMobileOpen] = useState(false);

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((tool) =>
      (category === "All" || tool.category === category) &&
      (!q || (tool.name + " " + tool.description + " " + tool.category).toLowerCase().includes(q))
    );
  }, [query, category]);

  return (
    <main className="min-h-screen bg-[#f6f8fc] text-[#14213d]">
      <div className="border-b border-[#dbe4f0] bg-[#10254b] px-4 py-2 text-center text-xs font-semibold tracking-wide text-white">
        PRIVATE STAGING PREVIEW · NOT THE LIVE WEBSITE · TEST PAYMENTS ONLY
      </div>

      <section id="home" className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[.12em] text-[#2458d3]"><span className="h-2 w-2 rounded-full bg-emerald-500" /> One workspace. More ways to get work done.</div>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-[-.045em] text-[#10254b] sm:text-5xl lg:text-6xl">Powerful tools for your <span className="text-[#2458d3]">everyday work.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">Get practical online tools, ready-to-use business resources and workflow solutions in one organised place. Simple to use, built to help you move faster.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#tools" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2458d3] px-6 py-4 text-sm font-extrabold text-white shadow-xl shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-[#1745b6]">Explore free tools <Arrow /></a>
              <a href="#products" className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-4 text-sm font-extrabold text-[#10254b] transition hover:border-blue-300 hover:bg-blue-50">Explore business resources</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-500"><span>✓ Browser-based utilities</span><span>✓ Practical business resources</span><span>✓ Mobile-friendly experience</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-blue-900/10 sm:p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4"><div><p className="text-xs font-bold uppercase tracking-widest text-slate-400">Your workspace</p><p className="mt-1 text-lg font-extrabold">What would you like to do?</p></div><span className="rounded-xl bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">Explore</span></div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[["▤","PDF tools","Documents"],["▧","Image tools","Visual assets"],["◉","Calculators","Everyday numbers"],["⌘","Developer tools","Code utilities"]].map(([icon,title,sub]) => <a key={title} href="#tools" className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-xl font-bold text-[#2458d3] shadow-sm">{icon}</span><b className="mt-4 block text-sm">{title}</b><span className="mt-1 block text-xs text-slate-500">{sub}</span></a>)}
              </div>
              <div className="mt-4 rounded-2xl bg-[#10254b] p-5 text-white"><p className="text-xs font-bold uppercase tracking-widest text-blue-200">Business resources</p><p className="mt-2 text-lg font-extrabold">Turn repeat work into organised workflows.</p><a href="#business" className="mt-3 inline-flex text-sm font-bold text-blue-200 hover:text-white">Explore solutions <Arrow /></a></div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl sm:block"><p className="text-xs font-bold text-slate-400">DESIGNED FOR</p><p className="mt-1 text-sm font-extrabold text-[#10254b]">Individuals & teams</p></div>
          </div>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2458d3]">The tool library</p><h2 className="mt-3 text-3xl font-black tracking-tight text-[#10254b] sm:text-4xl">Find the right tool, faster.</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Browse useful tools by category or search by the task you need to complete.</p></div>
          <span className="text-sm font-bold text-slate-500">{tools.length}+ listed tool experiences</span>
        </div>
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <label htmlFor="tool-search" className="mb-2 block text-sm font-bold text-slate-700">Search tools</label>
          <div className="flex flex-col gap-3 md:flex-row">
            <input id="tool-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try “compress PDF” or “GST calculator”" className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" />
            <button type="button" onClick={() => { setQuery(""); setCategory("All"); }} className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">Clear filters</button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Filter tools by category">
            {categories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} aria-pressed={category === item} className={`rounded-full px-4 py-2 text-xs font-bold transition ${category === item ? "bg-[#2458d3] text-white shadow-md shadow-blue-200" : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"}`}>{item}</button>)}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => <a key={tool.name} href={tool.href} className="group rounded-2xl border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-900/5"><div className="flex items-start justify-between gap-3"><span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-blue-700">{tool.category}</span><span className="text-slate-300 transition group-hover:text-blue-600"><Arrow /></span></div><h3 className="mt-3 text-sm font-extrabold text-[#10254b]">{tool.name}</h3><p className="mt-1.5 text-xs leading-6 text-slate-500">{tool.description}</p><span className="mt-3 inline-block text-xs font-bold text-[#2458d3]">Open tool</span></a>)}
          </div>
          {filteredTools.length === 0 && <div className="rounded-2xl bg-slate-50 px-4 py-10 text-center"><p className="font-bold text-slate-700">No matching tools found</p><p className="mt-1 text-sm text-slate-500">Try a different search term or category.</p></div>}
          <p className="mt-5 text-xs leading-5 text-slate-400">Tool links are mapped from the current tool catalogue and will be regression-tested before this preview is considered complete.</p>
        </div>
      </section>

      <section id="products" className="scroll-mt-24 border-y border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2458d3]">Digital products</p><h2 className="mt-3 text-3xl font-black tracking-tight text-[#10254b] sm:text-4xl">Practical resources. Ready for real work.</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Structured templates and business kits designed to reduce repetitive work and make everyday decisions easier.</p></div><span className="rounded-full bg-amber-50 px-4 py-2 text-xs font-bold text-amber-800">Preview catalogue · Checkout disabled</span></div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{products.map((product) => <article key={product.number} className="flex flex-col rounded-2xl border border-slate-200 bg-[#fbfcff] p-5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5"><span className="text-xs font-black tracking-widest text-blue-600">{product.number} / RESOURCE</span><span className="mt-5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">{product.tag}</span><h3 className="mt-2 text-lg font-extrabold leading-snug text-[#10254b]">{product.title}</h3><p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{product.description}</p><a href="mailto:support@kaamkitpro.com?subject=Digital%20Product%20Enquiry" className="mt-6 inline-flex items-center justify-between border-t border-slate-200 pt-4 text-xs font-extrabold text-[#2458d3]">Request details <Arrow /></a></article>)}</div>
        </div>
      </section>

      <section id="business" className="scroll-mt-24 bg-[#10254b] py-16 text-white lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8">
          <div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-blue-300">Business solutions</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Make complex workflows feel simpler.</h2><p className="mt-4 text-sm leading-7 text-blue-100/75">Purpose-built resources for teams that manage purchasing, inventory, suppliers and operational planning.</p><a href="mailto:support@kaamkitpro.com?subject=Business%20Solutions%20Enquiry" className="mt-7 inline-flex rounded-xl bg-white px-5 py-3.5 text-sm font-extrabold text-[#10254b] transition hover:bg-blue-50">Discuss a business need <Arrow /></a></div>
          <div className="grid gap-3 sm:grid-cols-2">{[["Healthcare procurement","Purchase tracking, vendor comparisons and structured procurement records."],["Pharmacy operations","Stock visibility, expiry review and reorder planning."],["Vendor management","Organise quotations, supplier data and comparison workflows."],["Business planning","Bring assumptions, budgets and projections into one view."]].map(([title,desc]) => <div key={title} className="rounded-2xl border border-white/15 bg-white/[.06] p-5"><span className="text-xl text-blue-300">✳</span><h3 className="mt-3 font-extrabold">{title}</h3><p className="mt-2 text-xs leading-6 text-blue-100/70">{desc}</p></div>)}</div>
        </div>
      </section>

      <section id="resources" className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-10"><div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center"><div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2458d3]">Knowledge & support</p><h2 className="mt-3 text-2xl font-black tracking-tight text-[#10254b] sm:text-3xl">Clear guidance makes better tools.</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Helpful explainers, step-by-step instructions and practical answers should make every tool easier to use—not just add more pages.</p></div><a href="mailto:support@kaamkitpro.com?subject=KaamKitPro%20Support" className="inline-flex justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-extrabold text-[#10254b] hover:border-blue-300 hover:bg-blue-50">Contact support <Arrow /></a></div></div></section>

    </main>
  );
}
