import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI Calculator - Free Online Body Mass Index Calculator",
  description:
    "Calculate your Body Mass Index (BMI) using height and weight with this free online BMI Calculator.",
  keywords: [
    "BMI calculator",
    "BMI calculator online",
    "body mass index calculator",
    "BMI calculator India",
    "calculate BMI",
  ],
  robots: { index: true, follow: true },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}