import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "URL Encoder & Decoder",
  "Encode and decode URL strings online for free using a simple browser-based URL tool.",
  [
    "URL encoder",
    "URL decoder",
    "URL encode decode",
    "percent encoding",
    "URL encoding tool",
  ]
);

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
