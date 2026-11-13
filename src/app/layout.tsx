import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import InternalLinks from "@/components/InternalLinks";
import AdSenseLoader from "@/components/AdSenseLoader";
import PrivacyConsent from "@/components/PrivacyConsent";
import AnalyticsLoader from "@/components/AnalyticsLoader";
import ToolEditorialContent from "@/components/ToolEditorialContent";
import ToolEditorialContentBatchTwo from "@/components/ToolEditorialContentBatchTwo";
import ToolEditorialContentBatchThree from "@/components/ToolEditorialContentBatchThree";
import SupportChat from "@/components/SupportChat";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const siteUrl = "https://kaamkitpro.com";
const isStagingBuild = process.env.KAAMKITPRO_STAGING === "true" || process.env.VERCEL_ENV === "preview";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Free Online PDF, Image & Calculator Tools | KaamKitPro",
    template: "%s | KaamKitPro",
  },

  description:
    "Explore practical free online PDF tools, image tools, calculators and business utilities. Merge documents, edit images and complete everyday tasks with KaamKitPro.",

  keywords: [
    "free online tools",
    "online tools",
    "PDF tools",
    "image tools",
    "calculator tools",
    "GST calculator",
    "SIP calculator",
  ],

  authors: [{ name: "KaamKitPro" }],
  creator: "KaamKitPro",
  publisher: "KaamKitPro",

  alternates: {
    canonical: siteUrl,
  },

  other: {
    "google-adsense-account": "ca-pub-6738934686699082",
  },

  openGraph: {
    title: "Free Online PDF, Image & Calculator Tools | KaamKitPro",
    description:
      "Explore free online PDF tools, image tools, calculators and practical business utilities with KaamKitPro.",
    url: siteUrl,
    type: "website",
    siteName: "KaamKitPro",
    locale: "en_IN",
  },

  twitter: {
    card: "summary",
    title: "KaamKitPro - Free Online Tools",
    description:
      "Free online PDF, image, calculator and business tools for everyday tasks.",
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
  description: "Free online tools for everyday digital and business tasks.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KaamKitPro",
  url: siteUrl,
  description:
    "KaamKitPro provides free online tools for everyday digital and business tasks.",
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

        <SiteHeader />
        {children}
        <SiteFooter />

        <ToolEditorialContent />

        <ToolEditorialContentBatchTwo />

        <ToolEditorialContentBatchThree />

        <SupportChat />

        <InternalLinks />

        <PrivacyConsent />

        <AnalyticsLoader />
      </body>
    </html>
  );
}
