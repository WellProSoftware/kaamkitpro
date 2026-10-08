"use client";

import { useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";

export default function PDFRotatePage() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState(90);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const rotatePDF = async () => {
    if (!file) {
      setMessage("Please select a PDF file.");
      return;
    }
    try {
      setProcessing(true);
      setMessage("");
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      pdf.getPages().forEach((page) => {
        page.setRotation(degrees((page.getRotation().angle + angle) % 360));
      });
      const output = await pdf.save();
      const blob = new Blob([output as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "kaamkitpro-rotated.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setMessage(`PDF rotated ${angle}° successfully.`);
    } catch (error) {
      console.error(error);
      setMessage("Could not rotate the PDF. Please make sure the file is valid.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <a href="/tools/pdf" className="text-sm font-medium text-blue-600 hover:underline">
          ← Browse all PDF tools
        </a>
        <div className="mt-4 rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">PDF Rotate Tool</h1>
            <p className="mt-3 text-slate-600">
              Rotate every page in a PDF by 90°, 180° or 270° directly in your browser.
            </p>
          </div>

          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <input id="pdf-file" type="file" accept=".pdf,application/pdf" className="hidden"
              onChange={(event) => {
                const selected = event.target.files?.[0] || null;
                setFile(selected);
                setMessage("");
                event.target.value = "";
              }} />
            <label htmlFor="pdf-file" className="inline-block cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
              Select PDF
            </label>
            <p className="mt-3 text-sm text-slate-500">Choose one PDF file.</p>
          </div>

          {file && (
            <div className="mt-6 rounded-xl border border-slate-200 p-5">
              <p className="font-medium text-slate-900">{file.name}</p>
              <p className="mt-1 text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              <div className="mt-5">
                <label htmlFor="angle" className="text-sm font-medium text-slate-700">Rotation</label>
                <select id="angle" value={angle} onChange={(event) => setAngle(Number(event.target.value))}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900">
                  <option value={90}>90° clockwise</option>
                  <option value={180}>180°</option>
                  <option value={270}>270° clockwise</option>
                </select>
              </div>
              <button type="button" onClick={rotatePDF} disabled={processing}
                className="mt-5 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
                {processing ? "Rotating PDF..." : "Rotate & Download PDF"}
              </button>
            </div>
          )}

          {message && <div className="mt-6 rounded-lg bg-slate-100 p-4 text-center text-sm text-slate-700">{message}</div>}

          <div className="mt-10 rounded-xl bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-slate-900">How to rotate a PDF</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600">
              <li>Select your PDF file.</li><li>Choose the required rotation angle.</li><li>Click Rotate & Download PDF.</li>
            </ol>
          </div>
          <p className="mt-6 text-center text-xs text-slate-500">Your PDF is processed directly in your browser.</p>
        </div>
      </div>
    </main>
  );
}
