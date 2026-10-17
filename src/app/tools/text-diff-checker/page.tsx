"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type DiffLine = { kind: "same" | "added" | "removed"; text: string };

function compareLines(before: string, after: string): DiffLine[] {
  const a = before.split(/\r?\n/);
  const b = after.split(/\r?\n/);
  // Longest common subsequence keeps unchanged lines in order.
  if (a.length * b.length > 250000) {
    const max = Math.max(a.length, b.length);
    const result: DiffLine[] = [];
    for (let i = 0; i < max; i++) {
      if (i < a.length && i < b.length && a[i] === b[i]) result.push({ kind: "same", text: a[i] });
      else {
        if (i < a.length) result.push({ kind: "removed", text: a[i] });
        if (i < b.length) result.push({ kind: "added", text: b[i] });
      }
    }
    return result;
  }
  const dp = Array.from({ length: a.length + 1 }, () => new Uint32Array(b.length + 1));
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const out: DiffLine[] = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { out.push({ kind: "same", text: a[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { out.push({ kind: "removed", text: a[i++] }); }
    else { out.push({ kind: "added", text: b[j++] }); }
  }
  while (i < a.length) out.push({ kind: "removed", text: a[i++] });
  while (j < b.length) out.push({ kind: "added", text: b[j++] });
  return out;
}

export default function TextDiffCheckerPage() {
  const [before, setBefore] = useState("KaamKitPro helps with daily tasks.\nTools are easy to use.");
  const [after, setAfter] = useState("KaamKitPro helps with everyday tasks.\nTools are free to use.\nMore tools are coming.");
  const diff = useMemo(() => compareLines(before, after), [before, after]);
  const added = diff.filter((line) => line.kind === "added").length;
  const removed = diff.filter((line) => line.kind === "removed").length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <header className="mb-7">
          <p className="mb-2 text-sm font-semibold text-blue-700">Free text utility</p>
          <h1 className="text-3xl font-bold text-slate-900">Text Diff Checker</h1>
          <p className="mt-3 text-slate-600">Compare two versions of text line by line. Added lines appear in green and removed lines in red. Your text stays in your browser.</p>
        </header>
        <div className="grid gap-5 md:grid-cols-2">
          <div><label htmlFor="diff-before" className="mb-2 block font-semibold text-slate-800">Original text</label><textarea id="diff-before" value={before} onChange={(e) => setBefore(e.target.value)} rows={9} className="w-full rounded-lg border border-slate-300 p-3 font-mono text-sm focus:border-blue-500 focus:outline-none" /></div>
          <div><label htmlFor="diff-after" className="mb-2 block font-semibold text-slate-800">Updated text</label><textarea id="diff-after" value={after} onChange={(e) => setAfter(e.target.value)} rows={9} className="w-full rounded-lg border border-slate-300 p-3 font-mono text-sm focus:border-blue-500 focus:outline-none" /></div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 text-sm"><span className="rounded-full bg-green-100 px-3 py-1 font-medium text-green-800">+ {added} added</span><span className="rounded-full bg-red-100 px-3 py-1 font-medium text-red-800">− {removed} removed</span><span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">{diff.length - added - removed} unchanged</span></div>
        <h2 className="mb-3 mt-7 text-lg font-bold text-slate-900">Comparison</h2>
        <div aria-live="polite" className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-3">
          <pre className="whitespace-pre-wrap break-words font-mono text-sm">{diff.map((line, index) => (line.kind === "same" ? "  " : line.kind === "added" ? "+ " : "− ") + (line.text || " ") + (index < diff.length - 1 ? "\n" : "")).join("")}</pre>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-sm"><span className="rounded-md bg-green-50 px-2 py-1 text-green-800">+ Added lines</span><span className="rounded-md bg-red-50 px-2 py-1 text-red-800">− Removed lines</span><span className="rounded-md bg-slate-100 px-2 py-1 text-slate-700">Unchanged lines</span></div>
        <Link href="/tools/text" className="mt-7 inline-block text-sm font-medium text-blue-700 hover:underline">← Browse text tools</Link>
      </div>
    </main>
  );
}
