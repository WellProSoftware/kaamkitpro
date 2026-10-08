import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free PDF Tools Online",
  description:
    "Free online PDF tools for merging, splitting, compressing and converting PDF files.",
};

export default function PdfToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
