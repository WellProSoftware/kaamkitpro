"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function PDFSplitPage() {
  const [file, setFile] = useState<File | null>(null);
  const [splitting, setSplitting] = useState(false);
  const [message, setMessage] = useState("");

  const splitPDF = async () => {
    if (!file) {
      setMessage("Please select a PDF file.");
      return;
    }

    try {
      setSplitting(true);
      setMessage("");

      const bytes = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(bytes);
      const pageCount = sourcePdf.getPageCount();

      for (let i = 0; i < pageCount; i++) {
        const newPdf = await PDFDocument.create();

        const [page] = await newPdf.copyPages(sourcePdf, [i]);
        newPdf.addPage(page);

        const pdfBytes = await newPdf.save();

        const blob = new Blob([pdfBytes as BlobPart], {
          type: "application/pdf",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `page-${i + 1}.pdf`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);

        await new Promise((resolve) => setTimeout(resolve, 150));
      }

      setMessage(
        `${pageCount} page${pageCount !== 1 ? "s" : ""} split successfully.`
      );
    } catch (error) {
      console.error(error);
      setMessage(
        "Could not split the PDF. Please make sure the file is a valid PDF."
      );
    } finally {
      setSplitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              PDF Split Tool
            </h1>

            <p className="mt-3 text-slate-600">
              Split a PDF into separate PDF files, one page at a time.
            </p>
          </div>

          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <input
              id="pdf-file"
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={(event) => {
                const selected = event.target.files?.[0] || null;
                setFile(selected);
                setMessage("");
                event.target.value = "";
              }}
            />

            <label
              htmlFor="pdf-file"
              className="inline-block cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Select PDF
            </label>

            <p className="mt-3 text-sm text-slate-500">
              Select one PDF file to split.
            </p>
          </div>

          {file && (
            <div className="mt-6 rounded-xl border border-slate-200 p-5">
              <p className="font-medium text-slate-900">{file.name}</p>

              <p className="mt-1 text-sm text-slate-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>

              <button
                type="button"
                onClick={splitPDF}
                disabled={splitting}
                className="mt-5 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {splitting ? "Splitting PDF..." : "Split PDF"}
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
              How to split a PDF
            </h2>

            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600">
              <li>Select a PDF file.</li>
              <li>Click Split PDF.</li>
              <li>Each page will be downloaded as a separate PDF.</li>
            </ol>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Your PDF is processed directly in your browser.
          </p>
        </div>
      </div>
    </main>
  );
}
