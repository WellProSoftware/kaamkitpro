import type { Metadata } from "next";
import ToolSeoContent from "@/components/ToolSeoContent";

const howToUse = [
    "Choose the PDF tool that matches your task.",
    "Upload your PDF or supported files in the tool.",
    "Adjust the available options and process your files.",
    "Download the resulting document when processing is complete."
  ];

const benefits = [
    "Free browser-based PDF utilities for everyday document work.",
    "Useful tools for merging, splitting, conversion and compression.",
    "Simple interfaces designed for quick document processing.",
    "No desktop PDF software is required for supported tasks."
  ];

const faq = [
    { question: "Are these PDF tools free?", answer: "Yes. KaamKitPro PDF tools are designed as free online utilities for everyday PDF tasks." },
    { question: "Do I need to install PDF software?", answer: "No. Supported PDF operations can be performed directly in your browser." },
    { question: "Which PDF tasks can I perform?", answer: "You can merge, split, compress and convert PDFs using the available KaamKitPro tools." }
  ];

const relatedTools = [
    { href: "/tools/pdf-merge", label: "PDF Merge" },
    { href: "/tools/pdf-split", label: "PDF Split" },
    { href: "/tools/pdf-compressor", label: "PDF Compressor" },
    { href: "/tools/jpg-to-pdf", label: "JPG to PDF" },
    { href: "/tools/pdf-to-jpg", label: "PDF to JPG" }
  ];

export const metadata: Metadata = {
  title: "PDF Tools Online",
  description: "Use free online PDF tools to merge, split, compress, convert and manage PDF files directly in your browser.",
  keywords: [
    "PDF tools",
    "PDF tools online",
    "free PDF tools"
  ],
  alternates: {
    canonical: "https://kaamkitpro.com/tools/pdf",
  },
  openGraph: {
    title: "PDF Tools Online | KaamKitPro",
    description: "Use free online PDF tools to merge, split, compress, convert and manage PDF files directly in your browser.",
    type: "website",
    siteName: "KaamKitPro",
    url: "https://kaamkitpro.com/tools/pdf",
  },
  twitter: {
    card: "summary",
    title: "PDF Tools Online | KaamKitPro",
    description: "Use free online PDF tools to merge, split, compress, convert and manage PDF files directly in your browser.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CategoryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}

      <ToolSeoContent
        title="PDF Tools Online"
        description="KaamKitPro provides practical PDF tools for common document tasks. Merge multiple PDFs, split pages, convert images and PDFs, and reduce PDF file size without installing desktop software."
        howToUse={howToUse}
        benefits={benefits}
        faq={faq}
        relatedTools={relatedTools}
      />
    </>
  );
}
