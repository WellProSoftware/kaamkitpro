"use client";
import { trackCopy, trackToolUsed } from "@/lib/analytics";

import { useState } from "react";

export default function JSONFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatJSON = () => {
    trackToolUsed("JSON Formatter");
    setError("");
    setOutput("");

    if (!input.trim()) {
      setError("Please enter some JSON first.");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);

      setOutput(formatted);
    } catch {
      setError("Invalid JSON. Please check your JSON syntax.");
    }
  };

  const minifyJSON = () => {
    setError("");
    setOutput("");

    if (!input.trim()) {
      setError("Please enter some JSON first.");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);

      setOutput(minified);
    } catch {
      setError("Invalid JSON. Please check your JSON syntax.");
    }
  };

  const validateJSON = () => {
    setError("");
    setOutput("");

    if (!input.trim()) {
      setError("Please enter some JSON first.");
      return;
    }

    try {
      JSON.parse(input);
      setOutput("✓ Valid JSON");
    } catch {
      setError("✕ Invalid JSON. Please check your JSON syntax.");
    }
  };

  const copyOutput = async () => {
    trackCopy("JSON Formatter");
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
    } catch {
      // Clipboard may be unavailable in some browsers.
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            KaamKitPro Tool
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            JSON Formatter
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Format, validate and minify JSON instantly with this free
            online developer tool.
          </p>
        </div>

        {/* Tool */}
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input */}
            <div>
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold">
                    JSON Input
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Paste your JSON below.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={clearAll}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Clear
                </button>
              </div>

              <textarea
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                  setError("");
                }}
                placeholder={`{"name":"KaamKitPro","tools":10}`}
                rows={18}
                spellCheck={false}
                className="w-full resize-y rounded-2xl border border-slate-300 bg-slate-950 px-5 py-4 font-mono text-sm leading-7 text-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              <div className="mt-4 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={formatJSON}
                  className="rounded-xl bg-blue-600 px-3 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Format
                </button>

                <button
                  type="button"
                  onClick={minifyJSON}
                  className="rounded-xl bg-slate-800 px-3 py-3 text-sm font-semibold text-white hover:bg-slate-900"
                >
                  Minify
                </button>

                <button
                  type="button"
                  onClick={validateJSON}
                  className="rounded-xl bg-emerald-600 px-3 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Validate
                </button>
              </div>
            </div>

            {/* Output */}
            <div>
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold">
                    Result
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Formatted or minified JSON will appear here.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={copyOutput}
                  disabled={!output}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400"
                >
                  Copy
                </button>
              </div>

              <div className="min-h-[432px] whitespace-pre-wrap break-words rounded-2xl bg-slate-950 p-5 font-mono text-sm leading-7 text-emerald-300">
                {output || (
                  <span className="text-slate-500">
                    Your JSON result will appear here.
                  </span>
                )}
              </div>

              {error && (
                <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Example */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold">
            JSON Example
          </h2>

          <div className="mt-4 overflow-x-auto rounded-2xl bg-slate-950 p-5">
            <pre className="font-mono text-sm leading-7 text-emerald-300">
{`{
  "name": "KaamKitPro",
  "category": "Online Tools",
  "free": true
}`}
            </pre>
          </div>
        </section>

        {/* How to Use */}
        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-bold">
            How to use JSON Formatter
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>
              Apna JSON input box mein paste karo.
            </li>

            <li>
              <strong>Format</strong> button se JSON ko readable format
              mein convert karo.
            </li>

            <li>
              <strong>Minify</strong> button se unnecessary spaces remove
              karo.
            </li>

            <li>
              <strong>Validate</strong> button se JSON syntax check karo.
            </li>

            <li>
              Result ko <strong>Copy</strong> button se copy kar sakte ho.
            </li>
          </ol>
        </section>

        {/* SEO Content */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            Free Online JSON Formatter
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            KaamKitPro JSON Formatter ek free online developer tool hai
            jisse aap JSON data ko format, validate aur minify kar sakte
            ho. Ye APIs, web development, configuration files aur
            programming projects ke liye useful hai.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            JSON processing directly browser mein hoti hai, isliye normal
            JSON formatting ke liye kisi file upload ya software
            installation ki zarurat nahi hai.
          </p>
        </section>

        {/* Back */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            ← Back to KaamKitPro
          </a>
        </div>
      </div>
    </main>
  );
}