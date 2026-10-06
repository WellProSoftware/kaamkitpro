import type { Metadata } from "next";

const siteName = "KaamKitPro";

export function createToolMetadata(
  title: string,
  description: string,
  keywords: string[] = []
): Metadata {
  return {
    title,
    description,
    keywords: [
      ...keywords,
      "KaamKitPro",
      "free online tool",
      "online tools",
    ],
    authors: [{ name: siteName }],
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      type: "website",
      siteName,
    },
    twitter: {
      card: "summary",
      title: `${title} | ${siteName}`,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}