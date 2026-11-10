"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Vendor = { id: string; name: string };
type Item = { id: string; name: string; quantity: string; rates: Record<string, string> };

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const money = (value: number) => value.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 });

export default function VendorQuotationComparisonPage() {
  const [vendors, setVendors] = useState<Vendor[]>([
    { id: "vendor-a", name: "Vendor A" },
    { id: "vendor-b", name: "Vendor B" },
    { id: "vendor-c", name: "Vendor C" },
  ]);
  const [items, setItems] = useState<Item[]>([
    { id: "item-1", name: "Sample item", quantity: "10", rates: { "vendor-a": "100", "vendor-b": "95", "vendor-c": "105" } },
  ]);
  const [gstRate, setGstRate] = useState("12");
  const [discounts, setDiscounts] = useState<Record<string, string>>({});
  const [freight, setFreight] = useState<Record<string, string>>({});

  const totals = useMemo(() => vendors.map((vendor) => {
    const subtotal = items.reduce((sum, item) => sum + Math.max(0, Number(item.quantity) || 0) * Math.max(0, Number(item.rates[vendor.id]) || 0), 0);
    const discount = Math.min(subtotal, Math.max(0, Number(discounts[vendor.id]) || 0));
    const taxable = subtotal - discount;
    const gst = taxable * Math.max(0, Number(gstRate) || 0) / 100;
    const shipping = Math.max(0, Number(freight[vendor.id]) || 0);
    return { id: vendor.id, subtotal, discount, taxable, gst, freight: shipping, total: taxable + gst + shipping };
  }), [vendors, items, gstRate, discounts, freight]);

  const lowest = totals.length ? Math.min(...totals.map((entry) => entry.total)) : 0;
  const updateItem = (id: string, patch: Partial<Item>) => setItems((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  const updateRate = (itemId: string, vendorId: string, value: string) => setItems((current) => current.map((item) => item.id === itemId ? { ...item, rates: { ...item.rates, [vendorId]: value } } : item));

  const exportCsv = () => {
    const rows = [
      ["Vendor", "Subtotal", "Discount", "Taxable Value", "GST", "Freight", "Grand Total"],
      ...totals.map((entry) => [vendors.find((vendor) => vendor.id === entry.id)?.name || "", entry.subtotal, entry.discount, entry.taxable, entry.gst, entry.freight, entry.total].map(String)),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "kaamkitpro-vendor-comparison.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <Link href="/tools" className="text-sm font-medium text-blue-600 hover:underline">← All tools</Link>
        <header className="mt-5 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Hospital Procurement</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Vendor Quotation Comparison</h1>
          <p className="mt-3 leading-7 text-slate-600">Compare supplier unit rates, quantities, discounts, GST and freight to estimate the total landed cost side by side.</p>
        </header>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div><h2 className="text-lg font-semibold">Quotation inputs</h2><p className="mt-1 text-sm text-slate-500">Enter comparable rates before making a procurement decision.</p></div>
            <button type="button" onClick={exportCsv} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50">Export comparison CSV</button>
          </div>

          <div className="mt-6 flex flex-wrap items-end gap-4">
            <div className="min-w-48 flex-1">
              <label htmlFor="gst-rate" className="block text-sm font-medium text-slate-700">GST rate applied to all items</label>
              <select id="gst-rate" value={gstRate} onChange={(event) => setGstRate(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5">
                <option value="0">0%</option><option value="5">5%</option><option value="12">12%</option><option value="18">18%</option><option value="28">28%</option>
              </select>
            </div>
            <button type="button" onClick={() => setItems((current) => [...current, { id: makeId(), name: "", quantity: "1", rates: {} }])} className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">+ Add item</button>
            <button type="button" onClick={() => setVendors((current) => [...current, { id: makeId(), name: `Vendor ${current.length + 1}` }])} disabled={vendors.length >= 6} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 disabled:opacity-40">+ Add vendor</button>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-sm">
              <thead><tr className="bg-slate-50 text-left"><th className="p-3 font-semibold">Item / SKU</th><th className="w-28 p-3 font-semibold">Quantity</th>{vendors.map((vendor) => <th key={vendor.id} className="min-w-40 p-3"><input aria-label={`${vendor.name} name`} value={vendor.name} onChange={(event) => setVendors((current) => current.map((entry) => entry.id === vendor.id ? { ...entry, name: event.target.value } : entry))} className="w-full rounded-md border border-slate-300 bg-white px-2 py-2 font-semibold" /></th>)}</tr></thead>
              <tbody>{items.map((item) => <tr key={item.id} className="border-t border-slate-200">
                <td className="p-3"><input aria-label="Item name" value={item.name} onChange={(event) => updateItem(item.id, { name: event.target.value })} placeholder="Item name or SKU" className="w-full rounded-md border border-slate-300 px-2 py-2" /></td>
                <td className="p-3"><input aria-label="Quantity" type="number" min="0" value={item.quantity} onChange={(event) => updateItem(item.id, { quantity: event.target.value })} className="w-full rounded-md border border-slate-300 px-2 py-2" /></td>
                {vendors.map((vendor) => <td key={vendor.id} className="p-3"><input aria-label={`${vendor.name} unit rate`} type="number" min="0" step="0.01" value={item.rates[vendor.id] || ""} onChange={(event) => updateRate(item.id, vendor.id, event.target.value)} placeholder="Unit rate ₹" className="w-full rounded-md border border-slate-300 px-2 py-2" /></td>)}
              </tr>)}</tbody>
            </table>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vendors.map((vendor) => {
              const total = totals.find((entry) => entry.id === vendor.id)!;
              return <div key={vendor.id} className={`rounded-xl border p-4 ${total.total === lowest && lowest > 0 ? "border-emerald-400 bg-emerald-50" : "border-slate-200 bg-white"}`}>
                <div className="flex items-center justify-between gap-2"><h3 className="font-semibold">{vendor.name || "Unnamed vendor"}</h3>{total.total === lowest && lowest > 0 && <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-800">Lowest total</span>}</div>
                <label className="mt-4 block text-xs font-medium text-slate-600">Discount amount (₹)</label>
                <input type="number" min="0" value={discounts[vendor.id] || ""} onChange={(event) => setDiscounts((current) => ({ ...current, [vendor.id]: event.target.value }))} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
                <label className="mt-3 block text-xs font-medium text-slate-600">Freight / delivery (₹)</label>
                <input type="number" min="0" value={freight[vendor.id] || ""} onChange={(event) => setFreight((current) => ({ ...current, [vendor.id]: event.target.value }))} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
                <dl className="mt-4 space-y-2 border-t border-slate-200 pt-3 text-sm">
                  <div className="flex justify-between"><dt className="text-slate-500">Subtotal</dt><dd>{money(total.subtotal)}</dd></div>
                  <div className="flex justify-between"><dt className="text-slate-500">Discount</dt><dd>− {money(total.discount)}</dd></div>
                  <div className="flex justify-between"><dt className="text-slate-500">GST ({gstRate}%)</dt><dd>{money(total.gst)}</dd></div>
                  <div className="flex justify-between"><dt className="text-slate-500">Freight</dt><dd>{money(total.freight)}</dd></div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 font-bold"><dt>Estimated total</dt><dd>{money(total.total)}</dd></div>
                </dl>
              </div>;
            })}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm leading-6 text-blue-950">
          <h2 className="font-semibold">Calculation notes</h2>
          <p className="mt-2">Estimated total = (quantity × unit rate − discount) + GST on the discounted item value + freight. Freight is added after GST in this comparison. Confirm each supplier&apos;s tax treatment, freight taxability, unit of measure, pack size, brand, specification, delivery terms and quote validity before issuing a purchase order.</p>
          <p className="mt-2">This tool compares the figures entered; it does not verify supplier credentials, product equivalence, regulatory compliance or quotation authenticity. For mixed GST rates, enter and compare items in separate rate groups.</p>
        </section>
      </div>
    </main>
  );
}
