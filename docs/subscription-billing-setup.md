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


## Access grants and usage limits

The migration `supabase/migrations/20261012000000_access_grants_and_tool_limits.sql` adds separate admin-issued access grants and daily tool usage counters. Apply this migration in the Supabase SQL Editor before testing the new routes.

### Admin grant panel

- Route: `/admin/access`
- Server-only allowlist: `KAAMKITPRO_ADMIN_EMAILS`, a comma-separated list of verified Supabase account email addresses.
- The admin must be signed in. The server checks the Supabase user token and then checks the email allowlist; hiding the page is not the security boundary.
- Grant types: `full_pro` (all tools, no ads, bypass normal quotas), `pro` (no ads and Pro quotas), and `selected_tools` (named tool keys).
- Duration: permanent until revoked, 30 days, 90 days, or a custom expiry.
- Every grant has a reason, optional note, creator, timestamps, and a revocation timestamp. Grants never create a payment event or mutate a Razorpay subscription.
- Set `KAAMKITPRO_ADMIN_EMAILS` in Vercel for each environment that needs admin access. Do not put this variable in a `NEXT_PUBLIC_*` variable.

### Tool access policy and quota API

- Central policy registry: `src/lib/tool-access-policy.ts`. Add each new tool to the registry and choose a tier. Unknown low-cost browser tools default to Free so a tool is not unexpectedly paywalled.
- Metered usage API: `POST /api/tools/usage` with `{ "tool_key": "pdf-merge", "action": "check" }` to check quota, or `action: "consume"` to atomically increment the daily counter.
- Daily counters reset by date in Asia/Kolkata. Metered tools require a signed-in account so the quota is server-tracked. Tool execution handlers must call this API before execution and only consume quota for a real operation; client-only calls are not a security boundary for expensive server work.
- Current browser-only PDF, image, calculator, text and SEO tools remain Free because processing happens on the visitor's device. Proposed limits apply to hosted AI (3/day), cloud processing (2/day), and hosted conversion (3/day); Pro quotas are higher. Tune these values from actual usage and provider cost data.
- `GET /api/access` resolves the user's current plan, complimentary grant and ad eligibility. AdSense script loading is skipped for signed-in Pro/granted users and excluded from login/account/admin pages; entitlement checks fail closed when the access API cannot verify the state.

### Rollout checklist

1. Apply the new migration in Supabase.
2. Add `KAAMKITPRO_ADMIN_EMAILS` to Vercel with the admin's verified Supabase email, for the environments where the admin panel will be used.
3. Redeploy after CI passes; Vercel deployment may remain blocked by deployment quota.
4. Test grant creation, expiry, revocation, selected tool access, Free limits, Pro limits, and AdSense gating in Preview.
5. Wire quota checks into each metered tool's actual execution path before treating that tool's limits as enforced. The shared quota endpoint and policy registry are the foundation; they do not automatically intercept every existing browser-only tool.
6. Keep Razorpay plans in `planned` status until checkout, signatures, webhook idempotency, cancellation/refund behavior and entitlement tests are complete.
