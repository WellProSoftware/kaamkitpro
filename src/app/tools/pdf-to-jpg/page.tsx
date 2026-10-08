"use client";

import { useEffect, useRef, useState } from "react";
import type * as PDFJS from "pdfjs-dist";

export default function PDFToJPGPage() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [message, setMessage] = useState("");
  const workerRef = useRef<typeof PDFJS | null>(null);

  useEffect(() => {
    let mounted = true;

    import("pdfjs-dist").then((pdfjs) => {
      if (!mounted) return;

      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

      workerRef.current = pdfjs;
    });

    return () => {
      mounted = false;
    };
  }, []);

  const convertPDF = async () => {
    if (!file) {
      setMessage("Please select a PDF file.");
      return;
    }

    if (!workerRef.current) {
      setMessage("PDF converter is still loading. Please try again.");
      return;
    }

    try {
      setConverting(true);
      setMessage("");

      const pdfjs = workerRef.current;
      const bytes = new Uint8Array(await file.arrayBuffer());

      const pdf = await pdfjs.getDocument({
        data: bytes,
      }).promise;

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);

        const viewport = page.getViewport({
          scale: 2,
        });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error("Canvas is not supported.");
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob(resolve, "image/jpeg", 0.92);
        });

        if (!blob) {
          throw new Error("Could not create JPG image.");
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `page-${pageNumber}.jpg`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);

        canvas.width = 1;
        canvas.height = 1;

        await new Promise((resolve) => setTimeout(resolve, 150));
      }

      setMessage(
        `${pdf.numPages} page${pdf.numPages !== 1 ? "s" : ""} converted successfully.`
      );
    } catch (error) {
      console.error(error);
      setMessage(
        "Could not convert this PDF. Please make sure it is a valid PDF file."
      );
    } finally {
      setConverting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              PDF to JPG Converter
            </h1>

            <p className="mt-3 text-slate-600">
              Convert every page of a PDF into a JPG image online for free.
            </p>
          </div>

          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <input
              id="pdf-file"
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={(event) => {
                setFile(event.target.files?.[0] || null);
                setMessage("");
                event.target.value = "";
              }}
            />

            <label
              htmlFor="pdf-file"
              className="inline-block cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Select PDF
            </label>

            <p className="mt-3 text-sm text-slate-500">
              Select one PDF file.
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
                onClick={convertPDF}
                disabled={converting}
                className="mt-5 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {converting ? "Converting..." : "Convert to JPG"}
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
              How to convert PDF to JPG
            </h2>

            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600">
              <li>Select your PDF.</li>
              <li>Click Convert to JPG.</li>
              <li>Each PDF page downloads as a separate JPG image.</li>
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
