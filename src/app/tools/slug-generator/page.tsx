"use client";
import Link from "next/link";

import { useState } from "react";

export default function SlugGeneratorPage() {
  const [text, setText] = useState("");
  const [slug, setSlug] = useState("");

  const generateSlug = () => {
    const value = text
      .toLowerCase()
      .trim()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    setSlug(value);
  };

  const copy = async () => {
    if (!slug) return;
    await navigator.clipboard.writeText(slug);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Slug Generator
          </h1>
          <p className="mt-3 text-slate-600">
            Convert titles and phrases into clean SEO-friendly URL slugs.
          </p>
        </div>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Example: Best Free Online Tools for Students"
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
        />

        <button
          onClick={generateSlug}
          className="mt-4 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Generate Slug
        </button>

        {slug && (
          <div className="mt-6 rounded-xl border border-slate-200 p-5">
            <p className="text-sm font-medium text-slate-500">Generated slug</p>

            <div className="mt-2 break-all rounded-lg bg-slate-50 p-4 font-mono text-slate-900">
              {slug}
            </div>

            <button
              onClick={copy}
              className="mt-4 w-full rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Copy Slug
            </button>
          </div>
        )}
      </div>
          <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/tools/seo"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Browse all SEO tools
        </Link>
      </div>

    </main>
  );
}
