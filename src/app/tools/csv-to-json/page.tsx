"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

function parseCsv(source: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    if (quoted) {
      if (char === '"' && source[i + 1] === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"' && field.length === 0) {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (quoted) throw new Error("CSV has an unclosed quoted field.");
  if (field.length > 0 || row.length > 0) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }
  return rows.filter((items) => items.some((item) => item.length > 0));
}

export default function CsvToJsonPage() {
  const [input, setInput] = useState("");
  const [firstRowHeaders, setFirstRowHeaders] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const converted = useMemo(() => {
    if (!input.trim()) return { output: "", error: "" };
    try {
      const rows = parseCsv(input);
      if (rows.length === 0) return { output: "[]", error: "" };
      if (!firstRowHeaders) {
        return { output: JSON.stringify(rows, null, 2), error: "" };
      }
      const headers = rows[0].map((header, index) => header.trim() || `column_${index + 1}`);
      const data = rows.slice(1).map((values) => {
        const record: Record<string, string> = {};
        headers.forEach((header, index) => { record[header] = values[index] ?? ""; });
        return record;
      });
      return { output: JSON.stringify(data, null, 2), error: "" };
    } catch (caught) {
      return { output: "", error: caught instanceof Error ? caught.message : "Could not parse this CSV." };
    }
  }, [input, firstRowHeaders]);

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(converted.output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setError("Clipboard access was blocked. Select and copy the result manually.");
    }
  }

  function downloadResult() {
    if (!converted.output) return;
    const blob = new Blob([converted.output], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "converted.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <header className="mb-7">
          <p className="mb-2 text-sm font-semibold text-blue-700">Free data utility</p>
          <h1 className="text-3xl font-bold text-slate-900">CSV to JSON Converter</h1>
          <p className="mt-3 text-slate-600">Convert comma-separated data into JSON in your browser, including quoted values and commas inside quoted fields.</p>
        </header>
        <label htmlFor="csv-input" className="mb-2 block font-semibold text-slate-800">CSV input</label>
        <textarea id="csv-input" value={input} onChange={(e) => { setInput(e.target.value); setError(""); }} rows={9} placeholder={'name,city,note\nAsha,Mumbai,"Likes tea, coffee"\nSam,London,"Says ""hello"""'} className="w-full rounded-lg border border-slate-300 p-3 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" />
        <label className="my-4 flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={firstRowHeaders} onChange={(e) => setFirstRowHeaders(e.target.checked)} /> Use first row as object keys</label>
        <div className="mb-2 flex items-center justify-between gap-3"><label htmlFor="json-output" className="font-semibold text-slate-800">JSON output</label><span className="text-xs text-slate-500">{converted.output ? "Ready to copy or download" : "Waiting for valid CSV"}</span></div>
        <textarea id="json-output" readOnly value={converted.output} rows={12} className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 font-mono text-sm" />
        {(converted.error || error) && <p role="alert" className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{converted.error || error}</p>}
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={copyResult} disabled={!converted.output} className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">{copied ? "Copied!" : "Copy JSON"}</button>
          <button type="button" onClick={downloadResult} disabled={!converted.output} className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50">Download .json</button>
          <button type="button" onClick={() => { setInput(""); setError(""); }} className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700">Clear</button>
        </div>
        <p className="mt-6 text-sm text-slate-500">All conversion happens in your browser. No file or data is uploaded to a server.</p>
        <Link href="/tools/developer" className="mt-7 inline-block text-sm font-medium text-blue-700 hover:underline">← Browse developer tools</Link>
      </div>
    </main>
  );
}
