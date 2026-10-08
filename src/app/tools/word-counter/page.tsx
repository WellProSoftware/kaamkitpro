"use client";
import { trackToolUsed } from "@/lib/analytics";
import Link from "next/link";

import { useRef, useState } from "react";

export default function WordCounterPage() {
  const [text, setText] = useState("");
  const trackedInteraction = useRef(false);

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  const characters = text.length;

  const charactersWithoutSpaces = text.replace(/\s/g, "").length;

  const sentences =
    text.trim() === ""
      ? 0
      : text.split(/[.!?]+/).filter((item) => item.trim() !== "").length;

  const paragraphs =
    text.trim() === ""
      ? 0
      : text.split(/\n\s*\n/).filter((item) => item.trim() !== "").length;

  const readingTime =
    words === 0 ? 0 : Math.max(1, Math.ceil(words / 200));

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            KaamKitPro Tool
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Word Counter
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Count words, characters, sentences, paragraphs and reading time
            instantly.
          </p>
        </div>

        {/* Tool */}
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold">Enter your text</h2>

              <p className="mt-1 text-sm text-slate-500">
                Type or paste anything below.
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
            className="w-full resize-y rounded-2xl border border-slate-300 px-5 py-4 text-base leading-7 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          {/* Counter Cards */}
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-blue-50 p-5">
              <p className="text-sm font-medium text-slate-600">Words</p>
              <p className="mt-2 text-3xl font-bold text-blue-600">
                {words}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-600">
                Characters
              </p>
              <p className="mt-2 text-3xl font-bold">{characters}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-600">
                Without Spaces
              </p>
              <p className="mt-2 text-3xl font-bold">
                {charactersWithoutSpaces}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-600">
                Sentences
              </p>
              <p className="mt-2 text-3xl font-bold">{sentences}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-600">
                Paragraphs
              </p>
              <p className="mt-2 text-3xl font-bold">{paragraphs}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-600">
                Reading Time
              </p>
              <p className="mt-2 text-3xl font-bold">
                {readingTime}{" "}
                <span className="text-base font-semibold text-slate-500">
                  min
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-bold">
            How to use Word Counter
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>Text box mein apna text type ya paste karo.</li>
            <li>Word aur character count automatically update hoga.</li>
            <li>Sentences aur paragraphs bhi automatically count honge.</li>
            <li>Reading Time approximate reading time batayega.</li>
          </ol>
        </section>

        {/* SEO Content */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            Free Online Word Counter
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            KaamKitPro Word Counter ek simple aur free online tool hai jisse
            aap apne text ke words aur characters count kar sakte ho. Ye
            students, writers, bloggers, content creators aur professionals
            ke liye useful hai.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            Tool browser mein directly kaam karta hai. Aapko koi file upload
            karne ki zarurat nahi hai.
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
          <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/tools/text"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Browse all Text tools
        </Link>
      </div>

    </main>
  );
}