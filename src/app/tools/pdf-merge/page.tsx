"use client";
import { trackDownload, trackToolUsed } from "@/lib/analytics";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function PDFMergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [merging, setMerging] = useState(false);
  const [message, setMessage] = useState("");

  const addFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const pdfs = Array.from(fileList).filter(
      (file) =>
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf")
    );

    setFiles((current) => [...current, ...pdfs]);
    setMessage("");
  };

  const removeFile = (index: number) => {
    setFiles((current) => current.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: "up" | "down") => {
    setFiles((current) => {
      const updated = [...current];
      const target = direction === "up" ? index - 1 : index + 1;

      if (target < 0 || target >= updated.length) return current;

      [updated[index], updated[target]] = [
        updated[target],
        updated[index],
      ];

      return updated;
    });
  };

  const mergePDFs = async () => {
    trackToolUsed("PDF Merge");
    if (files.length < 2) {
      setMessage("Please select at least 2 PDF files.");
      return;
    }

    try {
      setMerging(true);
      setMessage("");

      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);

        const pages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );

        pages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();

      const blob = new Blob([mergedBytes as BlobPart], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "kaamkitpro-merged.pdf";
      trackDownload("PDF Merge", "pdf");

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);

      setMessage("PDFs merged successfully.");
    } catch (error) {
      console.error(error);
      setMessage(
        "Could not merge the PDFs. Please make sure the files are valid PDF documents."
      );
    } finally {
      setMerging(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              PDF Merge Tool
            </h1>

            <p className="mt-3 text-slate-600">
              Merge multiple PDF files into one PDF online for free.
            </p>
          </div>

          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <input
              id="pdf-upload"
              type="file"
              accept=".pdf,application/pdf"
              multiple
              className="hidden"
              onChange={(event) => {
                addFiles(event.target.files);
                event.target.value = "";
              }}
            />

            <label
              htmlFor="pdf-upload"
              className="inline-block cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Select PDF Files
            </label>

            <p className="mt-3 text-sm text-slate-500">
              Select two or more PDF files.
            </p>
          </div>

          {files.length > 0 && (
            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">
                  Selected PDFs
                </h2>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                  {files.length} files
                </span>
              </div>

              <div className="space-y-3">
                {files.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-900">
                        {index + 1}. {file.name}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => moveFile(index, "up")}
                        disabled={index === 0}
                        className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40"
                      >
                        ↑
                      </button>

                      <button
                        type="button"
                        onClick={() => moveFile(index, "down")}
                        disabled={index === files.length - 1}
                        className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40"
                      >
                        ↓
                      </button>

                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={mergePDFs}
                  disabled={merging || files.length < 2}
                  className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {merging ? "Merging..." : "Merge PDFs"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFiles([]);
                    setMessage("");
                  }}
                  className="rounded-lg border px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="mt-6 rounded-lg bg-slate-100 p-4 text-center text-sm text-slate-700">
              {message}
            </div>
          )}

          <div className="mt-10 rounded-xl bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-slate-900">
              How to merge PDFs
            </h2>

            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600">
              <li>Select two or more PDF files.</li>
              <li>Arrange them using the up and down buttons.</li>
              <li>Click Merge PDFs.</li>
              <li>Your merged PDF downloads automatically.</li>
            </ol>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Files are processed in your browser and are not uploaded to
            KaamKitPro servers.
          </p>
        </div>
      </div>
    </main>
  );
}
