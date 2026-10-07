"use client";

import { useState } from "react";

function formatCss(input: string) {
  return input
    .replace(/\s*{\s*/g, " {\n  ")
    .replace(/\s*}\s*/g, "\n}\n")
    .replace(/;\s*/g, ";\n  ")
    .replace(/\n\s*\n/g, "\n")
    .trim();
}

export default function CssFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const format = () => {
    setOutput(formatCss(input));
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            CSS Formatter
          </h1>
          <p className="mt-3 text-slate-600">
            Format and beautify CSS code online for free.
          </p>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="body{color:red;background:white}"
          rows={10}
          className="w-full rounded-lg border border-slate-300 p-4 font-mono text-sm"
        />

        <button
          onClick={format}
          className="mt-4 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Format CSS
        </button>

        {output && (
          <div className="mt-6">
            <textarea
              value={output}
              readOnly
              rows={14}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 p-4 font-mono text-sm"
            />

            <button
              onClick={copy}
              className="mt-4 w-full rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Copy Formatted CSS
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
