# KaamKitPro Automated Store — Staging Only

## Safety boundary
- This branch is isolated: `business/automated-store-staging`.
- Do not merge to `main`, deploy to production, attach custom domains, or change DNS.
- Do not access or modify production Supabase, production users, live email, AdSense, or live payment configuration.
- The preview must use mock checkout only. No payment gateway, webhook, customer database, or secrets.
- No paid services; use existing free-tier resources only.

## Initial product catalogue (draft)
1. Hospital Purchase Management Kit — PO register, indent tracker, vendor quotation comparison.
2. Pharmacy Inventory & Expiry Kit — stock ledger, expiry alerts, reorder calculations, margin worksheet.
3. Vendor Quotation Comparison — side-by-side vendor comparison and printable summary.
4. Business Financial Projection Kit — editable assumptions, revenue, cost, cash-flow and scenario sheets.

Prices shown in the preview are illustrative and must be approved before any real sale.

## Staging build sequence
1. Create an isolated Cloudflare Workers preview with workers.dev only; no custom domain or production bindings.
2. Build catalogue and product detail pages with sample files / screenshots only.
3. Add mock checkout and simulated delivery to demonstrate the customer journey; do not collect real personal or payment data.
4. Add product documentation, licence, refund/support information and privacy disclosures before any public sale.
5. Test mobile layout, accessibility, broken links and download behaviour.
6. Show the preview to the owner. No production launch without separate explicit approval.

## Initial revenue target
Target ₹30,000–₹50,000 monthly is aspirational, not guaranteed. Track visitors, product-page conversion, paid orders, refunds and net revenue separately. Ad revenue and affiliate income are secondary and depend on eligibility, traffic and partner approval.
