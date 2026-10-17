"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

function escapeCsv(value: unknown): string {
  const text = value == null ? "" : typeof value === "object" ? JSON.stringify(value) : String(value);
  return /[",\r\n]/.test(text) ? '"' + text.replace(/"/g, '""') + '"' : text;
}

function toCsv(value: unknown): string {
  if (!Array.isArray(value)) throw new Error("JSON must be an array of objects or arrays.");
  if (value.length === 0) return "";
  if (value.every((item) => Array.isArray(item))) {
    return value.map((row) => (row as unknown[]).map(escapeCsv).join(",")).join("\r\n");
  }
  if (!value.every((item) => item !== null && typeof item === "object" && !Array.isArray(item))) {
    throw new Error("Use an array of objects, for example [{\"name\":\"Asha\"}], or an array of arrays.");
  }
  const headers = Array.from(new Set(value.flatMap((item) => Object.keys(item as Record<string, unknown>))));
  const rows = [headers, ...value.map((item) => headers.map((header) => (item as Record<string, unknown>)[header]))];
  return rows.map((row) => row.map(escapeCsv).join(",")).join("\r\n");
}

export default function JsonToCsvPage() {
  const [input, setInput] = useState('[{"name":"Asha","city":"Mumbai"},{"name":"Sam","city":"London"}]');
  const [copied, setCopied] = useState(false);
  const converted = useMemo(() => {
    if (!input.trim()) return { output: "", error: "" };
    try { return { output: toCsv(JSON.parse(input)), error: "" }; }
    catch (error) { return { output: "", error: error instanceof Error ? error.message : "Could not convert JSON." }; }
  }, [input]);

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(converted.output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch { setCopied(false); }
  }

  function downloadResult() {
    if (!converted.output) return;
    const url = URL.createObjectURL(new Blob(["\uFEFF", converted.output], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "converted.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <header className="mb-7">
          <p className="mb-2 text-sm font-semibold text-blue-700">Free data utility</p>
          <h1 className="text-3xl font-bold text-slate-900">JSON to CSV Converter</h1>
          <p className="mt-3 text-slate-600">Convert an array of JSON objects or arrays into spreadsheet-friendly CSV. Quoted commas, quotes and line breaks are escaped automatically.</p>
        </header>
        <label htmlFor="json-csv-input" className="mb-2 block font-semibold text-slate-800">JSON input</label>
        <textarea id="json-csv-input" value={input} onChange={(e) => setInput(e.target.value)} rows={9} spellCheck={false} className="w-full rounded-lg border border-slate-300 p-3 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" />
        <div className="mb-2 mt-6 flex items-center justify-between gap-3"><label htmlFor="csv-output" className="font-semibold text-slate-800">CSV output</label><span className="text-xs text-slate-500">UTF-8 CSV</span></div>
        <textarea id="csv-output" readOnly value={converted.output} rows={9} className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 font-mono text-sm" />
        {converted.error && <p role="alert" className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{converted.error}</p>}
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={copyResult} disabled={!converted.output} className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-50">{copied ? "Copied!" : "Copy CSV"}</button>
          <button type="button" onClick={downloadResult} disabled={!converted.output} className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 disabled:opacity-50">Download .csv</button>
          <button type="button" onClick={() => setInput("")} className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700">Clear</button>
        </div>
        <p className="mt-6 text-sm text-slate-500">Conversion happens locally in your browser. No JSON is uploaded.</p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm"><Link href="/tools/csv-to-json" className="font-medium text-blue-700 hover:underline">Try CSV to JSON →</Link><Link href="/tools/developer" className="font-medium text-blue-700 hover:underline">← Browse developer tools</Link></div>
      </div>
    </main>
  );
}
