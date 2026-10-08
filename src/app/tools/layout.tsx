import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Tools",
  description:
    "Browse KaamKitPro free online tools for PDF, image, calculator, text, SEO, social media and developer tasks.",
  keywords: [
    "free online tools",
    "online tools",
    "free tools",
    "PDF tools",
    "image tools",
    "calculator tools",
    "text tools",
    "SEO tools",
    "social media tools",
    "developer tools",
  ],
  alternates: {
    canonical: "https://kaamkitpro.com/tools",
  },
};

export default function ToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
