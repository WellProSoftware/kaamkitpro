"use client";
import Link from "next/link";

import { useState } from "react";

async function digestText(text: string, algorithm: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export default function HashGeneratorPage() {
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] = useState("SHA-256");
  const [hash, setHash] = useState("");

  const generate = async () => {
    if (!input) {
      setHash("");
      return;
    }

    const result = await digestText(input, algorithm);
    setHash(result);
  };

  const copy = async () => {
    if (!hash) return;
    await navigator.clipboard.writeText(hash);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Hash Generator
          </h1>
          <p className="mt-3 text-slate-600">
            Generate SHA-256, SHA-384 and SHA-512 hashes from text.
          </p>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text..."
          rows={7}
          className="w-full rounded-lg border border-slate-300 p-4"
        />

        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-3"
        >
          <option value="SHA-256">SHA-256</option>
          <option value="SHA-384">SHA-384</option>
          <option value="SHA-512">SHA-512</option>
        </select>

        <button
          onClick={generate}
          className="mt-4 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Generate Hash
        </button>

        {hash && (
          <div className="mt-6 rounded-xl border border-slate-200 p-5">
            <p className="mb-2 text-sm font-medium text-slate-500">
              {algorithm} Hash
            </p>

            <div className="break-all rounded-lg bg-slate-50 p-4 font-mono text-sm text-slate-900">
              {hash}
            </div>

            <button
              onClick={copy}
              className="mt-4 w-full rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Copy Hash
            </button>
          </div>
        )}
      </div>
          <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/tools/developer"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Browse all Developer tools
        </Link>
      </div>

    </main>
  );
}
