# Subscription billing foundation

This repository now has a database migration for the planned KaamKitPro Pro subscriptions. It does **not** activate checkout or grant paid access.

## Proposed plan records

- Pro Monthly: ₹99/month (9,900 paise), status `planned`
- Pro Yearly: ₹699/year (69,900 paise), status `planned`

The migration deliberately leaves both plans inactive. Do not change them to `active` until paid features, customer terms, cancellation/refund policy, merchant approval, and verified server-side payment processing are ready.

## Setup

1. Create a Supabase project for KaamKitPro.
2. Apply `supabase/migrations/20261011000000_subscription_billing.sql` using the Supabase SQL migration workflow.
3. Add server-only environment variables in Vercel for the production and preview environments when the integration is implemented:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `RAZORPAY_WEBHOOK_SECRET`
4. Never commit real credentials, put service-role/payment secrets in browser-exposed `NEXT_PUBLIC_*` variables, or share secrets in chat.
5. Before accepting payments, implement authenticated checkout creation, server-side Razorpay signature validation, webhook signature validation, idempotent event handling, subscription entitlement checks, cancellation/refund flows, and tests for forged/duplicate/out-of-order webhooks.

## Data model and access

- `subscription_plans`: public read access only for plans explicitly marked active.
- `subscriptions`: authenticated users can read their own subscription status; clients cannot write subscription state.
- `payment_events`: no client access; webhook events must be processed server-side.
- Webhook delivery is treated as at-least-once, so `provider_event_id` is unique.

The migration stores proposed plans as `planned` and does not implement a checkout endpoint or unlock any Pro feature.
