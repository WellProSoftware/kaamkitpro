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
  { name: "PDF to JPG", category: "PDF", description: "Convert PDF pages into JPG images.", href: "/tools/pdf-to-jpg" },
  { name: "JPG to PDF", category: "PDF", description: "Create a PDF from JPG images.", href: "/tools/jpg-to-pdf" },
  { name: "PDF Rotate", category: "PDF", description: "Rotate PDF pages to the correct orientation.", href: "/tools/pdf-rotate" },
  { name: "PDF Extract Text", category: "PDF", description: "Extract selectable text from a PDF.", href: "/tools/pdf-extract-text" },
  { name: "PDF Page Number", category: "PDF", description: "Add page numbers to PDF documents.", href: "/tools/pdf-page-number" },
  { name: "PDF Watermark", category: "PDF", description: "Add a watermark to PDF pages.", href: "/tools/pdf-watermark" },
  { name: "PDF Metadata", category: "PDF", description: "View and edit PDF document metadata.", href: "/tools/pdf-metadata" },
  { name: "Image Brightness", category: "Image", description: "Adjust image brightness.", href: "/tools/image-brightness" },
  { name: "Image Cropper", category: "Image", description: "Crop an image to a selected area.", href: "/tools/image-cropper" },
  { name: "Image Rotate", category: "Image", description: "Rotate images to the right orientation.", href: "/tools/image-rotate" },
  { name: "Image Flip", category: "Image", description: "Flip images horizontally or vertically.", href: "/tools/image-flip" },
  { name: "Image Grayscale", category: "Image", description: "Convert images to grayscale.", href: "/tools/image-grayscale" },
  { name: "SIP Calculator", category: "Calculators", description: "Estimate SIP investment growth.", href: "/tools/sip-calculator" },
  { name: "Item Master Matcher", category: "Business", description: "Match hospital purchase items to your item master.", href: "/tools/item-master-matcher" },
  { name: "Excel Combiner", category: "Data", description: "Combine Excel and CSV files into one workbook.", href: "/tools/excel-combiner" },
  { name: "PDF to Excel", category: "PDF", description: "Convert supported PDF tables into spreadsheet data.", href: "/tools/pdf-to-excel" },
  { name: "PDF to Word", category: "PDF", description: "Convert PDF documents into editable Word files.", href: "/tools/pdf-to-word" },
  { name: "JPG to Excel", category: "Image", description: "Extract table data from images into spreadsheets.", href: "/tools/jpg-to-excel" },
  { name: "JPG to Word", category: "Image", description: "Convert image text into editable documents.", href: "/tools/jpg-to-word" },
];

const categories = ["All", "PDF", "Image", "Calculators", "Business", "Data"];

const products = [
  { number: "01", title: "Hospital Purchase Management Kit", description: "Practical procurement trackers, purchase workflows and vendor comparison templates.", tag: "Healthcare operations" },
  { number: "02", title: "Pharmacy Inventory & Expiry Kit", description: "Structured stock, expiry monitoring and reorder planning templates.", tag: "Pharmacy operations" },
  { number: "04", title: "Business Financial Projection Kit", description: "Organise assumptions, forecasts and business planning in one workbook.", tag: "Business planning" },
];

