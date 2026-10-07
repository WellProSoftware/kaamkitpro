"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function JPGToPDFPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState("");

  const addFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const images = Array.from(fileList).filter(
      (file) =>
        file.type.startsWith("image/") ||
        /\.(jpg|jpeg|png|webp)$/i.test(file.name)
    );

    setFiles((current) => [...current, ...images]);
    setMessage("");
  };

  const removeFile = (index: number) => {
    setFiles((current) => current.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: "up" | "down") => {
    setFiles((current) => {
      const updated = [...current];
      const target = direction === "up" ? index - 1 : index + 1;

      if (target < 0 || target >= updated.length) return current;

      [updated[index], updated[target]] = [
        updated[target],
        updated[index],
      ];

      return updated;
    });
  };

  const createPDF = async () => {
    if (files.length === 0) {
      setMessage("Please select at least one image.");
      return;
    }

    try {
      setCreating(true);
      setMessage("");

      const pdf = await PDFDocument.create();

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const imageType = file.type.toLowerCase();

        let image;

        if (
          imageType === "image/jpeg" ||
          imageType === "image/jpg" ||
          /\.(jpg|jpeg)$/i.test(file.name)
        ) {
          image = await pdf.embedJpg(bytes);
        } else {
          image = await pdf.embedPng(bytes);
        }

        const imageWidth = image.width;
        const imageHeight = image.height;

        const maxWidth = 595;
        const maxHeight = 842;

        const scale = Math.min(
          maxWidth / imageWidth,
          maxHeight / imageHeight,
          1
        );

        const width = imageWidth * scale;
        const height = imageHeight * scale;

        const page = pdf.addPage([maxWidth, maxHeight]);

        page.drawImage(image, {
          x: (maxWidth - width) / 2,
          y: (maxHeight - height) / 2,
          width,
          height,
        });
      }

      const pdfBytes = await pdf.save();

      const blob = new Blob([pdfBytes as BlobPart], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "kaamkitpro-images.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);

      setMessage("PDF created successfully.");
    } catch (error) {
      console.error(error);
      setMessage(
        "Could not create the PDF. Please use JPG, JPEG or PNG images."
      );
    } finally {
      setCreating(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              JPG to PDF Converter
            </h1>

            <p className="mt-3 text-slate-600">
              Convert JPG, JPEG and PNG images into one PDF online for free.
            </p>
          </div>

          <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <input
              id="image-files"
              type="file"
              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
              multiple
              className="hidden"
              onChange={(event) => {
                addFiles(event.target.files);
                event.target.value = "";
              }}
            />

            <label
              htmlFor="image-files"
              className="inline-block cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Select Images
            </label>

            <p className="mt-3 text-sm text-slate-500">
              Select one or more JPG, JPEG or PNG files.
            </p>
          </div>

          {files.length > 0 && (
            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">
                  Selected Images
                </h2>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                  {files.length} image{files.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="space-y-3">
                {files.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-900">
                        {index + 1}. {file.name}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => moveFile(index, "up")}
                        disabled={index === 0}
                        className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40"
                      >
                        ↑
                      </button>

                      <button
                        type="button"
                        onClick={() => moveFile(index, "down")}
                        disabled={index === files.length - 1}
                        className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40"
                      >
                        ↓
                      </button>

                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={createPDF}
                disabled={creating}
                className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {creating ? "Creating PDF..." : "Convert to PDF"}
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
              How to convert JPG to PDF
            </h2>

            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600">
              <li>Select your JPG, JPEG or PNG images.</li>
              <li>Arrange them in your preferred order.</li>
              <li>Click Convert to PDF.</li>
              <li>Your PDF will download automatically.</li>
            </ol>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Images are processed directly in your browser.
          </p>
        </div>
      </div>
    </main>
  );
}
