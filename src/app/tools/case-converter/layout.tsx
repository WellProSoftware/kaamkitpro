import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Converter - Uppercase, Lowercase & Title Case",
  description:
    "Free online Case Converter to change text to uppercase, lowercase, title case, sentence case and reverse text instantly.",
  keywords: [
    "case converter",
    "text case converter",
    "uppercase converter",
    "lowercase converter",
    "title case converter",
    "sentence case converter",
    "online text converter",
  ],
  openGraph: {
    title: "Case Converter - Free Online Text Case Converter | KaamKitPro",
    description:
      "Convert text to uppercase, lowercase, title case, sentence case and reverse text instantly with KaamKitPro.",
    type: "website",
    siteName: "KaamKitPro",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CaseConverterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}