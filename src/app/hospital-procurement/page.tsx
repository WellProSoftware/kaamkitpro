"use client";

import { useMemo, useState } from "react";

type VendorQuote = {
  id: number;
  vendor: string;
  unitPrice: number;
  discount: number;
  gst: number;
  deliveryDays: number;
  availability: string;
};

type Tab = "overview" | "quotations" | "purchase-orders" | "inventory";

const initialQuotes: VendorQuote[] = [
  { id: 1, vendor: "Apex Med Supplies", unitPrice: 1280, discount: 4, gst: 12, deliveryDays: 2, availability: "In stock" },
  { id: 2, vendor: "CareSource Distributors", unitPrice: 1215, discount: 1, gst: 12, deliveryDays: 4, availability: "In stock" },
  { id: 3, vendor: "Medline Healthcare", unitPrice: 1300, discount: 7, gst: 12, deliveryDays: 1, availability: "Partial stock" },
];

const sampleOrders = [
  { po: "PO-2026-0142", vendor: "Apex Med Supplies", department: "Pharmacy", amount: 68400, status: "Awaiting delivery", due: "12 Nov 2026" },
  { po: "PO-2026-0141", vendor: "CareSource Distributors", department: "ICU", amount: 42850, status: "Approved", due: "14 Nov 2026" },
  { po: "PO-2026-0140", vendor: "Medline Healthcare", department: "Laboratory", amount: 21900, status: "Received", due: "08 Nov 2026" },
];

const sampleInventory = [
  { item: "Nitrile Examination Gloves", sku: "PPE-001", stock: 240, minimum: 100, expiry: "18 Aug 2027", state: "Healthy" },
  { item: "Normal Saline 0.9% 500ml", sku: "IV-014", stock: 42, minimum: 80, expiry: "22 Jan 2027", state: "Reorder" },
  { item: "Surgical Face Masks", sku: "PPE-008", stock: 18, minimum: 60, expiry: "30 Jun 2027", state: "Low stock" },
];

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value);

function landedUnitCost(quote: VendorQuote) {
  return quote.unitPrice * (1 - quote.discount / 100) * (1 + quote.gst / 100);
}

const navItems: { id: Tab; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "▦" },
  { id: "quotations", label: "Quotation comparison", icon: "⇄" },
  { id: "purchase-orders", label: "Purchase orders", icon: "▤" },
  { id: "inventory", label: "Inventory watch", icon: "◷" },
];

