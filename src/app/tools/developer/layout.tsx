import type { Metadata } from "next";
import ToolSeoContent from "@/components/ToolSeoContent";

const howToUse = [
    "Choose the developer utility required for your task.",
    "Paste your code, text or data into the input area.",
    "Run the formatter, converter or generator.",
    "Copy the processed result into your development workflow."
  ];

const benefits = [
    "Quick utilities for common developer tasks.",
    "Useful for debugging, formatting and data preparation.",
    "Works directly in the browser.",
    "No additional desktop utility software is required."
  ];

const faq = [
    { question: "Are these developer tools free?", answer: "Yes. KaamKitPro developer utilities are available as free online tools." },
    { question: "Which coding formats are supported?", answer: "Available tools include HTML, CSS, JavaScript and JSON formatting utilities." },
    { question: "Can I use these tools for sensitive code?", answer: "Avoid submitting secrets, passwords, API keys or confidential information to any online service." }
  ];

const relatedTools = [
    { href: "/tools/html-formatter", label: "HTML Formatter" },
    { href: "/tools/css-formatter", label: "CSS Formatter" },
    { href: "/tools/js-formatter", label: "JavaScript Formatter" },
    { href: "/tools/json-formatter", label: "JSON Formatter" },
    { href: "/tools/base64", label: "Base64 Encoder & Decoder" },
    { href: "/tools/hash-generator", label: "Hash Generator" },
    { href: "/tools/uuid-generator", label: "UUID Generator" },
    { href: "/tools/url-encoder-decoder", label: "URL Encoder & Decoder" }
  ];

export const metadata: Metadata = {
  title: "Developer Tools Online",
  description: "Free online developer tools for formatting code, working with JSON, URLs, hashes, UUIDs and encoded data.",
  keywords: [
    "developer tools",
    "developer tools online",
    "free developer tools"
  ],
  alternates: {
    canonical: "https://kaamkitpro.com/tools/developer",
  },
  openGraph: {
    title: "Developer Tools Online | KaamKitPro",
    description: "Free online developer tools for formatting code, working with JSON, URLs, hashes, UUIDs and encoded data.",
    type: "website",
    siteName: "KaamKitPro",
    url: "https://kaamkitpro.com/tools/developer",
  },
  twitter: {
    card: "summary",
    title: "Developer Tools Online | KaamKitPro",
    description: "Free online developer tools for formatting code, working with JSON, URLs, hashes, UUIDs and encoded data.",
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
        title="Developer Tools Online"
        description="KaamKitPro developer tools help with common coding and data tasks. Format HTML, CSS, JavaScript and JSON, encode URLs, generate hashes and UUIDs, and work with Base64 data."
        howToUse={howToUse}
        benefits={benefits}
        faq={faq}
        relatedTools={relatedTools}
      />
    </>
  );
}
