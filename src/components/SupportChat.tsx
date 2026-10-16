"use client";

import { FormEvent, useEffect, useState } from "react";

type Language = "en" | "hi";
type Message = { id: string; sender_role: "user" | "admin" | "assistant"; body: string; created_at: string };
type Conversation = { id: string; subject: string; status: string; messages: Message[] };
type ApiConversation = Omit<Conversation, "messages"> & { messages?: Message[]; support_messages?: Message[] };

function normalizeConversation(value: ApiConversation | null | undefined): Conversation | null {
  if (!value) return null;
  const messages = [...(value.messages ?? value.support_messages ?? [])].sort(
    (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at),
  );
  return { id: value.id, subject: value.subject, status: value.status, messages };
}

const copy = {
  en: {
    subtitle: "Help assistant · Admin support",
    refresh: "Refresh",
    greeting: "Hello! What can we help you with today? Ask about login, tools, payments, or your subscription.",
    loginRequired: "Please sign in to save a support ticket.",
    publicTools: "Public tools can be used without signing in.",
    login: "Sign in",
    placeholder: "Type your message…",
    send: "Send",
    sending: "Sending…",
    close: "Close",
    open: "Help / Support",
    tooLong: "Please keep your message under 4,000 characters.",
    loadError: "Support is temporarily unavailable. Please try again shortly.",
    loginFirst: "Please sign in to use support chat.",
    sendError: "Message could not be sent.",
    refreshError: "Could not refresh messages.",
    loginAnswer: "For login issues, check your email and password, then try signing in again. If the issue continues, send us a message here.",
    paymentAnswer: "Check your payment status on the Account page. If Pro has not activated after a successful payment, describe the issue here. Do not share sensitive payment details.",
    toolAnswer: "Refresh the page and try the tool again. If the issue continues, tell us the tool name and the error you see.",
    planAnswer: "Check your plan and subscription status on the Account page. If you have an access or renewal issue, send us a message here.",
    defaultAnswer: "Thanks for your message. We’ve sent it to the support team. An admin reply will appear in this chat.",
  },
  hi: {
    subtitle: "सहायता · एडमिन सपोर्ट",
    refresh: "रिफ्रेश",
    greeting: "नमस्ते! आज हम आपकी कैसे मदद कर सकते हैं? लॉगिन, टूल, पेमेंट या सब्सक्रिप्शन के बारे में पूछें।",
    loginRequired: "सपोर्ट टिकट सेव करने के लिए कृपया लॉगिन करें।",
    publicTools: "पब्लिक टूल बिना लॉगिन के इस्तेमाल कर सकते हैं।",
    login: "लॉगिन करें",
    placeholder: "अपना मैसेज लिखें…",
    send: "भेजें",
    sending: "भेज रहे हैं…",
    close: "बंद करें",
    open: "मदद / सपोर्ट",
    tooLong: "कृपया मैसेज 4,000 अक्षरों से छोटा रखें।",
    loadError: "सपोर्ट अभी उपलब्ध नहीं है। थोड़ी देर बाद फिर कोशिश करें।",
    loginFirst: "सपोर्ट चैट इस्तेमाल करने के लिए कृपया लॉगिन करें।",
    sendError: "मैसेज नहीं भेजा जा सका।",
    refreshError: "मैसेज रिफ्रेश नहीं हो सके।",
    loginAnswer: "लॉगिन की समस्या के लिए अपना ईमेल और पासवर्ड जाँचकर दोबारा कोशिश करें। समस्या बनी रहे तो यहाँ मैसेज भेजें।",
    paymentAnswer: "Account पेज पर पेमेंट स्टेटस देखें। सफल पेमेंट के बाद भी Pro चालू न हो, तो समस्या यहाँ बताएँ। संवेदनशील पेमेंट जानकारी शेयर न करें।",
    toolAnswer: "पेज रिफ्रेश करके टूल दोबारा चलाएँ। समस्या बनी रहे तो टूल का नाम और दिख रहा एरर बताएँ।",
    planAnswer: "Account पेज पर अपना प्लान और सब्सक्रिप्शन स्टेटस देखें। एक्सेस या रिन्यूअल की समस्या हो तो यहाँ मैसेज भेजें।",
    defaultAnswer: "आपके मैसेज के लिए धन्यवाद। इसे सपोर्ट टीम को भेज दिया गया है। एडमिन का जवाब इसी चैट में दिखेगा।",
  },
} as const;

const helpAnswers: Array<{ match: RegExp; key: "loginAnswer" | "paymentAnswer" | "toolAnswer" | "planAnswer" }> = [
  { match: /login|sign.?in|password|लॉग.?इन|पासवर्ड/i, key: "loginAnswer" },
  { match: /payment|razorpay|paid|पेमेंट|भुगतान/i, key: "paymentAnswer" },
  { match: /tool|error|not work|काम नहीं|समस्या/i, key: "toolAnswer" },
  { match: /subscription|pro|plan|सब्सक्रिप्शन/i, key: "planAnswer" },
];

