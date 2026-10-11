import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to JSON Converter",
  alternates: {
    canonical: "https://kaamkitpro.com/tools/csv-to-json",
  },
};

export default function ToolCanonicalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
