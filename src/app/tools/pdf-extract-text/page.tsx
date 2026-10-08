"use client";

import { useEffect, useState } from "react";

export default function PDFExtractTextPage() {
  const [file,setFile]=useState<File|null>(null),[text,setText]=useState(""),[processing,setProcessing]=useState(false),[message,setMessage]=useState("");
  const [pdfjs,setPdfjs]=useState<any>(null);

  useEffect(() => {
    let mounted = true;
    import("pdfjs-dist").then((module) => {
      if (!mounted) return;
      module.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${module.version}/pdf.worker.min.mjs`;
      setPdfjs(module);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const extract=async()=>{if(!file)return setMessage("Please select a PDF file.");if(!pdfjs)return setMessage("PDF extractor is still loading. Please try again.");try{setProcessing(true);setMessage("");const pdf=await pdfjs.getDocument({data:new Uint8Array(await file.arrayBuffer())}).promise;let result="";for(let i=1;i<=pdf.numPages;i++){const page=await pdf.getPage(i);const content=await page.getTextContent();const lines=content.items.map(item=>"str" in item?item.str:"").filter(Boolean);result+=`Page ${i}\n${lines.join(" ")}\n\n`;}setText(result.trim());setMessage(`Text extracted from ${pdf.numPages} page(s).`);}catch(e){console.error(e);setMessage("Could not extract text from this PDF.");}finally{setProcessing(false);}};
  const copy=async()=>{if(!text)return;await navigator.clipboard.writeText(text);setMessage("Extracted text copied.");};
  return <main className="min-h-screen bg-slate-50 px-4 py-10"><div className="mx-auto max-w-4xl"><a href="/tools/pdf" className="text-sm font-medium text-blue-600 hover:underline">← Browse all PDF tools</a><div className="mt-4 rounded-2xl bg-white p-6 shadow-sm md:p-8"><div className="mb-8 text-center"><h1 className="text-3xl font-bold text-slate-900">PDF Text Extractor</h1><p className="mt-3 text-slate-600">Extract selectable text from PDF files directly in your browser.</p></div><div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center"><input id="pdf-file" type="file" accept=".pdf,application/pdf" className="hidden" onChange={e=>{setFile(e.target.files?.[0]||null);setText("");setMessage("");e.target.value="";}}/><label htmlFor="pdf-file" className="inline-block cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Select PDF</label>{file&&<p className="mt-3 text-sm text-slate-600">{file.name}</p>}</div><button type="button" onClick={extract} disabled={!file||processing} className="mt-5 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50">{processing?"Extracting text...":"Extract Text"}</button>{message&&<div className="mt-5 rounded-lg bg-slate-100 p-4 text-center text-sm text-slate-700">{message}</div>}{text&&<><textarea value={text} onChange={e=>setText(e.target.value)} className="mt-6 min-h-80 w-full rounded-xl border border-slate-300 bg-white p-4 text-sm leading-6 text-slate-900" aria-label="Extracted PDF text"/><button type="button" onClick={copy} className="mt-4 w-full rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-50">Copy Extracted Text</button></>}</div></div></main>