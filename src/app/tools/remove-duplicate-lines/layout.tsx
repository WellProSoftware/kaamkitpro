import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Duplicate Lines",
  alternates: {
    canonical: "https://kaamkitpro.com/tools/remove-duplicate-lines",
  },
};

export default function ToolCanonicalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
