"use client";
import Link from "next/link";

import { useState } from "react";

type Format = "image/jpeg" | "image/png" | "image/webp";

export default function ImageConverterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<Format>("image/jpeg");
  const [message, setMessage] = useState("");

  const convertImage = () => {
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

      if (format === "image/jpeg") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      context.drawImage(image, 0, 0);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(imageUrl);

          if (!blob) {
            setMessage("Could not convert the image.");
            return;
          }

          const extension =
            format === "image/png"
              ? "png"
              : format === "image/webp"
                ? "webp"
                : "jpg";

          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");

          link.href = url;
          link.download = `kaamkitpro-converted.${extension}`;
          link.click();

          URL.revokeObjectURL(url);
          setMessage(`Image converted to ${extension.toUpperCase()} successfully.`);
        },
        format,
        0.92
      );
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
        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              Image Converter
            </h1>

            <p className="mt-3 text-slate-600">
              Convert images between JPG, PNG and WebP formats online.
            </p>
          </div>

          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <input
              id="convert-file"
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
              htmlFor="convert-file"
              className="inline-block cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Select Image
            </label>

            {file && (
              <p className="mt-3 text-sm text-slate-600">{file.name}</p>
            )}
          </div>

          {file && (
            <div className="mt-6 rounded-xl border border-slate-200 p-5">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Convert to
              </label>

              <select
                value={format}
                onChange={(event) =>
                  setFormat(event.target.value as Format)
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WebP</option>
              </select>

              <button
                type="button"
                onClick={convertImage}
                className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Convert Image
              </button>
            </div>
          )}

          {message && (
            <div className="mt-6 rounded-lg bg-slate-100 p-4 text-center text-sm text-slate-700">
              {message}
            </div>
          )}

          <div className="mt-10 rounded-xl bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Supported formats
            </h2>

            <p className="mt-3 text-sm text-slate-600">
              Convert common browser-supported images to JPG, PNG or WebP.
              Transparent images converted to JPG will use a white background.
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Your image is processed directly in your browser.
          </p>
        </div>
      </div>
          <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/tools/image"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Browse all Image tools
        </Link>
      </div>

    </main>
  );
}
