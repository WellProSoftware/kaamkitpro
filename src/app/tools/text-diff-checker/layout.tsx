import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Diff Checker",
  alternates: {
    canonical: "https://kaamkitpro.com/tools/text-diff-checker",
  },
};

export default function ToolCanonicalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
