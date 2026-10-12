"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "kk_privacy_consent_v1";
type Consent = "accepted" | "essential";

export default function PrivacyConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        setVisible(!window.localStorage.getItem(CONSENT_KEY));
      } catch {
        setVisible(true);
      }
    });
  }, []);

  function saveConsent(consent: Consent) {
    try {
      window.localStorage.setItem(CONSENT_KEY, consent);
    } catch {
      // Optional tracking stays disabled if consent cannot be persisted.
    }
    window.dispatchEvent(new CustomEvent("kaamkitpro:consent", { detail: consent }));
    setVisible(false);
  }

  function reopenChoices() {
    try {
      window.localStorage.removeItem(CONSENT_KEY);
    } catch {
      // The dialog still opens; optional tracking loaders fail closed.
    }
    window.dispatchEvent(new CustomEvent("kaamkitpro:consent", { detail: "essential" }));
    setVisible(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={reopenChoices}
        className="fixed bottom-3 left-3 z-[90] rounded-full border border-slate-300 bg-white/95 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
        aria-label="Reopen privacy choices"
      >
        Privacy choices
      </button>
      {visible ? (
        <section
          role="dialog"
          aria-modal="false"
          aria-labelledby="privacy-consent-title"
          className="fixed inset-x-3 bottom-14 z-[100] mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:inset-x-6 sm:bottom-16"
        >
          <h2 id="privacy-consent-title" className="text-base font-bold text-slate-900">
            Your privacy choices
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Essential storage keeps the site working. With your permission, we may
            use Google Analytics and advertising technologies to understand usage
            and support free tools. You can continue with optional tracking off.
            Read our{" "}
            <a className="font-semibold text-blue-700 underline" href="/privacy-policy">
              Privacy Policy
            </a>.
          </p>
          <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => saveConsent("essential")}
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Essential only
            </button>
            <button
              type="button"
              onClick={() => saveConsent("accepted")}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Accept analytics & ads
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}
