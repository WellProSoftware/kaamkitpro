import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hospital Item Mapping Tool | KaamKitPro",
  description: "Match hospital purchase item descriptions against an item master, review similar records and prepare new item creation candidates.",
  keywords: ["hospital item mapping", "medical item matching", "hospital purchase item master", "pharma item matching"],
  alternates: { canonical: "https://kaamkitpro.com/tools/item-master-matcher" },
};

export default function ItemMasterMatcherLayout({ children }: { children: React.ReactNode }) {
  return children;
}
