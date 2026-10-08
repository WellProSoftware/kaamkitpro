"use client";
import Link from "next/link";

import { useState } from "react";

function formatHtml(input: string) {
  let formatted = input
    .replace(/>\s*</g, "><")
    .replace(/></g, "><")
    .trim();

  const lines = formatted.split("");
  let indent = 0;

  return lines
    .map((line) => {
      const trimmed = line.trim();

      if (/^<\/[^>]+>/.test(trimmed)) {
        indent = Math.max(0, indent - 1);
      }

      const result = `${"  ".repeat(indent)}${trimmed}`;

      if (
        /^<[^/!][^>]*>$/.test(trimmed) &&
        !/<\/[^>]+>$/.test(trimmed) &&
        !/<(input|img|br|hr|meta|link)[\s>]/i.test(trimmed)
      ) {
        indent++;
      }

      return result;
    })
    .join("");
}

export default function HtmlFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const format = () => {
    setOutput(formatHtml(input));
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
            HTML Formatter
          </h1>
          <p className="mt-3 text-slate-600">
            Format and beautify HTML code online for free.
          </p>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="<div><h1>Hello</h1><p>Your text</p></div>"
          rows={10}
          className="w-full rounded-lg border border-slate-300 p-4 font-mono text-sm"
        />

        <button
          onClick={format}
          className="mt-4 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Format HTML
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
              Copy Formatted HTML
            </button>
          </div>
        )}
      </div>
          <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/tools/developer"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Browse all Developer tools
        </Link>
      </div>

    </main>
  );
}
