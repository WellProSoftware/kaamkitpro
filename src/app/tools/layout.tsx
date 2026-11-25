import type { Metadata } from "next";

import ToolEditorialContent from "@/components/ToolEditorialContent";
import ToolEditorialContentBatchTwo from "@/components/ToolEditorialContentBatchTwo";
import ToolEditorialContentBatchThree from "@/components/ToolEditorialContentBatchThree";

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
  return (
    <>
      {children}
      <ToolEditorialContent />
      <ToolEditorialContentBatchTwo />
      <ToolEditorialContentBatchThree />
    </>
  );
}
