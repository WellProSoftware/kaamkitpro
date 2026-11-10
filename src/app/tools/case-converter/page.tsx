"use client";

import Link from "next/link";
import { useState } from "react";

export default function CaseConverterPage() {
  const [text, setText] = useState("");

  const toUpperCase = () => setText((value) => value.toUpperCase());
  const toLowerCase = () => setText((value) => value.toLowerCase());
  const toTitleCase = () =>
    setText((value) =>
      value.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase())
    );
  const toSentenceCase = () =>
    setText((value) =>
      value
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => match.toUpperCase())
    );
  const reverseText = () =>
    setText((value) => Array.from(value).reverse().join(""));

  const lineCount = text === "" ? 0 : text.split(/\r\n|\r|\n/).length;
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/u).length;
  const characterCount = Array.from(text).length;
  const spaceCount = (text.match(/\s/g) || []).length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            KaamKitPro Tool
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Case Converter
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Convert text to uppercase, lowercase, title case, sentence case and more.
          </p>
        </header>

        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold">Enter your text</h2>
              <p className="mt-1 text-sm text-slate-500">
                Type or paste your text below.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setText("")}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Clear
            </button>
          </div>

          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Type or paste your text here..."
            aria-label="Text to convert"
            rows={14}
            className="w-full resize-y rounded-2xl border border-slate-300 px-5 py-4 text-base leading-7 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { label: "UPPERCASE", action: toUpperCase },
              { label: "lowercase", action: toLowerCase },
              { label: "Title Case", action: toTitleCase },
              { label: "Sentence Case", action: toSentenceCase },
              { label: "Reverse", action: reverseText },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                disabled={!text}
                className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4" aria-live="polite">
            {[
              { label: "Characters", value: characterCount },
              { label: "Words", value: wordCount },
              { label: "Lines", value: lineCount },
              { label: "Spaces", value: spaceCount },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-600">{item.label}</p>
                <p className="mt-2 text-3xl font-bold">{item.value.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-bold">How to use Case Converter</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>Type or paste your text into the text box.</li>
            <li>Choose UPPERCASE or lowercase to change letter casing.</li>
            <li>Use Title Case to capitalize the first letter of each word.</li>
            <li>Use Sentence Case to capitalize the beginning of sentences.</li>
            <li>Select Reverse to reverse the character order.</li>
            <li>Use Clear to remove the text and reset all counts.</li>
          </ol>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Free Online Case Converter</h2>
          <p className="mt-4 leading-7 text-slate-600">
            KaamKitPro Case Converter is a free online text formatting tool.
            Convert text to uppercase, lowercase, title case or sentence case
            instantly. It also displays character, word, line and whitespace counts.
          </p>
          <p className="mt-4 leading-7 text-slate-600">
            The tool works directly in your browser, so no software installation
            or account is required.
          </p>
        </section>

        <div className="mt-8 flex flex-wrap justify-between gap-4">
          <Link href="/tools/text" className="text-sm font-medium text-blue-600 hover:underline">
            ← Browse all Text tools
          </Link>
          <Link href="/" className="text-sm font-medium text-blue-600 hover:underline">
            Back to KaamKitPro →
          </Link>
        </div>
      </div>
    </main>
  );
}
