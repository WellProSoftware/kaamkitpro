# KaamKitPro authentication and subscription billing foundation

The email magic-link sign-in flow is implemented at `/login`, with the callback at `/auth/callback` and the account page at `/account`. Session tokens are validated with Supabase Auth and stored in HttpOnly cookies by the server route `/api/auth/session`. This is an authentication foundation, not a production payment integration.

## Supabase Auth setup

1. In Supabase **Authentication → URL Configuration**, set the Site URL to `https://kaamkitpro.com`.
2. Add these Redirect URLs:
   - `https://kaamkitpro.com/auth/callback`
   - `http://localhost:3000/auth/callback` for local development.
3. Confirm email sign-in / magic links are enabled and your email template uses the standard Supabase confirmation URL. Test the complete email link in the same browser where sign-in was requested.
4. The app needs these public client settings in Vercel and in a local `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
5. The session route validates the access token through Supabase Auth before issuing HttpOnly, SameSite=Lax cookies. It refreshes expired sessions server-side. Never expose the service-role key to browser code.

## Proposed subscription plans

- Pro Monthly: ₹99/month (9,900 paise), status `planned`
- Pro Yearly: ₹699/year (69,900 paise), status `planned`

The migration deliberately leaves both plans inactive. Do not change them to `active` until paid features, customer terms, cancellation/refund policy, merchant approval, and verified server-side payment processing are ready.

## Server-only billing environment

Configure these only as server-side Vercel environment variables when implementing payment processing:

- `SUPABASE_SERVICE_ROLE_KEY`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`

Never commit real credentials, put service-role/payment secrets in browser-exposed `NEXT_PUBLIC_*` variables, or share secrets in chat.

## Database access model

- `subscription_plans`: public read access only for plans explicitly marked active.
- `subscriptions`: authenticated users can read their own subscription status; clients cannot write subscription state.
- `payment_events`: no client access; webhook events must be processed server-side.
- Webhook delivery is treated as at-least-once, so `provider_event_id` is unique.

## Before payments can go live

The current changes do not activate checkout or unlock any Pro feature. Before accepting money, implement and test authenticated checkout creation, server-side Razorpay signature validation, webhook signature validation, idempotent event handling, subscription entitlement checks, cancellation/refund flows, and forged/duplicate/out-of-order webhook cases. Confirm Razorpay merchant and international-payment approval first. Keep plans `planned` until these gates are met.