export default function SupportChat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [language, setLanguage] = useState<Language>("en");
  const t = copy[language];

  function changeLanguage(next: Language) {
    setLanguage(next);
    try { localStorage.setItem("kk-support-language", next); } catch { /* Preference remains active for this session. */ }
    setNotice("");
  }

  function toggleChat() {
    if (!open) {
      try {
        const saved = localStorage.getItem("kk-support-language");
        if (saved === "en" || saved === "hi") setLanguage(saved);
      } catch { /* English remains the default when storage is unavailable. */ }
    }
    setOpen(value => !value);
  }

  useEffect(() => {
    if (!open) return;
    let active = true;
    fetch("/api/support", { cache: "no-store" })
      .then(async response => {
        const data = await response.json().catch(() => ({}));
        if (!active) return;
        if (response.status === 401) { setSignedIn(false); return; }
        if (!response.ok) throw new Error(data.error || t.loadError);
        setSignedIn(true);
        if (data.conversation) setConversation(normalizeConversation(data.conversation));
      })
      .catch(() => { if (active) setNotice(t.loadError); });
    return () => { active = false; };
  }, [open, t.loadError]);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = text.trim();
    if (!body || busy) return;
    if (body.length > 4000) { setNotice(t.tooLong); return; }
    setBusy(true); setNotice("");
    const answerKey = helpAnswers.find(item => item.match.test(body))?.key;
    const answer = answerKey ? t[answerKey] : t.defaultAnswer;
    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: body, conversation_id: conversation?.id ?? null, language }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.status === 401) { setSignedIn(false); throw new Error(t.loginFirst); }
      if (!response.ok) throw new Error(data.error || t.sendError);
      setConversation(normalizeConversation(data.conversation));
      setText("");
      setNotice(answer);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : t.sendError);
    } finally { setBusy(false); }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[110] sm:bottom-6 sm:right-6">
      {open ? (
        <section aria-label="KaamKitPro support chat" className="mb-3 flex h-[min(75vh,570px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <header className="flex items-center justify-between bg-slate-900 px-4 py-3 text-white">
            <div><p className="font-bold">KaamKitPro Support</p><p className="text-xs text-slate-300">{t.subtitle}</p></div>
            <div className="flex items-center gap-1">
              <div aria-label="Chat language" className="flex rounded-lg bg-white/10 p-0.5">
                <button type="button" onClick={() => changeLanguage("en")} aria-pressed={language === "en"} className={`rounded-md px-2 py-1.5 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${language === "en" ? "bg-white text-slate-900" : "text-white hover:bg-white/10"}`}>English</button>
                <button type="button" onClick={() => changeLanguage("hi")} aria-pressed={language === "hi"} className={`rounded-md px-2 py-1.5 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${language === "hi" ? "bg-white text-slate-900" : "text-white hover:bg-white/10"}`}>हिंदी</button>
              </div>
              <button type="button" onClick={() => { setNotice(""); fetch("/api/support", { cache: "no-store" }).then(async response => { const data = await response.json().catch(() => ({})); if (!response.ok) throw new Error(data.error || t.refreshError); setConversation(normalizeConversation(data.conversation)); }).catch(error => setNotice(error instanceof Error ? error.message : t.refreshError)); }} aria-label={t.refresh} className="rounded-lg px-2 py-2 text-xs hover:bg-white/10">{t.refresh}</button>
              <button type="button" onClick={() => setOpen(false)} aria-label={t.close} className="rounded-lg px-2 py-2 hover:bg-white/10">✕</button>
            </div>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-3">
            <div className="max-w-[92%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm text-slate-800 shadow-sm">{t.greeting}</div>
            {signedIn === false ? <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">{t.loginRequired} <a href="/login" className="font-bold underline">{t.login}</a>. {t.publicTools}</div> : null}
            {conversation?.messages?.map(message => <div key={message.id} className={message.sender_role === "user" ? "ml-auto max-w-[92%] rounded-2xl rounded-tr-sm bg-blue-600 p-3 text-sm text-white" : "max-w-[92%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm text-slate-800 shadow-sm"}><p className="mb-1 text-[10px] font-bold uppercase opacity-70">{message.sender_role === "user" ? (language === "en" ? "You" : "आप") : message.sender_role === "admin" ? (language === "en" ? "Support team" : "सपोर्ट टीम") : "Assistant"}</p>{message.body}</div>)}
          </div>
          {notice ? <p role="status" className="border-t border-slate-100 px-3 py-2 text-xs text-slate-600">{notice}</p> : null}
          <form onSubmit={send} className="flex gap-2 border-t border-slate-200 p-3">
            <textarea value={text} onChange={event => setText(event.target.value)} maxLength={4000} rows={2} disabled={signedIn === false} placeholder={t.placeholder} aria-label={t.placeholder} className="min-w-0 flex-1 resize-none rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500 disabled:bg-slate-100" />
            <button type="submit" disabled={busy || !text.trim() || signedIn === false} className="self-end rounded-xl bg-blue-600 px-3 py-2 text-sm font-bold text-white disabled:opacity-50">{busy ? t.sending : t.send}</button>
          </form>
        </section>
      ) : null}
      <button type="button" onClick={toggleChat} aria-label={open ? t.close : t.open} className="ml-auto flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 font-bold text-white shadow-xl transition hover:bg-blue-700">
        <span aria-hidden="true">✦</span> {open ? t.close : t.open}
      </button>
    </div>
  );
}
