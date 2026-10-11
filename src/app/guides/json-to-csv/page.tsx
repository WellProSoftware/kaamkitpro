import Link from "next/link";
import type { Metadata } from "next";
import BrandLogo from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "How to Convert JSON to CSV Online for Free",
  description:
    "Learn how to convert a JSON array into a CSV spreadsheet, handle commas and quotes, understand nested data, and download a clean CSV file for free.",
  alternates: { canonical: "https://kaamkitpro.com/guides/json-to-csv" },
};

export default function JsonToCsvGuide() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <BrandLogo />
          <Link href="/guides" className="text-sm font-semibold text-slate-600 hover:text-slate-900">← All Guides</Link>
        </div>
      </header>
      <article className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-3xl bg-white p-7 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Developer Guide</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">How to Convert JSON to CSV Online for Free</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            JSON is widely used by APIs and applications to exchange structured records. CSV is often easier to review in spreadsheet software. Converting JSON to CSV usually means turning an array of similarly shaped objects into rows, with each object key becoming a column header.
          </p>
          <div className="mt-8">
            <Link href="/tools/json-to-csv" className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Open Free JSON to CSV Converter</Link>
          </div>
          <div className="mt-12 space-y-9">
            <section>
              <h2 className="text-2xl font-bold">Example: JSON objects become CSV rows</h2>
              <p className="mt-3 leading-8 text-slate-600">Given an array of records such as:</p>
              <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-5 text-sm leading-6 text-slate-100"><code>{'[{ "name": "Asha", "city": "Mumbai" }, { "name": "Sam", "city": "Pune" }]'}</code></pre>
              <p className="mt-4 leading-8 text-slate-600">A matching CSV representation is:</p>
              <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-5 text-sm leading-6 text-slate-100"><code>{'name,city\nAsha,Mumbai\nSam,Pune'}</code></pre>
              <p className="mt-3 leading-8 text-slate-600">The first row defines the columns. Each following row represents one object, and values are aligned with the corresponding headers.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold">How to convert JSON to CSV</h2>
              <ol className="mt-4 list-decimal space-y-3 pl-6 leading-8 text-slate-600">
                <li>Copy the JSON response or export your data as a JSON file.</li>
                <li>Check that the input is valid JSON and identify the array of records.</li>
                <li>Open the free JSON to CSV converter and paste the JSON.</li>
                <li>Review the column names and sample rows for missing or unexpected values.</li>
                <li>Copy or download the CSV, then open it in your spreadsheet or import workflow.</li>
              </ol>
            </section>
            <section>
              <h2 className="text-2xl font-bold">Common conversion issues</h2>
              <ul className="mt-4 list-disc space-y-3 pl-6 leading-8 text-slate-600">
                <li><strong>Commas and quotes in values:</strong> CSV fields containing commas, quotes, or line breaks need correct quoting and escaping.</li>
                <li><strong>Missing properties:</strong> records may not contain the same keys, so some cells can be blank.</li>
                <li><strong>Nested objects and arrays:</strong> CSV is a flat table. Decide how nested values should be represented before exporting.</li>
                <li><strong>Different value types:</strong> spreadsheet applications may interpret values as dates, numbers, or formulas. Review important fields after opening the file.</li>
                <li><strong>Unexpected structure:</strong> many converters expect an array of objects rather than a single object or unrelated JSON values.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold">When should you use CSV instead of JSON?</h2>
              <p className="mt-3 leading-8 text-slate-600">CSV works well for flat tabular data, spreadsheet review, and imports into systems that accept rows and columns. JSON is better suited to nested records, arrays, and API payloads. Keep a JSON copy when you need to preserve structure that a flat CSV cannot represent directly.</p>
            </section>
            <section className="rounded-2xl bg-slate-50 p-6">
              <h2 className="text-2xl font-bold">Protect private information</h2>
              <p className="mt-3 leading-8 text-slate-600">Before using an online converter, review how the service handles input and whether it meets your data policies. Do not paste passwords, access tokens, confidential customer records, or personal information unless you are authorized to do so. Use redacted sample data when testing.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold">Related free tools</h2>
              <div className="mt-4 flex flex-wrap gap-4">
                <Link href="/tools/csv-to-json" className="font-semibold text-blue-600 hover:text-blue-800">CSV to JSON Converter →</Link>
                <Link href="/tools/json-formatter" className="font-semibold text-blue-600 hover:text-blue-800">JSON Formatter →</Link>
                <Link href="/tools/text-diff-checker" className="font-semibold text-blue-600 hover:text-blue-800">Text Diff Checker →</Link>
              </div>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
