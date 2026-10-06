import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Generator - Free Strong Random Password Generator",
  description:
    "Generate strong random passwords with custom length, numbers, symbols and letters using this free online Password Generator.",
  keywords: [
    "password generator",
    "strong password generator",
    "random password generator",
    "secure password generator",
    "online password generator",
  ],
  robots: { index: true, follow: true },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}