# KaamKitPro isolated staging preview

## Deployment boundary

- Worker name: `kaamkitpro-staging`
- Preview host: `https://kaamkitpro-staging.ankitkd550.workers.dev`
- Deployment target: Cloudflare Workers Free `workers.dev` only
- Wrangler CLI is upgraded to 4.166.0 in the isolated deploy job to avoid the 4.149.0 deployment runtime error
- No custom domains, production routes, DNS records, or production Worker changes
- Staging pages use `noindex/nofollow`; staging `robots.txt` disallows indexing
- AdSense scripts are disabled in staging
- Analytics uses the dedicated staging GA4 measurement ID and loads only after consent

## Data and payment safety

- Supabase URL and server key must authenticate against the staging project before deployment.
- Staging Razorpay mode is Test Mode only. Live payments are explicitly disabled.
- If Test Mode credentials are absent, subscription checkout remains unavailable in preview.
- If Test Mode credentials are present, the workflow verifies the active monthly and yearly plan IDs and amounts against Razorpay Test Mode before deployment.
- Production Supabase, Razorpay live credentials, users, subscriptions, analytics and AdSense configuration are not modified.

## Validation

The staging validation gate passed on the source commit before this deployment trigger:
- Vinext compatibility and build
- TypeScript and lint
- Original Next.js build
- Sitemap coverage
- Browser regression suite: 176 passed, 2 flaky tests passed on retry, 2 skipped
- Preview tool-link smoke checks and English-only UI checks

## Preview scope

The preview lists only tool routes that have an implemented page and pass route checks. The broader production tool set is not deleted or changed by this staging-only curation.
