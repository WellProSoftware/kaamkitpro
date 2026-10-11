"use client";
import Link from "next/link";

import { useState } from "react";

export default function CaseConverterPage() {
  const [text, setText] = useState("");

  const toUpperCase = () => {
    setText(text.toUpperCase());
  };

  const toLowerCase = () => {
    setText(text.toLowerCase());
  };

  const toTitleCase = () => {
    setText(
      text
        .toLowerCase()
        .replace(/\b\w/g, (letter) => letter.toUpperCase())
    );
  };

  const toSentenceCase = () => {
    const result = text
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s+\w)/g, (match) =>
        match.toUpperCase()
      );

    setText(result);
  };

  const reverseText = () => {
    setText(text.split("").reverse().join(""));
  };

  const clearText = () => {
    setText("");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            KaamKitPro Tool
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Case Converter
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Convert your text to uppercase, lowercase, title case,
            sentence case and more instantly.
          </p>
        </div>

        {/* Tool */}
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold">
                Enter your text
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Type or paste your text below.
              </p>
            </div>

            <button
              type="button"
              onClick={clearText}
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

          {/* Buttons */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            <button
              type="button"
              onClick={toUpperCase}
              disabled={!text}
              className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              UPPERCASE
            </button>

            <button
              type="button"
              onClick={toLowerCase}
              disabled={!text}
              className="rounded-xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-900 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              lowercase
            </button>

            <button
              type="button"
              onClick={toTitleCase}
              disabled={!text}
              className="rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Title Case
            </button>

            <button
              type="button"
              onClick={toSentenceCase}
              disabled={!text}
              className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Sentence Case
            </button>

            <button
              type="button"
              onClick={reverseText}
              disabled={!text}
              className="rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Reverse
            </button>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl bg-blue-50 p-5">
              <p className="text-sm font-medium text-slate-600">
                Characters
              </p>

              <p className="mt-2 text-3xl font-bold text-blue-600">
                {text.length}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-600">
                Words
              </p>

              <p className="mt-2 text-3xl font-bold">
                {text.trim() === ""
                  ? 0
                  : text.trim().split(/\s+/).length}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-600">
                Lines
              </p>

              <p className="mt-2 text-3xl font-bold">
                {text === "" ? 0 : text.split("\n").length}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-600">
                Spaces
              </p>

              <p className="mt-2 text-3xl font-bold">
                {(text.match(/\s/g) || []).length}
              </p>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-bold">
            How to use Case Converter
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>
              Text box mein apna text type ya paste karo.
            </li>

            <li>
              UPPERCASE button se text capital letters mein convert karo.
            </li>

            <li>
              lowercase button se text small letters mein convert karo.
            </li>

            <li>
              Title Case se har word ka first letter capital karo.
            </li>

            <li>
              Sentence Case se sentences ka first letter capital karo.
            </li>

            <li>
              Reverse button se text ko reverse karo.
            </li>
          </ol>
        </section>

        {/* SEO Content */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            Free Online Case Converter
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            KaamKitPro Case Converter ek free online text formatting tool
            hai. Isse aap text ko uppercase, lowercase, title case aur
            sentence case mein instantly convert kar sakte ho.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            Ye tool students, writers, bloggers, content creators,
            professionals aur social media users ke liye useful hai.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            Tool browser mein directly kaam karta hai, isliye kisi software
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