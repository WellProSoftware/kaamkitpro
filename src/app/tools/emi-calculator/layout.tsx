import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EMI Calculator - Free Online Loan EMI Calculator",
  description:
    "Calculate monthly EMI, total interest and total payment for your loan with the free online EMI Calculator.",
  keywords: [
    "EMI calculator",
    "loan EMI calculator",
    "EMI calculator India",
    "home loan EMI calculator",
    "personal loan EMI calculator",
  ],
  robots: { index: true, follow: true },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}