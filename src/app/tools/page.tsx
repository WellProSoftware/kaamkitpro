import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Free Online Tools Directory | KaamKitPro",
  description: "Explore practical free online PDF tools, image tools, calculators and business productivity utilities from KaamKitPro.",
  alternates: { canonical: "https://kaamkitpro.com/tools" },
  openGraph: {
    title: "Free Online Tools Directory | KaamKitPro",
    description: "Find practical tools for PDFs, images, calculations and business workflows.",
    url: "https://kaamkitpro.com/tools",
    type: "website",
  },
};

const categories = [
  { title: "PDF Tools", href: "/tools/pdf", description: "Merge, split, convert and compress documents.", icon: "▤", tone: "bg-blue-50 text-blue-700" },
  { title: "Image Tools", href: "/tools/image", description: "Resize, crop, convert and optimise images.", icon: "▧", tone: "bg-violet-50 text-violet-700" },
  { title: "Calculators", href: "/tools/calculators", description: "Quick calculations for everyday decisions.", icon: "∑", tone: "bg-emerald-50 text-emerald-700" },
  { title: "Business Tools", href: "#all-tools", description: "Work with spreadsheets and purchase data.", icon: "▦", tone: "bg-amber-50 text-amber-700" },
];

const tools = [
  { href: "/tools/item-master-matcher", title: "Item Mapping", description: "Match hospital purchase item descriptions to your item master.", category: "Business Tools" },
  { href: "/tools/excel-combiner", title: "Excel Merge", description: "Combine multiple Excel and CSV files into one workbook.", category: "Business Tools" },
  { href: "/tools/gst-calculator", title: "GST Calculator", description: "Calculate GST-inclusive and GST-exclusive prices.", category: "Calculators" },
  { href: "/tools/age-calculator", title: "Age Calculator", description: "Calculate exact age from date of birth.", category: "Calculators" },
  { href: "/tools/bmi-calculator", title: "BMI Calculator", description: "Calculate Body Mass Index using height and weight.", category: "Calculators" },
  { href: "/tools/sip-calculator", title: "SIP Calculator", description: "Estimate SIP investment growth and returns.", category: "Calculators" },
  { href: "/tools/pdf-merge", title: "PDF Merge", description: "Combine multiple PDF files into one document.", category: "PDF Tools" },
  { href: "/tools/pdf-split", title: "PDF Split", description: "Split a PDF into separate pages or smaller files.", category: "PDF Tools" },
  { href: "/tools/pdf-to-jpg", title: "PDF to JPG", description: "Convert PDF pages into JPG images.", category: "PDF Tools" },
  { href: "/tools/jpg-to-pdf", title: "JPG to PDF", description: "Combine images into a PDF document.", category: "PDF Tools" },
  { href: "/tools/pdf-rotate", title: "PDF Rotate", description: "Rotate PDF pages by 90, 180 or 270 degrees.", category: "PDF Tools" },
  { href: "/tools/pdf-page-number", title: "PDF Page Number", description: "Add page numbers to PDF documents.", category: "PDF Tools" },
  { href: "/tools/pdf-watermark", title: "PDF Watermark", description: "Add a text watermark to PDF pages.", category: "PDF Tools" },
  { href: "/tools/pdf-metadata", title: "PDF Metadata Editor", description: "Edit PDF title, author, subject and keywords.", category: "PDF Tools" },
  { href: "/tools/pdf-extract-text", title: "PDF Text Extractor", description: "Extract selectable text from PDF files.", category: "PDF Tools" },
  { href: "/tools/pdf-compressor", title: "PDF Compressor", description: "Reduce PDF file size with browser-side optimisation.", category: "PDF Tools" },
  { href: "/tools/pdf-to-excel", title: "PDF to Excel", description: "Convert supported PDF tables into spreadsheet data.", category: "PDF Tools" },
  { href: "/tools/pdf-to-word", title: "PDF to Word", description: "Convert PDF documents into editable Word files.", category: "PDF Tools" },
  { href: "/tools/jpg-to-excel", title: "JPG to Excel", description: "Extract table data from images into spreadsheet format.", category: "PDF Tools" },
  { href: "/tools/jpg-to-word", title: "JPG to Word", description: "Convert image text into an editable document.", category: "PDF Tools" },
  { href: "/tools/image-compressor", title: "Image Compressor", description: "Reduce image file size while keeping useful quality.", category: "Image Tools" },
  { href: "/tools/image-resizer", title: "Image Resizer", description: "Resize images to custom dimensions.", category: "Image Tools" },
  { href: "/tools/image-converter", title: "Image Converter", description: "Convert images between common formats.", category: "Image Tools" },
  { href: "/tools/image-cropper", title: "Image Cropper", description: "Crop images to the area and dimensions you need.", category: "Image Tools" },
  { href: "/tools/image-flip", title: "Image Flip", description: "Flip images horizontally or vertically.", category: "Image Tools" },
  { href: "/tools/image-brightness", title: "Image Brightness", description: "Adjust image brightness in your browser.", category: "Image Tools" },
  { href: "/tools/image-rotate", title: "Image Rotate", description: "Rotate images by common angles.", category: "Image Tools" },
  { href: "/tools/image-grayscale", title: "Image Grayscale", description: "Convert colour images to grayscale.", category: "Image Tools" },
];

