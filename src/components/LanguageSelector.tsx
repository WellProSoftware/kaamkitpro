"use client";

import Script from "next/script";
import { useCallback, useEffect, useMemo, useState } from "react";

type GoogleTranslateWindow = Window & {
  google?: {
    translate?: {
      TranslateElement: new (options: Record<string, unknown>, elementId: string) => unknown;
    };
  };
  googleTranslateElementInit?: () => void;
};

const languages = [
  ["en", "English"], ["hi", "हिन्दी"], ["bn", "বাংলা"], ["ta", "தமிழ்"],
  ["te", "తెలుగు"], ["mr", "मराठी"], ["ur", "اردو"], ["gu", "ગુજરાતી"],
  ["pa", "ਪੰਜਾਬੀ"], ["kn", "ಕನ್ನಡ"], ["ml", "മലയാളം"], ["or", "ଓଡ଼ିଆ"],
  ["as", "অসমীয়া"], ["ne", "नेपाली"], ["sa", "संस्कृतम्"], ["ks", "कॉशुर"],
  ["es", "Español"], ["fr", "Français"], ["de", "Deutsch"], ["it", "Italiano"],
  ["pt", "Português"], ["ru", "Русский"], ["uk", "Українська"], ["ar", "العربية"],
  ["fa", "فارسی"], ["tr", "Türkçe"], ["zh-CN", "简体中文"], ["zh-TW", "繁體中文"],
  ["ja", "日本語"], ["ko", "한국어"], ["id", "Bahasa Indonesia"], ["ms", "Bahasa Melayu"],
  ["th", "ไทย"], ["vi", "Tiếng Việt"], ["fil", "Filipino"], ["sw", "Kiswahili"],
  ["nl", "Nederlands"], ["pl", "Polski"], ["sv", "Svenska"], ["da", "Dansk"],
  ["no", "Norsk"], ["fi", "Suomi"], ["el", "Ελληνικά"], ["he", "עברית"],
  ["ro", "Română"], ["hu", "Magyar"], ["cs", "Čeština"], ["sk", "Slovenčina"],
  ["bg", "Български"], ["hr", "Hrvatski"], ["sr", "Српски"], ["sl", "Slovenščina"],
  ["et", "Eesti"], ["lv", "Latviešu"], ["lt", "Lietuvių"], ["af", "Afrikaans"],
  ["sq", "Shqip"], ["am", "አማርኛ"], ["az", "Azərbaycan"], ["be", "Беларуская"],
  ["bs", "Bosanski"], ["ca", "Català"], ["ceb", "Cebuano"], ["co", "Corsu"],
  ["cy", "Cymraeg"], ["eo", "Esperanto"], ["eu", "Euskara"], ["fy", "Frysk"],
  ["ga", "Gaeilge"], ["gd", "Gàidhlig"], ["gl", "Galego"], ["haw", "ʻŌlelo Hawaiʻi"],
  ["hmn", "Hmong"], ["ht", "Kreyòl Ayisyen"], ["ig", "Igbo"], ["is", "Íslenska"],
  ["jw", "Basa Jawa"], ["kk", "Қазақша"], ["km", "ខ្មែរ"], ["ky", "Кыргызча"],
  ["lo", "ລາວ"], ["lb", "Lëtzebuergesch"], ["mk", "Македонски"], ["mg", "Malagasy"],
  ["mi", "Māori"], ["mn", "Монгол"], ["my", "မြန်မာ"], ["ny", "Chichewa"],
  ["ps", "پښتو"], ["sd", "سنڌي"], ["si", "සිංහල"], ["sm", "Gagana Samoa"],
  ["sn", "chiShona"], ["so", "Soomaali"], ["su", "Basa Sunda"], ["tg", "Тоҷикӣ"],
  ["tk", "Türkmençe"], ["uz", "Oʻzbek"], ["xh", "isiXhosa"], ["yi", "ייִדיש"],
  ["yo", "Yorùbá"], ["zu", "isiZulu"],
] as const;

export default function LanguageSelector() {
  const [selected, setSelected] = useState("en");
  const [ready, setReady] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("kk-language");
      if (saved && languages.some(([code]) => code === saved)) setSelected(saved);
    } catch {
      // Language selection still works for this session if storage is blocked.
    }
  }, []);

  const initTranslate = useCallback(() => {
    const w = window as GoogleTranslateWindow;
    if (!w.google?.translate?.TranslateElement) return;
    const mount = () => {
      const node = document.getElementById("kk-google-translate");
      if (node && !node.dataset.initialized) {
        new w.google!.translate!.TranslateElement(
          { pageLanguage: "en", autoDisplay: false, includedLanguages: languages.map(([code]) => code).filter(code => code !== "en").join(",") },
          "kk-google-translate",
        );
        node.dataset.initialized = "true";
        setReady(true);
        const saved = window.localStorage.getItem("kk-language") || "en";
        if (saved !== "en") window.setTimeout(() => applyLanguage(saved), 300);
      }
    };
    mount();
  }, []);

  const applyLanguage = (language: string) => {
    setSelected(language);
    try { window.localStorage.setItem("kk-language", language); } catch {}
    document.documentElement.lang = language;
    const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (combo) {
      combo.value = language === "en" ? "" : language;
      combo.dispatchEvent(new Event("change", { bubbles: true }));
    } else if (language !== "en") {
      // Google Translate may initialize slightly after the selector is used.
      window.setTimeout(() => {
        const retry = document.querySelector<HTMLSelectElement>(".goog-te-combo");
        if (retry) {
          retry.value = language;
          retry.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }, 500);
    } else {
      document.cookie = "googtrans=/en/en; path=/; max-age=31536000; SameSite=Lax";
      window.location.reload();
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLocaleLowerCase();
    return languages.filter(([code, name]) => !q || name.toLocaleLowerCase().includes(q) || code.toLowerCase().includes(q));
  }, [search]);

  return (
    <>
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
        onReady={() => {
          (window as GoogleTranslateWindow).googleTranslateElementInit = initTranslate;
          initTranslate();
        }}
        onError={() => setReady(false)}
      />
      <div className="fixed right-3 top-3 z-[100] flex items-center gap-2 sm:right-5 sm:top-4">
        <label htmlFor="kk-language-select" className="sr-only">Choose website language</label>
        <select
          id="kk-language-select"
          value={selected}
          onChange={(event) => applyLanguage(event.target.value)}
          className="max-w-[145px] rounded-xl border border-slate-300 bg-white/95 px-3 py-2 text-sm font-medium text-slate-800 shadow-md outline-none backdrop-blur focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:max-w-[190px]"
          aria-label="Choose website language"
        >
          {filtered.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
        </select>
        <div id="kk-google-translate" className="hidden" aria-hidden="true" />
        <span className="sr-only" aria-live="polite">{ready ? "Translation ready" : "Loading translation service"}</span>
      </div>
      <details className="sr-only">
        <summary>Search languages</summary>
        <input value={search} onChange={event => setSearch(event.target.value)} aria-label="Search languages" />
      </details>
    </>
  );
}
