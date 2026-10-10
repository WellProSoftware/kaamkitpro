"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function LineSorterPage() {
  const [input, setInput] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [ignoreCase, setIgnoreCase] = useState(true);
  const [trimLines, setTrimLines] = useState(true);
  const [removeBlank, setRemoveBlank] = useState(false);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    let lines = input.split(/\r?\n/).map((line) => trimLines ? line.trim() : line);
    if (removeBlank) lines = lines.filter((line) => line.length > 0);
    lines.sort((a, b) => {
      const left = ignoreCase ? a.toLocaleLowerCase() : a;
      const right = ignoreCase ? b.toLocaleLowerCase() : b;
      const result = left.localeCompare(right, undefined, { numeric: true, sensitivity: ignoreCase ? "base" : "variant" });
      return order === "asc" ? result : -result;
    });
    return lines.join("\n");
  }, [input, order, ignoreCase, trimLines, removeBlank]);

  async function copyOutput() {
    try {
      await navigator.clipboard.writeText(output);
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
          <h1 className="text-3xl font-bold text-slate-900">Online Line Sorter</h1>
          <p className="mt-3 text-slate-600">Sort lists alphabetically or numerically in your browser. Your text stays on your device.</p>
        </header>
        <label htmlFor="line-input" className="mb-2 block font-semibold text-slate-800">Lines to sort</label>
        <textarea id="line-input" value={input} onChange={(e) => setInput(e.target.value)} rows={9} placeholder={"Banana\nApple\nItem 10\nItem 2"} className="w-full rounded-lg border border-slate-300 p-3 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" />
        <div className="my-4 flex flex-wrap gap-4 text-sm text-slate-700">
          <label className="flex items-center gap-2"><input type="radio" checked={order === "asc"} onChange={() => setOrder("asc")} /> A → Z / low → high</label>
          <label className="flex items-center gap-2"><input type="radio" checked={order === "desc"} onChange={() => setOrder("desc")} /> Z → A / high → low</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={ignoreCase} onChange={(e) => setIgnoreCase(e.target.checked)} /> Ignore case</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={trimLines} onChange={(e) => setTrimLines(e.target.checked)} /> Trim line edges</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={removeBlank} onChange={(e) => setRemoveBlank(e.target.checked)} /> Remove blank lines</label>
        </div>
        <div className="mb-2 flex items-center justify-between gap-3"><label htmlFor="line-output" className="font-semibold text-slate-800">Sorted result</label><span className="text-xs text-slate-500">{output ? output.split("\n").length : 0} lines</span></div>
        <textarea id="line-output" readOnly value={output} rows={9} className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 font-mono text-sm" />
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={copyOutput} disabled={!input} className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">{copied ? "Copied!" : "Copy result"}</button>
          <button type="button" onClick={() => setInput("")} className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700">Clear</button>
        </div>
        <p className="mt-6 text-sm text-slate-500">Tip: numeric sorting treats “Item 2” as coming before “Item 10”.</p>
        <Link href="/tools/text" className="mt-7 inline-block text-sm font-medium text-blue-700 hover:underline">← Browse text tools</Link>
      </div>
    </main>
  );
}
