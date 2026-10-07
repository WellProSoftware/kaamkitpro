"use client";

import { useState } from "react";

export default function UrlEncoderDecoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [message, setMessage] = useState("");

  const process = () => {
    try {
      setOutput(
        mode === "encode"
          ? encodeURIComponent(input)
          : decodeURIComponent(input)
      );
      setMessage("");
    } catch {
      setOutput("");
      setMessage("Invalid URL encoded text.");
    }
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            URL Encoder & Decoder
          </h1>
          <p className="mt-3 text-slate-600">
            Encode or decode URL text safely in your browser.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => setMode("encode")}
            className={`rounded-lg px-6 py-3 font-semibold ${
              mode === "encode"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            URL Encode
          </button>

          <button
            onClick={() => setMode("decode")}
            className={`rounded-lg px-6 py-3 font-semibold ${
              mode === "decode"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            URL Decode
          </button>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text or encoded URL..."
          rows={8}
          className="mt-5 w-full rounded-lg border border-slate-300 p-4 font-mono text-sm"
        />

        <button
          onClick={process}
          className="mt-4 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          {mode === "encode" ? "Encode URL" : "Decode URL"}
        </button>

        {message && (
          <div className="mt-5 rounded-lg bg-red-50 p-4 text-center text-sm text-red-700">
            {message}
          </div>
        )}

        {output && (
          <div className="mt-6">
            <textarea
              value={output}
              readOnly
              rows={8}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 p-4 font-mono text-sm"
            />

            <button
              onClick={copy}
              className="mt-4 w-full rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Copy Result
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
