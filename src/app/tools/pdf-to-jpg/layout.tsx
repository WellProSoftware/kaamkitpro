import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "PDF to JPG Converter",
  "Convert PDF pages to JPG images online for free. Turn every page of a PDF into a high-quality JPG image.",
  [
    "PDF to JPG",
    "PDF to image",
    "convert PDF to JPG",
    "PDF page to JPG",
    "free PDF to JPG converter",
  ]
);

export default function PDFToJPGLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
