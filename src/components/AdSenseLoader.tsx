"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ADSENSE_SCRIPT_ID = "google-adsense";
const CONSENT_KEY = "kk_privacy_consent_v1";

export default function AdSenseLoader({ disabled = false }: { disabled?: boolean }) {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    const removeAds = () => document.getElementById(ADSENSE_SCRIPT_ID)?.remove();
    const excluded = /^\\/(login|account|admin)(\\/|$)/.test(pathname) || pathname.startsWith("/auth/");

    async function syncAds() {
      if (disabled || excluded) {
        removeAds();
        return;
      }

      let consent = "";
      try {
        consent = window.localStorage.getItem(CONSENT_KEY) || "";
      } catch {
        removeAds();
        return;
      }

      if (consent !== "accepted") {
        removeAds();
        return;
      }

      try {
        const response = await fetch("/api/access", { cache: "no-store" });
        if (!response.ok) {
          removeAds();
          return;
        }
        const data = (await response.json()) as { adsEnabled?: boolean };
        if (cancelled || data.adsEnabled !== true) {
          removeAds();
          return;
        }
        if (document.getElementById(ADSENSE_SCRIPT_ID)) return;

        const script = document.createElement("script");
        script.id = ADSENSE_SCRIPT_ID;
        script.async = true;
        script.crossOrigin = "anonymous";
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6738934686699082";
        script.dataset.adClient = "ca-pub-6738934686699082";
        document.head.appendChild(script);
      } catch {
        // Fail closed if consent or entitlement cannot be verified.
        removeAds();
      }
    }

    const onConsent = () => { void syncAds(); };
    void syncAds();
    window.addEventListener("kaamkitpro:consent", onConsent);
    return () => {
      cancelled = true;
      window.removeEventListener("kaamkitpro:consent", onConsent);
    };
  }, [pathname, disabled]);

  return null;
}
