"use client";

import { useState } from "react";

export default function InstagramCaptionGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("friendly");
  const [caption, setCaption] = useState("");

  const generate = () => {
    const value = topic.trim();

    if (!value) {
      setCaption("Please enter a topic.");
      return;
    }

    const captions: Record<string, string> = {
      friendly: `Making memories and enjoying every moment around ${value}. ✨

Life is better when you make time for the things you love. 💫

What do you think? 👇

#${value.replace(/\s+/g, "")} #Lifestyle #Inspiration #GoodVibes`,
      professional: `Sharing some thoughts and insights about ${value}.

Consistency, learning and taking action can make a meaningful difference.

What is your experience with this topic?

#${value.replace(/\s+/g, "")} #Professional #Growth #Learning`,
      motivational: `Keep moving forward with ${value}. 🔥

Small steps become big results when you stay consistent and keep going.

Believe in the process. 💪

#${value.replace(/\s+/g, "")} #Motivation #Success #Mindset`,
    };

    setCaption(captions[tone]);
  };

  const copy = async () => {
    if (!caption) return;
    await navigator.clipboard.writeText(caption);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Instagram Caption Generator
          </h1>
          <p className="mt-3 text-slate-600">
            Generate ready-to-edit Instagram captions for your posts.
          </p>
        </div>

        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Example: travel, fitness, business"
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
        />

        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-3"
        >
          <option value="friendly">Friendly</option>
          <option value="professional">Professional</option>
          <option value="motivational">Motivational</option>
        </select>

        <button
          onClick={generate}
          className="mt-4 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Generate Caption
        </button>

        {caption && (
          <div className="mt-6">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={10}
              className="w-full rounded-lg border border-slate-300 p-4"
            />

            <button
              onClick={copy}
              className="mt-4 w-full rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Copy Caption
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
