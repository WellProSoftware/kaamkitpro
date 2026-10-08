import type { Metadata } from "next";
import ToolSeoContent from "@/components/ToolSeoContent";

const howToUse = [
    "Choose the text tool you need.",
    "Paste or type your content into the input area.",
    "Apply the available transformation or analysis.",
    "Copy the result for use in your document or project."
  ];

const benefits = [
    "Fast browser-based text utilities.",
    "Useful for writers, students, creators and professionals.",
    "No software installation required.",
    "Simple interfaces for quick text processing."
  ];

const faq = [
    { question: "What text tools are available?", answer: "KaamKitPro includes word counting, character counting, case conversion and text cleaning tools." },
    { question: "Can I use the tools for long text?", answer: "The tools are designed for practical browser-based text processing, although browser memory and device limits can vary." },
    { question: "Do the tools require installation?", answer: "No. They work directly in a modern web browser." }
  ];

const relatedTools = [
    { href: "/tools/word-counter", label: "Word Counter" },
    { href: "/tools/character-counter", label: "Character Counter" },
    { href: "/tools/case-converter", label: "Case Converter" },
    { href: "/tools/remove-extra-spaces", label: "Remove Extra Spaces" }
  ];

export const metadata: Metadata = {
  title: "Text Tools Online",
  description: "Free online text tools for counting, cleaning, converting and transforming text quickly.",
  keywords: [
    "text tools",
    "text tools online",
    "free text tools"
  ],
  alternates: {
    canonical: "https://kaamkitpro.com/tools/text",
  },
  openGraph: {
    title: "Text Tools Online | KaamKitPro",
    description: "Free online text tools for counting, cleaning, converting and transforming text quickly.",
    type: "website",
    siteName: "KaamKitPro",
    url: "https://kaamkitpro.com/tools/text",
  },
  twitter: {
    card: "summary",
    title: "Text Tools Online | KaamKitPro",
    description: "Free online text tools for counting, cleaning, converting and transforming text quickly.",
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
        title="Text Tools Online"
        description="Use KaamKitPro text utilities for common writing and content tasks. Count words and characters, change text case, remove extra spaces and perform other quick text transformations."
        howToUse={howToUse}
        benefits={benefits}
        faq={faq}
        relatedTools={relatedTools}
      />
    </>
  );
}
