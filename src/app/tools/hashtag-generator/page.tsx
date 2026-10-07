"use client";

import { useState } from "react";

export default function HashtagGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [hashtags, setHashtags] = useState("");

  const generate = () => {
    const words = topic
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter(Boolean);

    if (!words.length) {
      setHashtags("");
      return;
    }

    const base = words.join("");
    const generated = Array.from(
      new Set([
        `#${base}`,
        ...words.map((word) => `#${word}`),
        "#trending",
        "#viral",
        "#explore",
        "#contentcreator",
        "#socialmedia",
        "#instagram",
        "#youtube",
        "#reels",
        "#shorts",
        "#digitalcontent",
        "#creator",
      ])
    );

    setHashtags(generated.join(" "));
  };

  const copy = async () => {
    if (!hashtags) return;
    await navigator.clipboard.writeText(hashtags);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Hashtag Generator
          </h1>
          <p className="mt-3 text-slate-600">
            Generate relevant hashtags for Instagram, YouTube and social media.
          </p>
        </div>

        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Example: fitness workout"
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
        />

        <button
          onClick={generate}
          className="mt-4 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Generate Hashtags
        </button>

        {hashtags && (
          <div className="mt-6 rounded-xl border border-slate-200 p-5">
            <textarea
              value={hashtags}
              readOnly
              rows={7}
              className="w-full rounded-lg bg-slate-50 p-4 text-sm"
            />

            <button
              onClick={copy}
              className="mt-4 w-full rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Copy Hashtags
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
