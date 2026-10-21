"use client";

import { useMemo, useState, type FormEvent } from "react";
import BrandLogo from "@/components/BrandLogo";

type PurchaseTool = {
  name: string;
  description: string;
  category: string;
  access: "Free" | "Pro";
  icon: string;
  href: string;
};

const purchaseTools: PurchaseTool[] = [
  {
    name: "Margin & MRP Calculator",
    description: "Calculate purchase cost, margin, markup and suggested MRP.",
    category: "Calculators",
    access: "Free",
    icon: "％",
    href: "#demo",
  },
  {
    name: "Expiry & Stock Alert",
    description: "Organize batches, expiry dates and low-stock follow-ups.",
    category: "Inventory",
    access: "Free",
    icon: "◷",
    href: "#demo",
  },
  {
    name: "Reorder Level Calculator",
    description: "Estimate reorder points using lead time and average demand.",
    category: "Inventory",
    access: "Free",
    icon: "↻",
    href: "#demo",
  },
  {
    name: "Item Matcher",
    description: "Compare product names, pack sizes and item lists.",
    category: "Data tools",
    access: "Free",
    icon: "⌕",
    href: "#demo",
  },
  {
    name: "Vendor Quotation Comparison",
    description: "Compare vendor rates, taxes, discounts and final landed cost.",
    category: "Procurement",
    access: "Pro",
    icon: "⇄",
    href: "#pricing",
  },
  {
    name: "Purchase Order Tracker",
    description: "Keep PO status, expected delivery dates and follow-ups together.",
    category: "Procurement",
    access: "Pro",
    icon: "▤",
    href: "#pricing",
  },
  {
    name: "Price History & Rate Contracts",
    description: "Review past rates and track contract validity and changes.",
    category: "Procurement",
    access: "Pro",
    icon: "↗",
    href: "#pricing",
  },
  {
    name: "Bulk Item Matcher",
    description: "Plan large catalogue matching and bulk comparison workflows.",
    category: "Data tools",
    access: "Pro",
    icon: "▦",
    href: "#pricing",
  },
];

const categories = ["All tools", "Calculators", "Inventory", "Procurement", "Data tools"];

