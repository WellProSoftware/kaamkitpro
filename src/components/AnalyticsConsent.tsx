"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { trackPageView } from "@/lib/analytics";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const consentKey = "kk_analytics_consent_v1";

export default function AnalyticsConsent() {
  const pathname = usePathname();
  const [decision, setDecision] = useState<"accepted" | "rejected" | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(consentKey);
    if (saved === "accepted" || saved === "rejected") setDecision(saved);
  }, []);

  useEffect(() => {
    if (decision === "accepted" && ready) {
      // Track path only; never include query strings, user identifiers or form data.
      trackPageView(pathname);
    }
  }, [decision, pathname, ready]);

  if (!measurementId || !/^G-[A-Z0-9]+$/.test(measurementId)) return null;

  function choose(value: "accepted" | "rejected") {
    window.localStorage.setItem(consentKey, value);
    setDecision(value);
    setReady(false);
  }

  return (
    <>
      {decision === "accepted" ? (
        <>
          <Script
            id="kaamkitpro-ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
window.gtag = gtag;
gtag("js", new Date());
gtag("config", "${measurementId}", { send_page_view: false });`,
            }}
          />
          <Script
            id="kaamkitpro-ga4"
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
            onReady={() => setReady(true)}
          />
        </>
      ) : null}

      {decision === null ? (
        <aside
          aria-label="Analytics preferences"
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:inset-x-6 sm:p-5"
        >
          <p className="text-sm font-bold text-slate-900">Help improve KaamKitPro</p>
          <p className="mt-1 text-xs leading-5 text-slate-600">
            Allow usage analytics such as page views and tool usage. Names, email addresses and file contents are not sent in analytics events.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => choose("accepted")}
              className="rounded-xl bg-[#2458d3] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#1745b6]"
            >
              Allow analytics
            </button>
            <button
              type="button"
              onClick={() => choose("rejected")}
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Reject
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
