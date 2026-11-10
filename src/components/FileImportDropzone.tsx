"use client";

import { useRef, useState } from "react";

type Props = {
  title: string;
  description: string;
  accept: string;
  onFile: (file: File) => void;
  inputLabel?: string;
  disabled?: boolean;
};

export default function FileImportDropzone({ title, description, accept, onFile, inputLabel = title, disabled = false }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  function choose(file?: File) {
    if (!file || disabled) return;
    const extension = file.name.toLowerCase().split(".").pop() || "";
    const allowed = accept.split(",").map((value) => value.trim().replace(/^\./, "").toLowerCase());
    if (!allowed.includes(extension)) {
      setFileName("");
      return;
    }
    setFileName(file.name);
    onFile(file);
  }

  return (
    <div
      onDragOver={(event) => { event.preventDefault(); if (!disabled) setDragging(true); }}
      onDragLeave={(event) => { event.preventDefault(); setDragging(false); }}
      onDrop={(event) => { event.preventDefault(); setDragging(false); choose(event.dataTransfer.files?.[0]); }}
      className={`rounded-2xl border-2 border-dashed p-5 transition sm:p-6 ${dragging ? "border-blue-500 bg-blue-50" : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50"} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <input ref={inputRef} type="file" aria-label={inputLabel} accept={accept} disabled={disabled} className="sr-only" onChange={(event) => { choose(event.target.files?.[0]); event.currentTarget.value = ""; }} />
      <div className="flex flex-col items-center text-center">
        <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">⇧</span>
        <h3 className="mt-3 text-sm font-bold text-slate-900">{title}</h3>
        <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">{description}</p>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Supported: {accept.replaceAll(".", "").replaceAll(",", " · ")}</p>
        <button type="button" disabled={disabled} onClick={() => inputRef.current?.click()} className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-blue-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed">
          Browse files
        </button>
        <p className="mt-3 max-w-full break-all text-xs text-slate-500" aria-live="polite">{fileName ? `Selected: ${fileName}` : "Drag and drop a file here"}</p>
      </div>
    </div>
  );
}
