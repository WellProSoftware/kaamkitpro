import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "JPG to PDF Converter",
  "Convert JPG, JPEG and PNG images to PDF online for free. Combine multiple images into a single PDF document.",
  [
    "JPG to PDF",
    "image to PDF",
    "JPEG to PDF",
    "PNG to PDF",
    "convert image to PDF",
    "free JPG to PDF converter",
  ]
);

export default function JPGToPDFLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
