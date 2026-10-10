import Link from "next/link";

const tools = [
  {
    href: "/tools/html-formatter",
    title: "HTML Formatter",
    description: "Format and organize HTML code for easier reading and editing.",
  },
  {
    href: "/tools/css-formatter",
    title: "CSS Formatter",
    description: "Format CSS code into a cleaner and more readable structure.",
  },
  {
    href: "/tools/js-formatter",
    title: "JavaScript Formatter",
    description: "Format JavaScript code for improved readability.",
  },
  {
    href: "/tools/url-encoder-decoder",
    title: "URL Encoder & Decoder",
    description: "Encode or decode URL text quickly in your browser.",
  },
  {
    href: "/tools/hash-generator",
    title: "Hash Generator",
    description: "Generate SHA-256, SHA-384 and SHA-512 hashes from text.",
  },
  {
    href: "/tools/color-converter",
    title: "Color Converter",
    description: "Convert colors between HEX and RGB formats.",
  },
  {
    href: "/tools/csv-to-json",
    title: "CSV to JSON Converter",
    description: "Convert CSV tables into JSON objects or arrays with quoted-field support.",
  },
  {
    href: "/tools/json-to-csv",
    title: "JSON to CSV Converter",
    description: "Convert JSON arrays into CSV with proper quoting and a downloadable file.",
  },
];

export default function DeveloperToolsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            KaamKitPro Developer Tools
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Free Developer Tools Online
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Format code, encode URLs, generate secure hashes and convert
            colors with practical browser-based developer utilities from
            KaamKitPro.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                {tool.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {tool.description}
              </p>

              <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                Open tool →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Useful browser tools for developers
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Developers frequently need small utilities for formatting code,
            preparing URLs, generating hashes or checking color values.
            KaamKitPro brings these everyday tasks together in one place so
            you can quickly complete small jobs without installing separate
            desktop applications.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-slate-900">
            Common developer workflow
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-6 leading-7 text-slate-600">
            <li>Prepare or paste your input into the relevant tool.</li>
            <li>Choose the required formatting or conversion operation.</li>
            <li>Review the generated result.</li>
            <li>Copy the output and continue your development work.</li>
          </ol>

          <p className="mt-6 leading-7 text-slate-600">
            You can start with the{" "}
            <Link
              href="/tools/json-formatter"
              className="font-medium text-blue-600 hover:underline"
            >
              JSON Formatter
            </Link>{" "}
            for structured data or use the{" "}
            <Link
              href="/tools/url-encoder-decoder"
              className="font-medium text-blue-600 hover:underline"
            >
              URL Encoder & Decoder
            </Link>{" "}
            when working with URL parameters.
          </p>
        </div>
      </section>
    </main>
  );
}
