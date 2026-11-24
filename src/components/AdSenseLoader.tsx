"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { createRequestSequence } from "@/lib/adsense-request-guard.mjs";

const ADSENSE_SCRIPT_ID = "google-adsense";
const CONSENT_KEY = "kk_privacy_consent_v1";
const AD_CLIENT = "ca-pub-6738934686699082";

export default function AdSenseLoader({ disabled = false }: { disabled?: boolean }) {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    const requestSequence = createRequestSequence();

    // Removing only the loader script is not enough: Auto Ads can leave injected
    // frames/placeholders behind after a user signs in or upgrades to Pro.
    const removeAds = () => {
      document.getElementById(ADSENSE_SCRIPT_ID)?.remove();
      document
        .querySelectorAll(
          [
            "ins.adsbygoogle",
            ".google-auto-placed",
            "iframe[id^='google_ads_iframe']",
            "iframe[src*='googlesyndication.com']",
            "iframe[src*='doubleclick.net']",
          ].join(","),
        )
        .forEach((element) => element.remove());
    };

    const excluded = ["/login", "/account", "/admin"].some(
      (prefix) => pathname === prefix || pathname.startsWith(prefix + "/"),
    ) || pathname.startsWith("/auth/");

    async function syncAds() {
      // Only the newest access/consent check may change the page's ad state.
      const requestId = requestSequence.next();
      const isCurrentRequest = () => !cancelled && requestSequence.isCurrent(requestId);

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
        if (!isCurrentRequest()) return;
        if (!response.ok) {
          removeAds();
          return;
        }

        const data = (await response.json()) as { adsEnabled?: boolean };
        if (!isCurrentRequest()) return;
        if (data.adsEnabled !== true) {
          removeAds();
          return;
        }
        if (document.getElementById(ADSENSE_SCRIPT_ID)) return;

        const script = document.createElement("script");
        script.id = ADSENSE_SCRIPT_ID;
        script.async = true;
        script.crossOrigin = "anonymous";
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;
        script.dataset.adClient = AD_CLIENT;
        document.head.appendChild(script);
      } catch {
        // Fail closed: never leave ads enabled when account access is unknown.
        if (isCurrentRequest()) removeAds();
      }
    }

    const onConsent = () => { void syncAds(); };
    const onReturnToTab = () => {
      if (document.visibilityState === "visible") void syncAds();
    };

    void syncAds();
    window.addEventListener("kaamkitpro:consent", onConsent);
    window.addEventListener("kaamkitpro:access-changed", onConsent);
    window.addEventListener("focus", onConsent);
    document.addEventListener("visibilitychange", onReturnToTab);

    return () => {
      cancelled = true;
      requestSequence.invalidate();
      window.removeEventListener("kaamkitpro:consent", onConsent);
      window.removeEventListener("kaamkitpro:access-changed", onConsent);
      window.removeEventListener("focus", onConsent);
      document.removeEventListener("visibilitychange", onReturnToTab);
    };
  }, [pathname, disabled]);

  return null;
}
