import type { Metadata } from "next";
import "./globals.css";
import InternalLinks from "@/components/InternalLinks";
import AnalyticsConsent from "@/components/AnalyticsConsent";

export const metadata: Metadata = {
  title: {
    default: "KaamKitPro Preview | Professional Digital Workspace",
    template: "%s | KaamKitPro Preview",
  },
  description:
    "Private staging preview of the KaamKitPro professional digital workspace.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  icons: {
    icon: [{ url: "/kaamkitpro-icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <InternalLinks />
        <AnalyticsConsent />
      </body>
    </html>
  );
}
