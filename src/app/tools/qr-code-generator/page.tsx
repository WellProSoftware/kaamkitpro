"use client";
import { trackDownload, trackToolUsed } from "@/lib/analytics";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeGeneratorPage() {
  const [text, setText] = useState("");

  const downloadQRCode = () => {
    trackToolUsed("QR Code Generator");
    const canvas = document.getElementById("qr-code") as HTMLCanvasElement | null;

    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    link.download = "kaamkitpro-qr-code.png";
    trackDownload("QR Code Generator", "png");
    link.href = url;
    link.click();
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            KaamKitPro Tool
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            QR Code Generator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Create a QR code from any text, website URL, phone number, or other
            information — instantly and for free.
          </p>
        </div>

        <div className="grid gap-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:grid-cols-2 md:p-8">
          <div>
            <label
              htmlFor="qr-text"
              className="mb-3 block text-sm font-semibold text-slate-900"
            >
              Enter text or URL
            </label>

            <textarea
              id="qr-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://example.com"
              rows={8}
              className="w-full resize-none rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <button
              onClick={downloadQRCode}
              disabled={!text.trim()}
              className="mt-5 w-full rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Download QR Code
            </button>
          </div>

          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl bg-slate-50 p-6">
            {text.trim() ? (
              <>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <QRCodeCanvas
                    id="qr-code"
                    value={text}
                    size={240}
                    level="H"
                    includeMargin
                  />
                </div>

                <p className="mt-5 text-center text-sm text-slate-500">
                  Your QR code is ready
                </p>
              </>
            ) : (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-200 text-4xl">
                  QR
                </div>

                <p className="font-medium text-slate-700">
                  Your QR code will appear here
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Enter some text or a URL to get started.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <h2 className="font-semibold text-slate-900">
            How to use this QR Code Generator
          </h2>

          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600">
            <li>Enter your text or website URL.</li>
            <li>Your QR code will be generated instantly.</li>
            <li>Click “Download QR Code” to save it as a PNG image.</li>
          </ol>
        </div>
      </div>
    </main>
  );
}