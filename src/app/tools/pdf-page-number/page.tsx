"use client";

import { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export default function PDFPageNumberPage() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState("bottom-center");

  const addPageNumbers = async () => {
    if (!file) return setMessage("Please select a PDF file.");
    try {
      setProcessing(true); setMessage("");
      const pdf = await PDFDocument.load(await file.arrayBuffer());
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const pages = pdf.getPages();
      pages.forEach((page, index) => {
        const { width, height } = page.getSize();
        const label = `${index + 1} / ${pages.length}`;
        const size = 10;
        const textWidth = font.widthOfTextAtSize(label, size);
        const margin = 24;
        let x = (width - textWidth) / 2;
        let y = margin;
        if (position === "bottom-left") x = margin;
        if (position === "bottom-right") x = width - textWidth - margin;
        if (position === "top-center") y = height - margin - size;
        if (position === "top-left") { x = margin; y = height - margin - size; }
        if (position === "top-right") { x = width - textWidth - margin; y = height - margin - size; }
        page.drawText(label, { x, y, size, font, color: rgb(0.35,0.35,0.4) });
      });
      const output = await pdf.save();
      const url = URL.createObjectURL(new Blob([output as BlobPart], {type:"application/pdf"}));
      const link=document.createElement("a"); link.href=url; link.download="kaamkitpro-numbered.pdf";
      document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
      setMessage("Page numbers added successfully.");
    } catch (error) { console.error(error); setMessage("Could not process this PDF. Please make sure it is valid."); }
    finally { setProcessing(false); }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <a href="/tools/pdf" className="text-sm font-medium text-blue-600 hover:underline">← Browse all PDF tools</a>
        <div className="mt-4 rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 text-center"><h1 className="text-3xl font-bold text-slate-900">PDF Page Number Tool</h1><p className="mt-3 text-slate-600">Add page numbers to every page of a PDF directly in your browser.</p></div>
          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <input id="pdf-file" type="file" accept=".pdf,application/pdf" className="hidden" onChange={(e)=>{setFile(e.target.files?.[0]||null);setMessage("");e.target.value="";}}/>
            <label htmlFor="pdf-file" className="inline-block cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Select PDF</label>
            <p className="mt-3 text-sm text-slate-500">Choose one PDF file.</p>
          </div>
          {file && <div className="mt-6 rounded-xl border border-slate-200 p-5">
            <p className="font-medium text-slate-900">{file.name}</p>
            <div className="mt-5"><label htmlFor="position" className="text-sm font-medium text-slate-700">Position</label>
              <select id="position" value={position} onChange={(e)=>setPosition(e.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900">
                <option value="bottom-center">Bottom center</option><option value="bottom-left">Bottom left</option><option value="bottom-right">Bottom right</option><option value="top-center">Top center</option><option value="top-left">Top left</option><option value="top-right">Top right</option>
              </select>
            </div>
            <button type="button" onClick={addPageNumbers} disabled={processing} className="mt-5 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50">{processing ? "Adding page numbers..." : "Add Numbers & Download"}</button>
          </div>}
          {message && <div className="mt-6 rounded-lg bg-slate-100 p-4 text-center text-sm text-slate-700">{message}</div>}
          <p className="mt-8 text-center text-xs text-slate-500">Your PDF is processed directly in your browser.</p>
        </div>
      </div>
    </main>
  );
}