import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Developer Tools Online",
  description:
    "Use free online developer tools for HTML, CSS and JavaScript formatting, URL encoding, hash generation and color conversion.",
  keywords: [
    "developer tools",
    "free developer tools",
    "online developer tools",
    "HTML formatter",
    "CSS formatter",
    "JavaScript formatter",
    "URL encoder decoder",
    "hash generator",
    "color converter",
  ],
  alternates: {
    canonical: "https://kaamkitpro.com/tools/developer",
  },
};

export default function DeveloperToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
