import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Counter - Free Online Word Count Tool",
  description:
    "Free online Word Counter to count words, characters, sentences, paragraphs and estimated reading time instantly.",
  keywords: [
    "word counter",
    "online word counter",
    "word count tool",
    "free word counter",
    "character counter",
    "reading time calculator",
  ],
  openGraph: {
    title: "Word Counter - Free Online Word Count Tool | KaamKitPro",
    description:
      "Count words, characters, sentences, paragraphs and reading time instantly with KaamKitPro Word Counter.",
    type: "website",
    siteName: "KaamKitPro",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WordCounterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}