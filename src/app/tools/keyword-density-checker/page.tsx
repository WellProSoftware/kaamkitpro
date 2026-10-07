"use client";

import { useMemo, useState } from "react";

export default function KeywordDensityCheckerPage() {
  const [text, setText] = useState("");
  const [keyword, setKeyword] = useState("");

  const result = useMemo(() => {
    const words = text
      .toLowerCase()
      .match(/\b[\w'-]+\b/g) || [];

    const target = keyword.trim().toLowerCase();

    if (!target || words.length === 0) {
      return { count: 0, total: words.length, density: 0 };
    }

    const targetWords = target.match(/\b[\w'-]+\b/g) || [];
    let count = 0;

    if (targetWords.length === 1) {
      count = words.filter((word) => word === targetWords[0]).length;
    } else {
      const normalizedText = text.toLowerCase();
      const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const matches = normalizedText.match(
        new RegExp(`\\b${escaped}\\b`, "g")
      );
      count = matches?.length || 0;
    }

    return {
      count,
      total: words.length,
      density: words.length ? (count / words.length) * 100 : 0,
    };
  }, [text, keyword]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Keyword Density Checker
          </h1>
          <p className="mt-3 text-slate-600">
            Check how frequently a keyword appears in your text.
          </p>
        </div>

        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter target keyword"
          className="mb-4 w-full rounded-lg border border-slate-300 px-4 py-3"
        />

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your article or webpage text here..."
          rows={12}
          className="w-full rounded-lg border border-slate-300 p-4"
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-5 text-center">
            <p className="text-sm text-slate-500">Keyword Count</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {result.count}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5 text-center">
            <p className="text-sm text-slate-500">Total Words</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {result.total}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5 text-center">
            <p className="text-sm text-slate-500">Density</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {result.density.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
