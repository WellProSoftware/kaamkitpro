import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code Generator - Free Online QR Code Maker",
  description:
    "Create and download QR codes from text, URLs and other information with the free online QR Code Generator.",
  keywords: [
    "QR code generator",
    "QR code maker",
    "free QR code generator",
    "online QR code generator",
    "create QR code",
  ],
  robots: { index: true, follow: true },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}