const iconFor = (category: string) => category === "PDF Tools" ? "▤" : category === "Image Tools" ? "▧" : category === "Calculators" ? "∑" : "▦";
const toneFor = (category: string) => category === "PDF Tools" ? "bg-blue-50 text-blue-700" : category === "Image Tools" ? "bg-violet-50 text-violet-700" : category === "Calculators" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700";

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb]">
      <Breadcrumbs items={[{ label: "Tools" }]} />
      <section className="relative overflow-hidden bg-[#101d3a] text-white">
        <div aria-hidden="true" className="absolute -right-24 -top-36 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-sky-300">KaamKitPro tool library</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">The right tool for the task at hand.</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-blue-100/80 sm:text-lg">Explore practical browser-based tools for documents, images, calculations and business workflows—all organised in one place.</p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-blue-100/80">
            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">{tools.length} tools in the library</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">Simple browser workflows</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">Responsive on mobile</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-blue-600">Start here</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Browse by category</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.title} href={category.href} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/[0.07]">
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl font-bold ${category.tone}`}>{category.icon}</span>
              <h3 className="mt-5 text-lg font-extrabold text-slate-900 group-hover:text-blue-700">{category.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
              <span className="mt-5 inline-flex text-sm font-bold text-blue-700">Explore <span className="ml-2 transition group-hover:translate-x-1">→</span></span>
            </Link>
          ))}
        </div>
      </section>

      <section id="all-tools" className="border-y border-slate-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-blue-600">All available tools</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Explore the complete collection</h2>
              <p className="mt-2 text-sm text-slate-600">Choose a tool to open its workspace and get started.</p>
            </div>
            <Link href="/" className="text-sm font-bold text-blue-700 hover:text-blue-900">Back to home <span aria-hidden="true">→</span></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/[0.07]">
                <div className="flex items-center justify-between">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl font-bold ${toneFor(tool.category)}`}>{iconFor(tool.category)}</span>
                  <span className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600">↗</span>
                </div>
                <p className="mt-5 text-[11px] font-extrabold uppercase tracking-[.14em] text-slate-400">{tool.category}</p>
                <h3 className="mt-1 font-extrabold text-slate-900 group-hover:text-blue-700">{tool.title}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{tool.description}</p>
                <span className="mt-4 inline-flex text-sm font-bold text-blue-700">Open tool <span className="ml-2">→</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Clear and focused", body: "Each tool is designed around a specific task, helping you get to the result with fewer steps." },
            { title: "No desktop installation", body: "Open browser-based tools on supported modern devices and follow the on-page instructions." },
            { title: "Check important results", body: "Review exported files, selected options and calculation inputs before using important outputs." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-extrabold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
