"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const CONSENT_KEY = "kk_privacy_consent_v1";
const SCRIPT_ID = "google-analytics-script";
const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "";

type AnalyticsWindow = Window & {
  dataLayer?: unknown[][];
  gtag?: (...args: unknown[]) => void;
};

export default function AnalyticsLoader({ disabled = false }: { disabled?: boolean }) {
  const pathname = usePathname();
  const lastTrackedPath = useRef("");

  useEffect(() => {
    const analyticsWindow = window as AnalyticsWindow;

    function removeAnalytics() {
      // Tell an already-loaded Google tag to stop optional storage before
      // removing its script. Keep this consent command in the dataLayer so
      // an in-flight script also receives it.
      if (typeof analyticsWindow.gtag === "function") {
        analyticsWindow.gtag("consent", "update", {
          analytics_storage: "denied",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
        });
        analyticsWindow.gtag = () => undefined;
      }
      document.getElementById(SCRIPT_ID)?.remove();
      lastTrackedPath.current = "";
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

      // Start a fresh queue after a prior opt-out so stale queued events
      // cannot be replayed when the visitor later opts in again.
      analyticsWindow.dataLayer = [];
      analyticsWindow.gtag = function gtag(...args: unknown[]) {
        analyticsWindow.dataLayer?.push(args);
      };
      analyticsWindow.gtag("js", new Date());
      analyticsWindow.gtag("config", MEASUREMENT_ID, { send_page_view: false });

      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
      document.head.appendChild(script);
    }

    loadAnalyticsIfConsented();
    window.addEventListener("kaamkitpro:consent", loadAnalyticsIfConsented);
    return () => {
      window.removeEventListener("kaamkitpro:consent", loadAnalyticsIfConsented);
    };
  }, [disabled]);

  useEffect(() => {
    if (disabled || !MEASUREMENT_ID || lastTrackedPath.current === pathname) {
      return;
    }

    let consent = "";
    try {
      consent = window.localStorage.getItem(CONSENT_KEY) || "";
    } catch {
      return;
    }
    if (consent !== "accepted" || typeof window.gtag !== "function") {
      return;
    }

    window.gtag("event", "page_view", { page_path: pathname });
    if (pathname.startsWith("/tools/")) {
      window.gtag("event", "tool_used", { tool_name: pathname });
    }
    lastTrackedPath.current = pathname;
  }, [disabled, pathname]);

  return null;
}
