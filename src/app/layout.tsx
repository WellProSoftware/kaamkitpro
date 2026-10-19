import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import InternalLinks from "@/components/InternalLinks";
import AdSenseLoader from "@/components/AdSenseLoader";
import PrivacyConsent from "@/components/PrivacyConsent";
import AnalyticsLoader from "@/components/AnalyticsLoader";
import ToolEditorialContent from "@/components/ToolEditorialContent";
import SupportChat from "@/components/SupportChat";

const siteUrl = "https://kaamkitpro.com";
const isStagingBuild = process.env.KAAMKITPRO_STAGING === "true" || process.env.VERCEL_ENV === "preview";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "KaamKitPro - Free Online Tools",
    template: "%s | KaamKitPro",
  },

  description:
    "KaamKitPro provides free online tools for PDF, images, calculators, text, SEO, social media, developer utilities and everyday digital work.",

  keywords: [
    "free online tools",
    "online tools",
    "PDF tools",
    "image tools",
    "word counter",
    "character counter",
    "QR code generator",
    "password generator",
    "GST calculator",
    "EMI calculator",
    "SIP calculator",
    "JSON formatter",
    "Base64 encoder decoder",
    "UUID generator",
    "SEO tools",
    "developer tools",
  ],

  authors: [{ name: "KaamKitPro" }],
  creator: "KaamKitPro",
  publisher: "KaamKitPro",

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    title: "KaamKitPro - Free Online Tools",
    description:
      "Free online tools for PDF, images, calculators, text, SEO, social media, developer utilities and everyday digital work.",
    url: siteUrl,
    type: "website",
    siteName: "KaamKitPro",
    locale: "en_IN",
  },

  twitter: {
    card: "summary",
    title: "KaamKitPro - Free Online Tools",
    description:
      "Useful free online tools for everyday digital work.",
  },

  robots: {
    index: !isStagingBuild,
    follow: !isStagingBuild,
    googleBot: {
      index: !isStagingBuild,
      follow: !isStagingBuild,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/kaamkitpro-icon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/kaamkitpro-icon.svg",
    apple: "/kaamkitpro-icon.svg",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "KaamKitPro",
  url: siteUrl,
  description: "Free online tools for everyday digital work.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KaamKitPro",
  url: siteUrl,
  description:
    "KaamKitPro provides free online tools for everyday digital work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(websiteSchema)}
        </Script>

        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(organizationSchema)}
        </Script>

        <AdSenseLoader disabled={isStagingBuild} />

        {children}

        <ToolEditorialContent />

        <SupportChat />

        <InternalLinks />

        <PrivacyConsent />

        <AnalyticsLoader />
      </body>
    </html>
  );
}
