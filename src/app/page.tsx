"use client";

import { useState } from "react";

const categories = [
  {
    name: "PDF Tools",
    description: "Compress, merge, split and convert PDFs",
    icon: "📄",
  },
  {
    name: "Image Tools",
    description: "Compress, resize, crop and convert images",
    icon: "🖼️",
  },
  {
    name: "AI Tools",
    description: "Useful AI-powered productivity tools",
    icon: "🤖",
  },
  {
    name: "Calculators",
    description: "EMI, GST, age, percentage and more",
    icon: "🧮",
  },
  {
    name: "Text Tools",
    description: "Word counter, character counter and more",
    icon: "📝",
  },
  {
    name: "SEO Tools",
    description: "Tools to improve your website and content",
    icon: "🔎",
  },
  {
    name: "Social Tools",
    description: "Useful tools for social media creators",
    icon: "📱",
  },
  {
    name: "Developer Tools",
    description: "JSON, Base64, UUID and coding utilities",
    icon: "💻",
  },
];

const popularTools = [
  {
    name: "QR Code Generator",
    description: "Create QR codes instantly",
    category: "Utilities",
    href: "/tools/qr-code-generator",
  },
  {
    name: "Password Generator",
    description: "Generate strong random passwords",
    category: "Utilities",
    href: "/tools/password-generator",
  },
  {
    name: "Word Counter",
    description: "Count words, characters and reading time",
    category: "Text Tools",
    href: "/tools/word-counter",
  },
  {
    name: "Character Counter",
    description: "Count characters, spaces and lines instantly",
    category: "Text Tools",
    href: "/tools/character-counter",
  },
  {
    name: "Case Converter",
    description: "Convert text to uppercase, lowercase and more",
    category: "Text Tools",
    href: "/tools/case-converter",
  },
  {
    name: "Remove Extra Spaces",
    description: "Clean unwanted spaces from text",
    category: "Text Tools",
    href: "/tools/remove-extra-spaces",
  },
  {
    name: "Percentage Calculator",
    description: "Calculate percentages and percentage changes",
    category: "Calculators",
    href: "/tools/percentage-calculator",
  },
  {
    name: "GST Calculator",
    description: "Calculate GST and total amount",
    category: "Calculators",
    href: "/tools/gst-calculator",
  },
  {
    name: "EMI Calculator",
    description: "Calculate monthly loan EMI and interest",
    category: "Calculators",
    href: "/tools/emi-calculator",
  },
  {
    name: "Age Calculator",
    description: "Calculate exact age in years, months and days",
    category: "Calculators",
    href: "/tools/age-calculator",
  },
  {
    name: "BMI Calculator",
    description: "Calculate Body Mass Index",
    category: "Calculators",
    href: "/tools/bmi-calculator",
  },
  {
    name: "SIP Calculator",
    description: "Estimate SIP investment value and returns",
    category: "Calculators",
    href: "/tools/sip-calculator",
  },
  {
    name: "JSON Formatter",
    description: "Format, validate and minify JSON",
    category: "Developer Tools",
    href: "/tools/json-formatter",
  },
  {
    name: "Base64 Encoder & Decoder",
    description: "Encode and decode Base64 text",
    category: "Developer Tools",
    href: "/tools/base64",
  },
  {
    name: "UUID Generator",
    description: "Generate unique random UUIDs",
    category: "Developer Tools",
    href: "/tools/uuid-generator",
  },
  {
    name: "Timestamp Converter",
    description: "Convert Unix timestamps and dates",
    category: "Developer Tools",
    href: "/tools/timestamp-converter",
  },
  {
    name: "Compress PDF",
    description: "Reduce PDF file size quickly",
    category: "PDF Tools",
    href: "#",
  },
  {
    name: "Compress Image",
    description: "Make images smaller without hassle",
    category: "Image Tools",
    href: "#",
  },
];

