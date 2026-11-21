"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import BrandLogo from "@/components/BrandLogo";

type SessionUser = { id: string; email: string | null; full_name?: string | null };

export default function SiteHeader() {
  const pathname = usePathname();
  const isPlatformPreview = pathname === "/platform-preview";
  const homeHref = isPlatformPreview ? "/platform-preview" : "/";
  const toolsHref = isPlatformPreview ? "/platform-preview#tools" : "/tools";
  const categoriesHref = isPlatformPreview ? "/platform-preview#tools" : "/#categories";
  const [user, setUser] = useState<SessionUser | null>(null);
  const [access, setAccess] = useState<{ isAdmin?: boolean; isPro?: boolean; plan?: string } | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/session", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) return null;
        return await response.json() as { user?: SessionUser };
      })
      .then(async (result) => {
        if (cancelled) return;
        if (result?.user) {
          setUser(result.user);
          const accessResponse = await fetch("/api/access", { cache: "no-store" }).catch(() => null);
          if (accessResponse?.ok) {
            const accessData = await accessResponse.json().catch(() => ({})) as { isAdmin?: boolean; isPro?: boolean; plan?: string };
            if (!cancelled) setAccess(accessData);
          }
        }
      })
      .catch(() => undefined)
      .finally(() => { if (!cancelled) setLoaded(true); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    function closeOnOutside(event: MouseEvent) {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) setMenuOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  async function signOut() {
    await fetch("/api/auth/session", { method: "DELETE" }).catch(() => undefined);
    window.location.replace(homeHref);
  }

  const displayName = user?.full_name?.trim() || user?.email?.split("@")[0] || "My account";
  const initials = displayName.split(/[\\s._-]+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "U";


  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <BrandLogo href={homeHref} />
        <nav aria-label="Main navigation" className="hidden items-center gap-1 rounded-full bg-slate-50 p-1 text-sm font-semibold text-slate-600 lg:flex">
          <Link href={homeHref} className="hover:text-blue-700">Home</Link>
          <Link href={toolsHref} className="rounded-full px-3 py-2 transition hover:bg-white hover:text-blue-700 hover:shadow-sm">All tools</Link>
          <Link href={categoriesHref} className="rounded-full px-3 py-2 transition hover:bg-white hover:text-blue-700 hover:shadow-sm">Categories</Link>
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1 rounded-full px-3 py-2 transition hover:bg-white hover:text-blue-700 hover:shadow-sm">Solutions <span aria-hidden="true">⌄</span></summary>
            <div className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
              <Link href="/platform-preview#business" className="block rounded-xl p-3 hover:bg-slate-50"><span className="block text-sm font-bold text-slate-900">Business solutions</span><span className="text-xs text-slate-500">Procurement, inventory and operations</span></Link>
              <Link href="/tools/item-master-matcher" className="block rounded-xl p-3 hover:bg-slate-50"><span className="block text-sm font-bold text-slate-900">Item master matcher</span><span className="text-xs text-slate-500">Map healthcare purchase items</span></Link>
              <Link href="/tools/vendor-quotation-comparison" className="block rounded-xl p-3 hover:bg-slate-50"><span className="block text-sm font-bold text-slate-900">Vendor comparison</span><span className="text-xs text-slate-500">Compare supplier quotations</span></Link>
            </div>
          </details>
          <Link href="/platform-preview#products" className="rounded-full px-3 py-2 transition hover:bg-white hover:text-blue-700 hover:shadow-sm">Digital products</Link>
          <Link href="/guides" className="rounded-full px-3 py-2 transition hover:bg-white hover:text-blue-700 hover:shadow-sm">Resources</Link>
          <Link href="/pricing" className="rounded-full px-3 py-2 transition hover:bg-white hover:text-blue-700 hover:shadow-sm">Pricing</Link>
          <Link href="/about" className="rounded-full px-3 py-2 transition hover:bg-white hover:text-blue-700 hover:shadow-sm">About</Link>
          <Link href="/contact" className="rounded-full px-3 py-2 transition hover:bg-white hover:text-blue-700 hover:shadow-sm">Contact</Link>
        </nav>
        <div className="flex items-center gap-2">
          {!loaded ? <span aria-label="Loading account" className="h-10 w-10 animate-pulse rounded-full bg-slate-100" /> : user ? (
            <div className="relative" ref={menuRef}>
              <button type="button" aria-label="Open account menu" aria-haspopup="menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 pr-3 text-sm font-bold text-slate-800 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-100">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-extrabold text-white">{initials}</span>
                <span className="hidden max-w-36 truncate sm:inline">{displayName}</span>
                <span aria-hidden="true" className="text-xs text-slate-500">⌄</span>
              </button>
              {menuOpen ? (
                <div role="menu" className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  <div className="border-b border-slate-100 px-3 py-3">
                    <p className="truncate text-sm font-bold text-slate-900">{displayName}</p>
                    <p className="mt-1 break-all text-xs text-slate-500">{user.email}</p>
                    <div className="mt-2 flex flex-wrap gap-2"><span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">{access?.isAdmin ? "Admin access" : access?.isPro ? "Pro access" : "Free access"}</span></div>
                  </div>
                  <Link role="menuitem" href="/account" onClick={() => setMenuOpen(false)} className="mt-1 flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">My account</Link>
                  <Link role="menuitem" href={toolsHref} onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Browse all tools</Link>
                  {!access?.isPro && !access?.isAdmin ? <Link role="menuitem" href="/pricing" onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center rounded-xl px-3 text-sm font-bold text-blue-700 hover:bg-blue-50">View plans & upgrade</Link> : null}
                  {access?.isAdmin ? <><Link role="menuitem" href="/admin/access" onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Admin access management</Link><Link role="menuitem" href="/admin/support" onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Support inbox</Link></> : null}
                  <div className="my-1 border-t border-slate-100" />
                  <button role="menuitem" type="button" onClick={() => void signOut()} className="flex min-h-11 w-full items-center rounded-xl px-3 text-left text-sm font-bold text-red-700 hover:bg-red-50">Sign out</button>
                </div>
              ) : null}
            </div>
          ) : (
            <>
              <Link href="/login" className="hidden min-h-10 items-center rounded-xl border border-blue-200 px-3 text-sm font-bold text-blue-700 hover:bg-blue-50 sm:inline-flex">Create account</Link>
              <Link href="/login?mode=login" className="inline-flex min-h-10 items-center rounded-xl bg-blue-600 px-4 text-sm font-bold text-white hover:bg-blue-700">Sign in</Link>
            </>
          )}
        </div>
      </div>
      <nav aria-label="Mobile navigation" className="flex gap-2 overflow-x-auto border-t border-slate-100 px-4 py-2 text-xs font-semibold text-slate-600 lg:hidden">
        <Link href={homeHref} className="whitespace-nowrap">Home</Link>
        <Link href={toolsHref} className="whitespace-nowrap rounded-full px-3 py-1.5 transition hover:bg-blue-50 hover:text-blue-700">All tools</Link>
        <Link href={categoriesHref} className="whitespace-nowrap rounded-full px-3 py-1.5 transition hover:bg-blue-50 hover:text-blue-700">Categories</Link>
        <Link href="/platform-preview#business" className="whitespace-nowrap rounded-full px-3 py-1.5 transition hover:bg-blue-50 hover:text-blue-700">Solutions</Link>
        <Link href="/platform-preview#products" className="whitespace-nowrap rounded-full px-3 py-1.5 transition hover:bg-blue-50 hover:text-blue-700">Digital products</Link>
        <Link href="/guides" className="whitespace-nowrap rounded-full px-3 py-1.5 transition hover:bg-blue-50 hover:text-blue-700">Resources</Link>
        <Link href="/pricing" className="whitespace-nowrap rounded-full px-3 py-1.5 transition hover:bg-blue-50 hover:text-blue-700">Pricing</Link>
        <Link href="/about" className="whitespace-nowrap rounded-full px-3 py-1.5 transition hover:bg-blue-50 hover:text-blue-700">About</Link>
        <Link href="/contact" className="whitespace-nowrap rounded-full px-3 py-1.5 transition hover:bg-blue-50 hover:text-blue-700">Contact</Link>
      </nav>
    </header>
  );
}
