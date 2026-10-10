"use client";

import { useState } from "react";

type Rotation = 0 | 90 | 180 | 270;

export default function ImageRotatePage() {
  const [file, setFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState<Rotation>(90);
  const [message, setMessage] = useState("");

  const rotateImage = () => {
    if (!file) {
      setMessage("Please select an image.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      const swap = rotation === 90 || rotation === 270;
      const canvas = document.createElement("canvas");
      canvas.width = swap ? image.height : image.width;
      canvas.height = swap ? image.width : image.height;

      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(imageUrl);
        setMessage("Your browser does not support image processing.");
        return;
      }

      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate((rotation * Math.PI) / 180);
      context.drawImage(image, -image.width / 2, -image.height / 2);

      canvas.toBlob((blob) => {
        URL.revokeObjectURL(imageUrl);

        if (!blob) {
          setMessage("Could not rotate the image.");
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "kaamkitpro-rotated.jpg";
        link.click();
        URL.revokeObjectURL(url);

        setMessage("Image rotated successfully.");
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
            <h1 className="text-3xl font-bold text-slate-900">Image Rotate Tool</h1>
            <p className="mt-3 text-slate-600">
              Rotate JPG, PNG and other browser-supported images online.
            </p>
          </div>

          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <input
              id="rotate-file"
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
              htmlFor="rotate-file"
              className="inline-block cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Select Image
            </label>
            {file && <p className="mt-3 text-sm text-slate-600">{file.name}</p>}
          </div>

          {file && (
            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Rotation
              </label>
              <select
                value={rotation}
                onChange={(event) => setRotation(Number(event.target.value) as Rotation)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              >
                <option value={90}>90° clockwise</option>
                <option value={180}>180°</option>
                <option value={270}>270° clockwise</option>
              </select>

              <button
                type="button"
                onClick={rotateImage}
                className="mt-5 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Rotate & Download
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
