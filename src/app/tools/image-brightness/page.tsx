"use client";

import { useState } from "react";

export default function ImageBrightnessPage() {
  const [file, setFile] = useState<File | null>(null);
  const [brightness, setBrightness] = useState(110);
  const [message, setMessage] = useState("");

  const adjustBrightness = () => {
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

      context.drawImage(image, 0, 0);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      const factor = brightness / 100;

      for (let index = 0; index < pixels.length; index += 4) {
        pixels[index] = Math.min(255, Math.max(0, pixels[index] * factor));
        pixels[index + 1] = Math.min(255, Math.max(0, pixels[index + 1] * factor));
        pixels[index + 2] = Math.min(255, Math.max(0, pixels[index + 2] * factor));
      }

      context.putImageData(imageData, 0, 0);

      canvas.toBlob((blob) => {
        URL.revokeObjectURL(imageUrl);

        if (!blob) {
          setMessage("Could not adjust image brightness.");
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "kaamkitpro-brightness.jpg";
        link.click();
        URL.revokeObjectURL(url);
        setMessage("Brightness adjusted successfully.");
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
            <h1 className="text-3xl font-bold text-slate-900">Image Brightness Tool</h1>
            <p className="mt-3 text-slate-600">
              Make an image brighter or darker directly in your browser.
            </p>
          </div>

          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <input
              id="brightness-file"
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
              htmlFor="brightness-file"
              className="inline-block cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Select Image
            </label>
            {file && <p className="mt-3 text-sm text-slate-600">{file.name}</p>}
          </div>

          {file && (
            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Brightness: {brightness}%
              </label>
              <input
                type="range"
                min="50"
                max="160"
                value={brightness}
                onChange={(event) => setBrightness(Number(event.target.value))}
                className="w-full"
              />
              <button
                type="button"
                onClick={adjustBrightness}
                className="mt-5 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Adjust & Download
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
