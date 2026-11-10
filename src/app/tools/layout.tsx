import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Tools",
  description:
    "Browse KaamKitPro free online PDF tools, image tools, calculators and hospital procurement utilities.",
  keywords: [
    "free online tools",
    "online tools",
    "free tools",
    "PDF tools",
    "image tools",
    "calculator tools",
    "hospital procurement tools",
    "vendor quotation comparison",
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
