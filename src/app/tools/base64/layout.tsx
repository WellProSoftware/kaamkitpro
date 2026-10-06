import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder - Free Online Tool",
  description:
    "Encode text to Base64 and decode Base64 data back to readable text with this free online tool.",
  keywords: [
    "Base64 encoder",
    "Base64 decoder",
    "Base64 encode online",
    "Base64 decode online",
    "Base64 converter",
  ],
  robots: { index: true, follow: true },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}