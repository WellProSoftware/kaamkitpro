"use client";
import { trackDownload, trackToolUsed } from "@/lib/analytics";
import Link from "next/link";

import { useState } from "react";

export default function ImageCompressorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [compressing, setCompressing] = useState(false);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<{
    original: number;
    compressed: number;
    saved: number;
  } | null>(null);

  const compressImage = async () => {
    trackToolUsed("Image Compressor");
    if (!file) {
      setMessage("Please select an image.");
      return;
    }

    try {
      setCompressing(true);
      setMessage("");
      setResult(null);

      const imageUrl = URL.createObjectURL(file);
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          URL.revokeObjectURL(imageUrl);
          setMessage("Your browser does not support image processing.");
          setCompressing(false);
          return;
        }

        canvas.width = image.width;
        canvas.height = image.height;

        context.drawImage(image, 0, 0);

        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(imageUrl);

            if (!blob) {
              setMessage("Could not compress the image.");
              setCompressing(false);
              return;
            }

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = "kaamkitpro-compressed.jpg";
            trackDownload("Image Compressor", "jpg");

            document.body.appendChild(link);
            link.click();
            link.remove();

            URL.revokeObjectURL(url);

            const saved =
              file.size > 0
                ? Math.max(0, ((file.size - blob.size) / file.size) * 100)
                : 0;

            setResult({
              original: file.size,
              compressed: blob.size,
              saved,
            });

            setMessage("Image compressed successfully.");
            setCompressing(false);
          },
          "image/jpeg",
          quality
        );
      };

      image.onerror = () => {
        URL.revokeObjectURL(imageUrl);
        setMessage("Could not read this image.");
        setCompressing(false);
      };

      image.src = imageUrl;
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while compressing the image.");
      setCompressing(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              Image Compressor
            </h1>

            <p className="mt-3 text-slate-600">
              Compress JPG, PNG and WebP images online for free.
            </p>
          </div>

          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <input
              id="image-file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                setFile(event.target.files?.[0] || null);
                setMessage("");
                setResult(null);
                event.target.value = "";
              }}
            />

            <label
              htmlFor="image-file"
              className="inline-block cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Select Image
            </label>

            <p className="mt-3 text-sm text-slate-500">
              JPG, PNG, WebP and other common image formats.
            </p>
          </div>

          {file && (
            <div className="mt-6 rounded-xl border border-slate-200 p-5">
              <p className="font-medium text-slate-900">{file.name}</p>

              <p className="mt-1 text-sm text-slate-500">
                Original size: {formatSize(file.size)}
              </p>

              <div className="mt-6">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    Quality
                  </span>

                  <span className="text-slate-500">
                    {Math.round(quality * 100)}%
                  </span>
                </div>

                <input
                  type="range"
                  min="0.2"
                  max="1"
                  step="0.05"
                  value={quality}
                  onChange={(event) =>
                    setQuality(Number(event.target.value))
                  }
                  className="w-full"
                />
              </div>

              <button
                type="button"
                onClick={compressImage}
                disabled={compressing}
                className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {compressing ? "Compressing..." : "Compress Image"}
              </button>
            </div>
          )}

          {message && (
            <div className="mt-6 rounded-lg bg-slate-100 p-4 text-center text-sm text-slate-700">
              {message}
            </div>
          )}

          {result && (
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-4 text-center">
                <p className="text-sm text-slate-500">Original</p>
                <p className="mt-1 font-bold text-slate-900">
                  {formatSize(result.original)}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 text-center">
                <p className="text-sm text-slate-500">Compressed</p>
                <p className="mt-1 font-bold text-slate-900">
                  {formatSize(result.compressed)}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 text-center">
                <p className="text-sm text-slate-500">Saved</p>
                <p className="mt-1 font-bold text-green-600">
                  {result.saved.toFixed(1)}%
                </p>
              </div>
            </div>
          )}

          <div className="mt-10 rounded-xl bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-slate-900">
              How to compress an image
            </h2>

            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600">
              <li>Select an image.</li>
              <li>Choose the quality level.</li>
              <li>Click Compress Image.</li>
              <li>The compressed JPG downloads automatically.</li>
            </ol>
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
