"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function RemoveDuplicateLinesPage() {
  const [input, setInput] = useState("");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [trimLines, setTrimLines] = useState(true);
  const [removeBlank, setRemoveBlank] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const seen = new Set<string>();
    const output: string[] = [];
    for (const original of input.split(/\r?\n/)) {
      const line = trimLines ? original.trim() : original;
      if (removeBlank && line.length === 0) continue;
      const key = ignoreCase ? line.toLocaleLowerCase() : line;
      if (seen.has(key)) continue;
      seen.add(key);
      output.push(line);
    }
    return { text: output.join("\n"), count: output.length, removed: input.length ? input.split(/\r?\n/).length - output.length : 0 };
  }, [input, ignoreCase, trimLines, removeBlank]);

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(result.text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <header className="mb-7">
          <p className="mb-2 text-sm font-semibold text-blue-700">Free text utility</p>
          <h1 className="text-3xl font-bold text-slate-900">Remove Duplicate Lines</h1>
          <p className="mt-3 text-slate-600">Remove repeated lines from lists, keywords, emails or copied data while keeping the first occurrence.</p>
        </header>
        <label htmlFor="duplicate-input" className="mb-2 block font-semibold text-slate-800">Paste your lines</label>
        <textarea id="duplicate-input" value={input} onChange={(e) => setInput(e.target.value)} rows={9} placeholder={"apple\nbanana\napple\norange"} className="w-full rounded-lg border border-slate-300 p-3 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" />
        <div className="my-4 flex flex-wrap gap-4 text-sm text-slate-700">
          <label className="flex items-center gap-2"><input type="checkbox" checked={ignoreCase} onChange={(e) => setIgnoreCase(e.target.checked)} /> Treat uppercase/lowercase as same</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={trimLines} onChange={(e) => setTrimLines(e.target.checked)} /> Trim line edges</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={removeBlank} onChange={(e) => setRemoveBlank(e.target.checked)} /> Remove blank lines</label>
        </div>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3"><label htmlFor="duplicate-output" className="font-semibold text-slate-800">Cleaned result</label><span className="text-xs text-slate-500">{result.count} kept · {result.removed} removed</span></div>
        <textarea id="duplicate-output" readOnly value={result.text} rows={9} className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 font-mono text-sm" />
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={copyResult} disabled={!input} className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">{copied ? "Copied!" : "Copy result"}</button>
          <button type="button" onClick={() => setInput("")} className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700">Clear</button>
        </div>
        <p className="mt-6 text-sm text-slate-500">Processing happens locally in your browser; pasted text is not uploaded.</p>
        <Link href="/tools/text" className="mt-7 inline-block text-sm font-medium text-blue-700 hover:underline">← Browse text tools</Link>
      </div>
    </main>
  );
}
