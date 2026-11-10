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
    name: "PDF Protect",
    description: "Review PDF password protection options transparently.",
    href: "/tools/pdf-protect",
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
        text: "KaamKitPro is a free online tools platform for PDF, image, calculator and hospital procurement workflows.",
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
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <BrandLogo />

          <a href="/login" className="inline-flex min-h-10 items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 md:hidden">Sign in</a>

          <nav className="hidden gap-6 text-sm font-medium md:flex">
            <a href="/tools" className="text-slate-600 hover:text-slate-900">
              Tools
            </a>
            <a href="#categories" className="text-slate-600 hover:text-slate-900">
              Categories
            </a>
            <a href="#why" className="text-slate-600 hover:text-slate-900">
              Why KaamKitPro
            </a>
            <a href="/pricing" className="text-slate-600 hover:text-slate-900">
              Pricing
            </a>
            <a href="/about" className="text-slate-600 hover:text-slate-900">
              About
            </a>
            <a href="/contact" className="text-slate-600 hover:text-slate-900">
              Contact
            </a>
          </nav>
        </div>
      </header>

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
            Use PDF, image and calculator tools, plus practical hospital procurement utilities — all in one place.
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
              KaamKitPro is a collection of practical online utilities
              designed for everyday digital tasks. Whether you need to
              manage a PDF, resize an image, calculate a value, clean text,
              prepare SEO content, or work with developer data, you can find
              a focused tool here without installing extra software.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Many KaamKitPro tools are designed to work directly in your
              browser. This makes common tasks quick and convenient across
              desktop and mobile devices. The platform is continuously being
              expanded with more useful utilities while keeping the
              interface simple.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border bg-slate-50 p-6">
              <h3 className="text-lg font-bold">For Everyday Tasks</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use calculators, text utilities, PDF tools and image tools
                for common digital work.
              </p>
            </div>

            <div className="rounded-2xl border bg-slate-50 p-6">
              <h3 className="text-lg font-bold">For Creators & Marketers</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Create captions, hashtags, titles, meta tags, slugs and other
                useful content with dedicated utilities.
              </p>
            </div>

            <div className="rounded-2xl border bg-slate-50 p-6">
              <h3 className="text-lg font-bold">For Developers</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Format code, work with JSON, encode URLs, generate hashes,
                create UUIDs and handle other development tasks.
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
                  <a
                    key={tool.href}
                    href={tool.href}
                    className="block hover:text-white"
                  >
                    {tool.name}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800">
          <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
            © 2026 KaamKitPro. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
