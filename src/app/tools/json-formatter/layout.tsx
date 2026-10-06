import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter - Format, Validate & Minify JSON",
  description:
    "Free online JSON Formatter to format, validate and minify JSON data instantly.",
  keywords: [
    "JSON formatter",
    "JSON validator",
    "JSON minifier",
    "JSON beautifier",
    "format JSON online",
    "validate JSON",
  ],
  robots: { index: true, follow: true },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}