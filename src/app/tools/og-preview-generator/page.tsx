"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

function escapeMetaAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\u0027/g, "&#39;");
}

export default function OgPreviewGeneratorPage() {
  const [title, setTitle] = useState("Your Page Title");
  const [description, setDescription] = useState(
    "Your page description will appear here."
  );
  const [url, setUrl] = useState("https://example.com");
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState(false);

  const metaTags = `<meta property="og:title" content="${escapeMetaAttribute(title)}" />
<meta property="og:description" content="${escapeMetaAttribute(description)}" />
<meta property="og:url" content="${escapeMetaAttribute(url)}" />
<meta property="og:type" content="website" />${
    image
      ? `\n<meta property="og:image" content="${escapeMetaAttribute(image)}" />`
      : ""
  }`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            OG Preview Generator
          </h1>
          <p className="mt-3 text-slate-600">
            Preview how your page may look when shared on social platforms.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Page title"
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Page description"
              rows={5}
              className="w-full rounded-lg border border-slate-300 p-4"
            />

            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />

            <input
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
                setImageError(false);
              }}
              placeholder="Image URL (optional)"
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-slate-500">
              Social Preview
            </p>

            <div className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
              {image && !imageError ? (
                <div className="relative h-48 w-full">
                  <Image
                    src={image}
                    alt="Open Graph preview"
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : (
                <div className="flex h-48 items-center justify-center bg-slate-200 text-slate-500">
                  {imageError ? "Unable to load image" : "Image preview"}
                </div>
              )}

              <div className="p-5">
                <p className="text-xs text-slate-500">{url}</p>

                <h2 className="mt-2 line-clamp-2 text-xl font-bold text-slate-900">
                  {title}
                </h2>

                <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl bg-slate-50 p-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Open Graph tags
          </h2>

          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-sm text-slate-700">
            {metaTags}
          </pre>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/tools/social"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Browse all Social tools
        </Link>
      </div>
    </main>
  );
}
