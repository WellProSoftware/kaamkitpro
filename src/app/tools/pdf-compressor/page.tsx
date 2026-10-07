"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function PDFCompressorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<{
    original: number;
    compressed: number;
    saved: number;
  } | null>(null);

  const compressPDF = async () => {
    if (!file) {
      setMessage("Please select a PDF file.");
      return;
    }

    try {
      setCompressing(true);
      setMessage("");
      setResult(null);

      const bytes = await file.arrayBuffer();

      const pdf = await PDFDocument.load(bytes, {
        updateMetadata: false,
      });

      pdf.setTitle("");
      pdf.setAuthor("");
      pdf.setSubject("");
      pdf.setKeywords([]);
      pdf.setProducer("KaamKitPro");
      pdf.setCreator("KaamKitPro");

      const compressedBytes = await pdf.save({
        useObjectStreams: true,
        addDefaultPage: false,
        updateFieldAppearances: false,
      });

      const originalSize = file.size;
      const compressedSize = compressedBytes.length;
      const savedBytes = originalSize - compressedSize;
      const savedPercentage =
        originalSize > 0
          ? Math.max(0, (savedBytes / originalSize) * 100)
          : 0;

      const blob = new Blob([compressedBytes as BlobPart], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "kaamkitpro-compressed.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);

      setResult({
        original: originalSize,
        compressed: compressedSize,
        saved: savedPercentage,
      });

      if (compressedSize < originalSize) {
        setMessage("PDF compressed successfully.");
      } else {
        setMessage(
          "The PDF was already optimized, so the file size could not be reduced further without reducing image quality."
        );
      }
    } catch (error) {
      console.error(error);
      setMessage(
        "Could not compress this PDF. Please make sure it is a valid PDF file."
      );
    } finally {
      setCompressing(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              PDF Compressor
            </h1>

            <p className="mt-3 text-slate-600">
              Reduce PDF file size online for free with browser-based
              optimization.
            </p>
          </div>

          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <input
              id="pdf-compress"
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={(event) => {
                setFile(event.target.files?.[0] || null);
                setMessage("");
                setResult(null);
                event.target.value = "";
              }}
            />

            <label
              htmlFor="pdf-compress"
              className="inline-block cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Select PDF
            </label>

            <p className="mt-3 text-sm text-slate-500">
              Select one PDF file to optimize.
            </p>
          </div>

          {file && (
            <div className="mt-6 rounded-xl border border-slate-200 p-5">
              <p className="font-medium text-slate-900">{file.name}</p>

              <p className="mt-1 text-sm text-slate-500">
                Original size: {formatSize(file.size)}
              </p>

              <button
                type="button"
                onClick={compressPDF}
                disabled={compressing}
                className="mt-5 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {compressing ? "Compressing..." : "Compress PDF"}
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
                <p className="text-sm text-slate-500">New Size</p>
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
              How to compress a PDF
            </h2>

            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600">
              <li>Select your PDF file.</li>
              <li>Click Compress PDF.</li>
              <li>The optimized PDF downloads automatically.</li>
              <li>Compare the original and new file sizes.</li>
            </ol>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Your PDF is processed directly in your browser and is not uploaded
            to KaamKitPro servers.
          </p>
        </div>
      </div>
    </main>
  );
}
