import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "PDF Merge Tool",
  "Merge multiple PDF files into one PDF online for free. Arrange PDF files in your preferred order and download the combined PDF.",
  [
    "PDF merge",
    "merge PDF online",
    "combine PDF",
    "join PDF files",
    "free PDF merger",
  ]
);

export default function PDFMergeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
