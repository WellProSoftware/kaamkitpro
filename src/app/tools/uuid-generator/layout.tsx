import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UUID Generator - Generate Random UUIDs Online",
  description:
    "Generate random UUIDs instantly with the free online UUID Generator for development, APIs and databases.",
  keywords: [
    "UUID generator",
    "random UUID generator",
    "UUID v4 generator",
    "online UUID generator",
    "generate UUID",
  ],
  robots: { index: true, follow: true },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}