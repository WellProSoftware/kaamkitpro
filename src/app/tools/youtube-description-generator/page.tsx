"use client";
import Link from "next/link";

import { useState } from "react";

export default function YouTubeDescriptionGeneratorPage() {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  const generate = () => {
    const cleanTitle = title.trim();
    const cleanTopic = topic.trim();

    if (!cleanTitle || !cleanTopic) {
      setDescription("Please enter both a video title and topic.");
      return;
    }

    setDescription(
      `In this video, we cover ${cleanTopic} in a simple and practical way.

You'll learn the key points, useful tips and important information related to this topic.

If you find this video helpful, like the video, subscribe to the channel and share it with others.

Video Title: ${cleanTitle}

#YouTube #${cleanTopic
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 30)}`
    );
  };

  const copy = async () => {
    if (!description) return;
    await navigator.clipboard.writeText(description);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            YouTube Description Generator
          </h1>
          <p className="mt-3 text-slate-600">
            Create a ready-to-edit YouTube video description.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Video title"
            className="rounded-lg border border-slate-300 px-4 py-3"
          />

          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Video topic"
            className="rounded-lg border border-slate-300 px-4 py-3"
          />
        </div>

        <button
          onClick={generate}
          className="mt-4 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Generate Description
        </button>

        {description && (
          <div className="mt-6">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={14}
              className="w-full rounded-lg border border-slate-300 p-4"
            />

            <button
              onClick={copy}
              className="mt-4 w-full rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Copy Description
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
