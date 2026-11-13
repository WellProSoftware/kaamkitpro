"use client";

import BrandLogo from "@/components/BrandLogo";
import { useMemo, useState } from "react";

type Tool = {
  name: string;
  description: string;
  href: string;
  category: string;
};

const categories = [
  "All",
  "PDF Tools",
  "Image Tools",
  "Calculators",
  "Data Tools",
];

const tools: Tool[] = [
  {
    name: "Item Mapping",
    description: "Map hospital purchase items to your item master.",
    href: "/tools/item-master-matcher",
    category: "Data Tools",
  },
  {
    name: "Excel Merge",
    description: "Merge multiple Excel and CSV files into one workbook.",
    href: "/tools/excel-combiner",
    category: "Data Tools",
  },
  {
    name: "GST Calculator",
    description: "Calculate GST inclusive and exclusive prices.",
    href: "/tools/gst-calculator",
    category: "Calculators",
  },
  {
    name: "Age Calculator",
    description: "Calculate exact age from date of birth.",
    href: "/tools/age-calculator",
    category: "Calculators",
  },
  {
    name: "BMI Calculator",
    description: "Calculate BMI using height and weight.",
    href: "/tools/bmi-calculator",
    category: "Calculators",
  },
  {
    name: "SIP Calculator",
    description: "Estimate SIP returns and investment growth.",
    href: "/tools/sip-calculator",
    category: "Calculators",
  },

  {
    name: "PDF Merge",
    description: "Combine multiple PDF files into one PDF.",
    href: "/tools/pdf-merge",
    category: "PDF Tools",
  },
  {
    name: "PDF Split",
    description: "Split a PDF into individual pages.",
    href: "/tools/pdf-split",
    category: "PDF Tools",
  },
  {
    name: "PDF to JPG",
    description: "Convert PDF pages into JPG images.",
    href: "/tools/pdf-to-jpg",
    category: "PDF Tools",
  },
  {
    name: "JPG to PDF",
    description: "Convert images into a single PDF file.",
    href: "/tools/jpg-to-pdf",
    category: "PDF Tools",
  },
  {
    name: "PDF Rotate",
    description: "Rotate PDF pages by 90°, 180° or 270°.",
    href: "/tools/pdf-rotate",
    category: "PDF Tools",
  },
  {
    name: "PDF Page Number",
    description: "Add page numbers to every PDF page.",
    href: "/tools/pdf-page-number",
    category: "PDF Tools",
  },
  {
    name: "PDF Watermark",
    description: "Add a text watermark to every PDF page.",
    href: "/tools/pdf-watermark",
    category: "PDF Tools",
  },
  {
    name: "PDF Metadata Editor",
    description: "Edit PDF title, author, subject and keywords.",
    href: "/tools/pdf-metadata",
    category: "PDF Tools",
  },
  {
    name: "PDF Text Extractor",
    description: "Extract selectable text from PDF files.",
    href: "/tools/pdf-extract-text",
    category: "PDF Tools",
  },
  {
    name: "PDF Compressor",
    description: "Reduce PDF size with browser-side optimization.",
    href: "/tools/pdf-compressor",
    category: "PDF Tools",
  },

  {
    name: "Image Compressor",
    description: "Compress images and reduce file size.",
    href: "/tools/image-compressor",
    category: "Image Tools",
  },
  {
    name: "Image Resizer",
    description: "Resize images to your required dimensions.",
    href: "/tools/image-resizer",
    category: "Image Tools",
  },
  {
    name: "Image Converter",
    description: "Convert images between JPG, PNG and WebP.",
    href: "/tools/image-converter",
    category: "Image Tools",
  },
  {
    name: "Image Cropper",
    description: "Crop images to the exact area you need.",
    href: "/tools/image-cropper",
    category: "Image Tools",
  },


  {
    name: "Image Flip",
    description: "Flip images horizontally or vertically in your browser.",
    href: "/tools/image-flip",
    category: "Image Tools",
  },
  {
    name: "Image Brightness",
    description: "Adjust image brightness directly in your browser.",
    href: "/tools/image-brightness",
    category: "Image Tools",
  },
  {
    name: "Image Rotate",
    description: "Rotate images by 90, 180 or 270 degrees.",
    href: "/tools/image-rotate",
    category: "Image Tools",
  },
  {
    name: "Image Grayscale",
    description: "Convert colour images to grayscale online.",
    href: "/tools/image-grayscale",
    category: "Image Tools",
  },
  {
    name: "PDF to Excel",
    description: "Convert supported PDF tables into spreadsheet data.",
    href: "/tools/pdf-to-excel",
    category: "PDF Tools",
  },
  {
    name: "PDF to Word",
    description: "Convert PDF documents into editable Word files.",
    href: "/tools/pdf-to-word",
    category: "PDF Tools",
  },
  {
    name: "JPG to Excel",
    description: "Extract table data from images into spreadsheet format.",
    href: "/tools/jpg-to-excel",
    category: "PDF Tools",
  },
  {
    name: "JPG to Word",
    description: "Convert image text into an editable document.",
    href: "/tools/jpg-to-word",
    category: "PDF Tools",
  },

];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is KaamKitPro?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "KaamKitPro is a free online tools platform for PDF, image, calculator and everyday digital workflows.",
      },
    },
    {
      "@type": "Question",
      name: "Are KaamKitPro tools free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "KaamKitPro is being built around free online utilities. Tool availability and features may change as the platform grows.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to install software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No software installation is required for the web-based tools. Open the required tool in your browser and follow its instructions.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use KaamKitPro on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. KaamKitPro is designed with responsive web interfaces for modern mobile, tablet and desktop browsers.",
      },
    },
    {
      "@type": "Question",
      name: "Does KaamKitPro require an account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The current web tools are designed to be accessible without requiring users to create an account for basic use.",
      },
    },
  ],
};

