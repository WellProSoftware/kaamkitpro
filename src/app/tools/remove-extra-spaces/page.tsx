"use client";
import Link from "next/link";

import { useState } from "react";

export default function RemoveExtraSpacesPage() {
  const [text, setText] = useState("");

  const cleanedText = text
    .replace(/[ \t]+/g, " ")
    .replace(/\s+/g, "")
    .replace(/\s+/g, "")
    .trim();

  const removeExtraSpaces = () => {
    setText(cleanedText);
  };

  const clearText = () => {
    setText("");
  };

  const copyText = async () => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard may be unavailable in some browsers.
    }
  };

  const originalWords =
    text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  const cleanedWords =
    cleanedText === "" ? 0 : cleanedText.split(/\s+/).length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            KaamKitPro Tool
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Remove Extra Spaces
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Clean unwanted spaces, tabs and line spacing from your text
            instantly.
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
                Paste text with unwanted spaces below.
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
            placeholder="Paste your text here..."
            rows={14}
            className="w-full resize-y rounded-2xl border border-slate-300 px-5 py-4 text-base leading-7 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={removeExtraSpaces}
              disabled={!text.trim()}
              className="flex-1 rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Remove Extra Spaces
            </button>

            <button
              type="button"
              onClick={copyText}
              disabled={!text}
              className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400"
            >
              Copy Text
            </button>
          </div>

          {/* Preview */}
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold">
                Cleaned Text Preview
              </h2>

              <span className="text-sm text-slate-500">
                {cleanedText.length} characters
              </span>
            </div>

            <div className="min-h-40 whitespace-pre-wrap rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
              {cleanedText || (
                <span className="text-slate-400">
                  Cleaned text will appear here.
                </span>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-blue-50 p-5">
              <p className="text-sm font-medium text-slate-600">
                Original Characters
              </p>

              <p className="mt-2 text-3xl font-bold text-blue-600">
                {text.length}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-600">
                Cleaned Characters
              </p>

              <p className="mt-2 text-3xl font-bold">
                {cleanedText.length}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-600">
                Original Words
              </p>

              <p className="mt-2 text-3xl font-bold">
                {originalWords}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-600">
                Cleaned Words
              </p>

              <p className="mt-2 text-3xl font-bold">
                {cleanedWords}
              </p>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-bold">
            How to use Remove Extra Spaces
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>
              Apna text type ya paste karo.
            </li>

            <li>
              Remove Extra Spaces button par click karo.
            </li>

            <li>
              Unwanted spaces aur extra spacing automatically clean ho jayegi.
            </li>

            <li>
              Cleaned text preview mein result check karo.
            </li>

            <li>
              Copy Text button se cleaned text copy kar lo.
            </li>
          </ol>
        </section>

        {/* SEO Content */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            Free Online Remove Extra Spaces Tool
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            KaamKitPro Remove Extra Spaces ek free online text cleaning
            tool hai. Isse aap unwanted spaces, tabs aur unnecessary
            spacing ko quickly remove kar sakte ho.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            Ye tool copied text, articles, documents, spreadsheets,
            website content aur other digital text ko clean karne ke liye
            useful hai.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            Aapko koi software install karne ki zarurat nahi hai. Tool
            directly browser mein kaam karta hai.
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