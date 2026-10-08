"use client";
import Link from "next/link";

import { useState } from "react";

export default function SitemapGeneratorPage() {
  const [urls, setUrls] = useState("");
  const [sitemap, setSitemap] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const list = urls
      .split(/\r?\n/)
      .map((url) => url.trim())
      .filter(Boolean);

    if (list.length === 0) {
      setSitemap("");
      return;
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${list
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
  </url>`
  )
  .join("\n")}
</urlset>`;

    setSitemap(xml);
  };

  const copy = async () => {
    if (!sitemap) return;
    await navigator.clipboard.writeText(sitemap);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const download = () => {
    if (!sitemap) return;

    const blob = new Blob([sitemap], {
      type: "application/xml",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "sitemap.xml";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            XML Sitemap Generator
          </h1>
          <p className="mt-3 text-slate-600">
            Generate a basic XML sitemap from your website URLs.
          </p>
        </div>

        <textarea
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          placeholder={`Enter one URL per line
https://example.com/
https://example.com/about
https://example.com/contact`}
          rows={9}
          className="w-full rounded-lg border border-slate-300 p-4 font-mono text-sm"
        />

        <button
          onClick={generate}
          className="mt-4 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Generate Sitemap
        </button>

        {sitemap && (
          <div className="mt-6">
            <textarea
              value={sitemap}
              readOnly
              rows={15}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 p-4 font-mono text-sm"
            />

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                onClick={copy}
                className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800"
              >
                {copied ? "Copied!" : "Copy Sitemap"}
              </button>

              <button
                onClick={download}
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Download sitemap.xml
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 rounded-xl bg-slate-50 p-5">
          <h2 className="text-lg font-semibold text-slate-900">
            How to use
          </h2>

          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600">
            <li>Enter your website URLs, one per line.</li>
            <li>Click Generate Sitemap.</li>
            <li>Copy or download the generated XML.</li>
            <li>Upload it as sitemap.xml on your website.</li>
          </ol>
        </div>
      </div>
          <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/tools/seo"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Browse all SEO tools
        </Link>
      </div>

    </main>
  );
}
