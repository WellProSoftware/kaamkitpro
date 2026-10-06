import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Calculator - Calculate Exact Age Online",
  description:
    "Free online Age Calculator to calculate your exact age in years, months and days.",
  keywords: [
    "age calculator",
    "age calculator online",
    "calculate age",
    "exact age calculator",
    "date of birth calculator",
  ],
  robots: { index: true, follow: true },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}