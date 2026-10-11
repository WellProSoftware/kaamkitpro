import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Flip Tool",
  alternates: {
    canonical: "https://kaamkitpro.com/tools/image-flip",
  },
};

export default function ToolCanonicalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
