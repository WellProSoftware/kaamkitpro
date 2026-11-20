"use client";

import { useMemo, useState } from "react";

type Quote = {
  id: number;
  item: string;
  pack: string;
  supplier: string;
  quantity: string;
  unitPrice: string;
  discount: string;
  gst: string;
  freight: string;
};

type QuoteField = Exclude<keyof Quote, "id">;

type CalculatedQuote = {
  quote: Quote;
  key: string;
  taxPerUnit: number;
  landedUnitCost: number;
  totalPayable: number;
};

const createQuote = (id: number): Quote => ({
  id, item: "", pack: "", supplier: "", quantity: "1", unitPrice: "",
  discount: "0", gst: "5", freight: "0",
});

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value);

const normalise = (value: string) => value.trim().toLowerCase().replace(/\s+/g, " ");

export default function VendorQuotationComparisonPage() {
  const [quotes, setQuotes] = useState<Quote[]>([createQuote(1), createQuote(2)]);
  const [nextId, setNextId] = useState(3);
  const [gstTreatment, setGstTreatment] = useState<"extra" | "included">("extra");
  const [notice, setNotice] = useState("");

  const calculated = useMemo<CalculatedQuote[]>(() => quotes.flatMap((quote) => {
    const quantity = Number(quote.quantity);
    const unitPrice = Number(quote.unitPrice);
    const discountRate = Math.min(100, Math.max(0, Number(quote.discount) || 0)) / 100;
    const gstRate = Math.min(100, Math.max(0, Number(quote.gst) || 0)) / 100;
    const freight = Math.max(0, Number(quote.freight) || 0);
    if (!quote.item.trim() || !quote.supplier.trim() || !quote.pack.trim()) return [];
    if (!quote.quantity || !Number.isFinite(quantity) || quantity <= 0) return [];
    if (quote.unitPrice === "" || !Number.isFinite(unitPrice) || unitPrice < 0) return [];

    const discountedPrice = unitPrice * (1 - discountRate);
    const taxPerUnit = gstTreatment === "extra"
      ? discountedPrice * gstRate
      : gstRate > 0 ? (discountedPrice * gstRate) / (1 + gstRate) : 0;
    const landedUnitCost = (gstTreatment === "extra" ? discountedPrice + taxPerUnit : discountedPrice) + freight;
    return [{
      quote,
      key: normalise(quote.item) + "|" + normalise(quote.pack),
      taxPerUnit,
      landedUnitCost,
      totalPayable: landedUnitCost * quantity,
    }];
  }), [quotes, gstTreatment]);

  const lowestByItem = useMemo(() => {
    const values = new Map<string, number>();
    for (const row of calculated) {
      const current = values.get(row.key);
      if (current === undefined || row.landedUnitCost < current) values.set(row.key, row.landedUnitCost);
    }
    return values;
  }, [calculated]);

  function updateQuote(id: number, field: QuoteField, value: string) {
    setQuotes((current) => current.map((quote) => quote.id === id ? { ...quote, [field]: value } : quote));
    setNotice("");
  }

  function addQuote() {
    setQuotes((current) => [...current, createQuote(nextId)]);
    setNextId((current) => current + 1);
    setNotice("");
  }

  function removeQuote(id: number) {
    setQuotes((current) => current.length > 1 ? current.filter((quote) => quote.id !== id) : current);
    setNotice("");
  }

  function exportCsv() {
    if (!calculated.length) {
      setNotice("Add at least one complete supplier quote before exporting.");
      return;
    }
    const headers = ["Item", "Pack / Unit", "Supplier", "Quantity", "Unit Price (INR)", "Discount (%)", "GST (%)", "Freight per Unit (INR)", "GST per Unit (INR)", "Landed Unit Cost (INR)", "Total Payable (INR)", "Lowest Cost"];
    const rows = calculated.map((row) => [
      row.quote.item, row.quote.pack, row.quote.supplier, row.quote.quantity, row.quote.unitPrice,
      row.quote.discount, row.quote.gst, row.quote.freight, row.taxPerUnit.toFixed(2),
      row.landedUnitCost.toFixed(2), row.totalPayable.toFixed(2),
      Math.abs(row.landedUnitCost - (lowestByItem.get(row.key) ?? row.landedUnitCost)) < 0.005 ? "Yes" : "No",
    ]);
    const escapeCell = (value: string | number) => '"' + String(value).replace(/"/g, '""') + '"';
    const csv = [headers, ...rows].map((row) => row.map(escapeCell).join(",")).join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "kaamkitpro-vendor-quotation-comparison.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    setNotice("Comparison exported successfully.");
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Business procurement tool</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Vendor Quotation Comparison</h1>
          <p className="mt-3 text-base leading-7 text-slate-600">Compare supplier offers using discount, GST and freight to estimate the landed cost per unit and total payable amount.</p>
        </div>

        <div className="mt-7 flex flex-col gap-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-bold text-slate-900">GST treatment</p>
            <p className="mt-1 text-xs leading-5 text-slate-600">Discount is applied before GST. Freight is added per unit.</p>
          </div>
          <label className="flex flex-col gap-1 text-sm font-semibold text-slate-700">
            <span>Supplier price</span>
            <select aria-label="GST treatment" value={gstTreatment} onChange={(event) => setGstTreatment(event.target.value as "extra" | "included")} className="min-h-11 min-w-56 rounded-xl border border-slate-300 bg-white px-3 text-sm">
              <option value="extra">GST is extra</option>
              <option value="included">GST is included</option>
            </select>
          </label>
        </div>

        <div className="mt-7 grid gap-4 xl:grid-cols-2">
          {quotes.map((quote, index) => (
            <fieldset key={quote.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <legend className="sr-only">Supplier quote {index + 1}</legend>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-base font-extrabold text-slate-900">Supplier quote {index + 1}</p>
                <button type="button" onClick={() => removeQuote(quote.id)} disabled={quotes.length === 1} className="rounded-lg px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40">Remove</button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-xs font-semibold text-slate-600 sm:col-span-2">
                  Item name
                  <input aria-label={`Item name, quote ${index + 1}`} value={quote.item} onChange={(event) => updateQuote(quote.id, "item", event.target.value)} placeholder="e.g. Paracetamol 500 mg" className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 px-3 text-sm text-slate-900" />
                </label>
                <label className="text-xs font-semibold text-slate-600">
                  Pack / unit
                  <input aria-label={`Pack / unit, quote ${index + 1}`} value={quote.pack} onChange={(event) => updateQuote(quote.id, "pack", event.target.value)} placeholder="e.g. 10 tablets" className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 px-3 text-sm text-slate-900" />
                </label>
                <label className="text-xs font-semibold text-slate-600">
                  Supplier name
                  <input aria-label={`Supplier name, quote ${index + 1}`} value={quote.supplier} onChange={(event) => updateQuote(quote.id, "supplier", event.target.value)} placeholder="Supplier name" className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 px-3 text-sm text-slate-900" />
                </label>
                <label className="text-xs font-semibold text-slate-600">
                  Quantity
                  <input aria-label={`Quantity, quote ${index + 1}`} type="number" min="1" step="1" value={quote.quantity} onChange={(event) => updateQuote(quote.id, "quantity", event.target.value)} className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 px-3 text-sm text-slate-900" />
                </label>
                <label className="text-xs font-semibold text-slate-600">
                  Unit price (INR)
                  <input aria-label={`Unit price, quote ${index + 1}`} type="number" min="0" step="0.01" value={quote.unitPrice} onChange={(event) => updateQuote(quote.id, "unitPrice", event.target.value)} placeholder="0.00" className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 px-3 text-sm text-slate-900" />
                </label>
                <label className="text-xs font-semibold text-slate-600">
                  Discount (%)
                  <input aria-label={`Discount, quote ${index + 1}`} type="number" min="0" max="100" step="0.01" value={quote.discount} onChange={(event) => updateQuote(quote.id, "discount", event.target.value)} className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 px-3 text-sm text-slate-900" />
                </label>
                <label className="text-xs font-semibold text-slate-600">
                  GST (%)
                  <input aria-label={`GST, quote ${index + 1}`} type="number" min="0" max="100" step="0.01" value={quote.gst} onChange={(event) => updateQuote(quote.id, "gst", event.target.value)} className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 px-3 text-sm text-slate-900" />
                </label>
                <label className="text-xs font-semibold text-slate-600 sm:col-span-2">
                  Freight / additional cost per unit (INR)
                  <input aria-label={`Freight per unit, quote ${index + 1}`} type="number" min="0" step="0.01" value={quote.freight} onChange={(event) => updateQuote(quote.id, "freight", event.target.value)} className="mt-1 min-h-11 w-full rounded-xl border border-slate-300 px-3 text-sm text-slate-900" />
                </label>
              </div>
            </fieldset>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={addQuote} className="min-h-11 rounded-xl border border-blue-200 bg-white px-4 text-sm font-bold text-blue-700 hover:bg-blue-50">Add supplier quote</button>
          <button type="button" onClick={exportCsv} disabled={!calculated.length} className="min-h-11 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40">Export comparison CSV</button>
        </div>

        <section className="mt-9 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold text-slate-950">Comparison results</h2>
              <p className="mt-1 text-sm text-slate-500">The lowest landed unit cost is highlighted for each matching item and pack.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">{calculated.length} complete quote{calculated.length === 1 ? "" : "s"}</span>
          </div>
          {calculated.length ? (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[920px] border-collapse text-left text-sm">
                <thead><tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-3 py-3">Item / pack</th><th className="px-3 py-3">Supplier</th><th className="px-3 py-3 text-right">Qty</th><th className="px-3 py-3 text-right">GST / unit</th><th className="px-3 py-3 text-right">Landed / unit</th><th className="px-3 py-3 text-right">Total payable</th><th className="px-3 py-3">Result</th>
                </tr></thead>
                <tbody>
                  {calculated.map((row) => {
                    const best = Math.abs(row.landedUnitCost - (lowestByItem.get(row.key) ?? row.landedUnitCost)) < 0.005;
                    return <tr key={row.quote.id} className={best ? "border-b border-emerald-100 bg-emerald-50/70" : "border-b border-slate-100"}>
                      <td className="px-3 py-3 font-semibold text-slate-900">{row.quote.item}<span className="mt-1 block text-xs font-normal text-slate-500">{row.quote.pack}</span></td>
                      <td className="px-3 py-3 text-slate-700">{row.quote.supplier}</td>
                      <td className="px-3 py-3 text-right tabular-nums">{row.quote.quantity}</td>
                      <td className="px-3 py-3 text-right tabular-nums">{money(row.taxPerUnit)}</td>
                      <td className="px-3 py-3 text-right font-bold tabular-nums">{money(row.landedUnitCost)}</td>
                      <td className="px-3 py-3 text-right tabular-nums">{money(row.totalPayable)}</td>
                      <td className="px-3 py-3">{best ? <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">Lowest landed cost</span> : <span className="text-xs text-slate-500">Compare terms</span>}</td>
                    </tr>;
                  })}
                </tbody>
              </table>
            </div>
          ) : <p className="mt-5 rounded-xl bg-slate-50 p-5 text-sm text-slate-600">Enter the same item and pack details for at least one supplier, then add the quoted price and commercial terms to compare offers.</p>}
          {notice ? <p role="status" className="mt-4 text-sm font-semibold text-blue-700">{notice}</p> : null}
        </section>

        <p className="mt-5 text-xs leading-5 text-slate-500">This calculator compares estimated payable cost using the details entered. It assumes the discount is applied before GST and freight is charged per unit. Confirm pack equivalence, tax eligibility, freight terms, delivery, expiry, quality and supplier conditions before approving a purchase order.</p>
      </section>
    </main>
  );
}
