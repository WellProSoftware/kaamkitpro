# Cloudflare Workers Free staging

This migration is deliberately isolated to the `cloudflare/vinext-staging` branch. Do not merge it into `main` or attach the production domain during the staging phase.

## Scope and safety

- The Worker is intended to use its own `workers.dev` staging address with a separate `staging` environment.
- Do not add `kaamkitpro.com`, a custom domain, or production routes to this Worker.
- This branch keeps the canonical SEO origin on `https://kaamkitpro.com`, but Preview/Cloudflare staging builds emit `noindex,nofollow` metadata and disallow crawling in `robots.txt`.
- `public/ads.txt` is preserved. The browser tests intercept the remote AdSense script; CI does not execute third-party ads or generate ad requests.
- Paid plans stay `planned`. All tests only send unauthenticated checkout requests, which must return 401; no Razorpay API request is issued.
- Sensitive Supabase operations are not tested against production data. Grant/revoke tests in this workflow are unauthenticated negative tests only.

## Cloudflare free-tier choices

The initializer is configured without a KV data-cache namespace or Cloudflare Images. The staging deploy command must be used with the `staging` environment and preview mode. It must not use custom domains or production routes.

Keep usage within the Workers Free limits published at <https://developers.cloudflare.com/workers/platform/limits/>. The validation workflow does not deploy a Worker and does not consume Cloudflare request quotas.

## Validation steps

The staging workflow:
1. Runs `vinext check` and saves its output as an artifact.
2. Initializes vinext non-destructively with the Cloudflare target and no KV/Images add-ons.
3. Builds with `npm run build:vinext`.
4. Runs the existing login/access/utility/SEO regression suite plus `tests/cloudflare-vinext.spec.mjs` against the Vite preview runtime.
5. Commits generated source config and the package lock to this staging branch, not to `main`.

The latest staging validation, including Tailwind CSS plugin setup, passed build, TypeScript, lint, Next.js build and browser checks. This commit requests a new deployment of that validated code to the `kaamkitpro-staging` Worker only. Keep it on the account's `workers.dev` subdomain; do not create custom domains or routes. Put secret values in GitHub repository Actions secrets—never paste tokens into issues, source files, or chat.

## Authentication integration

A public staging Worker can exercise the unauthenticated routes without credentials. A real magic-link, grant/revoke, and authenticated quota test requires a separate non-production Supabase project, configured with the staging callback URL and staging-only environment variables. Do not use the production Supabase service-role key or production database for grant/revoke tests. This repository workflow does not create a Supabase project or change Supabase Auth redirect settings.

### Explicit staging deployment trigger

The `cloudflare-vinext-staging` branch can deploy only to the isolated `kaamkitpro-staging` Worker on `workers.dev`. Normal pushes run validation only. A maintainer can request deployment using the exact `[deploy-staging]` commit-message marker; the deploy job waits for validation to succeed and rejects generated Worker configs containing custom routes or domains. Never add production domains or DNS routes to this staging Worker.

### Tailwind styling parity fix

The staging Vite configuration explicitly registers `@tailwindcss/vite` so `@import "tailwindcss"` is compiled during the vinext build. Revalidate the generated styles and visual layout on the workers.dev staging site before considering migration ready. Production Vercel remains unchanged.


## Isolated staging authentication (October 2026)

- Dedicated Supabase project: `KaamKitPro-Staging` (`stcahnjwonfcuzevfmyg`) in `ap-south-1`.
- Its database is initialized with the existing subscription, access-grant/tool-limit, and webhook-lease migrations. No production rows or keys were copied.
- The staging deploy workflow binds only this project's public URL and publishable key to the `kaamkitpro-staging` Worker. These are public client configuration values, not service-role credentials.
- In Supabase Dashboard for `KaamKitPro-Staging`, Authentication → URL Configuration, set the Site URL to `https://kaamkitpro-staging.ankitkd550.workers.dev` and add `https://kaamkitpro-staging.ankitkd550.workers.dev/auth/callback` to Redirect URLs. Do not change production project's Auth settings.
- Authenticated grant/revoke and metered quota still require a staging-only service-role key stored as a Worker secret and a staging-only admin allowlist. Never copy the production service-role key. Until that is configured, do not treat those privileged flows as verified.
