import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GST Calculator - Free Online GST Calculator India",
  description:
    "Free online GST Calculator to calculate GST amount, base price and total price with GST rates of 5%, 12%, 18% and 28%.",
  keywords: [
    "GST calculator",
    "GST calculator India",
    "GST calculation",
    "GST calculator online",
    "18 GST calculator",
    "GST inclusive calculator",
    "GST exclusive calculator",
    "GST amount calculator",
  ],
  openGraph: {
    title: "GST Calculator - Free Online GST Calculator India | KaamKitPro",
    description:
      "Calculate GST amount, base price and total price instantly with the free KaamKitPro GST Calculator.",
    type: "website",
    siteName: "KaamKitPro",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GSTCalculatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}