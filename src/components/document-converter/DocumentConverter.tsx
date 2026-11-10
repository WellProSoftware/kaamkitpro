/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";

type Mode = "pdf-excel" | "pdf-word" | "jpg-excel" | "jpg-word";
type PdfModule = typeof import("pdfjs-dist");
declare global {
  interface Window {
    XLSX?: { utils: { book_new: () => any; aoa_to_sheet: (rows: any[][]) => any; book_append_sheet: (book: any, sheet: any, name: string) => void }; writeFile: (book: any, name: string) => void };
    Tesseract?: { recognize: (image: File, language: string, options?: any) => Promise<any> };
  }
}
const getXlsx = () => window.XLSX;
const getTesseract = () => window.Tesseract;
const titles: Record<Mode,string> = {
  "pdf-excel":"PDF to Excel", "pdf-word":"PDF to Word",
  "jpg-excel":"JPG to Excel", "jpg-word":"JPG to Word"
};
function loadScript(src:string, test:()=>boolean) {
  return new Promise<void>((resolve,reject)=>{
    if(test()){resolve();return;}
    const existing=document.querySelector('script[data-converter="'+src+'"]') as HTMLScriptElement|null;
    const script=existing||document.createElement("script");
    script.src=src;script.async=true;script.dataset.converter=src;
    script.onload=()=>test()?resolve():reject(new Error("Required conversion library did not initialise."));
    script.onerror=()=>reject(new Error("Could not load a conversion library. Check your internet connection and retry."));
    if(!existing)document.head.appendChild(script);
  });
}
function downloadBlob(blob:Blob,name:string){
  const url=URL.createObjectURL(blob),a=document.createElement("a");
  a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();
  window.setTimeout(()=>URL.revokeObjectURL(url),2000);
}
function safeHtml(value:string){return value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
function makeWord(text:string){
  const paragraphs=text.split(/\n+/).map(line=>"<p>"+safeHtml(line)+"</p>").join("");
  const html='<!doctype html><html><head><meta charset="utf-8"><title>Converted Document</title><style>body{font-family:Arial,sans-serif;line-height:1.5}p{margin:0 0 10pt}</style></head><body>'+paragraphs+'</body></html>';
  downloadBlob(new Blob(["\ufeff",html],{type:"application/msword;charset=utf-8"}),"KaamKitPro_Converted.doc");
}
function rowsFromText(text:string){
  return text.split(/\r?\n/).map(line=>line.trim()).filter(Boolean).map(line=>{
    const tabs=line.split(/\t+|\s{2,}/).map(x=>x.trim()).filter(Boolean);
    return tabs.length>1?tabs:[line];
  });
}
export default function DocumentConverter({mode}:{mode:Mode}){
  const [file,setFile]=useState<File|null>(null),[busy,setBusy]=useState(false),[message,setMessage]=useState(""),[preview,setPreview]=useState<string[]>([]);
  const isPdf=mode.startsWith("pdf"),isExcel=mode.endsWith("excel"),title=titles[mode];
  async function exportExcel(rows:string[][]){
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",()=>Boolean(getXlsx()));
    const xlsx=getXlsx();
    if(!xlsx)throw new Error("Excel export library is unavailable.");
    const wb=xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb,xlsx.utils.aoa_to_sheet(rows.length?rows:[["No text detected"]]),"Converted Data");
    xlsx.writeFile(wb,"KaamKitPro_Converted.xlsx");
  }
  async function convert(){
    if(!file){setMessage("Please select a file first.");return;}
    setBusy(true);setMessage("");setPreview([]);
    try{
      let text="";
      if(isPdf){
        const pdfjs:PdfModule=await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/"+pdfjs.version+"/pdf.worker.min.mjs";
        const pdf=await pdfjs.getDocument({data:new Uint8Array(await file.arrayBuffer())}).promise;
        const pageRows:string[][]=[];
        for(let p=1;p<=pdf.numPages;p++){
          const page=await pdf.getPage(p),content=await page.getTextContent();
          const items=content.items.filter((item:any)=>"str" in item && typeof item.str==="string" && item.str.trim()).map((item:any)=>({text:item.str,x:item.transform?.[4]??0,y:item.transform?.[5]??0}));
          const lines:{y:number;items:{text:string;x:number}[]}[]=[];
          for(const item of items){
            let line=lines.find(x=>Math.abs(x.y-item.y)<3);
            if(!line){line={y:item.y,items:[]};lines.push(line);}
            line.items.push({text:item.text,x:item.x});
          }
          lines.sort((a,b)=>b.y-a.y);
          pageRows.push(["Page "+p]);
          for(const line of lines){
            line.items.sort((a,b)=>a.x-b.x);
            const cells:string[]=[];
            let previousX:number|undefined;
            for(const item of line.items){
              if(previousX!==undefined && item.x-previousX<18) cells[cells.length-1]=cells[cells.length-1]+" "+item.text;
              else cells.push(item.text);
              previousX=item.x;
            }
            pageRows.push(cells.length?cells:[line.items.map(x=>x.text).join(" ")]);
          }
          pageRows.push([]);
        }
        const hasSelectableText=pageRows.some(row=>row.some(cell=>cell.trim()&&!/^Page \d+$/.test(cell)));
        if(!hasSelectableText){
          setMessage("No selectable text was found. This may be a scanned PDF; OCR is not included in this PDF converter. No output file was created.");
          return;
        }
        text=pageRows.map(r=>r.join("\t")).join("\n");
        if(isExcel){
          const rows=pageRows.filter(r=>r.length&&r.some(Boolean));
          setPreview(rows.slice(0,8).map(r=>r.join(" | ")));
          await exportExcel(rows);
          setMessage("Excel workbook created from selectable PDF text. Review the columns because complex PDF layouts may need manual adjustment.");
        }else{
          const body=pageRows.map(r=>r.join("    ")).join("\n");
          makeWord(body);
          setPreview(body.split("\n").filter(Boolean).slice(0,8));
          setMessage("Editable Word-compatible document downloaded. Text positioning and complex formatting may differ from the original PDF.");
        }
        if(!text.trim())setMessage("No selectable text was found. This may be a scanned PDF; OCR is not included in this PDF converter.");
      }else{
        await loadScript("https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js",()=>Boolean(getTesseract()));
        const tesseract=getTesseract();
        if(!tesseract)throw new Error("OCR engine is unavailable.");
        setMessage("Reading image text with OCR. This may take a little time…");
        const result=await tesseract.recognize(file,"eng",{logger:(event:any)=>{if(event.status==="recognizing text")setMessage("Recognizing text: "+Math.round((event.progress||0)*100)+"%");}});
        text=String(result.data.text||"").trim();
        if(!text)throw new Error("No readable text was detected. Try a clearer, higher-resolution image.");
        if(isExcel){
          const rows=rowsFromText(text);
          setPreview(rows.slice(0,8).map(r=>r.join(" | ")));
          await exportExcel(rows);
          setMessage("Excel workbook created from OCR text. Check the rows and columns before using the data.");
        }else{
          makeWord(text);setPreview(text.split("\n").filter(Boolean).slice(0,8));
          setMessage("Editable Word-compatible document downloaded from OCR text. Please proofread recognition results.");
        }
      }
    }catch(error){
      setMessage(error instanceof Error?error.message:"Conversion failed. Please try another file.");
    }finally{setBusy(false);}
  }
  return <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900"><div className="mx-auto max-w-4xl"><Link href="/tools" className="text-sm font-medium text-blue-600 hover:underline">← All tools</Link><section className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Document Conversion</p><h1 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h1><p className="mt-3 leading-7 text-slate-600">{isPdf?(isExcel?"Extract selectable PDF text into an Excel workbook, with line-based rows and best-effort column grouping.":"Convert selectable PDF text into an editable Word-compatible document."):(isExcel?"Use OCR to read text from JPG images and export the result to Excel.":"Use OCR to read text from JPG images and create an editable Word-compatible document.")}</p><div className="mt-7 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-7 text-center"><input id="converter-file" type="file" accept={isPdf?".pdf,application/pdf":".jpg,.jpeg,image/jpeg"} className="block w-full text-sm" onChange={e=>{setFile(e.target.files?.[0]||null);setMessage("");setPreview([]);}}/><p className="mt-3 text-sm text-slate-500">{isPdf?"Select a PDF file.":"Select a JPG or JPEG image."} Files are processed in your browser.</p></div>{file&&<div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm"><strong>{file.name}</strong><span className="ml-2 text-slate-500">{(file.size/1024/1024).toFixed(2)} MB</span></div>}<button type="button" disabled={!file||busy} onClick={()=>void convert()} className="mt-5 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50">{busy?"Converting…":isExcel?"Convert to Excel":"Convert to Word"}</button>{message&&<p role="status" className="mt-4 rounded-lg bg-slate-100 p-4 text-sm text-slate-700">{message}</p>}{preview.length>0&&<div className="mt-5 rounded-lg border p-4"><h2 className="font-semibold">Text preview</h2><div className="mt-2 space-y-1 overflow-hidden text-sm text-slate-600">{preview.map((line,i)=><p key={i} className="truncate">{line}</p>)}</div><p className="mt-3 text-xs text-slate-500">Preview only. Open the downloaded file and verify all content.</p></div>}<div className="mt-7 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900"><strong>Accuracy note:</strong> {mode==="pdf-excel"?"PDF tables do not always contain true spreadsheet columns. This tool groups positioned text heuristically; verify the workbook. Scanned PDFs need OCR and are not supported here.":mode==="pdf-word"?"This creates an editable Word-compatible .doc file from selectable text, not a pixel-perfect reconstruction. Scanned PDFs need OCR and are not supported here.": "OCR quality depends on image resolution, orientation, language and print clarity. Current OCR language is English; review names, numbers and table columns before relying on the output."}</div></section></div></main>;
}
