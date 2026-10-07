"use client";

import { useState } from "react";

function formatJavaScript(input: string) {
  let indent = 0;
  let result = "";
  let line = "";

  const flush = () => {
    const value = line.trim();

    if (value) {
      result += `${"  ".repeat(Math.max(0, indent))}${value}\n`;
    }

    line = "";
  };

  for (const char of input) {
    if (char === "{") {
      line += " {";
      flush();
      indent++;
    } else if (char === "}") {
      flush();
      indent = Math.max(0, indent - 1);
      line = "}";
      flush();
    } else if (char === ";") {
      line += ";";
      flush();
    } else {
      line += char;
    }
  }

  flush();

  return result.trim();
}

export default function JsFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const format = () => {
    setOutput(formatJavaScript(input));
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
            JavaScript Formatter
          </h1>
          <p className="mt-3 text-slate-600">
            Format and beautify JavaScript code directly in your browser.
          </p>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="function hello(){console.log('Hello');}"
          rows={10}
          className="w-full rounded-lg border border-slate-300 p-4 font-mono text-sm"
        />

        <button
          onClick={format}
          className="mt-4 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Format JavaScript
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
              Copy Formatted JavaScript
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
