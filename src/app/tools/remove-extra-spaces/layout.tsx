import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Extra Spaces - Free Online Text Cleaner",
  description:
    "Free online tool to remove extra spaces, tabs and unwanted line spacing from text instantly.",
  keywords: [
    "remove extra spaces",
    "remove spaces from text",
    "extra spaces remover",
    "text cleaner",
    "remove whitespace",
    "online text cleaner",
    "clean text tool",
  ],
  openGraph: {
    title: "Remove Extra Spaces - Free Online Text Cleaner | KaamKitPro",
    description:
      "Clean unwanted spaces, tabs and extra line spacing from your text instantly with KaamKitPro.",
    type: "website",
    siteName: "KaamKitPro",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RemoveExtraSpacesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}