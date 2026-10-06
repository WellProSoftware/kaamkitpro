"use client";

import { useState } from "react";

export default function TimestampConverterPage() {
  const [timestamp, setTimestamp] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [error, setError] = useState("");

  const timestampToDate = () => {
    setError("");

    if (!timestamp.trim()) {
      setError("Please enter a Unix timestamp.");
      return;
    }

    const numericTimestamp = Number(timestamp.trim());

    if (!Number.isFinite(numericTimestamp)) {
      setError("Please enter a valid numeric timestamp.");
      return;
    }

    const milliseconds =
      Math.abs(numericTimestamp) < 100000000000
        ? numericTimestamp * 1000
        : numericTimestamp;

    const date = new Date(milliseconds);

    if (Number.isNaN(date.getTime())) {
      setError("Invalid timestamp.");
      return;
    }

    setDateTime(date.toLocaleString());
  };

  const dateToTimestamp = () => {
    setError("");

    if (!dateTime) {
      setError("Please select a date and time.");
      return;
    }

    const date = new Date(dateTime);

    if (Number.isNaN(date.getTime())) {
      setError("Invalid date and time.");
      return;
    }

    setTimestamp(Math.floor(date.getTime() / 1000).toString());
  };

  const useCurrentTimestamp = () => {
    setError("");
    setTimestamp(Math.floor(Date.now() / 1000).toString());
    setDateTime(new Date().toLocaleString());
  };

  const clearAll = () => {
    setTimestamp("");
    setDateTime("");
    setError("");
  };

  const copyTimestamp = async () => {
    if (!timestamp) return;

    try {
      await navigator.clipboard.writeText(timestamp);
    } catch {
      // Clipboard may be unavailable in some browsers.
    }
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
            Timestamp Converter
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Convert Unix timestamps to dates and dates to Unix timestamps
            instantly.
          </p>
        </div>

        {/* Tool */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Timestamp to Date */}
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-xl font-bold">
              Unix Timestamp → Date
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Enter a Unix timestamp in seconds or milliseconds.
            </p>

            <label
              htmlFor="timestamp"
              className="mt-6 block text-sm font-semibold"
            >
              Unix Timestamp
            </label>

            <input
              id="timestamp"
              type="text"
              value={timestamp}
              onChange={(event) => {
                setTimestamp(event.target.value);
                setError("");
              }}
              placeholder="e.g. 1735689600"
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 font-mono outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={timestampToDate}
              className="mt-4 w-full rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Convert to Date
            </button>

            <div className="mt-5 rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">
                Converted Date
              </p>

              <p className="mt-2 break-words font-semibold text-slate-900">
                {dateTime || "Result will appear here"}
              </p>
            </div>
          </div>

          {/* Date to Timestamp */}
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-xl font-bold">
              Date → Unix Timestamp
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Select a date and time to convert it into a Unix timestamp.
            </p>

            <label
              htmlFor="date-time"
              className="mt-6 block text-sm font-semibold"
            >
              Date & Time
            </label>

            <input
              id="date-time"
              type="datetime-local"
              onChange={(event) => {
                setDateTime(event.target.value);
                setError("");
              }}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={dateToTimestamp}
              className="mt-4 w-full rounded-2xl bg-slate-800 px-5 py-3 font-semibold text-white hover:bg-slate-900"
            >
              Convert to Timestamp
            </button>

            <div className="mt-5 rounded-2xl bg-blue-50 p-5">
              <p className="text-sm font-medium text-slate-500">
                Unix Timestamp
              </p>

              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="break-all font-mono font-semibold text-blue-600">
                  {timestamp || "Result will appear here"}
                </p>

                <button
                  type="button"
                  onClick={copyTimestamp}
                  disabled={!timestamp}
                  className="shrink-0 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-blue-600 ring-1 ring-slate-200 hover:bg-blue-50 disabled:cursor-not-allowed disabled:text-slate-400"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Current Timestamp */}
        <section className="mt-8 rounded-3xl bg-slate-900 p-6 text-white sm:p-8">
          <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">
                Quick Utility
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Get Current Unix Timestamp
              </h2>

              <p className="mt-2 text-sm text-slate-300">
                Generate the current Unix timestamp instantly.
              </p>
            </div>

            <button
              type="button"
              onClick={useCurrentTimestamp}
              className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Use Current Time
            </button>
          </div>
        </section>

        {/* Error */}
        {error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* How to Use */}
        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-bold">
            How to use Timestamp Converter
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>
              Unix timestamp ko first box mein enter karo.
            </li>

            <li>
              <strong>Convert to Date</strong> se timestamp ko readable
              date mein convert karo.
            </li>

            <li>
              Date & time select karke{" "}
              <strong>Convert to Timestamp</strong> click karo.
            </li>

            <li>
              Current timestamp ke liye <strong>Use Current Time</strong>
              button use karo.
            </li>
          </ol>
        </section>

        {/* SEO Content */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            Free Online Unix Timestamp Converter
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            KaamKitPro Timestamp Converter ek free online developer tool
            hai jisse aap Unix timestamps ko readable dates mein aur dates
            ko Unix timestamps mein convert kar sakte ho.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            Ye tool developers ke liye APIs, databases, logs, debugging
            aur application development mein useful hai.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            Tool browser mein directly calculation karta hai, isliye
            normal timestamp conversion ke liye kisi software installation
            ki zarurat nahi hai.
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