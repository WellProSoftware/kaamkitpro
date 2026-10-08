"use client";
import Link from "next/link";

import { useState } from "react";

export default function ImageCropperPage() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [x, setX] = useState("0");
  const [y, setY] = useState("0");
  const [cropWidth, setCropWidth] = useState("");
  const [cropHeight, setCropHeight] = useState("");
  const [message, setMessage] = useState("");

  const handleFile = (selectedFile: File | null) => {
    if (!selectedFile) return;

    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    const url = URL.createObjectURL(selectedFile);
    const image = new Image();

    image.onload = () => {
      setFile(selectedFile);
      setImageUrl(url);
      setImageSize({
        width: image.width,
        height: image.height,
      });
      setX("0");
      setY("0");
      setCropWidth(String(image.width));
      setCropHeight(String(image.height));
      setMessage("");
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      setMessage("Could not read this image.");
    };

    image.src = url;
  };

  const cropImage = () => {
    if (!file || !imageUrl) {
      setMessage("Please select an image.");
      return;
    }

    const cropX = Number(x);
    const cropY = Number(y);
    const width = Number(cropWidth);
    const height = Number(cropHeight);

    if (
      cropX < 0 ||
      cropY < 0 ||
      width <= 0 ||
      height <= 0 ||
      cropX + width > imageSize.width ||
      cropY + height > imageSize.height
    ) {
      setMessage("Crop area is outside the image boundaries.");
      return;
    }

    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");

      if (!context) {
        setMessage("Your browser does not support image processing.");
        return;
      }

      context.drawImage(
        image,
        cropX,
        cropY,
        width,
        height,
        0,
        0,
        width,
        height
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setMessage("Could not crop the image.");
            return;
          }

          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");

          link.href = url;
          link.download = "kaamkitpro-cropped.jpg";
          link.click();

          URL.revokeObjectURL(url);
          setMessage("Image cropped successfully.");
        },
        "image/jpeg",
        0.92
      );
    };

    image.onerror = () => {
      setMessage("Could not process the image.");
    };

    image.src = imageUrl;
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              Image Cropper
            </h1>

            <p className="mt-3 text-slate-600">
              Crop an image by entering the exact area you want to keep.
            </p>
          </div>

          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <input
              id="crop-file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                handleFile(event.target.files?.[0] || null);
                event.target.value = "";
              }}
            />

            <label
              htmlFor="crop-file"
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
              <div className="mb-5 rounded-lg bg-slate-50 p-4 text-center text-sm text-slate-600">
                Original size: {imageSize.width} × {imageSize.height}px
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    X position
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={x}
                    onChange={(event) => setX(event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Y position
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={y}
                    onChange={(event) => setY(event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Crop width
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={cropWidth}
                    onChange={(event) => setCropWidth(event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Crop height
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={cropHeight}
                    onChange={(event) => setCropHeight(event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={cropImage}
                className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Crop Image
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
              How to crop an image
            </h2>

            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600">
              <li>Select an image.</li>
              <li>Enter the X and Y starting position.</li>
              <li>Enter the crop width and height.</li>
              <li>Click Crop Image.</li>
              <li>The cropped JPG downloads automatically.</li>
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
