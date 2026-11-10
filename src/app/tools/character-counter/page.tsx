"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function CharacterCounterPage() {
  const [text, setText] = useState("");
  const counts = useMemo(() => {
    const characters = Array.from(text).length;
    const charactersWithoutSpaces = Array.from(text.replace(/\s/g, "")).length;
    const words = text.trim() ? text.trim().split(/\s+/u).length : 0;
    const lines = text.length ? text.split(/\r\n|\r|\n/).length : 0;
    return { characters, charactersWithoutSpaces, words, lines };
  }, [text]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            KaamKitPro Tool
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Character Counter
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Count characters with and without spaces, words and lines as you type.
          </p>
        </div>

        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold">Enter your text</h2>
              <p className="mt-1 text-sm text-slate-500">
                Counts update instantly. Your text stays in this browser.
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
            rows={14}
            aria-label="Text to count"
            className="w-full resize-y rounded-2xl border border-slate-300 px-5 py-4 text-base leading-7 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4" aria-live="polite">
            {[
              { label: "Characters", value: counts.characters, featured: true },
              { label: "Without spaces", value: counts.charactersWithoutSpaces },
              { label: "Words", value: counts.words },
              { label: "Lines", value: counts.lines },
            ].map((item) => (
              <div key={item.label} className={item.featured ? "rounded-2xl bg-blue-50 p-5" : "rounded-2xl bg-slate-50 p-5"}>
                <p className="text-sm font-medium text-slate-600">{item.label}</p>
                <p className={item.featured ? "mt-2 text-3xl font-bold text-blue-600" : "mt-2 text-3xl font-bold"}>
                  {item.value.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold">How character counting works</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>Characters includes letters, numbers, punctuation and spaces.</li>
            <li>Without spaces excludes whitespace characters such as spaces, tabs and line breaks.</li>
            <li>Unicode characters such as most emoji are counted as individual code points.</li>
            <li>Words are separated by whitespace; line count follows the text's line breaks.</li>
          </ul>
        </section>

        <div className="mt-8 flex flex-wrap justify-between gap-4">
          <Link href="/tools/text" className="text-sm font-medium text-blue-600 hover:underline">
            ← Browse all Text tools
          </Link>
          <Link href="/tools/word-counter" className="text-sm font-medium text-blue-600 hover:underline">
            Open Word Counter →
          </Link>
        </div>
      </div>
    </main>
  );
}
