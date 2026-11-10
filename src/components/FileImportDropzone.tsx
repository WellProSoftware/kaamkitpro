"use client";

import { useRef, useState } from "react";

type Props = {
  title: string;
  description: string;
  accept: string;
  onFile?: (file: File) => void;
  onFiles?: (files: FileList | null) => void;
  inputLabel?: string;
  inputId?: string;
  buttonLabel?: string;
  multiple?: boolean;
  disabled?: boolean;
  showFileName?: boolean;
};

export default function FileImportDropzone({
  title, description, accept, onFile, onFiles, inputLabel = title,
  inputId, buttonLabel = "Browse files", multiple = false, disabled = false, showFileName = true,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);

  function choose(list: FileList | null) {
    if (!list || !list.length || disabled) return;
    const selected = Array.from(list);
    const allowed = accept.split(",").map((value) => value.trim().toLowerCase());
    const valid = selected.filter((file) => allowed.some((rule) => {
      if (rule === "*/*") return true;
      if (rule.endsWith("/*")) return file.type.startsWith(rule.slice(0, -1));
      if (rule.startsWith(".")) return file.name.toLowerCase().endsWith(rule);
      return file.type.toLowerCase() === rule;
    }));
    if (!valid.length || valid.length !== selected.length) {
      setFileNames([]);
      return;
    }
    setFileNames(valid.map((file) => file.name));
    if (onFiles) {
      const transfer = new DataTransfer();
      valid.forEach((file) => transfer.items.add(file));
      onFiles(transfer.files);
    } else if (onFile) {
      valid.forEach(onFile);
    }
  }

  return (
    <div
      onDragOver={(event) => { event.preventDefault(); if (!disabled) setDragging(true); }}
      onDragLeave={(event) => { event.preventDefault(); setDragging(false); }}
      onDrop={(event) => { event.preventDefault(); setDragging(false); choose(event.dataTransfer.files); }}
      className={`rounded-2xl border-2 border-dashed p-5 transition sm:p-6 ${dragging ? "border-blue-500 bg-blue-50" : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50"} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        aria-label={inputLabel}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="sr-only"
        onChange={(event) => { choose(event.currentTarget.files); event.currentTarget.value = ""; }}
      />
      <div className="flex flex-col items-center text-center">
        <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">⇧</span>
        <p className="mt-3 text-sm font-bold text-slate-900">{title}</p>
        <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">{description}</p>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Supported: {accept.replaceAll(".", "").replaceAll(",", " · ")}</p>
        <button type="button" disabled={disabled} onClick={() => inputRef.current?.click()} className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-blue-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed">
          {buttonLabel}
        </button>
        <p className="mt-3 max-w-full break-all text-xs text-slate-500" aria-live="polite">
          {fileNames.length ? (multiple ? `${fileNames.length} files selected` : showFileName ? fileNames[0] : "1 file selected") : "Drag and drop " + (multiple ? "files" : "a file") + " here"}
        </p>
      </div>
    </div>
  );
}