const features = [
  {
    title: "Free to Use",
    description: "Start using useful digital tools without paying.",
    icon: "✓",
  },
  {
    title: "Fast & Simple",
    description: "Clean tools designed to get your work done quickly.",
    icon: "⚡",
  },
  {
    title: "Many Tools",
    description: "One platform for PDF, image, text, calculator and more.",
    icon: "🧰",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredTools = popularTools.filter((tool) => {
    const query = search.toLowerCase().trim();

    if (!query) return true;

    return (
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query)
    );
  });

  const handleSearch = () => {
    document.getElementById("tools")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="/" className="text-2xl font-bold tracking-tight">
            KaamKit<span className="text-blue-600">Pro</span>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="#tools"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              Tools
            </a>

            <a
              href="#categories"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              Categories
            </a>

            <a
              href="#why-us"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              Why KaamKitPro
            </a>

            <a
              href="/about"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              About
            </a>

            <a
              href="/contact"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              Contact
            </a>
          </nav>

          <a
            href="#tools"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Explore Tools
          </a>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Har Digital Kaam, Ek Jagah.
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Useful Online Tools
              <span className="block text-blue-600">
                For Everyday Digital Work
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              PDF, image, text, calculator, SEO, developer and many more
              useful tools — all in one simple platform.
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Search for a tool..."
              className="flex-1 rounded-2xl border border-slate-300 bg-white px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={handleSearch}
              className="rounded-2xl bg-blue-600 px-7 py-4 font-semibold text-white hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section id="categories" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Categories
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Find the right tool for your work
            </h2>

            <p className="mt-3 text-slate-600">
              Choose a category and get things done faster.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div
                key={category.name}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <div className="mb-5 text-3xl">{category.icon}</div>

                <h3 className="text-lg font-bold">{category.name}</h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {category.description}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    const categoryTools = popularTools.filter(
                      (tool) =>
                        tool.category.toLowerCase() ===
                        category.name.toLowerCase()
                    );

                    if (categoryTools.length > 0) {
                      setSearch(category.name);

                      document.getElementById("tools")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="mt-5 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Explore →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tools" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                All Available Tools
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Start with these useful tools
              </h2>

              <p className="mt-3 text-slate-600">
                More tools will be added regularly.
              </p>
            </div>

            <span className="text-sm text-slate-500">
              {filteredTools.length} tools found
            </span>
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                    {tool.category}
                  </span>

                  <h3 className="mt-3 text-xl font-bold group-hover:text-blue-600">
                    {tool.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {tool.description}
                  </p>

                  {tool.href === "#" ? (
                    <div className="mt-5 text-sm font-semibold text-slate-400">
                      Coming Soon
                    </div>
                  ) : (
                    <div className="mt-5 text-sm font-semibold text-blue-600">
                      Open Tool →
                    </div>
                  )}
                </a>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
              <div className="text-4xl">🔎</div>

              <h3 className="mt-4 text-xl font-bold">No tools found</h3>

              <p className="mt-2 text-slate-600">
                Try searching for GST, EMI, SIP, QR, Word or JSON.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      <section id="why-us" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Why KaamKitPro
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Simple tools. Less hassle.
            </h2>

            <p className="mt-3 text-slate-600">
              KaamKitPro is being built to make everyday digital work faster
              and easier.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                  {feature.icon}
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Your digital toolkit, all in one place.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Explore KaamKitPro and use the tools you need for your everyday
            digital work.
          </p>

          <a
            href="#tools"
            className="mt-8 inline-block rounded-2xl bg-blue-600 px-7 py-4 font-semibold text-white hover:bg-blue-700"
          >
            Explore Tools
          </a>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <a
                href="/"
                className="text-2xl font-bold tracking-tight"
              >
                KaamKit<span className="text-blue-600">Pro</span>
              </a>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Har Digital Kaam, Ek Jagah.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Simple and useful online tools for everyday digital work.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Quick Links
              </h3>

              <div className="mt-4 space-y-3 text-sm">
                <a
                  href="/"
                  className="block text-slate-500 hover:text-blue-600"
                >
                  Home
                </a>

                <a
                  href="/about"
                  className="block text-slate-500 hover:text-blue-600"
                >
                  About Us
                </a>

                <a
                  href="/contact"
                  className="block text-slate-500 hover:text-blue-600"
                >
                  Contact Us
                </a>

                <a
                  href="#tools"
                  className="block text-slate-500 hover:text-blue-600"
                >
                  Tools
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Legal
              </h3>

              <div className="mt-4 space-y-3 text-sm">
                <a
                  href="/privacy-policy"
                  className="block text-slate-500 hover:text-blue-600"
                >
                  Privacy Policy
                </a>

                <a
                  href="/terms"
                  className="block text-slate-500 hover:text-blue-600"
                >
                  Terms & Conditions
                </a>

                <a
                  href="/disclaimer"
                  className="block text-slate-500 hover:text-blue-600"
                >
                  Disclaimer
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Popular Tools
              </h3>

              <div className="mt-4 space-y-3 text-sm">
                <a
                  href="/tools/qr-code-generator"
                  className="block text-slate-500 hover:text-blue-600"
                >
                  QR Code Generator
                </a>

                <a
                  href="/tools/word-counter"
                  className="block text-slate-500 hover:text-blue-600"
                >
                  Word Counter
                </a>

                <a
                  href="/tools/emi-calculator"
                  className="block text-slate-500 hover:text-blue-600"
                >
                  EMI Calculator
                </a>

                <a
                  href="/tools/json-formatter"
                  className="block text-slate-500 hover:text-blue-600"
                >
                  JSON Formatter
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 KaamKitPro. All rights reserved.</p>

            <p>Har Digital Kaam, Ek Jagah.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}