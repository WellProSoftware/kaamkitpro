import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Line Sorter",
  alternates: {
    canonical: "https://kaamkitpro.com/tools/line-sorter",
  },
};

export default function ToolCanonicalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
