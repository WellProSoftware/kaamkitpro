"use client";
import Link from "next/link";

import { useState } from "react";

export default function ImageResizerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [keepRatio, setKeepRatio] = useState(true);
  const [message, setMessage] = useState("");

  const resizeImage = async () => {
    if (!file) {
      setMessage("Please select an image.");
      return;
    }

    const targetWidth = Number(width);
    const targetHeight = Number(height);

    if (!targetWidth || targetWidth < 1) {
      setMessage("Please enter a valid width.");
      return;
    }

    if (!targetHeight || targetHeight < 1) {
      setMessage("Please enter a valid height.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const context = canvas.getContext("2d");

      if (!context) {
        URL.revokeObjectURL(imageUrl);
        setMessage("Your browser does not support image processing.");
        return;
      }

      context.drawImage(image, 0, 0, targetWidth, targetHeight);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(imageUrl);

          if (!blob) {
            setMessage("Could not resize the image.");
            return;
          }

          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");

          link.href = url;
          link.download = "kaamkitpro-resized.jpg";
          link.click();

          URL.revokeObjectURL(url);
          setMessage("Image resized successfully.");
        },
        "image/jpeg",
        0.92
      );
    };

    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      setMessage("Could not read this image.");
    };

    image.src = imageUrl;
  };

  const handleFile = (selectedFile: File | null) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setMessage("");

    const url = URL.createObjectURL(selectedFile);
    const image = new Image();

    image.onload = () => {
      setWidth(String(image.width));
      setHeight(String(image.height));
      URL.revokeObjectURL(url);
    };

    image.src = url;
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              Image Resizer
            </h1>

            <p className="mt-3 text-slate-600">
              Resize images online by setting your desired width and height.
            </p>
          </div>

          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <input
              id="resize-file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                handleFile(event.target.files?.[0] || null);
                event.target.value = "";
              }}
            />

            <label
              htmlFor="resize-file"
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
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Width (px)
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={width}
                    onChange={(event) => {
                      const value = event.target.value;
                      setWidth(value);

                      if (keepRatio) {
                        const oldWidth = Number(width);
                        const oldHeight = Number(height);

                        if (oldWidth > 0 && oldHeight > 0 && Number(value)) {
                          setHeight(
                            String(
                              Math.max(
                                1,
                                Math.round(
                                  (Number(value) * oldHeight) / oldWidth
                                )
                              )
                            )
                          );
                        }
                      }
                    }}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Height (px)
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={height}
                    onChange={(event) => setHeight(event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <label className="mt-4 flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={keepRatio}
                  onChange={(event) => setKeepRatio(event.target.checked)}
                />
                Keep aspect ratio
              </label>

              <button
                type="button"
                onClick={resizeImage}
                className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Resize Image
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
              How to resize an image
            </h2>

            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600">
              <li>Select an image.</li>
              <li>Enter the required width and height.</li>
              <li>Keep aspect ratio enabled if required.</li>
              <li>Click Resize Image.</li>
              <li>The resized JPG downloads automatically.</li>
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
