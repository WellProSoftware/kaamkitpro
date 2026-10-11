import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to CSV Converter",
  alternates: {
    canonical: "https://kaamkitpro.com/tools/json-to-csv",
  },
};

export default function ToolCanonicalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
