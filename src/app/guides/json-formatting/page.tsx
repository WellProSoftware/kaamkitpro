import Link from "next/link";
import type { Metadata } from "next";
import BrandLogo from "@/components/BrandLogo";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "How to Format and Validate JSON",
  description: "Learn JSON syntax basics, how to format minified JSON, common parsing errors, and how to validate data safely with an online formatter.",
  alternates: { canonical: "https://kaamkitpro.com/guides/json-formatting" },
};

export default function JsonFormattingGuide() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"><BrandLogo /><Link href="/guides" className="text-sm font-semibold text-slate-600 hover:text-slate-900">← All Guides</Link></div></header>
      <article className="mx-auto max-w-4xl px-6 py-12"><div className="rounded-3xl bg-white p-7 shadow-sm md:p-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Developer Guide</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">How to Format and Validate JSON</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">JSON (JavaScript Object Notation) is a text format commonly used to exchange structured data between applications. Formatting adds indentation and line breaks so the structure is easier to inspect; validation checks whether the text follows JSON syntax.</p>
        <div className="mt-8"><Link href="/tools/json-formatter" className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Open JSON Formatter</Link></div>
        <AdSlot />
        <div className="mt-12 space-y-9">
          <section><h2 className="text-2xl font-bold">What valid JSON looks like</h2><p className="mt-3 leading-8 text-slate-600">A JSON object uses braces and key-value pairs. Property names and string values use double quotes, pairs are separated by commas, and values can be strings, numbers, booleans, null, arrays, or nested objects. JSON does not allow comments or trailing commas.</p><pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-5 text-sm leading-6 text-slate-100"><code>{`{
  "tool": "KaamKitPro",
  "free": true,
  "features": ["format", "validate"]
}`}</code></pre></section>
          <section><h2 className="text-2xl font-bold">1. Paste the JSON text</h2><p className="mt-3 leading-8 text-slate-600">Copy the JSON you need to inspect and paste it into the formatter. If the data comes from an API response or configuration file, keep a copy of the original text in case you need to compare changes.</p></section>
          <section><h2 className="text-2xl font-bold">2. Format the structure</h2><p className="mt-3 leading-8 text-slate-600">Use indentation to reveal nested objects and arrays. Pretty-printed JSON is easier to review, but whitespace does not change the meaning of valid JSON data. Minified JSON can be useful for transport; formatted JSON is usually more convenient for debugging.</p></section>
          <section><h2 className="text-2xl font-bold">3. Fix common syntax errors</h2><ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-slate-600"><li>Replace single quotes around strings or keys with double quotes.</li><li>Remove trailing commas before a closing brace or bracket.</li><li>Check that every opening brace, bracket, and quotation mark is closed.</li><li>Make sure keys and values are separated by a colon.</li><li>Use true, false, and null in lowercase.</li></ul></section>
          <section><h2 className="text-2xl font-bold">Formatting is not the same as schema validation</h2><p className="mt-3 leading-8 text-slate-600">A formatter can confirm syntax without knowing whether the data matches an application's expected structure. For example, a JSON document may be syntactically valid but still be missing a required field. Use a schema or the receiving application's validation rules when data shape matters.</p></section>
          <section className="rounded-2xl bg-slate-50 p-6"><h2 className="text-2xl font-bold">Protect confidential data</h2><p className="mt-3 leading-8 text-slate-600">Do not paste API keys, access tokens, passwords, customer records, or other confidential data into an online tool unless you have confirmed its processing and privacy practices. Use redacted sample data when troubleshooting public examples.</p></section>
          <section><h2 className="text-2xl font-bold">Next steps</h2><p className="mt-3 leading-8 text-slate-600">Once JSON is valid, you may need to encode a value, generate a hash, or inspect a timestamp depending on your workflow.</p><div className="mt-4 flex flex-wrap gap-4"><Link href="/tools/base64" className="font-semibold text-blue-600 hover:text-blue-800">Base64 Encoder & Decoder →</Link><Link href="/tools/timestamp-converter" className="font-semibold text-blue-600 hover:text-blue-800">Timestamp Converter →</Link></div></section>
        </div>
      </div></article>
    </main>
  );
}
