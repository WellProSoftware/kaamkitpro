"use client";

import { useState } from "react";

type FlipMode = "horizontal" | "vertical";

export default function ImageFlipPage() {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<FlipMode>("horizontal");
  const [message, setMessage] = useState("");

  const flipImage = () => {
    if (!file) {
      setMessage("Please select an image.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(imageUrl);
        setMessage("Your browser does not support image processing.");
        return;
      }

      if (mode === "horizontal") {
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
      } else {
        context.translate(0, canvas.height);
        context.scale(1, -1);
      }

      context.drawImage(image, 0, 0);

      canvas.toBlob((blob) => {
        URL.revokeObjectURL(imageUrl);

        if (!blob) {
          setMessage("Could not flip the image.");
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "kaamkitpro-flipped.jpg";
        link.click();
        URL.revokeObjectURL(url);
        setMessage("Image flipped successfully.");
      }, "image/jpeg", 0.92);
    };

    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      setMessage("Could not read this image.");
    };

    image.src = imageUrl;
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <a href="/tools/image" className="text-sm font-medium text-blue-600 hover:underline">
          ← Browse all Image tools
        </a>
        <div className="mt-4 rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">Image Flip Tool</h1>
            <p className="mt-3 text-slate-600">
              Flip images horizontally or vertically online in your browser.
            </p>
          </div>

          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <input
              id="flip-file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                setFile(event.target.files?.[0] || null);
                setMessage("");
                event.target.value = "";
              }}
            />
            <label
              htmlFor="flip-file"
              className="inline-block cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Select Image
            </label>
            {file && <p className="mt-3 text-sm text-slate-600">{file.name}</p>}
          </div>

          {file && (
            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-slate-700">Flip direction</label>
              <select
                value={mode}
                onChange={(event) => setMode(event.target.value as FlipMode)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              >
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
              </select>
              <button
                type="button"
                onClick={flipImage}
                className="mt-5 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Flip & Download
              </button>
            </div>
          )}

          {message && (
            <div className="mt-5 rounded-lg bg-slate-100 p-4 text-center text-sm text-slate-700">
              {message}
            </div>
          )}

          <p className="mt-8 text-center text-xs text-slate-500">
            Image processing happens directly in your browser.
          </p>
        </div>
      </div>
    </main>
  );
}
