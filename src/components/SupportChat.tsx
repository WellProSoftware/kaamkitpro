"use client";

import { FormEvent, useEffect, useState } from "react";

type Message = { id: string; sender_role: "user" | "admin" | "assistant"; body: string; created_at: string };
type Conversation = { id: string; subject: string; status: string; messages: Message[] };

const helpAnswers: Array<{ match: RegExp; answer: string }> = [
  { match: /login|sign.?in|password|लॉग.?इन|पासवर्ड/i, answer: "Login issue ke liye email verify karein, phir password reset karke dobara try karein. Agar issue rahe, message bhejein—support team ko mil jayega." },
  { match: /payment|razorpay|paid|पैमेंट|भुगतान/i, answer: "Payment status account page par check karein. Successful payment ke baad bhi Pro active na ho, to payment reference share kiye bina issue describe karke support request bhejein." },
  { match: /tool|error|not work|काम नहीं|समस्या/i, answer: "Tool ko refresh karke dobara try karein. Agar issue rahe, tool ka naam aur kya error aata hai likhein; admin support ko ticket mil jayega." },
  { match: /subscription|pro|plan|सब्सक्रिप्शन/i, answer: "Plan aur subscription status Account page par dekhein. Access ya renewal mein problem ho to yahin message bhejein." },
];

export default function SupportChat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    if (!open) return;
    let active = true;
    fetch("/api/support", { cache: "no-store" })
      .then(async response => {
        const data = await response.json().catch(() => ({}));
        if (!active) return;
        if (response.status === 401) { setSignedIn(false); return; }
        if (!response.ok) throw new Error(data.error || "Support load failed");
        setSignedIn(true);
        if (data.conversation) setConversation(data.conversation);
      })
      .catch(() => { if (active) setNotice("Support abhi load nahi ho pa raha. Thodi der baad try karein."); });
    return () => { active = false; };
  }, [open]);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = text.trim();
    if (!body || busy) return;
    if (body.length > 4000) { setNotice("Message 4,000 characters se chhota rakhein."); return; }
    setBusy(true); setNotice("");
    const answer = helpAnswers.find(item => item.match.test(body))?.answer
      ?? "Samajh gaya. Maine aapka message support team ke liye bhej diya hai. Admin reply isi chat mein dikh jayega.";
    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: body, conversation_id: conversation?.id ?? null, language: localStorage.getItem("kk-language") || "en" }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.status === 401) { setSignedIn(false); throw new Error("Support chat ke liye pehle sign in karein."); }
      if (!response.ok) throw new Error(data.error || "Message send nahi hua.");
      setConversation(data.conversation);
      setText("");
      setNotice(answer);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Message send nahi hua.");
    } finally { setBusy(false); }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[110] sm:bottom-6 sm:right-6">
      {open ? (
        <section aria-label="KaamKitPro support chat" className="mb-3 flex h-[min(75vh,570px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <header className="flex items-center justify-between bg-slate-900 px-4 py-3 text-white">
            <div><p className="font-bold">KaamKitPro Support</p><p className="text-xs text-slate-300">Help assistant · Admin handoff</p></div>
            <button onClick={() => setOpen(false)} aria-label="Close support chat" className="rounded-lg px-3 py-2 hover:bg-white/10">✕</button>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-3">
            <div className="max-w-[92%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm text-slate-800 shadow-sm">Namaste! Login, tool, payment ya subscription mein kya problem hai? Aap apni language mein message bhej sakte hain.</div>
            {signedIn === false ? <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">Support ticket save karne ke liye <a href="/login" className="font-bold underline">login karein</a>. Public tools bina login use kar sakte hain.</div> : null}
            {conversation?.messages?.map(message => <div key={message.id} className={message.sender_role === "user" ? "ml-auto max-w-[92%] rounded-2xl rounded-tr-sm bg-blue-600 p-3 text-sm text-white" : "max-w-[92%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm text-slate-800 shadow-sm"}><p className="mb-1 text-[10px] font-bold uppercase opacity-70">{message.sender_role === "user" ? "You" : message.sender_role === "admin" ? "Support team" : "Assistant"}</p>{message.body}</div>)}
          </div>
          {notice ? <p role="status" className="border-t border-slate-100 px-3 py-2 text-xs text-slate-600">{notice}</p> : null}
          <form onSubmit={send} className="flex gap-2 border-t border-slate-200 p-3">
            <textarea value={text} onChange={event => setText(event.target.value)} maxLength={4000} rows={2} disabled={signedIn === false} placeholder="Apni problem likhein…" className="min-w-0 flex-1 resize-none rounded-xl border border-slate-300 p-2 text-sm outline-none focus:border-blue-500 disabled:bg-slate-100" />
            <button disabled={busy || !text.trim() || signedIn === false} className="self-end rounded-xl bg-blue-600 px-3 py-2 text-sm font-bold text-white disabled:opacity-50">{busy ? "…" : "Send"}</button>
          </form>
        </section>
      ) : null}
      <button onClick={() => setOpen(value => !value)} aria-label={open ? "Close support chat" : "Open support chat"} className="ml-auto flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 font-bold text-white shadow-xl transition hover:bg-blue-700">
        <span aria-hidden="true">✦</span> {open ? "Close" : "Help / Support"}
      </button>
    </div>
  );
}
