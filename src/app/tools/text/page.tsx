import Link from "next/link";

const tools = [
  {
    href: "/tools/word-counter",
    name: "Word Counter",
    description: "Count words, characters and paragraphs instantly.",
  },
  {
    href: "/tools/character-counter",
    name: "Character Counter",
    description: "Count characters with and without spaces.",
  },
  {
    href: "/tools/case-converter",
    name: "Case Converter",
    description: "Convert text to uppercase, lowercase, title case and more.",
  },
  {
    href: "/tools/remove-extra-spaces",
    name: "Remove Extra Spaces",
    description: "Clean repeated spaces and make text easier to read.",
  },
  {
    href: "/tools/line-sorter",
    name: "Line Sorter",
    description: "Sort lines alphabetically or numerically, with case and blank-line options.",
  },
  {
    href: "/tools/remove-duplicate-lines",
    name: "Remove Duplicate Lines",
    description: "Deduplicate lists while preserving the first occurrence.",
  },
  {
    href: "/tools/text-diff-checker",
    name: "Text Diff Checker",
    description: "Compare two versions of text and inspect line changes.",
  },
];

export default function TextToolsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            KaamKitPro Text Tools
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Free Text Tools Online
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Free online text utilities for writers, students, creators,
            marketers and everyday digital work. Count words, convert text
            case, clean spaces and analyze characters directly in your browser.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-slate-900">
                {tool.name}
              </h2>

              <p className="mt-2 leading-7 text-slate-600">
                {tool.description}
              </p>

              <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                Use tool →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-7">
          <h2 className="text-2xl font-bold">Why use online text tools?</h2>

          <p className="mt-4 leading-7 text-slate-600">
            Text formatting and counting are common tasks when writing
            articles, assignments, social posts, product descriptions,
            emails and other digital content. KaamKitPro provides focused
            browser-based utilities so you can complete these tasks without
            installing additional software.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            For writing projects, start with the{" "}
            <Link
              href="/tools/word-counter"
              className="font-semibold text-blue-600 hover:underline"
            >
              Word Counter
            </Link>{" "}
            to check length, use the{" "}
            <Link
              href="/tools/character-counter"
              className="font-semibold text-blue-600 hover:underline"
            >
              Character Counter
            </Link>{" "}
            for character limits, and use the{" "}
            <Link
              href="/tools/case-converter"
              className="font-semibold text-blue-600 hover:underline"
            >
              Case Converter
            </Link>{" "}
            when text needs consistent formatting.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-7">
          <h2 className="text-2xl font-bold">Text tools for everyday work</h2>

          <p className="mt-3 leading-7 text-slate-700">
            Whether you are preparing an article, cleaning copied text,
            checking a social media caption or formatting content for a
            website, these tools help you complete small text tasks quickly.
          </p>
        </div>
      </section>
    </main>
  );
}
