"use client";
import Link from "next/link";

import { useState } from "react";

export default function MetaDescriptionGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  const generate = () => {
    if (!topic.trim()) {
      setDescription("Please enter a page topic.");
      return;
    }

    setDescription(
      `Discover useful information about ${topic}. Learn more with clear, helpful and practical content designed to help you find what you need quickly.`
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Meta Description Generator
          </h1>
          <p className="mt-3 text-slate-600">
            Create a concise SEO-friendly meta description for your page.
          </p>
        </div>

        <label className="mb-2 block font-medium text-slate-700">
          Page topic
        </label>

        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Example: Free PDF compressor"
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
        />

        <button
          onClick={generate}
          className="mt-4 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Generate Description
        </button>

        <div className="mt-6">
          <label className="mb-2 block font-medium text-slate-700">
            Generated description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full rounded-lg border border-slate-300 p-4"
          />

          <p className="mt-2 text-sm text-slate-500">
            Characters: {description.length}
          </p>
        </div>
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