function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function PlatformPreviewPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((tool) =>
      (category === "All" || tool.category === category) &&
      (!q || (tool.name + " " + tool.description + " " + tool.category).toLowerCase().includes(q))
    );
  }, [query, category]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f7fb] text-[#14213d]">
      <div className="border-b border-[#dbe4f0] bg-[#10254b] px-4 py-2 text-center text-xs font-semibold tracking-wide text-white">
        STAGING PREVIEW · NOT THE LIVE WEBSITE · TEST PAYMENTS ONLY
      </div>

      <section id="home" className="relative isolate overflow-hidden bg-[#08172f] text-white">
        <div className="pointer-events-none absolute -right-24 -top-32 h-[34rem] w-[34rem] rounded-full bg-cyan-400/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 h-[28rem] w-[28rem] rounded-full bg-blue-600/30 blur-[100px]" />
        <div className="pointer-events-none absolute inset-0 opacity-[.12]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.16) 1px, transparent 1px)", backgroundSize: "54px 54px" }} />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:py-24 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-28">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.08] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.16em] text-cyan-200 backdrop-blur"><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,.9)]" /> A smarter home for everyday work</div>
            <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-[-.055em] text-white sm:text-6xl lg:text-[4.6rem]">One workspace.<br /><span className="bg-gradient-to-r from-cyan-200 via-white to-blue-300 bg-clip-text text-transparent">More momentum.</span></h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">From quick everyday tasks to serious business workflows, bring the tools, templates and practical resources you need into one beautifully organised workspace.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#tools" className="inline-flex items-center justify-center gap-3 rounded-xl bg-cyan-300 px-7 py-4 text-sm font-black text-[#07172f] shadow-xl shadow-cyan-950/30 transition hover:-translate-y-1 hover:bg-cyan-200">Explore tools <Arrow /></a>
              <a href="#products" className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/[.06] px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10">Discover digital kits</a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-300"><span>✓ Easy-to-use utilities</span><span>✓ Practical work resources</span><span>✓ Built for every screen</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="rounded-[2rem] border border-white/15 bg-white/[.08] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4"><div><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-cyan-200">Your workspace</p><p className="mt-1 text-xl font-extrabold text-white">Start with what you need</p></div><span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-[10px] font-bold text-emerald-200">YOUR WORKSPACE</span></div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[["▤","PDF tools","Documents"],["▧","Image tools","Visual assets"],["◉","Calculators","Smart calculations"],["▦","Business tools","Purchase workflows"]].map(([icon,title,sub]) => <a key={title} href="#tools" className="rounded-2xl border border-white/10 bg-[#102744] p-4 transition hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-[#15365c]"><span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan-200 to-blue-400 text-xl font-black text-[#09203d] shadow-lg shadow-cyan-950/30">{icon}</span><b className="mt-4 block text-sm text-white">{title}</b><span className="mt-1 block text-xs text-slate-300">{sub}</span></a>)}
              </div>
              <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-gradient-to-r from-[#123d68] to-[#164d75] p-5 text-white"><p className="text-xs font-bold uppercase tracking-widest text-blue-200">Business resources</p><p className="mt-2 text-lg font-extrabold">Less busywork. Better decisions.</p><a href="#business" className="mt-3 inline-flex text-sm font-bold text-blue-200 hover:text-white">Explore solutions <Arrow /></a></div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-white/15 bg-[#102744] px-5 py-4 shadow-xl sm:block"><p className="text-[10px] font-extrabold tracking-[.18em] text-cyan-200">MADE FOR</p><p className="mt-1 text-sm font-extrabold text-white">Individuals & teams</p></div>
          </div>
        </div>
      </section>

      <section aria-label="Platform highlights" className="relative z-10 mx-auto -mt-7 max-w-6xl px-5 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_22px_60px_rgba(15,35,70,.10)] sm:grid-cols-3">
          {[["01","Find faster","Search-led access to useful tools"],["02","Work smarter","Practical templates and workflows"],["03","Stay in control","Simple, focused experiences"]].map(([n,title,desc], index) => <div key={n} className={`flex items-start gap-4 p-5 sm:p-6 ${index ? "border-t border-slate-100 sm:border-l sm:border-t-0" : ""}`}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#edf4ff] text-xs font-black tracking-wide text-[#2458d3]">{n}</span>
            <div><h2 className="text-sm font-extrabold text-[#10254b]">{title}</h2><p className="mt-1 text-xs leading-5 text-slate-500">{desc}</p></div>
          </div>)}
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2458d3]">The tool library</p><h2 className="mt-3 text-3xl font-black tracking-tight text-[#10254b] sm:text-4xl">The right tool. Right when you need it.</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Search by task, explore a category, and get straight to work—without digging through menus.</p></div>
          <span className="text-sm font-bold text-slate-500">{tools.length}+ listed tool experiences</span>
        </div>
        <div className="mt-8 rounded-[2rem] border border-slate-200/80 bg-white p-5 shadow-[0_24px_70px_rgba(15,35,70,.08)] sm:p-7">
          <label htmlFor="tool-search" className="mb-2 block text-sm font-bold text-slate-700">Search tools</label>
          <div className="flex flex-col gap-3 md:flex-row">
            <input id="tool-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try “compress PDF” or “GST calculator”" className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" />
            <button type="button" onClick={() => { setQuery(""); setCategory("All"); }} className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">Clear filters</button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Filter tools by category">
            {categories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} aria-pressed={category === item} className={`rounded-full px-4 py-2 text-xs font-bold transition ${category === item ? "bg-[#2458d3] text-white shadow-md shadow-blue-200" : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"}`}>{item}</button>)}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => <a key={tool.name} href={tool.href} className="group rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/70 p-5 transition duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-[0_18px_40px_rgba(28,74,150,.12)]"><div className="flex items-start justify-between gap-3"><span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-blue-700">{tool.category}</span><span className="text-slate-300 transition group-hover:text-blue-600"><Arrow /></span></div><h3 className="mt-3 text-sm font-extrabold text-[#10254b]">{tool.name}</h3><p className="mt-1.5 text-xs leading-6 text-slate-500">{tool.description}</p><span className="mt-3 inline-block text-xs font-bold text-[#2458d3]">Open tool</span></a>)}
          </div>
          {filteredTools.length === 0 && <div className="rounded-2xl bg-slate-50 px-4 py-10 text-center"><p className="font-bold text-slate-700">No matching tools found</p><p className="mt-1 text-sm text-slate-500">Try a different search term or category.</p></div>}
          <p className="mt-5 text-xs leading-5 text-slate-400">Tool links are mapped from the current tool catalogue and will be regression-tested before this preview is considered complete.</p>
        </div>
      </section>

      <section id="products" className="scroll-mt-24 border-y border-slate-200/70 bg-gradient-to-b from-white to-[#f2f6fc] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2458d3]">Digital products</p><h2 className="mt-3 text-3xl font-black tracking-tight text-[#10254b] sm:text-4xl">Better systems start with better resources.</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Structured templates and business kits designed to reduce repetitive work and make everyday decisions easier.</p></div><span className="rounded-full bg-amber-50 px-4 py-2 text-xs font-bold text-amber-800">Preview catalogue · Checkout disabled</span></div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{products.map((product) => <article key={product.number} className="flex flex-col rounded-[1.6rem] border border-slate-200/80 bg-white p-6 shadow-[0_12px_35px_rgba(15,35,70,.05)] transition duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-[0_22px_45px_rgba(15,35,70,.1)]"><span className="text-xs font-black tracking-widest text-blue-600">{product.number} / RESOURCE</span><span className="mt-5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">{product.tag}</span><h3 className="mt-2 text-lg font-extrabold leading-snug text-[#10254b]">{product.title}</h3><p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{product.description}</p><a href="mailto:support@kaamkitpro.com?subject=Digital%20Product%20Enquiry" className="mt-6 inline-flex items-center justify-between border-t border-slate-200 pt-4 text-xs font-extrabold text-[#2458d3]">Request details <Arrow /></a></article>)}</div>
        </div>
      </section>

      <section id="business" className="scroll-mt-24 bg-[#10254b] py-16 text-white lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8">
          <div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-blue-300">Business solutions</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Bring order to the work behind your business.</h2><p className="mt-4 text-sm leading-7 text-blue-100/75">Purpose-built resources for teams that manage purchasing, inventory, suppliers and operational planning.</p><a href="mailto:support@kaamkitpro.com?subject=Business%20Solutions%20Enquiry" className="mt-7 inline-flex rounded-xl bg-white px-5 py-3.5 text-sm font-extrabold text-[#10254b] transition hover:bg-blue-50">Discuss a business need <Arrow /></a></div>
          <div className="grid gap-3 sm:grid-cols-2">{[["Healthcare procurement","Purchase tracking, vendor comparisons and structured procurement records."],["Pharmacy operations","Stock visibility, expiry review and reorder planning."],["Vendor management","Organise quotations, supplier data and comparison workflows."],["Business planning","Bring assumptions, budgets and projections into one view."]].map(([title,desc]) => <div key={title} className="rounded-2xl border border-white/15 bg-white/[.06] p-5"><span className="text-xl text-blue-300">✳</span><h3 className="mt-3 font-extrabold">{title}</h3><p className="mt-2 text-xs leading-6 text-blue-100/70">{desc}</p></div>)}</div>
        </div>
      </section>

      <section id="resources" className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-10"><div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center"><div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2458d3]">Knowledge & support</p><h2 className="mt-3 text-2xl font-black tracking-tight text-[#10254b] sm:text-3xl">Clear guidance makes better tools.</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Helpful explainers, step-by-step instructions and practical answers should make every tool easier to use—not just add more pages.</p></div><a href="mailto:support@kaamkitpro.com?subject=KaamKitPro%20Support" className="inline-flex justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-extrabold text-[#10254b] hover:border-blue-300 hover:bg-blue-50">Contact support <Arrow /></a></div></div></section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
          <div>
            <a href="#home" className="text-xl font-black tracking-tight text-[#10254b]">KaamKit<span className="text-[#2458d3]">Pro</span></a>
            <p className="mt-3 max-w-sm text-sm leading-7 text-slate-500">Practical online tools and business resources designed to make everyday work simpler.</p>
            <a href="mailto:support@kaamkitpro.com" className="mt-4 inline-block text-sm font-bold text-[#2458d3]">support@kaamkitpro.com</a>
          </div>
          <div><h3 className="text-sm font-extrabold text-[#10254b]">Explore</h3><div className="mt-4 grid gap-3 text-sm text-slate-500"><a className="hover:text-blue-700" href="#tools">All tools</a><a className="hover:text-blue-700" href="#products">Digital products</a><a className="hover:text-blue-700" href="#business">Business solutions</a><a className="hover:text-blue-700" href="#resources">Resources</a></div></div>
          <div><h3 className="text-sm font-extrabold text-[#10254b]">Company</h3><div className="mt-4 grid gap-3 text-sm text-slate-500"><a className="hover:text-blue-700" href="/about">About us</a><a className="hover:text-blue-700" href="/contact">Contact</a><a className="hover:text-blue-700" href="/advertise">Advertise</a><a className="hover:text-blue-700" href="/login">My account</a></div></div>
          <div><h3 className="text-sm font-extrabold text-[#10254b]">Legal</h3><div className="mt-4 grid gap-3 text-sm text-slate-500"><a className="hover:text-blue-700" href="/privacy-policy">Privacy policy</a><a className="hover:text-blue-700" href="/terms">Terms of service</a><a className="hover:text-blue-700" href="/disclaimer">Disclaimer</a></div></div>
        </div>
        <div className="border-t border-slate-100"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8"><span>© {new Date().getFullYear()} KaamKitPro. All rights reserved.</span><span>Built for useful work, with clarity and care.</span></div></div>
      </footer>
    </main>
  );
}
