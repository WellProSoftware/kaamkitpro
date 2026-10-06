"use client";

import { useState } from "react";

export default function UUIDGeneratorPage() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);

  const generateUUIDs = () => {
    const generated: string[] = [];

    for (let i = 0; i < count; i++) {
      generated.push(crypto.randomUUID());
    }

    setUuids(generated);
  };

  const copyUUID = async (uuid: string) => {
    try {
      await navigator.clipboard.writeText(uuid);
    } catch {
      // Clipboard may be unavailable in some browsers.
    }
  };

  const copyAll = async () => {
    if (uuids.length === 0) return;

    try {
      await navigator.clipboard.writeText(uuids.join("\n"));
    } catch {
      // Clipboard may be unavailable in some browsers.
    }
  };

  const clearAll = () => {
    setUuids([]);
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
            UUID Generator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Generate unique random UUIDs instantly for development,
            databases, APIs and applications.
          </p>
        </div>

        {/* Tool */}
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          {/* Settings */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="w-full sm:max-w-xs">
              <label
                htmlFor="uuid-count"
                className="mb-3 block text-sm font-semibold text-slate-900"
              >
                Number of UUIDs
              </label>

              <select
                id="uuid-count"
                value={count}
                onChange={(event) => setCount(Number(event.target.value))}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value={1}>1 UUID</option>
                <option value={5}>5 UUIDs</option>
                <option value={10}>10 UUIDs</option>
                <option value={20}>20 UUIDs</option>
                <option value={50}>50 UUIDs</option>
                <option value={100}>100 UUIDs</option>
              </select>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={generateUUIDs}
                className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Generate UUIDs
              </button>

              <button
                type="button"
                onClick={copyAll}
                disabled={uuids.length === 0}
                className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400"
              >
                Copy All
              </button>

              <button
                type="button"
                onClick={clearAll}
                disabled={uuids.length === 0}
                className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">
                Generated UUIDs
              </h2>

              <span className="text-sm text-slate-500">
                {uuids.length} generated
              </span>
            </div>

            {uuids.length > 0 ? (
              <div className="space-y-3">
                {uuids.map((uuid) => (
                  <div
                    key={uuid}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <code className="break-all font-mono text-sm text-slate-800">
                      {uuid}
                    </code>

                    <button
                      type="button"
                      onClick={() => copyUUID(uuid)}
                      className="shrink-0 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-blue-600 ring-1 ring-slate-200 hover:bg-blue-50"
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
                <div className="text-4xl">🔑</div>

                <h3 className="mt-4 text-lg font-bold">
                  No UUIDs generated yet
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Select the number of UUIDs and click Generate UUIDs.
                </p>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-sm leading-6 text-slate-600">
              UUIDs are generated directly in your browser using the
              browser&apos;s cryptographically secure random UUID generator.
            </p>
          </div>
        </div>

        {/* Example */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold">
            UUID Example
          </h2>

          <div className="mt-4 rounded-2xl bg-slate-950 p-5">
            <code className="break-all font-mono text-sm text-emerald-300">
              550e8400-e29b-41d4-a716-446655440000
            </code>
          </div>
        </section>

        {/* How to Use */}
        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-bold">
            How to use UUID Generator
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>
              Select karo ki kitne UUIDs generate karne hain.
            </li>

            <li>
              <strong>Generate UUIDs</strong> button par click karo.
            </li>

            <li>
              Individual UUID ke saamne <strong>Copy</strong> se copy karo.
            </li>

            <li>
              Sabhi UUIDs ek saath copy karne ke liye{" "}
              <strong>Copy All</strong> use karo.
            </li>
          </ol>
        </section>

        {/* SEO Content */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            Free Online UUID Generator
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            KaamKitPro UUID Generator ek free online developer tool hai
            jisse aap random UUIDs quickly generate kar sakte ho. UUIDs
            applications, databases, APIs, testing aur software
            development mein commonly use hote hain.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            Aap ek saath multiple UUIDs generate karke unhe individually
            ya ek saath copy kar sakte ho.
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
    </main>
  );
}