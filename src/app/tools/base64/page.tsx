"use client";

import { useState } from "react";

export default function Base64Page() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const encodeBase64 = () => {
    setError("");
    setResult("");

    if (!text) {
      setError("Please enter some text first.");
      return;
    }

    try {
      const bytes = new TextEncoder().encode(text);

      let binary = "";

      bytes.forEach((byte) => {
        binary += String.fromCharCode(byte);
      });

      const encoded = btoa(binary);

      setResult(encoded);
    } catch {
      setError("Unable to encode the text.");
    }
  };

  const decodeBase64 = () => {
    setError("");
    setResult("");

    if (!text.trim()) {
      setError("Please enter Base64 text first.");
      return;
    }

    try {
      const binary = atob(text.trim());

      const bytes = Uint8Array.from(binary, (char) =>
        char.charCodeAt(0)
      );

      const decoded = new TextDecoder().decode(bytes);

      setResult(decoded);
    } catch {
      setError("Invalid Base64 input.");
    }
  };

  const copyResult = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
    } catch {
      // Clipboard may be unavailable in some browsers.
    }
  };

  const clearAll = () => {
    setText("");
    setResult("");
    setError("");
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
            Base64 Encoder & Decoder
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Encode text to Base64 or decode Base64 back to readable text
            instantly.
          </p>
        </div>

        {/* Tool */}
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold">
                Input
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter normal text or Base64 encoded text.
              </p>
            </div>

            <button
              type="button"
              onClick={clearAll}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Clear
            </button>
          </div>

          <textarea
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              setError("");
            }}
            placeholder="Enter text here..."
            rows={12}
            className="w-full resize-y rounded-2xl border border-slate-300 px-5 py-4 font-mono text-sm leading-7 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          {/* Buttons */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={encodeBase64}
              className="rounded-2xl bg-blue-600 px-5 py-4 font-semibold text-white hover:bg-blue-700"
            >
              Encode to Base64
            </button>

            <button
              type="button"
              onClick={decodeBase64}
              className="rounded-2xl bg-slate-800 px-5 py-4 font-semibold text-white hover:bg-slate-900"
            >
              Decode from Base64
            </button>
          </div>

          {/* Result */}
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">
                  Result
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your encoded or decoded result will appear here.
                </p>
              </div>

              <button
                type="button"
                onClick={copyResult}
                disabled={!result}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400"
              >
                Copy
              </button>
            </div>

            <div className="min-h-40 whitespace-pre-wrap break-words rounded-2xl bg-slate-950 p-5 font-mono text-sm leading-7 text-emerald-300">
              {result || (
                <span className="text-slate-500">
                  Result will appear here.
                </span>
              )}
            </div>

            {error && (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Example */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold">
            Base64 Example
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">
                Normal Text
              </p>

              <p className="mt-3 break-all font-mono text-sm">
                Hello KaamKitPro
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">
                Base64
              </p>

              <p className="mt-3 break-all font-mono text-sm">
                SGVsbG8gS2FhbUtpdFBybw==
              </p>
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-bold">
            How to use Base64 Encoder & Decoder
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>
              Normal text ko Base64 mein convert karne ke liye
              <strong> Encode to Base64</strong> click karo.
            </li>

            <li>
              Base64 string ko normal text mein convert karne ke liye
              <strong> Decode from Base64</strong> click karo.
            </li>

            <li>
              Result ko <strong>Copy</strong> button se copy kar sakte ho.
            </li>
          </ol>
        </section>

        {/* SEO Content */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            Free Online Base64 Encoder & Decoder
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            KaamKitPro Base64 Encoder & Decoder ek free online developer
            tool hai jisse aap text ko Base64 format mein encode aur
            Base64 data ko decode kar sakte ho.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            Ye tool developers, programmers aur web professionals ke liye
            useful hai jo APIs, data transfer, web development aur
            debugging ke saath kaam karte hain.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            Processing browser mein hoti hai, isliye normal text conversion
            ke liye data ko kisi server par upload karne ki zarurat nahi
            hai.
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