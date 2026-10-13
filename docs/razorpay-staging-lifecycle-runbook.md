# KaamKitPro Razorpay staging lifecycle verification

This runbook is for the isolated Cloudflare Workers Free staging deployment only.

## Safety rules

- Use Razorpay **Test Mode** credentials and test subscriptions only.
- Target only `https://kaamkitpro-staging.ankitkd550.workers.dev/api/billing/webhook`.
- Never paste API secrets, webhook secrets, payment IDs, signatures, or customer data into GitHub issues, chat, screenshots, or logs.
- Do not enable live payments, change production DNS/domains, deploy to Vercel production, or merge the feature PR as part of this procedure.
- Staging currently disables ads and should remain isolated from production.

## 1. Confirm staging runtime configuration

In the Cloudflare dashboard, open the `kaamkitpro-staging` Worker and inspect the configured secret names (do not reveal their values). The following server-only values must be present and belong to Razorpay Test Mode:

- `RAZORPAY_KEY_ID` — test key beginning `rzp_test_`
- `RAZORPAY_KEY_SECRET` — matching test-mode secret
- `RAZORPAY_WEBHOOK_SECRET` — a webhook secret configured for the staging webhook endpoint
- `RAZORPAY_MODE=test`
- `RAZORPAY_LIVE_PAYMENTS_ENABLED=false`

If a secret is missing, do not attempt checkout. Add/update it only in the staging Worker secret settings; never place secret values in source code or repository files.

## 2. Configure the Test Mode webhook

In the Razorpay Dashboard, switch to **Test Mode** and configure the webhook URL exactly as:

`https://kaamkitpro-staging.ankitkd550.workers.dev/api/billing/webhook`

Use the same webhook secret as the staging Worker. Enable the subscription lifecycle events handled by the application:

- `subscription.activated`
- `subscription.charged`
- `subscription.resumed`
- `subscription.halted`
- `subscription.cancelled`
- `subscription.completed`
- `subscription.pending`
- `subscription.paused`

Do not configure the production domain as the destination for this staging webhook.

## 3. Verify plan readiness before checkout

The application seeds the proposed ₹99/month and ₹699/year plans as `planned`, not active. Checkout requires an active plan with a Razorpay `provider_plan_id`. Before testing, verify that the Test Mode plan IDs are configured for staging and match the intended interval/amount. Do not activate plans or change production data as a shortcut.

## 4. Run the test lifecycle

Use an authorized staging test account and Razorpay Test Mode payment flow only:

1. Sign in and choose a staging plan after confirming recurring-payment consent.
2. Verify that checkout creates a local subscription in `incomplete` state and does not grant Pro access yet.
3. Complete the Razorpay Test Mode authorization/payment using provider-supported test credentials.
4. Confirm a correctly signed `subscription.activated` or `subscription.charged` webhook is accepted and the subscription becomes `active` only when the provider period end is valid.
5. Replay the same provider event (or use the dashboard's retry facility). Confirm it is acknowledged as a duplicate and does not apply the state change twice.
6. Send a webhook with an invalid signature in a controlled test; it should be rejected with HTTP 401 and must not change entitlement.
7. Schedule cancellation using the account UI/API. Confirm the provider accepts the request and local state reflects scheduled end-of-period cancellation.
8. Confirm a terminal cancellation/completion event updates state and a later delayed activation event cannot reopen a cancelled/expired subscription.
9. Confirm an unknown event type is safely ignored for entitlement changes.

Do not simulate provider-signed events by inventing signatures. Use the Razorpay Test Mode dashboard's webhook delivery/retry mechanism or a provider-generated test event.

## 5. Evidence and exit criteria

Record only non-sensitive outcomes: timestamp, event type, HTTP status, and resulting subscription status. Do not store credentials, signatures, or full webhook payloads.

The lifecycle gate is complete only after all of these are verified:

- Test key/mode restriction passes.
- Correct signature accepted; invalid signature rejected.
- Duplicate event is idempotent.
- Activation and renewal/charge event update the active period correctly.
- Scheduled cancellation and terminal state are reflected correctly.
- Delayed events cannot reopen terminal subscriptions.
- Free/Pro entitlement matches the server-verified subscription state.

Passing GitHub build/browser regression tests alone does **not** prove this provider-level lifecycle has been completed.
