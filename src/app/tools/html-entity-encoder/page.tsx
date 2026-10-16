"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const namedEntities: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function encodeEntities(value: string) {
  return value.replace(/[&<>"']/g, (character) => namedEntities[character]);
}

function decodeEntities(value: string) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;
  return textarea.value;
}

export default function HtmlEntityToolPage() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!input) return "";
    try {
      return mode === "encode" ? encodeEntities(input) : decodeEntities(input);
    } catch {
      return "";
    }
  }, [input, mode]);

  async function copyOutput() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  function downloadOutput() {
    if (!output) return;
    const url = URL.createObjectURL(new Blob([output], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = mode === "encode" ? "html-encoded.txt" : "html-decoded.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <Link href="/tools" className="text-sm font-semibold text-blue-700 hover:underline">← All tools</Link>
        <div className="mb-8 mt-5 text-center">
          <h1 className="text-3xl font-bold text-slate-900">HTML Entity Encoder &amp; Decoder</h1>
          <p className="mt-3 text-slate-600">Convert special characters to HTML entities or decode entities back to readable text. Everything runs in your browser.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button onClick={() => setMode("encode")} className={`rounded-lg px-6 py-3 font-semibold ${mode === "encode" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>Encode HTML entities</button>
          <button onClick={() => setMode("decode")} className={`rounded-lg px-6 py-3 font-semibold ${mode === "decode" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>Decode HTML entities</button>
        </div>

        <label htmlFor="entity-input" className="mt-6 block text-sm font-semibold text-slate-700">Input text</label>
        <textarea id="entity-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder={mode === "encode" ? 'Try: <h1 title="A & B">Hello</h1>' : "Try: &lt;h1&gt;Hello&lt;/h1&gt;"} rows={7} className="mt-2 w-full rounded-lg border border-slate-300 p-4 font-mono text-sm" />

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-semibold text-slate-800">Output</h2>
          <div className="flex flex-wrap gap-2">
            <button onClick={copyOutput} disabled={!output} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">{copied ? "Copied!" : "Copy output"}</button>
            <button onClick={downloadOutput} disabled={!output} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40">Download .txt</button>
            <button onClick={() => { setInput(""); setCopied(false); }} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Clear</button>
          </div>
        </div>
        <textarea aria-label="Converted output" readOnly value={output} rows={7} placeholder="Converted text will appear here..." className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-sm" />
        <p className="mt-4 text-sm leading-6 text-slate-500">Privacy note: text is processed locally in this page and is not sent to a KaamKitPro server.</p>
      </div>
    </main>
  );
}