const popularTools = [
  "PDF Merge",
  "Image Compressor",
  "GST Calculator",
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesCategory =
        category === "All" || tool.category === category;

      const matchesSearch =
        !query ||
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f7fb] text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative isolate overflow-hidden bg-[#101d3a] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-40 h-[28rem] w-[28rem] rounded-full bg-blue-500/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-52 -left-20 h-[28rem] w-[28rem] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-blue-100 shadow-lg shadow-slate-950/10">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Your everyday productivity platform
            </div>
            <h1 className="mt-7 max-w-3xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Get everyday work done
              <span className="mt-2 block bg-gradient-to-r from-sky-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">with smarter online tools.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100/80 sm:text-lg">
              Practical tools for PDFs, images, calculations and business workflows. Find what you need, finish the task and get on with your day.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#tools" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition hover:-translate-y-0.5 hover:bg-blue-400">
                Explore all tools <span className="ml-2" aria-hidden="true">→</span>
              </a>
              <a href="#categories" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                Browse categories
              </a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-blue-100/75">
              <span className="inline-flex items-center gap-2"><span className="text-emerald-300">✓</span> Easy to use</span>
              <span className="inline-flex items-center gap-2"><span className="text-emerald-300">✓</span> Works in your browser</span>
              <span className="inline-flex items-center gap-2"><span className="text-emerald-300">✓</span> Mobile friendly</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-400/20 to-cyan-300/10 blur-2xl" />
            <div className="relative rounded-[1.75rem] border border-white/15 bg-white/[0.09] p-4 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-bold text-white">Find the right tool</p>
                  <p className="mt-1 text-xs text-blue-100/60">Search by task or tool name</p>
                </div>
                <span className="rounded-xl bg-blue-400/15 px-3 py-2 text-lg">⌕</span>
              </div>
              <label htmlFor="home-tool-search" className="sr-only">Search online tools</label>
              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white p-2 pl-4 shadow-xl shadow-slate-950/10">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0 text-slate-400"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/><path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                <input id="home-tool-search" type="search" value={search} onChange={(event) => { setSearch(event.target.value); setCategory("All"); }} placeholder="Search a tool..." className="min-w-0 flex-1 border-0 bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0" />
                <a href="#tools" className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700">Search</a>
              </div>
              <div className="mt-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-[.14em] text-blue-100/60">Popular starting points</p>
                <div className="grid grid-cols-2 gap-3">
                  {tools.filter((tool) => popularTools.includes(tool.name)).map((tool) => (
                    <a key={tool.href} href={tool.href} className="group rounded-xl border border-white/10 bg-white/[0.07] p-4 transition hover:border-blue-300/50 hover:bg-white/[0.13]">
                      <span className="text-xl">{tool.category === "PDF Tools" ? "▤" : tool.category === "Image Tools" ? "▧" : "◉"}</span>
                      <span className="mt-2 block text-sm font-bold text-white group-hover:text-sky-200">{tool.name}</span>
                      <span className="mt-1 block text-xs leading-5 text-blue-100/60">{tool.description}</span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/15 px-4 py-3">
                <span className="text-xs font-medium text-blue-100/70">Explore the complete tool collection</span>
                <span className="text-sm font-bold text-sky-200">{tools.length} tools <span aria-hidden="true">↗</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-blue-600">Explore by task</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Everything you need, organised</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">Choose a category and get straight to the tool that helps you finish the job.</p>
          </div>
          <a href="/tools" className="text-sm font-bold text-blue-700 hover:text-blue-900">View all tools <span aria-hidden="true">→</span></a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "PDF Tools", href: "/tools/pdf", description: "Merge, split, convert and compress documents.", icon: "▤", tone: "bg-blue-50 text-blue-700", count: tools.filter((tool) => tool.category === "PDF Tools").length },
            { title: "Image Tools", href: "/tools/image", description: "Resize, crop, convert and optimise images.", icon: "▧", tone: "bg-violet-50 text-violet-700", count: tools.filter((tool) => tool.category === "Image Tools").length },
            { title: "Calculators", href: "/tools/calculators", description: "Quick calculations for everyday decisions.", icon: "∑", tone: "bg-emerald-50 text-emerald-700", count: tools.filter((tool) => tool.category === "Calculators").length },
            { title: "Business Tools", href: "/tools", description: "Work with spreadsheets and purchase data.", icon: "▦", tone: "bg-amber-50 text-amber-700", count: tools.filter((tool) => tool.category === "Data Tools").length },
          ].map((item) => (
            <a key={item.title} href={item.href} className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/40 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/[0.07]">
              <div className="flex items-start justify-between">
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl font-bold ${item.tone}`}>{item.icon}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">{item.count} tools</span>
              </div>
              <p className="mt-5 text-lg font-extrabold text-slate-900 group-hover:text-blue-700">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700">Explore category <span className="transition group-hover:translate-x-1">→</span></span>
            </a>
          ))}
        </div>
      </section>

      <section id="tools" className="border-y border-slate-200/80 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-blue-600">The tool library</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">{category === "All" ? "All Tools" : category}</h2>
              <p className="mt-2 text-sm text-slate-600">{filteredTools.length} tools available</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button key={item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2.5 text-sm font-bold transition ${category === item ? "bg-[#15284b] text-white shadow-md shadow-slate-900/10" : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"}`}>{item}</button>
              ))}
            </div>
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTools.map((tool) => (
                <a key={tool.href} href={tool.href} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/[0.07]">
                  <div className="flex items-center justify-between gap-3">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl font-bold ${tool.category === "PDF Tools" ? "bg-blue-50 text-blue-700" : tool.category === "Image Tools" ? "bg-violet-50 text-violet-700" : tool.category === "Calculators" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                      {tool.category === "PDF Tools" ? "▤" : tool.category === "Image Tools" ? "▧" : tool.category === "Calculators" ? "∑" : "▦"}
                    </span>
                    <span className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" aria-hidden="true">↗</span>
                  </div>
                  <p className="mt-5 text-[11px] font-extrabold uppercase tracking-[.14em] text-slate-400">{tool.category}</p>
                  <h3 className="mt-1 text-base font-extrabold text-slate-900 group-hover:text-blue-700">{tool.name}</h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{tool.description}</p>
                  <span className="mt-4 inline-flex text-sm font-bold text-blue-700">Open tool <span className="ml-2 transition group-hover:translate-x-1">→</span></span>
                </a>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
              <div className="text-3xl">⌕</div>
              <h3 className="mt-3 text-lg font-extrabold">No tool found</h3>
              <p className="mt-2 text-sm text-slate-600">Try another search term or browse all categories.</p>
              <button onClick={() => { setSearch(""); setCategory("All"); }} className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700">Show All Tools</button>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-3xl bg-[#101d3a] p-7 text-white sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-sky-300">Made for everyday work</p>
            <h2 className="mt-4 text-2xl font-black leading-tight sm:text-3xl">Less time searching. More time getting things done.</h2>
            <p className="mt-4 text-sm leading-7 text-blue-100/75">Open a focused tool in your browser, follow the steps and review your result. KaamKitPro brings practical workflows together in one place.</p>
            <a href="/tools" className="mt-7 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#15284b] transition hover:bg-sky-100">Browse the tool library <span className="ml-2">→</span></a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Straightforward workflows", body: "Clear interfaces help you focus on the task instead of learning complicated software.", icon: "✦" },
              { title: "Works across devices", body: "Use responsive pages on modern desktop, tablet and mobile browsers.", icon: "▣" },
              { title: "Useful everyday utilities", body: "Find document, image, calculator and business tools in one organised place.", icon: "⌘" },
              { title: "Review before you use", body: "Check exported files and calculation inputs before relying on important results.", icon: "✓" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="text-2xl text-blue-600">{item.icon}</span>
                <h3 className="mt-3 font-extrabold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-blue-600">Helpful answers</p>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">Frequently asked questions</h2>
            <p className="mt-3 text-sm text-slate-600">A few quick details before you get started.</p>
          </div>
          <div className="mt-8 space-y-3">
            {[
              ["What is KaamKitPro?", "KaamKitPro is an online tools platform for everyday work, with utilities for PDFs, images, calculations and business workflows."],
              ["Are the tools free to use?", "The current tool collection is available for free use. Features and availability are shown on their respective tool pages."],
              ["Do I need to install software?", "No separate desktop installation is required for browser-based tools. Open the tool and follow its instructions."],
              ["Can I use KaamKitPro on mobile?", "Yes. The website is designed to adapt to modern mobile, tablet and desktop screens."],
              ["Where can I find a specific tool?", "Use the search field above or browse the PDF, image, calculator and business tool categories."],
              ["Do I need an account?", "Basic use of the current web tools is designed to be accessible without creating an account."],
            ].map(([question, answer]) => (
              <details key={question} className="group rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 open:bg-white open:shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900">{question}<span className="text-xl font-normal text-blue-600 transition group-open:rotate-45">+</span></summary>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
