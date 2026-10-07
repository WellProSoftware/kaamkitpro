import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "PDF Split Tool",
  "Split a PDF into separate pages online for free. Extract every page from a PDF as an individual PDF file.",
  [
    "PDF split",
    "split PDF online",
    "PDF page splitter",
    "extract PDF pages",
    "free PDF splitter",
  ]
);

export default function PDFSplitLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
