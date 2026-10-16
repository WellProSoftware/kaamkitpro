"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const CONSENT_KEY = "kk_privacy_consent_v1";
const SCRIPT_ID = "google-analytics-script";
const MEASUREMENT_ID = "G-8B6JX70RH8";

export default function AnalyticsLoader({ disabled = false }: { disabled?: boolean }) {
  const pathname = usePathname();
  const lastTrackedToolPath = useRef("");

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
        const analyticsWindow = window as Window & {
          dataLayer?: unknown[][];
          gtag?: (...args: unknown[]) => void;
        };
        analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
        analyticsWindow.gtag = function gtag(...args: unknown[]) {
          analyticsWindow.dataLayer?.push(args);
        };
        analyticsWindow.gtag("js", new Date());
        analyticsWindow.gtag("config", MEASUREMENT_ID);
        if (window.location.pathname.startsWith("/tools/")) {
          analyticsWindow.gtag("event", "tool_used", {
            tool_name: window.location.pathname,
          });
          lastTrackedToolPath.current = window.location.pathname;
        }
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

  useEffect(() => {
    if (disabled || !pathname.startsWith("/tools/") || lastTrackedToolPath.current === pathname) {
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

    window.gtag("event", "tool_used", { tool_name: pathname });
    lastTrackedToolPath.current = pathname;
  }, [disabled, pathname]);

  return null;
}
