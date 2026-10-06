import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Character Counter - Free Online Character Count Tool",
  description:
    "Free online Character Counter to count characters, characters without spaces, spaces and lines instantly.",
  keywords: [
    "character counter",
    "character count tool",
    "online character counter",
    "free character counter",
    "characters without spaces",
    "text counter",
  ],
  openGraph: {
    title: "Character Counter - Free Online Character Count Tool | KaamKitPro",
    description:
      "Count characters, spaces and lines instantly with KaamKitPro Character Counter.",
    type: "website",
    siteName: "KaamKitPro",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CharacterCounterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}