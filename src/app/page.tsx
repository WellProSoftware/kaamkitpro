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
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />


      <section className="border-b bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:py-20">
          <div className="mb-4 inline-flex rounded-full border bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            Free Online Tools
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Practical Online Tools,
            <span className="block text-blue-600">All in One Place.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Use practical PDF, image and calculator tools — all in one place.
          </p>

          <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCategory("All");
              }}
              placeholder="Search a tool..."
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-base outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            <a
              href="#tools"
              className="rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-700"
            >
              Find Tool
            </a>
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold sm:text-3xl">Browse Categories</h2>
          <p className="mt-2 text-slate-600">
            Choose a category to find the right tool for your task.
          </p>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <a
            href="/tools/pdf"
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
          >
            <span className="font-semibold text-slate-900">PDF Tools</span>
            <span className="mt-1 block text-sm text-slate-600">
              Merge, split, convert and compress PDFs.
            </span>
          </a>

          <a
            href="/tools/image"
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
          >
            <span className="font-semibold text-slate-900">Image Tools</span>
            <span className="mt-1 block text-sm text-slate-600">
              Compress, resize, convert and crop images.
            </span>
          </a>

          <a
            href="/tools/calculators"
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
          >
            <span className="font-semibold text-slate-900">Calculators</span>
            <span className="mt-1 block text-sm text-slate-600">
              GST, SIP, BMI and age calculators.
            </span>
          </a>




        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.slice(1).map((item) => (
            <button
              key={item}
              onClick={() => {
                setCategory(item);
                setSearch("");
                document
                  .getElementById("tools")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-xl border bg-white p-4 text-left font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600"
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              {category === "All" ? "All Tools" : category}
            </h2>
            <p className="mt-2 text-slate-600">
              {filteredTools.length} tools available
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  category === item
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-blue-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTools.map((tool) => (
              <a
                key={tool.href}
                href={tool.href}
                className="group rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="rounded-xl bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">
                    {tool.category}
                  </div>
                  <span className="text-slate-300 transition group-hover:text-blue-500">
                    →
                  </span>
                </div>

                <h3 className="text-lg font-bold group-hover:text-blue-600">
                  {tool.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {tool.description}
                </p>
              </a>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border bg-white p-10 text-center">
            <h3 className="text-xl font-bold">No tool found</h3>
            <p className="mt-2 text-slate-600">
              Search ko change karke dobara try karein.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
            >
              Show All Tools
            </button>
          </div>
        )}
      </section>

      <section className="border-y bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Simple Online Tools for Everyday Work
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              KaamKitPro brings focused browser-based utilities together for
              document handling, image preparation, calculations and
              everyday digital work. Instead of installing a separate
              application for each small task, visitors can open a relevant
              tool, provide the required input and review the result in one
              place. The tool directory is organised by task so that users
              can compare available options and choose the one that matches
              their needs.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              For document work, PDF utilities can help combine files, split
              selected pages, rotate documents or convert between supported
              formats. Image utilities help prepare pictures by resizing,
              cropping, converting or compressing them. Calculators are
              intended for transparent estimates: enter the relevant values,
              check the selected units or rates, and review the result before
              using it in a business or personal decision. Text and developer
              utilities support common formatting and data tasks.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              A good result still needs a quick review. Check page order after
              merging a PDF, inspect image dimensions and visual quality after
              compression, and verify calculator inputs before relying on an
              estimate. Keep an original copy of important files. Do not
              upload confidential or personal documents unless you have
              checked that the tool and its data-handling practices are
              appropriate for your information.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border bg-slate-50 p-6">
              <h3 className="text-lg font-bold">Documents & PDFs</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Combine related files into one PDF, extract a page range,
                rotate pages for correct reading, or convert supported
                documents for sharing. Always open the exported file and
                check its page count and order.
              </p>
            </div>

            <div className="rounded-2xl border bg-slate-50 p-6">
              <h3 className="text-lg font-bold">Images & Calculations</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Prepare images for websites and documents by adjusting their
                size or format. Use calculators for quick estimates such as
                GST, SIP, BMI or age, and confirm inputs and assumptions
                before acting on the result.
              </p>
            </div>

            <div className="rounded-2xl border bg-slate-50 p-6">
              <h3 className="text-lg font-bold">Text & Digital Workflows</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use focused utilities for text cleanup, content preparation
                and developer data. Choose a tool based on the task, follow
                its on-page instructions and review the output before
                publishing or sharing it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Some common questions about using KaamKitPro.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          <details className="rounded-2xl border bg-white p-6 shadow-sm">
            <summary className="cursor-pointer font-bold">
              What is KaamKitPro?
            </summary>
            <p className="mt-3 leading-7 text-slate-600">
              KaamKitPro is a free online tools platform for everyday digital
              work. It brings together utilities for PDFs, images,
              calculators, text, SEO, social media and developer tasks.
            </p>
          </details>

          <details className="rounded-2xl border bg-white p-6 shadow-sm">
            <summary className="cursor-pointer font-bold">
              Are KaamKitPro tools free to use?
            </summary>
            <p className="mt-3 leading-7 text-slate-600">
              KaamKitPro is being built around free online utilities. Tool
              availability and features may change as the platform grows.
            </p>
          </details>

          <details className="rounded-2xl border bg-white p-6 shadow-sm">
            <summary className="cursor-pointer font-bold">
              Do I need to install software?
            </summary>
            <p className="mt-3 leading-7 text-slate-600">
              No software installation is required for the web-based tools.
              Open the required tool in your browser and follow its
              instructions.
            </p>
          </details>

          <details className="rounded-2xl border bg-white p-6 shadow-sm">
            <summary className="cursor-pointer font-bold">
              Can I use KaamKitPro on mobile?
            </summary>
            <p className="mt-3 leading-7 text-slate-600">
              Yes. KaamKitPro is designed with responsive web interfaces so
              that the tools can be used on modern mobile, tablet and desktop
              browsers.
            </p>
          </details>

          <details className="rounded-2xl border bg-white p-6 shadow-sm">
            <summary className="cursor-pointer font-bold">
              Where can I find PDF and image tools?
            </summary>
            <p className="mt-3 leading-7 text-slate-600">
              PDF and image utilities are available from the Tools section.
              You can also use the homepage search to quickly find a specific
              tool such as PDF Merge, PDF Split, Image Compressor or Image
              Resizer.
            </p>
          </details>

          <details className="rounded-2xl border bg-white p-6 shadow-sm">
            <summary className="cursor-pointer font-bold">
              Does KaamKitPro require an account?
            </summary>
            <p className="mt-3 leading-7 text-slate-600">
              The current web tools are designed to be accessible without
              requiring users to create an account for basic use.
            </p>
          </details>
        </div>
      </section>

      <section className="border-y bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold sm:text-3xl">Popular Tools</h2>
            <p className="mt-2 text-slate-600">
              Frequently useful tools for everyday digital work.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {popularTools.map((name) => {
              const tool = tools.find((item) => item.name === name);

              if (!tool) return null;

              return (
                <a
                  key={tool.href}
                  href={tool.href}
                  className="rounded-xl border bg-slate-50 px-4 py-3 font-semibold transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                >
                  {tool.name}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section id="why" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Why KaamKitPro?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Everyday digital tasks ko simple banane ke liye KaamKitPro ko
            build kiya ja raha hai.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-7 shadow-sm">
            <div className="text-3xl">⚡</div>
            <h3 className="mt-4 text-xl font-bold">Fast</h3>
            <p className="mt-2 leading-7 text-slate-600">
              Simple interfaces aur quick processing ke saath kaam jaldi
              complete karein.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-7 shadow-sm">
            <div className="text-3xl">🔒</div>
            <h3 className="mt-4 text-xl font-bold">Browser Friendly</h3>
            <p className="mt-2 leading-7 text-slate-600">
              Bahut se tools browser mein directly process karte hain, bina
              unnecessary setup ke.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-7 shadow-sm">
            <div className="text-3xl">🧰</div>
            <h3 className="mt-4 text-xl font-bold">All-in-One</h3>
            <p className="mt-2 leading-7 text-slate-600">
              PDF, images, calculators, text, SEO, social aur developer
              utilities ek platform par.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-blue-600">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center text-white sm:px-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Digital kaam ko simple banayein.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            KaamKitPro par useful online tools explore karein aur apna kaam
            faster complete karein.
          </p>
          <a
            href="#tools"
            className="mt-7 inline-block rounded-xl bg-white px-7 py-3.5 font-bold text-blue-700 transition hover:bg-blue-50"
          >
            Explore All Tools
          </a>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-300">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          <div>
            <div className="rounded-2xl bg-white px-3 py-2 w-fit">
              <BrandLogo compact />
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Har Digital Kaam, Ek Jagah. Free online tools for everyday
              digital work.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white">Quick Links</h3>
            <div className="mt-4 space-y-3 text-sm">
              <a href="/about" className="block hover:text-white">
                About
              </a>
              <a href="/contact" className="block hover:text-white">
                Contact
              </a>
              <a href="/advertise" className="block hover:text-white">
                Advertise & Partner
              </a>
              <a href="/guides" className="block hover:text-white">
                Guides
              </a>
              <a href="/pricing" className="block hover:text-white">
                Plans & Pricing
              </a>
              <a href="#tools" className="block hover:text-white">
                Tools
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white">Legal</h3>
            <div className="mt-4 space-y-3 text-sm">
              <a href="/privacy-policy" className="block hover:text-white">
                Privacy Policy
              </a>
              <a href="/terms" className="block hover:text-white">
                Terms & Conditions
              </a>
              <a href="/disclaimer" className="block hover:text-white">
                Disclaimer
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white">Popular Tools</h3>
            <div className="mt-4 space-y-3 text-sm">
              {popularTools.slice(0, 5).map((name) => {
                const tool = tools.find((item) => item.name === name);

                if (!tool) return null;

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
                <input id="home-tool-search" type="search" value={search} onChange={(event) => { setSearch(event.target.value); setCategory("All"); }} placeholder="Try “compress PDF” or “GST”" className="min-w-0 flex-1 border-0 bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0" />
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
              <h3 className="mt-5 text-lg font-extrabold text-slate-900 group-hover:text-blue-700">{item.title}</h3>
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
              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">{category === "All" ? "Find your next tool" : category}</h2>
              <p className="mt-2 text-sm text-slate-600">{filteredTools.length} useful tools available in this view.</p>
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
              <h3 className="mt-3 text-lg font-extrabold">No matching tool found</h3>
              <p className="mt-2 text-sm text-slate-600">Try another search term or browse all categories.</p>
              <button onClick={() => { setSearch(""); setCategory("All"); }} className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700">Show all tools</button>
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
