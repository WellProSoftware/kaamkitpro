import Link from "next/link";
import type { Metadata } from "next";
import BrandLogo from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "How to Convert CSV to JSON Online for Free",
  description:
    "Learn how CSV headers, quoted fields, delimiters and data types map to JSON. Follow a practical example and troubleshoot common CSV-to-JSON conversion problems.",
  alternates: { canonical: "https://kaamkitpro.com/guides/csv-to-json" },
};

export default function CsvToJsonGuide() {
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
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">How to Convert CSV to JSON Online for Free</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            CSV (comma-separated values) stores information in rows and columns. JSON stores structured data as arrays and objects, a format commonly used by web applications and APIs. A common conversion turns each data row into an object and uses the first row as its property names.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/tools" className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Browse online tools</Link>
            <Link href="/guides/json-to-csv" className="inline-block rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50">Read the JSON to CSV guide</Link>
          </div>
          <div className="mt-12 space-y-9">
            <section>
              <h2 className="text-2xl font-bold">A practical CSV-to-JSON example</h2>
              <p className="mt-3 leading-8 text-slate-600">Start with a header row followed by two records:</p>
              <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-5 text-sm leading-6 text-slate-100"><code>{`name,department,city
Asha,Support,Mumbai
Ravi,Sales,Pune`}</code></pre>
              <p className="mt-4 leading-8 text-slate-600">A typical JSON result is an array with one object for each record:</p>
              <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-5 text-sm leading-6 text-slate-100"><code>{`[
  { "name": "Asha", "department": "Support", "city": "Mumbai" },
  { "name": "Ravi", "department": "Sales", "city": "Pune" }
]`}</code></pre>
              <p className="mt-3 leading-8 text-slate-600">The first CSV row supplies the object keys. Values from each later row are placed under the matching key. This example shows the usual structure; a converter may preserve cell values as strings rather than automatically turning values such as numbers or true/false into native JSON types.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold">How commas and quotation marks work</h2>
              <p className="mt-3 leading-8 text-slate-600">A comma inside a field must not be mistaken for a column separator. CSV commonly wraps that field in double quotation marks:</p>
              <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-5 text-sm leading-6 text-slate-100"><code>{`name,address,note
Asha,"Mumbai, Maharashtra","Said ""ready"""`}</code></pre>
              <p className="mt-3 leading-8 text-slate-600">In this example, the address remains one value even though it contains a comma. The doubled quotation marks represent quotation marks inside the note. Fields containing line breaks also need valid CSV quoting.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold">Prepare your CSV before converting</h2>
              <ul className="mt-4 list-disc space-y-3 pl-6 leading-8 text-slate-600">
                <li>Use one clear header row and give each column a distinct name.</li>
                <li>Keep the same number of fields in every record, including empty cells where information is missing.</li>
                <li>Check whether your file uses commas, semicolons, or another delimiter; spreadsheet locale settings can change the separator.</li>
                <li>Save or export the file with a suitable text encoding, such as UTF-8, if it contains names or symbols from multiple languages.</li>
                <li>Remove accidental title rows, notes, and totals that are not part of the data table.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold">How to convert CSV to JSON</h2>
              <ol className="mt-4 list-decimal space-y-3 pl-6 leading-8 text-slate-600">
                <li>Export the table from your spreadsheet as a CSV file, or copy the CSV text.</li>
                <li>Open the CSV-to-JSON converter from the available online tools.</li>
                <li>Paste or provide the CSV content in the converter.</li>
                <li>Review the first row, column names, and a few records before relying on the output.</li>
                <li>Convert the data, then copy or download the JSON if those options are available in the tool.</li>
                <li>Validate the result and test it with the application or API that will use it.</li>
              </ol>
            </section>
            <section>
              <h2 className="text-2xl font-bold">Common conversion problems and fixes</h2>
              <ul className="mt-4 list-disc space-y-3 pl-6 leading-8 text-slate-600">
                <li><strong>Commas split one value into extra columns:</strong> quote the complete field, for example <code>&quot;Mumbai, India&quot;</code>.</li>
                <li><strong>Quotation marks appear incorrectly:</strong> in standard CSV, represent a quotation mark inside a quoted field by doubling it.</li>
                <li><strong>Headers are missing or repeated:</strong> add a header row and make every column name unique before converting.</li>
                <li><strong>Rows have different lengths:</strong> inspect the affected rows for missing separators, extra separators, or missing values.</li>
                <li><strong>Characters look corrupted:</strong> re-export the file using UTF-8 and check that the converter receives the complete text.</li>
                <li><strong>Numbers or dates look different:</strong> CSV does not define a universal data type for each cell. Confirm the intended format and convert fields explicitly in the receiving application when needed.</li>
                <li><strong>The JSON is rejected by another system:</strong> check that the output is valid JSON and that the receiving system expects an array of objects with those property names.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold">CSV or JSON: which format should you use?</h2>
              <p className="mt-3 leading-8 text-slate-600">CSV is usually convenient for flat tables, spreadsheet review, and systems that import rows and columns. JSON can represent nested objects, arrays, and more complex records, so it is often used for API requests and application data. A CSV conversion cannot automatically preserve every nested relationship; decide how those values should be represented before exporting.</p>
            </section>
            <section className="rounded-2xl bg-slate-50 p-6">
              <h2 className="text-2xl font-bold">Protect private and untrusted data</h2>
              <p className="mt-3 leading-8 text-slate-600">Do not paste passwords, access tokens, confidential customer records, or personal information into an online service unless you are authorized and its privacy practices meet your requirements. Use redacted sample data when troubleshooting. Treat converted values as untrusted input in your own application: validate them and never execute text from a CSV or JSON file as code.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold">Final review checklist</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-slate-600">
                <li>Every record has the expected number of fields.</li>
                <li>Column names are present, unique, and spelled correctly.</li>
                <li>Commas, quotes, and line breaks inside values are handled correctly.</li>
                <li>Important numbers, dates, and identifiers retain the intended meaning.</li>
                <li>The JSON parses successfully and matches the format required by the destination system.</li>
              </ul>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
