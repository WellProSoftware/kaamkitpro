"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import FileImportDropzone from "@/components/FileImportDropzone";

type MasterItem = { no: string; id: string; name: string; category: string; subCategory: string; unit: string; manufacturer: string; generic: string };
type Match = { score: number; item: MasterItem };
type Result = { input: string; status: "MATCH" | "CHECK" | "NEW ITEM"; matches: Match[]; duplicateOf?: number };
type Xlsx = { read: (data: ArrayBuffer, options: { type: string }) => { SheetNames: string[]; Sheets: Record<string, unknown> }; utils: { sheet_to_json: (sheet: unknown, options: Record<string, unknown>) => unknown[][]; book_new: () => unknown; aoa_to_sheet: (rows: unknown[][]) => unknown; book_append_sheet: (book: unknown, sheet: unknown, name: string) => void }; writeFile: (book: unknown, filename: string) => void };
const getXlsx = () => (window as Window & { XLSX?: Xlsx }).XLSX;
let xlsxPromise: Promise<Xlsx> | null = null;
function ensureXlsx(): Promise<Xlsx> {
 const current = getXlsx();
 if (current) return Promise.resolve(current);
 if (xlsxPromise) return xlsxPromise;
 xlsxPromise = new Promise<Xlsx>((resolve, reject) => {
  const script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
  script.async = true;
  script.onload = () => {
   const loaded = getXlsx();
   if (loaded) resolve(loaded);
   else reject(new Error("Excel support could not initialise. Check your connection and retry."));
  };
  script.onerror = () => reject(new Error("Excel support could not load. Check your connection and retry."));
  document.head.appendChild(script);
 }).catch(error => { xlsxPromise = null; throw error; });
 return xlsxPromise;
}

const norm = (v: unknown) => String(v ?? "").toUpperCase().replace(/&/g, " AND ").replace(/\*/g, " X ").replace(/(?<=\d)(?=[A-Z])|(?<=[A-Z])(?=\d)/g, " ").replace(/[^A-Z0-9. ]+/g, " ").replace(/\s+/g, " ").trim();
const tokens = (v: string): Set<string> => new Set<string>(norm(v).split(" ").filter(Boolean));
const grams = (v: string) => { const s = ` ${norm(v)} `, out = new Set<string>(); for (let n=3;n<=4;n++) for(let i=0;i+n<=s.length;i++) out.add(s.slice(i,i+n)); return out; };
const dice = (a: Set<string>, b: Set<string>) => a.size+b.size ? 2*[...a].filter(x=>b.has(x)).length/(a.size+b.size) : 0;
function score(q: string, name: string) { if(norm(q)===norm(name)) return 1; const a=norm(q),b=norm(name),an:string[]=a.match(/\d+(?:\.\d+)?/g)||[],bn:string[]=b.match(/\d+(?:\.\d+)?/g)||[]; const penalty=an.some(x=>!bn.includes(x))?.18:bn.some(x=>!an.includes(x))?.06:0; return Math.max(0,Math.min(1,.55*dice(tokens(a),tokens(b))+.45*dice(grams(a),grams(b))-penalty)); }
const pct = (n:number) => (n*100).toFixed(1)+"%";

