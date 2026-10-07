import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "PDF Compressor",
  "Compress and optimize PDF files online for free. Reduce PDF file size directly in your browser.",
  [
    "PDF compressor",
    "compress PDF",
    "reduce PDF size",
    "PDF size reducer",
    "free PDF compressor",
  ]
);

export default function PDFCompressorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
