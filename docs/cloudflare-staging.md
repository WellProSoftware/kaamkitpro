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

The Worker preview workflow is manually dispatched and requires `deploy_to_workers_dev=true`; it will fail safely before deploying if the Cloudflare account ID and API token are not available as GitHub Actions secrets. Put secret values in GitHub repository Actions secrets—never paste tokens into issues, source files, or chat.

## Authentication integration

A public staging Worker can exercise the unauthenticated routes without credentials. A real magic-link, grant/revoke, and authenticated quota test requires a separate non-production Supabase project, configured with the staging callback URL and staging-only environment variables. Do not use the production Supabase service-role key or production database for grant/revoke tests. This repository workflow does not create a Supabase project or change Supabase Auth redirect settings.
