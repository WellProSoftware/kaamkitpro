"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import BrandLogo from "@/components/BrandLogo";

type Message = { id: string; sender_role: string; body: string; created_at: string };
type Ticket = { id: string; user_email: string; subject: string; status: string; language: string; updated_at: string; support_messages: Message[] };

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selected, setSelected] = useState("");
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("waiting_user");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function load() {
    const response = await fetch("/api/admin/support", { cache: "no-store" });
    const data = await response.json().catch(() => ({}));
    if (response.status === 401) { window.location.replace("/login"); return; }
    if (!response.ok) throw new Error(data.error || "Could not load support.");
    setTickets(data.conversations || []);
    setSelected(current => current || data.conversations?.[0]?.id || "");
  }
  useEffect(() => { void load().catch(e => setError(e.message)); }, []);
  const active = tickets.find(ticket => ticket.id === selected);
  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!active || !reply.trim()) return;
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/admin/support", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ conversation_id: active.id, message: reply.trim(), status }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Reply failed.");
      setReply(""); await load();
    } catch (e) { setError(e instanceof Error ? e.message : "Reply failed."); } finally { setBusy(false); }
  }
  return <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6"><div className="mx-auto max-w-6xl">
    <header className="flex items-center justify-between rounded-2xl border bg-white p-4"><BrandLogo /><nav className="flex gap-4 text-sm font-semibold"><Link href="/admin/access" className="text-blue-700">Admin Access</Link><Link href="/account">Account</Link></nav></header>
    <h1 className="mt-7 text-3xl font-extrabold">Customer support</h1><p className="mt-2 text-slate-600">User messages and replies. Only allowlisted admins can access this page.</p>
    {error ? <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}</p> : null}
    <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.5fr)]">
      <section className="space-y-2">{tickets.map(ticket => <button key={ticket.id} onClick={() => setSelected(ticket.id)} className={`block w-full rounded-xl border p-4 text-left ${selected === ticket.id ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white"}`}><span className="block break-all font-bold">{ticket.user_email}</span><span className="mt-1 block text-sm text-slate-600">{ticket.subject}</span><span className="mt-2 inline-block rounded-full bg-slate-100 px-2 py-1 text-xs">{ticket.status} · {ticket.language}</span></button>)}{tickets.length === 0 ? <p className="rounded-xl bg-white p-4 text-sm text-slate-600">No support requests yet.</p> : null}</section>
      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">{active ? <><div className="mb-4 flex flex-wrap items-start justify-between gap-3"><div><h2 className="break-all text-lg font-bold">{active.user_email}</h2><p className="text-sm text-slate-600">{active.subject}</p></div><button onClick={() => void load().catch(e => setError(e.message))} className="rounded-lg border px-3 py-2 text-sm">Refresh</button></div><div className="max-h-[50vh] space-y-3 overflow-y-auto rounded-xl bg-slate-50 p-3">{[...(active.support_messages || [])].sort((a,b) => Date.parse(a.created_at)-Date.parse(b.created_at)).map(message => <article key={message.id} className={`rounded-xl p-3 text-sm ${message.sender_role === "admin" ? "ml-5 bg-blue-100" : "mr-5 bg-white"}`}><p className="mb-1 text-[10px] font-bold uppercase text-slate-500">{message.sender_role}</p><p className="whitespace-pre-wrap">{message.body}</p></article>)}</div><form onSubmit={send} className="mt-4 space-y-3"><textarea value={reply} onChange={e => setReply(e.target.value)} maxLength={4000} rows={3} required placeholder="Write a reply…" className="w-full rounded-xl border border-slate-300 p-3 text-sm" /><div className="flex flex-wrap items-center justify-between gap-3"><select value={status} onChange={e => setStatus(e.target.value)} className="rounded-lg border p-2 text-sm"><option value="waiting_user">Waiting for user</option><option value="resolved">Resolve ticket</option></select><button disabled={busy || !reply.trim()} className="rounded-xl bg-blue-600 px-4 py-3 font-bold text-white disabled:opacity-50">{busy ? "Sending…" : "Send reply"}</button></div></form></> : <p className="text-sm text-slate-600">Select a support request to read and reply.</p>}</section>
    </div>
  </div></main>;
}
