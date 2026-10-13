# KaamKitPro Razorpay staging lifecycle verification

This runbook is for the isolated Cloudflare Workers Free staging deployment only.

## Safety rules

- Use Razorpay **Test Mode** credentials and test subscriptions only.
- Target only `https://kaamkitpro-staging.ankitkd550.workers.dev/api/billing/webhook`.
- Never paste API secrets, webhook secrets, payment IDs, signatures, or customer data into GitHub issues, chat, screenshots, or logs.
- Do not enable live payments, change production DNS/domains, deploy to Vercel production, or merge the feature PR as part of this procedure.
- Staging currently disables ads and should remain isolated from production.
- An existing staging test subscription is active. Do not cancel it as part of verification; use a separate disposable Test Mode subscription only if a lifecycle test genuinely requires cancellation.

## 1. Confirm staging runtime configuration

In the Cloudflare dashboard, open the `kaamkitpro-staging` Worker and inspect the configured secret names (do not reveal their values). The following server-only values must be present and belong to Razorpay Test Mode:

- `RAZORPAY_KEY_ID` — test key beginning `rzp_test_`
- `RAZORPAY_KEY_SECRET` — matching test-mode secret
- `RAZORPAY_WEBHOOK_SECRET` — a webhook secret configured for the staging webhook endpoint
- `RAZORPAY_MODE=test`
- `RAZORPAY_LIVE_PAYMENTS_ENABLED=false`

If a secret is missing, do not attempt checkout. Add/update it only in the staging Worker secret settings; never place secret values in source code or repository files.

## 2. Configure the Test Mode webhook

In the Razorpay Dashboard, switch to **Test Mode** and confirm the webhook URL is exactly:

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

The staging Test Mode monthly and annual plans have already been configured for the proposed ₹99/month and ₹699/year offerings. Before creating any new test subscription, verify in the Razorpay **Test Mode** dashboard that the configured provider plan IDs still match the intended amount and billing interval, and that the staging app's plan records are active and mapped to those IDs. Do not modify production data or activate a production plan as a shortcut.

## 4. Run the provider-backed test lifecycle

Use an authorized staging test account and Razorpay Test Mode only:

1. Sign in and choose a staging plan after confirming recurring-payment consent.
2. If testing a new subscription, verify checkout creates a local subscription in `incomplete` state and does not grant Pro access yet.
3. Complete the Razorpay Test Mode authorization/payment using provider-supported test credentials.
4. Confirm a correctly signed `subscription.activated` or `subscription.charged` webhook is accepted and the subscription becomes `active` only when the provider period end is valid.
5. In Razorpay's Test Mode webhook delivery/retry UI, replay the same provider event. Confirm it is acknowledged as a duplicate and does not apply the state change twice.
6. The automated live-staging regression now verifies that an invalid webhook signature returns HTTP 401 and that signed-out checkout, subscription lookup, payment verification, and cancellation return HTTP 401. For provider-backed confirmation, inspect the dashboard delivery result without sharing the signature or payload.
7. Do not cancel the already-active test subscription. If cancellation/terminal-state verification is required, create a separate disposable Test Mode subscription first, then schedule cancellation using the account UI/API and confirm the provider accepts the request.
8. For the disposable subscription only, confirm a terminal cancellation/completion event updates state and a later delayed activation event cannot reopen a cancelled/expired subscription.
9. Confirm an unknown event type is safely ignored for entitlement changes, using a provider-generated test event if available.

Do not simulate provider-signed events by inventing signatures. Use the Razorpay Test Mode dashboard's webhook delivery/retry mechanism or a provider-generated test event.

## 5. Evidence and exit criteria

Record only non-sensitive outcomes: timestamp, event type, HTTP status, and resulting subscription status. Do not store credentials, signatures, or full webhook payloads.

The lifecycle gate is complete only after all of these are verified:

- Test key/mode restriction passes.
- Correct provider signature is accepted; invalid signature is rejected.
- Duplicate event is idempotent.
- Activation and renewal/charge event update the active period correctly.
- Scheduled cancellation and terminal state are reflected correctly on a disposable test subscription.
- Delayed events cannot reopen terminal subscriptions.
- Free/Pro entitlement matches the server-verified subscription state.

Passing GitHub build/browser regression tests alone does **not** prove this provider-level lifecycle has been completed.
