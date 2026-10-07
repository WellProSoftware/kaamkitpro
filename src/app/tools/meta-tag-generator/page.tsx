"use client";

import { useState } from "react";

export default function MetaTagGeneratorPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const output = `<title>${title}</title>
<meta name="description" content="${description}" />
<meta name="keywords" content="${keywords}" />
<link rel="canonical" href="${url}" />

<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${url}" />
<meta property="og:type" content="website" />

<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />`;

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Meta Tag Generator
          </h1>
          <p className="mt-3 text-slate-600">
            Generate SEO-friendly HTML meta tags for your website.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
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
              placeholder="Meta description"
              rows={4}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />

            <input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Keywords, separated by commas"
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />

            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/page"
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <textarea
              value={output}
              readOnly
              rows={18}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 p-4 font-mono text-sm"
            />

            <button
              onClick={copy}
              className="mt-4 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              {copied ? "Copied!" : "Copy Meta Tags"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