const faqs = [
  {
    question: "Is this a live purchasing or inventory system?",
    answer:
      "Not yet. This page is a concept preview to gather interest. Live inventory, purchase-order records and reminders will only be offered after the workflows and data protections are implemented and tested.",
  },
  {
    question: "Will my vendor rates and purchase data be private?",
    answer:
      "The planned product will need clear access controls, secure storage and a published privacy policy before real business data is collected. Do not upload confidential purchase data to this concept page.",
  },
  {
    question: "Can I try the tools for free?",
    answer:
      "The proposed Free plan includes selected basic tools and limited records. The final limits will be confirmed before launch.",
  },
  {
    question: "How will the Hospital / Team plan work?",
    answer:
      "The proposed team plan is for up to five users with shared procurement workflows. Shared access and permissions still need to be implemented and validated.",
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path d="M4.2 10h11.3M10.2 4.7l5.3 5.3-5.3 5.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5 shrink-0">
      <path d="m4.5 10.4 3.4 3.4 7.7-7.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PharmaPurchaseConceptPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All tools");
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formMessage, setFormMessage] = useState("");

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();
    return purchaseTools.filter((tool) => {
      const categoryMatches = category === "All tools" || tool.category === category;
      const queryMatches =
        !query ||
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query);
      return categoryMatches && queryMatches;
    });
  }, [search, category]);

  const proPrice = billing === "monthly" ? "₹499" : "₹4,990";
  const teamPrice = billing === "monthly" ? "₹3,999" : "₹39,990";

  function handleDemoSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormMessage(
      "Preview only: this form is not connected yet, so no information has been sent or saved.",
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f8f7] text-slate-900">
      <div className="bg-[#102c2a] px-4 py-2 text-center text-xs font-semibold tracking-wide text-emerald-100 sm:text-sm">
        CONCEPT PREVIEW · No live payments · No business data is collected
      </div>

      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <BrandLogo />
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 lg:flex">
            <a href="#tools" className="transition hover:text-emerald-700">Tools</a>
            <a href="#how-it-works" className="transition hover:text-emerald-700">How it works</a>
            <a href="#pricing" className="transition hover:text-emerald-700">Pricing</a>
            <a href="#faq" className="transition hover:text-emerald-700">FAQs</a>
          </nav>
          <a
            href="#demo"
            className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800"
          >
            Request a demo <ArrowIcon />
          </a>
        </div>
      </header>

      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_45%),linear-gradient(180deg,#ffffff_0%,#f6f8f7_100%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-24 lg:pt-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Built for pharma procurement
            </div>
            <h1 className="mt-6 max-w-2xl text-4xl font-black leading-[1.08] tracking-tight text-[#102c2a] sm:text-5xl lg:text-6xl">
              Smarter pharma purchasing.
              <span className="mt-2 block text-emerald-700">Less spreadsheet chaos.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Compare vendor quotations, keep an eye on expiry and stock, and bring everyday purchase calculations into one focused workspace.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#tools" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-0.5 hover:bg-emerald-800">
                Explore purchase tools <ArrowIcon />
              </a>
              <a href="#pricing" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 font-bold text-slate-800 transition hover:border-emerald-400 hover:text-emerald-800">
                Compare plans
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
              <span className="inline-flex items-center gap-2"><CheckIcon /> Start with selected free tools</span>
              <span className="inline-flex items-center gap-2"><CheckIcon /> Designed for desktop and mobile</span>
            </div>
            <p className="mt-5 text-xs leading-5 text-slate-500">
              Product concept only. Tools, account features, reminders, exports and shared workspaces are not represented as live services yet.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-emerald-200/40 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white bg-white p-4 shadow-2xl shadow-slate-900/10 sm:p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-700">Procurement overview</p>
                  <h2 className="mt-1 text-lg font-extrabold text-slate-900">Your purchase desk</h2>
                </div>
                <div className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800">Preview UI</div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[#eff8f3] p-4">
                  <div className="flex items-center justify-between text-emerald-800"><span className="text-xs font-semibold">Stock watch</span><span className="text-lg">◷</span></div>
                  <p className="mt-3 text-2xl font-black text-[#102c2a]">Expiry</p>
                  <p className="mt-1 text-xs text-slate-600">Batch and date overview</p>
                </div>
                <div className="rounded-2xl bg-[#f3f4ff] p-4">
                  <div className="flex items-center justify-between text-indigo-700"><span className="text-xs font-semibold">Vendor rates</span><span className="text-lg">⇄</span></div>
                  <p className="mt-3 text-2xl font-black text-slate-900">Compare</p>
                  <p className="mt-1 text-xs text-slate-600">Quotation comparison concept</p>
                </div>
              </div>
              <div className="mt-4 rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div><p className="text-sm font-bold text-slate-900">Sample quotation comparison</p><p className="mt-1 text-xs text-slate-500">Illustrative data · Not real vendor prices</p></div>
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-800">DEMO</span>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="mb-1.5 flex justify-between text-xs"><span className="font-semibold text-slate-700">Vendor A</span><span className="font-bold text-slate-900">₹12,400</span></div>
                    <div className="h-2 rounded-full bg-slate-100"><div className="h-2 w-[72%] rounded-full bg-emerald-600" /></div>
                  </div>
                  <div>
                    <div className="mb-1.5 flex justify-between text-xs"><span className="font-semibold text-slate-700">Vendor B</span><span className="font-bold text-slate-900">₹13,150</span></div>
                    <div className="h-2 rounded-full bg-slate-100"><div className="h-2 w-[86%] rounded-full bg-indigo-500" /></div>
                  </div>
                  <div>
                    <div className="mb-1.5 flex justify-between text-xs"><span className="font-semibold text-slate-700">Vendor C</span><span className="font-bold text-slate-900">₹11,980</span></div>
                    <div className="h-2 rounded-full bg-slate-100"><div className="h-2 w-[65%] rounded-full bg-teal-500" /></div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#102c2a] p-4 text-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl">✦</div>
                <div><p className="text-sm font-bold">One clearer purchase workflow</p><p className="mt-1 text-xs text-emerald-100">Plan, compare and follow up — in one place.</p></div>
              </div>
            </div>
            <div className="absolute -right-3 top-10 hidden rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-xl sm:block">
              <p className="text-xs font-semibold text-slate-500">Designed for</p><p className="mt-1 text-sm font-extrabold text-[#102c2a]">Purchase teams</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-emerald-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-7 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            ["01", "Calculate", "Margins, MRP and reorder levels"],
            ["02", "Monitor", "Expiry dates and stock signals"],
            ["03", "Compare", "Vendor rates and quotations"],
            ["04", "Organize", "Purchase orders and rate history"],
          ].map(([number, title, description]) => (
            <div key={number} className="flex gap-3">
              <span className="text-sm font-black text-emerald-700">{number}</span>
              <div><p className="font-extrabold text-slate-900">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{description}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">The toolkit</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#102c2a] sm:text-4xl">Tools for the work behind every purchase</h2>
            <p className="mt-4 leading-7 text-slate-600">Start with quick calculations, then explore the proposed inventory and procurement workflows.</p>
          </div>
          <label className="block w-full lg:max-w-sm">
            <span className="sr-only">Search purchase tools</span>
            <div className="flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3.5 shadow-sm focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100">
              <span className="text-lg text-slate-400">⌕</span>
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search purchase tools..." className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
            </div>
          </label>
        </div>

        <div className="mt-7 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button key={item} type="button" onClick={() => setCategory(item)} className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-bold transition ${category === item ? "bg-[#102c2a] text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-800"}`}>
              {item}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {filteredTools.map((tool, index) => (
            <article key={tool.name} className="group flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-950/5">
              <div className="flex items-start justify-between gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl font-bold ${index % 3 === 0 ? "bg-emerald-50 text-emerald-800" : index % 3 === 1 ? "bg-indigo-50 text-indigo-700" : "bg-amber-50 text-amber-700"}`}>{tool.icon}</div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${tool.access === "Free" ? "bg-emerald-50 text-emerald-800" : "bg-slate-100 text-slate-700"}`}>{tool.access}</span>
              </div>
              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">{tool.category}</p>
              <h3 className="mt-2 text-lg font-extrabold leading-snug text-slate-900">{tool.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{tool.description}</p>
              <a href={tool.href} className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-800 transition group-hover:gap-3">
                {tool.access === "Free" ? "Explore concept" : "See Pro plan"} <ArrowIcon />
              </a>
            </article>
          ))}
        </div>
        {filteredTools.length === 0 && <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><p className="font-bold text-slate-900">No matching tools</p><p className="mt-2 text-sm text-slate-500">Try a different search or category.</p></div>}
        <p className="mt-5 text-xs leading-5 text-slate-500">These are proposed tools and navigation concepts. The links lead to this preview&apos;s relevant sections until individual tools are built.</p>
      </section>

      <section id="how-it-works" className="bg-[#102c2a] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">A calmer workflow</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">From scattered sheets to a clearer process</h2>
            <p className="mt-4 leading-7 text-emerald-50/75">The goal is not another complicated ERP. It is a practical set of purchase tools that can grow with the team&apos;s needs.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["01", "Bring the details together", "Use focused tools for item lists, stock dates, calculations and vendor quotes."],
              ["02", "Make comparisons clearer", "Review total cost and key differences before making a purchasing decision."],
              ["03", "Keep follow-ups visible", "The planned Pro workflow adds history, reminders and purchase-order tracking."],
            ].map(([number, title, description]) => (
              <div key={number} className="rounded-2xl border border-white/10 bg-white/[0.06] p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/15 text-sm font-black text-emerald-200">{number}</span>
                <h3 className="mt-5 text-lg font-extrabold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-emerald-50/70">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Simple proposed plans</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#102c2a] sm:text-4xl">Start free. Upgrade when work grows.</h2>
          <p className="mt-4 leading-7 text-slate-600">Concept pricing for discussion only. No checkout, subscription or payment is active on this page.</p>
          <div className="mt-6 inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            <button type="button" onClick={() => setBilling("monthly")} className={`rounded-lg px-4 py-2 text-sm font-bold ${billing === "monthly" ? "bg-[#102c2a] text-white" : "text-slate-600 hover:text-slate-900"}`}>Monthly</button>
            <button type="button" onClick={() => setBilling("yearly")} className={`rounded-lg px-4 py-2 text-sm font-bold ${billing === "yearly" ? "bg-[#102c2a] text-white" : "text-slate-600 hover:text-slate-900"}`}>Yearly · 2 months free</button>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <article className="flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-sm font-extrabold text-slate-900">Free</p>
            <p className="mt-3 text-4xl font-black tracking-tight text-[#102c2a]">₹0<span className="text-sm font-semibold text-slate-500"> / forever</span></p>
            <p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">Try essential calculations and a small set of purchase tools.</p>
            <a href="#demo" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:border-emerald-400">Join the waitlist</a>
            <ul className="mt-7 space-y-3 text-sm text-slate-600">
              {["Margin & MRP Calculator", "Reorder Level Calculator", "Basic expiry list (proposed limit)", "Limited item matching", "Ads may appear on eligible content pages"].map((feature) => <li key={feature} className="flex gap-2"><CheckIcon /><span>{feature}</span></li>)}
            </ul>
          </article>

          <article className="relative flex flex-col rounded-3xl border-2 border-emerald-700 bg-white p-7 shadow-xl shadow-emerald-950/10 lg:-translate-y-2">
            <div className="absolute right-5 top-5 rounded-full bg-emerald-700 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white">Proposed popular</div>
            <p className="text-sm font-extrabold text-emerald-800">Pro · Single user</p>
            <p className="mt-3 text-4xl font-black tracking-tight text-[#102c2a]">{proPrice}<span className="text-sm font-semibold text-slate-500"> / {billing === "monthly" ? "month" : "year"}</span></p>
            <p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">For buyers who need more records, comparisons and reporting.</p>
            <a href="#demo" className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-800">Request early access <ArrowIcon /></a>
            <ul className="mt-7 space-y-3 text-sm text-slate-600">
              {["All proposed purchase tools", "Higher or unlimited record limits (to be confirmed)", "Vendor quotation comparison", "Planned Excel/PDF exports", "Planned history and reminders", "Ad-free experience when subscription is verified"].map((feature) => <li key={feature} className="flex gap-2"><CheckIcon /><span>{feature}</span></li>)}
            </ul>
          </article>

          <article className="flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-sm font-extrabold text-slate-900">Hospital / Team</p>
            <p className="mt-3 text-4xl font-black tracking-tight text-[#102c2a]">{teamPrice}<span className="text-sm font-semibold text-slate-500"> / {billing === "monthly" ? "month" : "year"}</span></p>
            <p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">For small purchase teams that need shared visibility.</p>
            <a href="#demo" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:border-emerald-400">Request a team demo</a>
            <ul className="mt-7 space-y-3 text-sm text-slate-600">
              {["Up to 5 users (proposed)", "Shared PO tracker (planned)", "Shared vendor and item records (planned)", "Priority support (planned)", "Ad-free experience for verified team members"].map((feature) => <li key={feature} className="flex gap-2"><CheckIcon /><span>{feature}</span></li>)}
            </ul>
          </article>
        </div>
        <p className="mt-6 text-center text-xs leading-5 text-slate-500">Yearly concept price is ten monthly payments for twelve months of access. Final prices, taxes, limits and features must be confirmed before launch.</p>
      </section>

      <section id="faq" className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Good to know</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#102c2a] sm:text-4xl">Questions, answered clearly.</h2>
            <p className="mt-4 leading-7 text-slate-600">This preview separates the proposed experience from features that are not live yet.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="rounded-2xl border border-slate-200 bg-[#fbfcfb]">
                <button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-extrabold text-slate-900">
                  <span>{faq.question}</span><span className="text-xl text-emerald-700">{openFaq === index ? "−" : "+"}</span>
                </button>
                {openFaq === index && <p className="px-5 pb-5 text-sm leading-7 text-slate-600">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="scroll-mt-24 bg-[#eaf4ee]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">Help shape the product</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#102c2a] sm:text-4xl">Tell us what your purchase desk needs.</h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-600">We are exploring a simpler way to handle pharmaceutical purchase work. Share what would be most useful so the first release focuses on real workflows.</p>
            <div className="mt-7 space-y-3 text-sm font-semibold text-slate-700">
              <p className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-emerald-800">✓</span> No payment is required for this preview.</p>
              <p className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-emerald-800">✓</span> Do not enter confidential vendor or patient data.</p>
            </div>
          </div>
          <form onSubmit={handleDemoSubmit} className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-bold text-slate-700">Your name<input required name="name" autoComplete="name" placeholder="Name" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 font-normal outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100" /></label>
              <label className="text-sm font-bold text-slate-700">Work email<input required type="email" name="email" autoComplete="email" placeholder="you@company.com" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 font-normal outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100" /></label>
              <label className="text-sm font-bold text-slate-700 sm:col-span-2">Organization type<select name="organization" defaultValue="" required className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 font-normal outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"><option value="" disabled>Select one</option><option>Hospital / Clinic</option><option>Pharmacy</option><option>Pharma distributor</option><option>Purchase department</option><option>Other</option></select></label>
              <label className="text-sm font-bold text-slate-700 sm:col-span-2">What would help most?<textarea name="needs" rows={3} placeholder="For example: quotation comparison, expiry alerts, purchase order follow-up..." className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100" /></label>
            </div>
            <button type="submit" className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#102c2a] px-5 py-3 font-extrabold text-white transition hover:bg-emerald-900">Preview demo request <ArrowIcon /></button>
            <p className="mt-3 text-xs leading-5 text-slate-500">Prototype only: submission is not connected to email or a database. No form data is transmitted or saved.</p>
            {formMessage && <p role="status" className="mt-4 rounded-xl bg-amber-50 p-3 text-sm font-semibold leading-6 text-amber-900">{formMessage}</p>}
          </form>
        </div>
      </section>

      <footer className="bg-[#0b211f] text-slate-300">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
          <div><div className="inline-flex rounded-xl bg-white px-3 py-2"><BrandLogo compact /></div><p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">KaamKitPro Pharma Purchase Tools is a concept for clearer everyday procurement workflows.</p></div>
          <div><h3 className="font-extrabold text-white">Explore</h3><div className="mt-4 flex flex-col gap-3 text-sm"><a href="#tools" className="hover:text-white">Purchase tools</a><a href="#pricing" className="hover:text-white">Proposed plans</a><a href="#faq" className="hover:text-white">FAQs</a></div></div>
          <div><h3 className="font-extrabold text-white">KaamKitPro</h3><div className="mt-4 flex flex-col gap-3 text-sm"><a href="/" className="hover:text-white">Existing tools homepage</a><a href="/about" className="hover:text-white">About</a><a href="/privacy-policy" className="hover:text-white">Privacy policy</a><a href="/contact" className="hover:text-white">Contact</a></div></div>
        </div>
        <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-500">© 2026 KaamKitPro · Developed by A.K. Dheer · Pharma purchase page concept</div>
      </footer>
    </main>
  );
}
