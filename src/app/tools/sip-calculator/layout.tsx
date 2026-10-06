import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIP Calculator - Free Online SIP Investment Calculator",
  description:
    "Estimate SIP investment value, total invested amount and potential returns with the free online SIP Calculator.",
  keywords: [
    "SIP calculator",
    "SIP calculator India",
    "mutual fund SIP calculator",
    "investment calculator",
    "SIP returns calculator",
  ],
  robots: { index: true, follow: true },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}