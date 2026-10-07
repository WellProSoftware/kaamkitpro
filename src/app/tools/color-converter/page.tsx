"use client";

import { useState } from "react";

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "").trim();

  if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
    return null;
  }

  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((value) => Math.max(0, Math.min(255, value)).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

export default function ColorConverterPage() {
  const [hex, setHex] = useState("#2563EB");
  const [rgb, setRgb] = useState("rgb(37, 99, 235)");
  const [message, setMessage] = useState("");

  const convertHex = () => {
    const value = hexToRgb(hex);

    if (!value) {
      setMessage("Enter a valid 6-digit HEX color.");
      return;
    }

    setRgb(`rgb(${value.r}, ${value.g}, ${value.b})`);
    setMessage("");
  };

  const convertRgb = () => {
    const match = rgb.match(
      /^\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/i
    );

    if (!match) {
      setMessage("Use RGB format like rgb(37, 99, 235).");
      return;
    }

    const r = Number(match[1]);
    const g = Number(match[2]);
    const b = Number(match[3]);

    if ([r, g, b].some((value) => value > 255)) {
      setMessage("RGB values must be between 0 and 255.");
      return;
    }

    setHex(rgbToHex(r, g, b));
    setMessage("");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Color Converter
          </h1>
          <p className="mt-3 text-slate-600">
            Convert colors between HEX and RGB formats.
          </p>
        </div>

        <div
          className="mb-6 h-32 rounded-xl border border-slate-200"
          style={{
            backgroundColor: hexToRgb(hex)
              ? hex
              : "#e2e8f0",
          }}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              HEX
            </label>

            <input
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              placeholder="#2563EB"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 font-mono"
            />

            <button
              onClick={convertHex}
              className="mt-3 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              HEX → RGB
            </button>
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              RGB
            </label>

            <input
              value={rgb}
              onChange={(e) => setRgb(e.target.value)}
              placeholder="rgb(37, 99, 235)"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 font-mono"
            />

            <button
              onClick={convertRgb}
              className="mt-3 w-full rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
            >
              RGB → HEX
            </button>
          </div>
        </div>

        {message && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 text-center text-sm text-red-700">
            {message}
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">HEX Value</p>
            <p className="mt-1 font-mono font-bold text-slate-900">{hex}</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">RGB Value</p>
            <p className="mt-1 font-mono font-bold text-slate-900">{rgb}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
