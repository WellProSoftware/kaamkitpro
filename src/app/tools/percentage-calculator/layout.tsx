import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Percentage Calculator - Free Online Percentage Tool",
  description:
    "Free online Percentage Calculator to calculate percentages, find what percentage one number is of another, and calculate percentage change.",
  keywords: [
    "percentage calculator",
    "percentage calculator online",
    "percentage change calculator",
    "percent calculator",
    "percentage calculation",
    "free percentage calculator",
  ],
  openGraph: {
    title: "Percentage Calculator - Free Online Percentage Tool | KaamKitPro",
    description:
      "Calculate percentages, percentage changes and find what percentage one number is of another with KaamKitPro.",
    type: "website",
    siteName: "KaamKitPro",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PercentageCalculatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}