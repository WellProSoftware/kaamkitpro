"use client";

import { useEffect } from "react";

const ADSENSE_SCRIPT_ID = "google-adsense";

export default function AdSenseLoader() {
  useEffect(() => {
    let cancelled = false;
    const path = window.location.pathname;
    const excluded = /^\/(login|account|admin)(\/|$)/.test(path) || path.startsWith("/auth/");
    if (excluded) return;

    fetch("/api/access", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) return false;
        const data = (await response.json()) as { adsEnabled?: boolean };
        return data.adsEnabled === true;
      })
      .then((adsEnabled) => {
        if (cancelled || !adsEnabled || document.getElementById(ADSENSE_SCRIPT_ID)) return;
        const script = document.createElement("script");
        script.id = ADSENSE_SCRIPT_ID;
        script.async = true;
        script.crossOrigin = "anonymous";
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6738934686699082";
        script.dataset.adClient = "ca-pub-6738934686699082";
        document.head.appendChild(script);
      })
      .catch(() => {
        // Fail closed: do not load ad scripts when entitlement status cannot be verified.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
