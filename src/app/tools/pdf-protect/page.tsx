"use client";

import { useState } from "react";

export default function PDFProtectPage() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function checkSupport() {
    if (!file) {
      setMessage("Select a PDF first.");
      return;
    }
    if (!password.trim()) {
      setMessage("Enter a password to check the protection workflow.");
      return;
    }
    setMessage(
      "Password encryption is not supported by this browser tool yet. No file was changed or downloaded. Do not share the original PDF expecting it to be password-protected."
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <a href="/tools/pdf" className="text-sm font-medium text-blue-600 hover:underline">← Browse all PDF tools</a>
        <div className="mt-4 rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">PDF Protect Tool</h1>
            <p className="mt-3 text-slate-600">Check password-protection support before sharing a PDF.</p>
          </div>
          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <input id="pdf-file" type="file" accept=".pdf,application/pdf" className="hidden" onChange={(event) => { setFile(event.target.files?.[0] || null); setMessage(""); event.target.value = ""; }} />
            <label htmlFor="pdf-file" className="inline-block cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Select PDF</label>
            {file && <p className="mt-3 break-all text-sm text-slate-600">{file.name}</p>}
          </div>
          <div className="mt-6 rounded-xl border border-slate-200 p-5">
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password you intended to use</label>
            <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900" placeholder="Enter a password" autoComplete="new-password" />
            <button type="button" onClick={checkSupport} className="mt-5 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Check protection support</button>
          </div>
          {message && <div role="status" className="mt-6 rounded-lg bg-slate-100 p-4 text-center text-sm leading-6 text-slate-700">{message}</div>}
          <div className="mt-8 rounded-xl bg-amber-50 p-5 text-sm leading-6 text-amber-900">
            <strong>Important:</strong> This version cannot apply standard PDF password encryption. It will not generate or label an unencrypted file as protected. Use a trusted PDF application with password-encryption support for sensitive documents.
          </div>
        </div>
      </div>
    </main>
  );
}
