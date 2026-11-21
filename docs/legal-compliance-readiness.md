# KaamKitPro Legal & Compliance Readiness (Internal)

Last reviewed: 2026-11-21
Scope: staging branch only. This is an engineering checklist, not legal advice or a compliance certificate.

## Changes made in this review
- Privacy Policy now describes the account authentication and signed-in support-chat data flows visible in the application code.
- Privacy Policy identifies Supabase (authentication/database), Cloudflare (hosting/delivery), Google Analytics (opt-in usage measurement) and Google AdSense (where enabled and permitted) as service providers.
- Terms no longer claim that all KaamKitPro branding, code, text and graphics are owned or licensed to KaamKitPro without an asset-by-asset rights audit.
- Disclaimer clarifies that any healthcare inventory/purchasing/stock workflow is administrative only and not clinical decision support.
- Public legal-page update dates changed to 21 November 2026.

## Must resolve before production publication / monetization
- [ ] Confirm the actual website operator's legal identity (individual/proprietorship/company/LLP/other). Domain ownership alone does not establish this.
- [ ] Confirm the operator's valid business/service address and the address, if any, that must be displayed publicly. Do not invent or publish a private home address without the operator's informed choice and legal advice.
- [ ] Determine whether the Consumer Protection (E-Commerce) Rules, 2020 apply to the actual platform and any digital-product/subscription sales. If applicable, complete required seller/operator disclosures, customer-care and grievance details, grievance process and consent/return/refund disclosures.
- [ ] Confirm whether a named grievance officer or other statutory contact is required for the actual services and markets; publish only a real, authorised contact.
- [ ] Have an Indian CA review GST registration, invoicing, place-of-supply, digital products, advertising revenue and cross-border sales based on the actual business structure and revenue streams.
- [ ] Confirm DPDP Act/Rules applicability and phased commencement for the actual data flows; prepare notices, rights-request handling, security safeguards, processor terms and breach response before applicable obligations take effect.
- [ ] Inventory all personal data and processors, including Supabase Auth/database, Cloudflare logs/hosting, Resend/email delivery if active, Google Analytics, AdSense and Razorpay only where the corresponding feature is actually enabled.
- [ ] Establish and document real retention/deletion periods for account records, support conversations, security logs, analytics and backups. The current Privacy Policy explicitly does not publish a fixed schedule; do not claim deletion or automatic expiry until implemented and verified.
- [ ] Verify whether account deletion, support-ticket deletion/export, correction and privacy requests are actually handled end-to-end; add a tested operational process.
- [ ] Verify all file tools' processing paths (browser-only vs server/third-party), temporary-file cleanup, size limits, logging and storage. Update privacy wording to match each actual flow.
- [ ] If any paid product or subscription is enabled, verify checkout disclosures, total price/taxes, recurring-payment mandate/consent, renewal/cancellation, refund/failed-payment handling, invoice and support workflows against actual Razorpay configuration and applicable law. Never run live test charges.
- [ ] Confirm AdSense approval/status, ads.txt, consent requirements, publisher disclosures and actual ad behaviour before enabling production ads. Do not represent approval as granted until verified.
- [ ] Complete a licence/rights audit for source code, npm packages, fonts, icons, images, templates, copy, datasets and APIs. iLovePDF is a UX reference only; do not copy its protected assets or wording.
- [ ] Confirm contact email ownership and monitoring for support@kaamkitpro.com.

## Current code observations (not a full audit)
- The support API requires sign-in, stores the account ID/email on a conversation and stores support-message body and timestamps in the database.
- Account identity is resolved through Supabase Auth; service-side support data uses the Supabase REST API.
- Analytics loads only after the single combined “Accept analytics & ads” choice; the “Essential only” choice disables optional tracking.
- AdSense loader requires the same opt-in, a successful access check and adsEnabled=true; staging and account/admin/auth paths are excluded by the loader.
- Support chat has a 4,000-character message limit and warns users not to share sensitive details, but no public retention schedule or self-service data deletion flow was verified in this review.
- A public email contact is present. A full legal operator identity, service address and grievance details were not established by repository evidence.

## Latest staging validation
- 2026-11-21: Cloudflare/vinext compatibility, Worker build, TypeScript, sitemap coverage, lint, original Next.js build and browser regression suite passed in GitHub Actions run 44888095644.
- The deployment job was intentionally skipped because this run was triggered by a normal push, not an explicit staging-deploy trigger.
- The configured Supabase project reference was independently confirmed in the account project list as `KaamKitPro-Staging`; production Supabase is a separate project and is not the deployment target.
- The workflow's staging deploy gate is restricted to the `kaamkitpro-staging` Worker with no custom routes/domains; Razorpay is forced to Test Mode and live payments are disabled.

## Release gates
- Keep this branch staging-only until CI passes and a staging preview is deployed and smoke-tested.
- Keep production domain/DNS/Worker, production data, production analytics, live AdSense and Razorpay live configuration untouched during this work.
- Do not deploy legal copy that contains placeholders or guessed identity details.
- Do not claim “fully compliant”, certified, registered, trademark-protected or government-approved without evidence and qualified review.
