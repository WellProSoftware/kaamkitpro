import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Color Converter",
  "Convert HEX colors to RGB and RGB colors to HEX online for free.",
  [
    "color converter",
    "HEX to RGB",
    "RGB to HEX",
    "color code converter",
    "online color converter",
  ]
);

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
