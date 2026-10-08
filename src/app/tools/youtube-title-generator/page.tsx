"use client";
import Link from "next/link";

import { useState } from "react";

export default function YouTubeTitleGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [titles, setTitles] = useState<string[]>([]);

  const generate = () => {
    const value = topic.trim();

    if (!value) {
      setTitles([]);
      return;
    }

    setTitles([
      `${value}: Complete Guide for Beginners`,
      `7 Things You Need to Know About ${value}`,
      `How to ${value} Step by Step`,
      `${value} Explained Simply`,
      `The Ultimate ${value} Guide`,
      `I Tried ${value} — Here's What Happened`,
      `Best ${value} Tips You Should Know`,
      `${value}: Mistakes Everyone Should Avoid`,
      `Everything About ${value} in 10 Minutes`,
      `The Truth About ${value}`,
    ]);
  };

  const copyAll = async () => {
    if (!titles.length) return;
    await navigator.clipboard.writeText(titles.join("\n"));
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            YouTube Title Generator
          </h1>
          <p className="mt-3 text-slate-600">
            Generate clickable YouTube title ideas from your video topic.
          </p>
        </div>

        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Example: learn video editing"
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
        />

        <button
          onClick={generate}
          className="mt-4 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Generate Titles
        </button>

        {titles.length > 0 && (
          <div className="mt-6">
            <div className="space-y-3">
              {titles.map((title, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-slate-200 p-4 text-slate-800"
                >
                  {index + 1}. {title}
                </div>
              ))}
            </div>

            <button
              onClick={copyAll}
              className="mt-4 w-full rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Copy All Titles
            </button>
          </div>
        )}
      </div>
          <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/tools/social"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Browse all Social tools
        </Link>
      </div>

    </main>
  );
}
