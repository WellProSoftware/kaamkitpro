import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timestamp Converter - Unix Timestamp Converter",
  description:
    "Convert Unix timestamps to readable dates and dates to Unix timestamps with this free online converter.",
  keywords: [
    "timestamp converter",
    "Unix timestamp converter",
    "Unix time converter",
    "epoch converter",
    "timestamp calculator",
  ],
  robots: { index: true, follow: true },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}