"use client";

import { useState } from "react";

export default function ImageGrayscalePage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const convertToGrayscale = () => {
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

      for (let index = 0; index < pixels.length; index += 4) {
        const gray = Math.round(
          pixels[index] * 0.299 +
          pixels[index + 1] * 0.587 +
          pixels[index + 2] * 0.114
        );
        pixels[index] = gray;
        pixels[index + 1] = gray;
        pixels[index + 2] = gray;
      }

      context.putImageData(imageData, 0, 0);

      canvas.toBlob((blob) => {
        URL.revokeObjectURL(imageUrl);

        if (!blob) {
          setMessage("Could not create the grayscale image.");
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "kaamkitpro-grayscale.jpg";
        link.click();
        URL.revokeObjectURL(url);

        setMessage("Grayscale image created successfully.");
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
            <h1 className="text-3xl font-bold text-slate-900">Image Grayscale Tool</h1>
            <p className="mt-3 text-slate-600">
              Convert a color image to grayscale online directly in your browser.
            </p>
          </div>

          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <input
              id="grayscale-file"
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
              htmlFor="grayscale-file"
              className="inline-block cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Select Image
            </label>
            {file && <p className="mt-3 text-sm text-slate-600">{file.name}</p>}
          </div>

          <button
            type="button"
            onClick={convertToGrayscale}
            disabled={!file}
            className="mt-5 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Convert to Grayscale
          </button>

          {message && (
            <div className="mt-5 rounded-lg bg-slate-100 p-4 text-center text-sm text-slate-700">
              {message}
            </div>
          )}

          <p className="mt-8 text-center text-xs text-slate-500">
            Your image is processed locally in your browser.
          </p>
        </div>
      </div>
    </main>
  );
}