export default function ItemMasterMatcherPage() {
 const [master,setMaster]=useState<MasterItem[]>([]),[masterStatus,setMasterStatus]=useState("No item master loaded"),[single,setSingle]=useState(""),[singleMatches,setSingleMatches]=useState<Match[]>([]),[bulk,setBulk]=useState(""),[results,setResults]=useState<Result[]>([]),[matchLimit,setMatchLimit]=useState("85"),[checkLimit,setCheckLimit]=useState("55"),[busy,setBusy]=useState(false),[error,setError]=useState(""),[xlsxReady,setXlsxReady]=useState(false),[storageKey,setStorageKey]=useState<string | null>(null);
 useEffect(()=>{void ensureXlsx().then(()=>setXlsxReady(true)).catch(e=>setError(e instanceof Error?e.message:"Excel support could not load."));},[]);
 const activeStorageKey = useRef<string | null>(null);
 const guestStorageKey = useRef<string | null>(null);
 useEffect(()=>{
  let disposed=false,checking=false;
  const refreshIdentity=async()=>{
   if(checking||disposed)return;
   checking=true;
   try{
    const response=await fetch("/api/auth/session",{cache:"no-store",credentials:"same-origin"});
    const session=response.ok?await response.json() as {user?:{id?:string}}:null;
    if(disposed)return;
    const nextKey=session?.user?.id?("account:"+session.user.id):(guestStorageKey.current??(guestStorageKey.current="guest:"+crypto.randomUUID()));
    if(activeStorageKey.current!==nextKey){
     activeStorageKey.current=nextKey;
     setMaster([]);setMasterStatus(nextKey.startsWith("account:")?"Loading this account's private item master…":"Temporary guest workspace — data stays in this page only. Sign in to save a private master in this browser.");
     setSingle("");setSingleMatches([]);setBulk("");setResults([]);setBusy(false);setError("");setStorageKey(nextKey);
    }
   }catch{
    if(!disposed){activeStorageKey.current=null;setMaster([]);setSingleMatches([]);setResults([]);setBulk("");setStorageKey(null);setMasterStatus("Session could not be verified. Private item data is hidden until the session can be checked.");setError("Could not verify your private browser workspace. Please retry.");}
   }finally{checking=false;}
  };
  const onVisibility=()=>{if(document.visibilityState==="visible")void refreshIdentity();};
  void refreshIdentity();
  const interval=window.setInterval(()=>void refreshIdentity(),15000);
  window.addEventListener("focus",refreshIdentity);
  window.addEventListener("storage",refreshIdentity);
  window.addEventListener("kaamkitpro:auth-changed",refreshIdentity);
  document.addEventListener("visibilitychange",onVisibility);
  return()=>{disposed=true;window.clearInterval(interval);window.removeEventListener("focus",refreshIdentity);window.removeEventListener("storage",refreshIdentity);window.removeEventListener("kaamkitpro:auth-changed",refreshIdentity);document.removeEventListener("visibilitychange",onVisibility);};
 },[]);
 useEffect(()=>{
  if(!storageKey||storageKey.startsWith("guest:"))return;
  let cancelled=false;
  const req=indexedDB.open("kaamkitpro-item-master",1);
  req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains("data"))req.result.createObjectStore("data");};
  req.onerror=()=>{if(!cancelled)setError("Browser storage is unavailable. Your imported data has not been loaded.");};
  req.onblocked=()=>{if(!cancelled)setError("Browser storage is busy in another tab. Close older KaamKitPro tabs and retry.");};
  req.onsuccess=()=>{
   const db=req.result;
   db.onversionchange=()=>db.close();
   if(cancelled||activeStorageKey.current!==storageKey){db.close();return;}
   const read=db.transaction("data","readonly").objectStore("data").get(storageKey);
   read.onsuccess=()=>{
    if(!cancelled&&activeStorageKey.current===storageKey){
     const saved=read.result as MasterItem[]|undefined;
     if(saved?.length){setMaster(saved);setMasterStatus(saved.length.toLocaleString()+" private items loaded for this account in this browser");}
     else{setMaster([]);setMasterStatus("No private item master saved for this account");}
    }
    db.close();
   };
   read.onerror=()=>{if(!cancelled&&activeStorageKey.current===storageKey)setError("Could not read this account's private item master.");db.close();};
  };
  return()=>{cancelled=true;};
 },[storageKey]);
 const ranked=useMemo(()=> (query:string,count=10):Match[]=>master.map(item=>({item,score:score(query,item.name)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,count),[master]);
 const status=(n:number):Result["status"]=>n>=Number(matchLimit)/100?"MATCH":n>=Number(checkLimit)/100?"CHECK":"NEW ITEM";
 async function readFile(file:File):Promise<unknown[][]>{const data=await file.arrayBuffer();if(/\.csv$/i.test(file.name)){const text=new TextDecoder().decode(data).replace(/^\uFEFF/,"");return text.split(/\r?\n/).filter(x=>x.trim()).map(line=>{const out:string[]=[];let cell="",quoted=false;for(let i=0;i<line.length;i++){const c=line[i]??"";if(c==='"'&&(line[i+1]??"")==='"'&&quoted){cell+='"';i++;}else if(c==='"')quoted=!quoted;else if(c===","&&!quoted){out.push(cell);cell="";}else cell+=c;}out.push(cell);return out;});}const xlsx=await ensureXlsx();const wb=xlsx.read(data,{type:"array"});const sheetName=wb.SheetNames.includes("Item Master")?"Item Master":wb.SheetNames[0];const sheet=sheetName?wb.Sheets[sheetName]:undefined;if(!sheet)throw new Error("The workbook does not contain a readable worksheet.");return xlsx.utils.sheet_to_json(sheet,{header:1,defval:""});}
 async function uploadMaster(file?:File){if(!file)return;if(!storageKey||activeStorageKey.current!==storageKey){setError("Your private workspace is still loading. Please try again.");return;}const targetKey=storageKey;setError("");setMasterStatus("Reading item master locally…");try{const rows=await readFile(file);if(activeStorageKey.current!==targetKey)return;const h=rows.findIndex(row=>row.some(x=>String(x).trim().toLowerCase()==="item name"));if(h<0)throw new Error('Required "Item Name" column was not found.');const heads=rows[h].map(x=>String(x??"").trim().toLowerCase()),col=(s:string)=>heads.indexOf(s),map={no:col("item no"),id:col("item id"),name:col("item name"),category:col("category"),subCategory:col("sub category"),unit:col("unit name"),manufacturer:col("manufacture name"),generic:col("generic name")};const next=rows.slice(h+1).filter(r=>String(r[map.name]??"").trim()).map(r=>Object.fromEntries(Object.entries(map).map(([k,i])=>[k,i<0?"":String(r[i]??"").trim()])) as MasterItem);if(!next.length)throw new Error("No item rows found below the header.");if(activeStorageKey.current!==targetKey)return;if(targetKey.startsWith("account:")){await new Promise<void>((resolve,reject)=>{const req=indexedDB.open("kaamkitpro-item-master",1);req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains("data"))req.result.createObjectStore("data");};req.onerror=()=>reject(new Error("Browser storage could not be opened."));req.onsuccess=()=>{const db=req.result,tx=db.transaction("data","readwrite");tx.objectStore("data").put(next,storageKey);tx.oncomplete=()=>{db.close();resolve();};tx.onerror=()=>{db.close();reject(new Error("The item master could not be saved in this browser."));};};});}if(activeStorageKey.current!==targetKey)return;setMaster(next);setSingleMatches([]);setResults([]);setMasterStatus(targetKey.startsWith("account:")?next.length.toLocaleString()+" private items saved for this account in this browser":next.length.toLocaleString()+" items loaded in this temporary guest session — not saved after leaving this page");}catch(e){setMasterStatus("Master not updated");setError(e instanceof Error?e.message:"Unable to read file.");}}
 async function uploadBulk(file?:File){if(!file)return;const targetKey=activeStorageKey.current;try{const rows=await readFile(file);if(activeStorageKey.current!==targetKey)return;const h=rows.findIndex(row=>row.some(x=>String(x).trim().toLowerCase()==="item name")),col=h<0?0:rows[h].findIndex(x=>String(x).trim().toLowerCase()==="item name"),start=h<0?0:h+1;setBulk(rows.slice(start).map(r=>String(r[col]??"").trim()).filter(Boolean).join("\n"));setError("");}catch(e){setError(e instanceof Error?e.message:"Unable to read file.");}}
 async function runBulk(){const targetKey=activeStorageKey.current;if(!master.length){setError("Upload an item master first.");return;}const names=bulk.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);if(!names.length){setError("Upload a bulk file or paste one item per line.");return;}setBusy(true);setError("");await new Promise(r=>setTimeout(r,0));if(activeStorageKey.current!==targetKey){setBusy(false);return;}const seen=new Map<string,number>();const next=names.map((input,i)=>{const matches=ranked(input,3),st=status(matches[0]?.score??0),key=norm(input),duplicateOf=st==="NEW ITEM"?seen.get(key):undefined;if(st==="NEW ITEM"&&!seen.has(key))seen.set(key,i+1);return{input,matches,status:st,duplicateOf};});setResults(next);setBusy(false);}
 async function exportExcel(){if(!results.length)return;const xlsx=await ensureXlsx();const action={MATCH:"Use existing code",CHECK:"Please verify - may be the same item","NEW ITEM":"Create new item code"};const a:unknown[][]=[["S.No","Input Item Name","Status","Match %","Action","Matched Item No","Matched Item Id","Matched Item Name","Category","Sub Category","Unit","Manufacturer","Generic Name","2nd Best Item Id","2nd Best Item Name","2nd Best %","3rd Best Item Id","3rd Best Item Name","3rd Best %"]],b:unknown[][]=[["S.No","Item Name","Closest Item Id","Closest Item Name","Closest %"]];let n=0;results.forEach((r,i)=>{const m=r.matches[0]?.item,s=r.matches[1],t=r.matches[2];a.push([i+1,r.input,r.status,pct(r.matches[0]?.score??0),action[r.status]+(r.duplicateOf?" [Duplicate of S.No "+r.duplicateOf+"; create only one code]":""),m?.no??"",m?.id??"",m?.name??"",m?.category??"",m?.subCategory??"",m?.unit??"",m?.manufacturer??"",m?.generic??"",s?.item.id??"",s?.item.name??"",s?pct(s.score):"",t?.item.id??"",t?.item.name??"",t?pct(t.score):""]);if(r.status==="NEW ITEM"&&!r.duplicateOf){n++;b.push([n,r.input,m?.id??"",m?.name??"",m?pct(r.matches[0]?.score??0):""]);}});const wb=xlsx.utils.book_new();xlsx.utils.book_append_sheet(wb,xlsx.utils.aoa_to_sheet(a),"Match Result");xlsx.utils.book_append_sheet(wb,xlsx.utils.aoa_to_sheet(b),"New Item Creation");xlsx.writeFile(wb,"KaamKitPro_Item_Match_Result.xlsx");}
 const style=(s:string)=>s==="MATCH"?"bg-emerald-50 text-emerald-800":s==="CHECK"?"bg-amber-50 text-amber-800":"bg-rose-50 text-rose-800";
 return <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900"><div className="mx-auto max-w-7xl"><Link href="/tools" className="text-sm font-medium text-blue-600 hover:underline">← All tools</Link><header className="mt-5 max-w-3xl"><p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Hospital Procurement</p><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Item Mapping</h1><p className="mt-3 leading-7 text-slate-600">Match purchase item descriptions against your hospital item master, review the closest records and prepare new-item creation candidates.</p></header>
 <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-lg font-semibold">1. Item Master</h2><div className="mt-3 flex flex-wrap items-center gap-3"><FileImportDropzone inputLabel="Item master file" title="Upload your private item master" description="Drop an Excel or CSV file here, or browse your device. Your file is read and saved only in this browser." accept=".xlsx,.xls,.csv" onFile={(file)=>void uploadMaster(file)} /><span className="text-sm text-slate-500">{masterStatus}</span></div><p className="mt-2 text-sm text-slate-500">Required header: Item Name. Optional columns: Item No, Item Id, Category, Sub Category, Unit Name, Manufacture Name and Generic Name. A new upload replaces the saved master in this browser.</p><div className="mt-4 flex flex-wrap gap-4 text-sm"><label>MATCH ≥ <input aria-label="Match threshold" type="number" min="0" max="100" value={matchLimit} onChange={e=>setMatchLimit(e.target.value)} className="ml-1 w-20 rounded border px-2 py-1"/>%</label><label>CHECK ≥ <input aria-label="Check threshold" type="number" min="0" max="100" value={checkLimit} onChange={e=>setCheckLimit(e.target.value)} className="ml-1 w-20 rounded border px-2 py-1"/>%</label><span className="text-slate-500">Defaults: MATCH 85%, CHECK 55%</span></div></section>
 <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-lg font-semibold">2. Single item check</h2><div className="mt-3 flex flex-wrap gap-2"><input aria-label="Single item name" value={single} onChange={e=>setSingle(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")setSingleMatches(ranked(single,5));}} placeholder="Example: PARACETAMOL 500 MG TAB" className="min-w-0 flex-1 rounded-lg border px-3 py-2"/><button type="button" onClick={()=>setSingleMatches(ranked(single,5))} disabled={!master.length||!single.trim()} className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-40">Check item</button></div>{singleMatches.length>0&&<div className="mt-4 overflow-x-auto"><table className="w-full text-sm"><thead><tr className="bg-slate-50 text-left"><th className="p-2">Status</th><th className="p-2">Match</th><th className="p-2">Item Id</th><th className="p-2">Item Name</th><th className="p-2">Category</th><th className="p-2">Unit</th></tr></thead><tbody>{singleMatches.map((m,i)=><tr key={m.item.id||m.item.name} className="border-t"><td className="p-2">{i===0?<span className={"rounded px-2 py-1 text-xs font-semibold "+style(status(m.score))}>{status(m.score)}</span>:""}</td><td className="p-2">{pct(m.score)}</td><td className="p-2">{m.item.id}</td><td className="p-2">{m.item.name}</td><td className="p-2">{m.item.category}</td><td className="p-2">{m.item.unit}</td></tr>)}</tbody></table></div>}</section>
 <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-lg font-semibold">3. Bulk check</h2><p className="mt-1 text-sm text-slate-500">Upload Excel/CSV with an Item Name column, or paste one item per line.</p><div className="mt-4"><FileImportDropzone title="Import item list" description="Upload an Excel or CSV list with an Item Name column. You can also paste item names below." accept=".xlsx,.xls,.csv" onFile={(file)=>void uploadBulk(file)} /></div><textarea aria-label="Bulk item names" rows={5} value={bulk} onChange={e=>setBulk(e.target.value)} placeholder="One item per line" className="mt-3 w-full rounded-lg border p-3"/><button type="button" onClick={()=>void runBulk()} disabled={busy||!master.length} className="mt-3 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-40">{busy?"Matching…":"Run bulk check"}</button><span className="ml-3 text-sm text-slate-500">{master.length.toLocaleString()} master items ready</span></section>
 {error&&<p role="alert" className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{error}</p>}
 {results.length>0&&<section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-semibold">4. Match results</h2><p className="mt-1 text-sm text-slate-500">{results.filter(x=>x.status==="MATCH").length} MATCH · {results.filter(x=>x.status==="CHECK").length} CHECK · {results.filter(x=>x.status==="NEW ITEM").length} NEW ITEM</p></div><button type="button" onClick={exportExcel} disabled={!xlsxReady} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold disabled:opacity-40">Download Excel results</button></div><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[900px] text-sm"><thead><tr className="bg-slate-50 text-left"><th className="p-2">#</th><th className="p-2">Input</th><th className="p-2">Status</th><th className="p-2">Match %</th><th className="p-2">Matched Item Id</th><th className="p-2">Matched Item Name</th><th className="p-2">2nd best</th><th className="p-2">3rd best</th></tr></thead><tbody>{results.map((r,i)=><tr key={i} className="border-t align-top"><td className="p-2">{i+1}</td><td className="p-2">{r.input}{r.duplicateOf?<small className="block text-slate-500">Duplicate of #{r.duplicateOf}</small>:null}</td><td className="p-2"><span className={"rounded px-2 py-1 text-xs font-semibold "+style(r.status)}>{r.status}</span></td><td className="p-2">{pct(r.matches[0]?.score??0)}</td><td className="p-2">{r.matches[0]?.item.id}</td><td className="p-2">{r.matches[0]?.item.name}</td><td className="p-2">{r.matches[1]?r.matches[1].item.name+" ("+pct(r.matches[1].score)+")":"—"}</td><td className="p-2">{r.matches[2]?r.matches[2].item.name+" ("+pct(r.matches[2].score)+")":"—"}</td></tr>)}</tbody></table></div></section>}
 <section className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm leading-6 text-blue-950"><h2 className="font-semibold">Matching notes</h2><p className="mt-2">Similarity scores are suggestions, not proof that products are equivalent. Verify strength, dosage form, pack size, manufacturer, unit of measure and generic composition before reusing an item code or creating a new master record.</p><p className="mt-2">Your item master is stored locally under your signed-in account ID in this browser. Guest sessions are temporary and are not saved. Files are processed locally and are not uploaded to KaamKitPro servers. Data does not sync to another device; export a backup before clearing browser data.</p></section></div></main>;
}
