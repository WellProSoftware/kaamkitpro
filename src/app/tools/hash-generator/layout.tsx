import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Hash Generator",
  "Generate SHA-256, SHA-384 and SHA-512 hashes from text online for free.",
  [
    "hash generator",
    "SHA256 generator",
    "SHA512 generator",
    "SHA hash generator",
    "online hash tool",
  ]
);

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
