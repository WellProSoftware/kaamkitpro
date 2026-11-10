# HospitalProcure staging MVP

## Scope
This is an isolated first-stage HospitalProcure workspace under KaamKitPro. It adds the route `/hospital-procurement` without changing the existing homepage, free tools, billing, DNS, production Worker, or production database.

## Included in this preview
- Procurement overview with illustrative purchase-order and stock summaries.
- Interactive vendor quotation comparison.
- Landed unit cost calculation using discount before GST.
- Quantity-based order estimate and indicative saving comparison.
- CSV export of the current comparison.
- Sample purchase-order tracker.
- Sample inventory and expiry watch.

## Data and safety boundaries
- All records are hard-coded illustrative sample data.
- Quote edits exist only in component state for the current browser session.
- No backend writes, authentication, hospital tenant records, vendor uploads, email, reminders, or payment integration are active.
- Do not enter real patient, hospital, vendor-confidential, or commercially sensitive data.
- The preview must remain on staging until authentication, tenant isolation, database policies, audit history, backup, and security tests are implemented.

## Calculation
Landed unit cost = base unit price × (1 − discount %) × (1 + GST %). Freight, insurance, additional charges, tax exemptions, and vendor quality are excluded and must be considered before a real purchase decision.

## Next implementation phases
1. Requirements and role matrix (hospital admin, purchase manager, requester, approver, stores).
2. Supabase schema with hospital tenant isolation and row-level security.
3. Item/vendor masters, requisitions, approval workflow, GRN and PO lifecycle.
4. Batch-wise stock, expiry alerts, rate contracts and audit logs.
5. Security review, automated tests, and staging pilot with synthetic data.
