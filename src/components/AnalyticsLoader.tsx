"use client";

import { useEffect } from "react";

const CONSENT_KEY = "kk_privacy_consent_v1";
const SCRIPT_ID = "google-analytics-script";
const MEASUREMENT_ID = "G-M9190XP42G";

export default function AnalyticsLoader({ disabled = false }: { disabled?: boolean }) {
  useEffect(() => {
    let cancelled = false;

    function removeAnalytics() {
      document.getElementById(SCRIPT_ID)?.remove();
    }

    function loadAnalyticsIfConsented() {
      if (disabled) {
        removeAnalytics();
        return;
      }

      let consent = "";
      try {
        consent = window.localStorage.getItem(CONSENT_KEY) || "";
      } catch {
        removeAnalytics();
        return;
      }
      if (consent !== "accepted") {
        removeAnalytics();
        return;
      }
      if (document.getElementById(SCRIPT_ID)) return;

      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
      script.onload = () => {
        if (cancelled) return;
        const analyticsWindow = window as Window & { dataLayer?: unknown[][] };
        analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
        function gtag(...args: unknown[]) {
          analyticsWindow.dataLayer?.push(args);
        }
        gtag("js", new Date());
        gtag("config", MEASUREMENT_ID);
      };
      document.head.appendChild(script);
    }

    loadAnalyticsIfConsented();
    window.addEventListener("kaamkitpro:consent", loadAnalyticsIfConsented);
    return () => {
      cancelled = true;
      window.removeEventListener("kaamkitpro:consent", loadAnalyticsIfConsented);
    };
  }, [disabled]);

  return null;
}
