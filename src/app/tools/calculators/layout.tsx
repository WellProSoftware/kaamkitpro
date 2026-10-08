import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Calculators",
  description:
    "Free calculators for percentage, GST, EMI, age, BMI and SIP calculations.",
};

export default function CalculatorsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
