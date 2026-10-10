"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ADSENSE_SCRIPT_ID = "google-adsense";

export default function AdSenseLoader() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    const excluded = /^\/(login|account|admin)(\/|$)/.test(pathname) || pathname.startsWith("/auth/");
    if (excluded) {
      document.getElementById(ADSENSE_SCRIPT_ID)?.remove();
      return;
    }

    fetch("/api/access", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) return false;
        const data = (await response.json()) as { adsEnabled?: boolean };
        return data.adsEnabled === true;
      })
      .then((adsEnabled) => {
        if (cancelled) return;
        if (!adsEnabled) {
          document.getElementById(ADSENSE_SCRIPT_ID)?.remove();
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
      })
      .catch(() => {
        // Fail closed: do not load ad scripts when entitlement status cannot be verified.
        document.getElementById(ADSENSE_SCRIPT_ID)?.remove();
      });

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
