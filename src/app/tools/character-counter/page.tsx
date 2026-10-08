"use client";
import Link from "next/link";

import { useState } from "react";

export default function CharacterCounterPage() {
  const [text, setText] = useState("");

  const characters = text.length;
  const charactersWithoutSpaces = text.replace(/\s/g, "").length;
  const spaces = (text.match(/\s/g) || []).length;
  const lines = text === "" ? 0 : text.split("\n").length;

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
            Count characters, spaces and lines instantly while you type.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Enter your text</h2>
              <p className="mt-1 text-sm text-slate-500">
                Type or paste your content below.
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

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-blue-50 p-5">
              <p className="text-sm font-medium text-slate-600">
                Characters
              </p>
              <p className="mt-2 text-3xl font-bold text-blue-600">
                {characters}
              </p>
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
                Spaces
              </p>
              <p className="mt-2 text-3xl font-bold">{spaces}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-600">
                Lines
              </p>
              <p className="mt-2 text-3xl font-bold">{lines}</p>
            </div>
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-bold">
            Free Online Character Counter
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            KaamKitPro Character Counter helps you quickly count characters
            in social media posts, articles, descriptions, messages and other
            digital content.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            Simply type or paste your text and the character count updates
            instantly.
          </p>
        </section>

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