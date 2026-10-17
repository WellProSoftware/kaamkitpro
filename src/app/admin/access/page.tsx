"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import BrandLogo from "@/components/BrandLogo";

type Grant = {
  id: string;
  target_email: string;
  access_type: "full_pro" | "pro" | "selected_tools";
  tool_keys: string[];
  starts_at: string;
  expires_at: string | null;
  reason: string;
  note: string | null;
  revoked_at: string | null;
  created_at: string;
};

const accessLabels: Record<Grant["access_type"], string> = {
  full_pro: "Full Pro — no ads, bypass normal quotas",
  pro: "Pro — no ads, Pro quotas",
  selected_tools: "Selected tools only",
};

export default function AdminAccessPage() {
  const [email, setEmail] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [accessType, setAccessType] = useState<Grant["access_type"]>("full_pro");
  const [duration, setDuration] = useState("permanent");
  const [expiresAt, setExpiresAt] = useState("");
  const [reason, setReason] = useState("special_user");
  const [toolKeys, setToolKeys] = useState("");
  const [note, setNote] = useState("");
  const [grants, setGrants] = useState<Grant[]>([]);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadGrants(searchEmail = "") {
    setLoading(true);
    setError("");
    try {
      const query = searchEmail.trim() ? `?email=${encodeURIComponent(searchEmail.trim())}` : "";
      const response = await fetch(`/api/admin/access${query}`, { cache: "no-store" });
      const data = await response.json().catch(() => ({}));
      if (response.status === 401) {
        window.location.replace("/login");
        return;
      }
      if (!response.ok) throw new Error(data.error || "Unable to load access grants.");
      setGrants(Array.isArray(data.grants) ? data.grants : []);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load access grants.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadGrants();
  }, []);

  async function createGrant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const payload: Record<string, unknown> = {
        email,
        access_type: accessType,
        duration,
        reason,
        note,
        tool_keys: toolKeys.split(",").map((value) => value.trim()).filter(Boolean),
      };
      if (duration === "custom" && expiresAt) payload.expires_at = new Date(expiresAt).toISOString();
      const response = await fetch("/api/admin/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Could not grant access.");
      setMessage(`Access granted to ${email.trim().toLowerCase()}.`);
      setEmail("");
      setNote("");
      setToolKeys("");
      await loadGrants();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not grant access.");
    } finally {
      setBusy(false);
    }
  }

  async function revokeGrant(grant: Grant) {
    if (!window.confirm(`Revoke ${grant.access_type.replace("_", " ")} access for ${grant.target_email}?`)) return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/admin/access", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: grant.id }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Could not revoke access.");
      setMessage(`Access revoked for ${grant.target_email}.`);
      await loadGrants(filterEmail);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not revoke access.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <header className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4">
          <BrandLogo />
          <nav className="flex items-center gap-4 text-sm font-semibold">
            <Link href="/account" className="text-blue-700 hover:underline">Account</Link>
            <Link href="/" className="text-slate-600 hover:text-slate-900">Home</Link>
          </nav>
        </header>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Admin tools</p>
          <h1 className="mt-2 text-3xl font-extrabold">Grant user access</h1>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Give a specific account complimentary access without creating a payment or changing its Razorpay subscription. Only allowlisted admin accounts can use this page.
          </p>

          <form onSubmit={createGrant} className="mt-7 grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold">
              User email
              <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="user@example.com" className="min-h-12 rounded-xl border border-slate-300 px-3 font-normal outline-none focus:border-blue-500" />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Access type
              <select value={accessType} onChange={(event) => setAccessType(event.target.value as Grant["access_type"])} className="min-h-12 rounded-xl border border-slate-300 px-3 font-normal">
                <option value="full_pro">Full Pro — no ads, bypass normal quotas</option>
                <option value="pro">Pro — no ads, Pro quotas</option>
                <option value="selected_tools">Selected tools only</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Duration
              <select value={duration} onChange={(event) => setDuration(event.target.value)} className="min-h-12 rounded-xl border border-slate-300 px-3 font-normal">
                <option value="permanent">Lifetime — until revoked</option>
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="custom">Custom expiry</option>
              </select>
            </label>
            {duration === "custom" ? (
              <label className="grid gap-2 text-sm font-semibold">
                Expiry date and time
                <input required type="datetime-local" value={expiresAt} onChange={(event) => setExpiresAt(event.target.value)} className="min-h-12 rounded-xl border border-slate-300 px-3 font-normal" />
              </label>
            ) : null}
            <label className="grid gap-2 text-sm font-semibold">
              Reason
              <select value={reason} onChange={(event) => setReason(event.target.value)} className="min-h-12 rounded-xl border border-slate-300 px-3 font-normal">
                <option value="special_user">Special user / friend</option>
                <option value="testing">Testing / QA</option>
                <option value="support">Customer support / goodwill</option>
                <option value="other">Other</option>
              </select>
            </label>
            {accessType === "selected_tools" ? (
              <label className="grid gap-2 text-sm font-semibold md:col-span-2">
                Tool keys (comma-separated)
                <input required value={toolKeys} onChange={(event) => setToolKeys(event.target.value)} placeholder="pdf-merge, image-resize" className="min-h-12 rounded-xl border border-slate-300 px-3 font-normal" />
                <span className="font-normal text-slate-500">Use the exact tool keys registered in the central policy.</span>
              </label>
            ) : null}
            <label className="grid gap-2 text-sm font-semibold md:col-span-2">
              Admin note (optional)
              <textarea value={note} onChange={(event) => setNote(event.target.value)} maxLength={500} rows={2} placeholder="Why is this access being granted?" className="rounded-xl border border-slate-300 p-3 font-normal" />
            </label>
            <div className="md:col-span-2">
              <button disabled={busy} className="min-h-12 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700 disabled:opacity-60">
                {busy ? "Saving…" : "Grant access"}
              </button>
            </div>
          </form>

          {error ? <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p> : null}
          {message ? <p role="status" className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p> : null}
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">Recent access grants</h2>
              <p className="mt-1 text-sm text-slate-600">Search by email or review the latest 50 grants.</p>
            </div>
            <form onSubmit={(event) => { event.preventDefault(); void loadGrants(filterEmail); }} className="flex gap-2">
              <input type="email" value={filterEmail} onChange={(event) => setFilterEmail(event.target.value)} placeholder="Filter by email" className="min-h-10 min-w-0 rounded-lg border border-slate-300 px-3 text-sm" />
              <button className="rounded-lg border border-slate-300 px-3 text-sm font-semibold hover:border-blue-400">Search</button>
            </form>
          </div>
          {loading ? <p role="status" className="mt-5 text-sm text-slate-600">Loading grants…</p> : null}
          {!loading && grants.length === 0 ? <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">No access grants found.</p> : null}
          <div className="mt-5 space-y-3">
            {grants.map((grant) => {
              // eslint-disable-next-line react-hooks/purity
              const expired = grant.expires_at ? Date.parse(grant.expires_at) <= Date.now() : false;
              const inactive = Boolean(grant.revoked_at) || expired;
              return (
                <article key={grant.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="break-all font-bold">{grant.target_email}</p>
                      <p className="mt-1 text-sm text-slate-600">{accessLabels[grant.access_type]}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {grant.expires_at ? `Expires ${new Date(grant.expires_at).toLocaleString()}` : "Lifetime"} · {grant.reason.replace("_", " ")}
                      </p>
                      {grant.tool_keys?.length ? <p className="mt-1 break-words text-xs text-slate-500">Tools: {grant.tool_keys.join(", ")}</p> : null}
                      {grant.note ? <p className="mt-2 text-sm text-slate-600">{grant.note}</p> : null}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${inactive ? "bg-slate-100 text-slate-600" : "bg-emerald-100 text-emerald-800"}`}>
                        {grant.revoked_at ? "Revoked" : expired ? "Expired" : "Active"}
                      </span>
                      {!inactive ? <button disabled={busy} onClick={() => void revokeGrant(grant)} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-50 disabled:opacity-60">Revoke</button> : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
