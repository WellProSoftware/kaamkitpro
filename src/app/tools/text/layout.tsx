import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Text Tools Online",
  description:
    "Use free online text tools for word counting, character counting, case conversion and removing extra spaces.",
  keywords: [
    "text tools",
    "free text tools",
    "online text tools",
    "word counter",
    "character counter",
    "case converter",
    "remove extra spaces",
  ],
  alternates: {
    canonical: "https://kaamkitpro.com/tools/text",
  },
};

export default function TextToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