export default function HospitalProcurementPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [quotes, setQuotes] = useState(initialQuotes);
  const [quantity, setQuantity] = useState(100);
  const [itemName, setItemName] = useState("Sterile Surgical Gloves (Box of 100)");
  const [notice, setNotice] = useState("");

  const rankedQuotes = useMemo(
    () => [...quotes].sort((a, b) => landedUnitCost(a) - landedUnitCost(b)),
    [quotes],
  );
  const bestQuote = rankedQuotes[0];
  const highestQuote = rankedQuotes[rankedQuotes.length - 1];
  const potentialSaving = bestQuote && highestQuote
    ? (landedUnitCost(highestQuote) - landedUnitCost(bestQuote)) * quantity
    : 0;

  function updateQuote(id: number, field: keyof VendorQuote, value: string) {
    setQuotes((current) =>
      current.map((quote) => {
        if (quote.id !== id) return quote;
        if (field === "vendor" || field === "availability") return { ...quote, [field]: value };
        const numericValue = Number(value);
        const safeValue = Number.isFinite(numericValue) ? Math.max(0, numericValue) : 0;
        if (field === "discount" || field === "gst") {
          return { ...quote, [field]: Math.min(100, safeValue) };
        }
        if (field === "deliveryDays") {
          return { ...quote, deliveryDays: Math.floor(safeValue) };
        }
        return { ...quote, unitPrice: safeValue };
      }),
    );
  }

  function addVendor() {
    setQuotes((current) => [
      ...current,
      { id: Math.max(0, ...current.map((quote) => quote.id)) + 1, vendor: `New Vendor ${current.length - 2}`, unitPrice: 1250, discount: 0, gst: 12, deliveryDays: 3, availability: "Confirm stock" },
    ]);
    setNotice("A sample vendor row was added. Changes are currently held in this browser session only.");
  }

  function exportComparison() {
    const rows = [
      ["Vendor", "Base unit price", "Discount %", "GST %", "Landed unit cost", "Delivery days", "Availability"],
      ...rankedQuotes.map((quote) => [quote.vendor, quote.unitPrice, quote.discount, quote.gst, landedUnitCost(quote).toFixed(2), quote.deliveryDays, quote.availability]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "hospital-vendor-comparison.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    setNotice("Comparison exported as CSV.");
  }

  return (
    <main className="min-h-screen bg-[#f4f7f6] text-slate-900">
      <div className="border-b border-emerald-900/20 bg-[#102c2a] px-4 py-2 text-center text-xs font-semibold tracking-wide text-emerald-100">
        STAGING PRODUCT PREVIEW · SAMPLE DATA ONLY · NO LIVE PAYMENTS
      </div>
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
          <div>
            <a href="/" className="text-sm font-bold text-emerald-800 hover:text-emerald-950">← KaamKitPro</a>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-800 text-xl text-white">✚</div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">KaamKitPro Healthcare</p>
                <h1 className="text-2xl font-black tracking-tight text-[#102c2a] sm:text-3xl">HospitalProcure</h1>
              </div>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">A clearer purchase desk for hospital procurement, vendor rates and stock follow-ups.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">Demo workspace</span>
            <span className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">Sample Hospital · Admin</span>
          </div>
        </header>

        <div className="mt-6 grid gap-5 lg:grid-cols-[245px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <p className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Workspace</p>
            <nav aria-label="Procurement modules" className="grid grid-cols-2 gap-1 sm:grid-cols-4 lg:grid-cols-1">
              {navItems.map((item) => (
                <button key={item.id} type="button" onClick={() => { setActiveTab(item.id); setNotice(""); }} className={`flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${activeTab === item.id ? "bg-emerald-800 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
                  <span className="text-lg" aria-hidden="true">{item.icon}</span><span>{item.label}</span>
                </button>
              ))}
            </nav>
            <div className="mt-5 rounded-xl bg-[#f0f7f3] p-3">
              <p className="text-xs font-bold text-emerald-900">Built for purchase teams</p>
              <p className="mt-1 text-xs leading-5 text-slate-600">Keep quotations, orders and stock signals in one workflow.</p>
            </div>
          </aside>

          <section className="min-w-0">
            {notice && <div role="status" className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">{notice}</div>}

            {activeTab === "overview" && (
              <>
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                  <div><p className="text-sm font-semibold text-emerald-700">Monday, 9 November 2026</p><h2 className="mt-1 text-2xl font-black tracking-tight">Procurement overview</h2><p className="mt-1 text-sm text-slate-500">A quick view of purchasing activity across your hospital.</p></div>
                  <button type="button" onClick={() => setActiveTab("quotations")} className="inline-flex min-h-10 items-center justify-center rounded-xl bg-emerald-800 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-900">Compare quotations →</button>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["Open purchase orders", "12", "3 due this week", "bg-blue-50 text-blue-800"],
                    ["Pending approvals", "04", "Across 2 departments", "bg-amber-50 text-amber-800"],
                    ["Items below reorder", "08", "Needs purchase review", "bg-rose-50 text-rose-800"],
                    ["Tracked vendors", "36", "Across all categories", "bg-emerald-50 text-emerald-800"],
                  ].map(([label, value, detail, tone]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs font-semibold text-slate-500">{label}</p><p className="mt-2 text-3xl font-black tracking-tight">{value}</p><p className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${tone}`}>{detail}</p></div>)}
                </div>
                <div className="mt-5 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between gap-3"><div><h3 className="font-extrabold">Recent purchase orders</h3><p className="mt-1 text-xs text-slate-500">Illustrative workflow records</p></div><button type="button" onClick={() => setActiveTab("purchase-orders")} className="text-xs font-bold text-emerald-800 hover:underline">View all</button></div>
                    <div className="mt-4 space-y-3">{sampleOrders.map((order) => <div key={order.po} className="flex flex-col justify-between gap-2 border-t border-slate-100 pt-3 sm:flex-row sm:items-center"><div><p className="text-sm font-bold">{order.po} <span className="font-normal text-slate-400">· {order.department}</span></p><p className="mt-1 text-xs text-slate-500">{order.vendor} · Due {order.due}</p></div><div className="flex items-center justify-between gap-3 sm:justify-end"><span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${order.status === "Received" ? "bg-emerald-50 text-emerald-800" : order.status === "Approved" ? "bg-blue-50 text-blue-800" : "bg-amber-50 text-amber-800"}`}>{order.status}</span><span className="text-sm font-extrabold">{money(order.amount)}</span></div></div>)}</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h3 className="font-extrabold">Stock requiring attention</h3><p className="mt-1 text-xs text-slate-500">Sample low-stock indicators</p><div className="mt-4 space-y-4">{sampleInventory.filter((item) => item.stock <= item.minimum).map((item) => <div key={item.sku} className="border-t border-slate-100 pt-3"><div className="flex items-start justify-between gap-2"><p className="text-sm font-bold">{item.item}</p><span className="rounded-full bg-rose-50 px-2 py-1 text-[10px] font-bold text-rose-800">{item.state}</span></div><p className="mt-1 text-xs text-slate-500">{item.stock} units left · Reorder at {item.minimum}</p></div>)}</div><button type="button" onClick={() => setActiveTab("inventory")} className="mt-4 text-xs font-bold text-emerald-800 hover:underline">Open inventory watch →</button></div>
                </div>
              </>
            )}

            {activeTab === "quotations" && (
              <>
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold text-emerald-700">Procurement tools</p><h2 className="mt-1 text-2xl font-black tracking-tight">Vendor quotation comparison</h2><p className="mt-1 text-sm text-slate-500">Compare landed unit costs after discount and GST — not just quoted base rates.</p></div><button type="button" onClick={exportComparison} className="min-h-10 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:border-emerald-600 hover:text-emerald-800">↓ Export CSV</button></div>
                <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <div className="grid gap-3 md:grid-cols-[1fr_180px]"><label className="text-xs font-bold text-slate-600">Item / specification<input value={itemName} onChange={(event) => setItemName(event.target.value)} className="mt-1.5 min-h-11 w-full rounded-xl border border-slate-300 px-3 text-sm font-medium text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" /></label><label className="text-xs font-bold text-slate-600">Required quantity<input type="number" min="1" value={quantity} onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))} className="mt-1.5 min-h-11 w-full rounded-xl border border-slate-300 px-3 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" /></label></div>
                  <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[820px] text-left text-sm"><thead><tr className="border-y border-slate-100 text-[11px] uppercase tracking-wide text-slate-500"><th className="py-3 pr-3">Vendor</th><th className="px-2 py-3">Base rate (₹)</th><th className="px-2 py-3">Discount %</th><th className="px-2 py-3">GST %</th><th className="px-2 py-3">Delivery days</th><th className="px-2 py-3">Availability</th><th className="px-2 py-3 text-right">Landed / unit</th></tr></thead><tbody>{rankedQuotes.map((quote, index) => <tr key={quote.id} className="border-b border-slate-100"><td className="py-3 pr-3"><input aria-label={`Vendor name ${quote.id}`} value={quote.vendor} onChange={(event) => updateQuote(quote.id, "vendor", event.target.value)} className="w-44 rounded-lg border border-slate-200 px-2 py-2 text-sm font-semibold outline-none focus:border-emerald-600" />{index === 0 && <span className="ml-2 inline-block rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-800">Lowest cost</span>}</td><td className="px-2 py-3"><input aria-label={`Base rate ${quote.id}`} type="number" min="0" value={quote.unitPrice} onChange={(event) => updateQuote(quote.id, "unitPrice", event.target.value)} className="w-24 rounded-lg border border-slate-200 px-2 py-2 outline-none focus:border-emerald-600" /></td><td className="px-2 py-3"><input aria-label={`Discount ${quote.id}`} type="number" min="0" max="100" value={quote.discount} onChange={(event) => updateQuote(quote.id, "discount", event.target.value)} className="w-20 rounded-lg border border-slate-200 px-2 py-2 outline-none focus:border-emerald-600" /></td><td className="px-2 py-3"><input aria-label={`GST ${quote.id}`} type="number" min="0" value={quote.gst} onChange={(event) => updateQuote(quote.id, "gst", event.target.value)} className="w-20 rounded-lg border border-slate-200 px-2 py-2 outline-none focus:border-emerald-600" /></td><td className="px-2 py-3"><input aria-label={`Delivery days ${quote.id}`} type="number" min="0" value={quote.deliveryDays} onChange={(event) => updateQuote(quote.id, "deliveryDays", event.target.value)} className="w-20 rounded-lg border border-slate-200 px-2 py-2 outline-none focus:border-emerald-600" /></td><td className="px-2 py-3 text-xs text-slate-600">{quote.availability}</td><td className="px-2 py-3 text-right font-extrabold">{money(landedUnitCost(quote))}</td></tr>)}</tbody></table></div>
                  <div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={addVendor} className="min-h-10 rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:border-emerald-600">+ Add vendor</button><button type="button" onClick={() => { setQuotes(initialQuotes); setQuantity(100); setItemName("Sterile Surgical Gloves (Box of 100)"); setNotice("Sample comparison reset."); }} className="min-h-10 rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:border-emerald-600">Reset sample</button></div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4"><p className="text-xs font-bold text-emerald-800">Lowest landed rate</p><p className="mt-2 text-2xl font-black text-emerald-950">{money(landedUnitCost(bestQuote))}</p><p className="mt-1 text-xs text-emerald-800">{bestQuote.vendor}</p></div><div className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-xs font-bold text-slate-500">Estimated order value</p><p className="mt-2 text-2xl font-black">{money(landedUnitCost(bestQuote) * quantity)}</p><p className="mt-1 text-xs text-slate-500">{quantity} × {itemName || "Selected item"}</p></div><div className="rounded-2xl border border-blue-200 bg-blue-50 p-4"><p className="text-xs font-bold text-blue-800">Potential saving vs highest</p><p className="mt-2 text-2xl font-black text-blue-950">{money(potentialSaving)}</p><p className="mt-1 text-xs text-blue-800">Based on entered quotations</p></div></div>
                <p className="mt-3 text-xs leading-5 text-slate-500">Calculation assumes discount is applied before GST. Freight, insurance, other charges, tax exemptions and vendor quality are not included. Verify tax treatment and commercial terms before placing an order.</p>
              </>
            )}

            {activeTab === "purchase-orders" && (
              <><div><p className="text-sm font-semibold text-emerald-700">Order management</p><h2 className="mt-1 text-2xl font-black tracking-tight">Purchase order tracker</h2><p className="mt-1 text-sm text-slate-500">A sample view of PO status, departments and expected deliveries.</p></div><div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">PO number</th><th className="px-4 py-3">Vendor / department</th><th className="px-4 py-3">Expected delivery</th><th className="px-4 py-3">Amount</th><th className="px-4 py-3">Status</th></tr></thead><tbody>{sampleOrders.map((order) => <tr key={order.po} className="border-t border-slate-100"><td className="px-4 py-4 font-bold text-emerald-900">{order.po}</td><td className="px-4 py-4"><p className="font-semibold">{order.vendor}</p><p className="mt-1 text-xs text-slate-500">{order.department}</p></td><td className="px-4 py-4">{order.due}</td><td className="px-4 py-4 font-bold">{money(order.amount)}</td><td className="px-4 py-4"><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold">{order.status}</span></td></tr>)}</tbody></table></div></>
            )}

            {activeTab === "inventory" && (
              <><div><p className="text-sm font-semibold text-emerald-700">Stock control</p><h2 className="mt-1 text-2xl font-black tracking-tight">Inventory & expiry watch</h2><p className="mt-1 text-sm text-slate-500">Review reorder signals and batch expiry dates from one screen.</p></div><div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-xs font-semibold text-slate-500">Tracked sample SKUs</p><p className="mt-2 text-3xl font-black">03</p></div><div className="rounded-2xl border border-rose-200 bg-rose-50 p-4"><p className="text-xs font-semibold text-rose-800">Below reorder level</p><p className="mt-2 text-3xl font-black text-rose-950">02</p></div><div className="rounded-2xl border border-amber-200 bg-amber-50 p-4"><p className="text-xs font-semibold text-amber-800">Expiry review queue</p><p className="mt-2 text-3xl font-black text-amber-950">01</p></div></div><div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">Item</th><th className="px-4 py-3">SKU</th><th className="px-4 py-3">Available</th><th className="px-4 py-3">Reorder level</th><th className="px-4 py-3">Sample expiry</th><th className="px-4 py-3">Signal</th></tr></thead><tbody>{sampleInventory.map((item) => <tr key={item.sku} className="border-t border-slate-100"><td className="px-4 py-4 font-semibold">{item.item}</td><td className="px-4 py-4 text-slate-500">{item.sku}</td><td className="px-4 py-4 font-bold">{item.stock}</td><td className="px-4 py-4">{item.minimum}</td><td className="px-4 py-4">{item.expiry}</td><td className="px-4 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${item.state === "Healthy" ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}>{item.state}</span></td></tr>)}</tbody></table></div></>
            )}
          </section>
        </div>
        <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-500 sm:flex-row"><span>© 2026 KaamKitPro Healthcare · HospitalProcure</span><span>Staging demonstration only. No hospital data is stored or transmitted.</span></footer>
      </div>
    </main>
  );
}
