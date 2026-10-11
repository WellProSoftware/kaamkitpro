# KaamKitPro

**Har Digital Kaam, Ek Jagah.** KaamKitPro is a collection of free online utilities for PDFs, images, calculators, text, SEO, social media, and developer workflows.

**Live website:** https://kaamkitpro.com

## Features

- **PDF tools:** merge, split, rotate, convert, compress, extract text, add page numbers and watermarks, and edit metadata.
- **Image tools:** compress, resize, convert, crop, rotate, flip, and apply basic image effects.
- **Calculators:** percentage, GST, EMI, age, BMI, and SIP.
- **Text tools:** word and character counters, case conversion, and extra-space removal.
- **SEO and social tools:** meta tag and description generators, keyword density, slug and sitemap generators, hashtag and YouTube generators, Instagram captions, and Open Graph previews.
- **Developer utilities:** JSON and code formatters, Base64 and URL encoding/decoding, UUIDs, timestamps, hashes, colors, and QR codes.

Tool processing varies by feature; follow the instructions shown on each tool page. PDF password encryption is not currently supported by the browser-side PDF Protect tool, and it will not claim to encrypt a file.

## Run locally

Requirements: Node.js 24.x (or a compatible supported Node.js version) and npm.

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Quality checks

```bash
npx tsc --noEmit
npm run lint
npm run build
```

GitHub Actions also runs CI, browser regression tests, production smoke checks, and scheduled uptime checks.

## Deployment

The production site is deployed on Vercel at https://kaamkitpro.com. Changes merged into `main` are deployed through the connected Vercel Git integration.

## Current monetization and staging policy

- Keep currently available tools free to use; advertising is the intended initial revenue model.
- Paid plans, checkout, and payment collection stay disabled until payment onboarding is ready and explicitly approved.
- AdSense delivery depends on Google approval and serving; the publisher line in `public/ads.txt` alone does not guarantee ads or revenue.
- Cloudflare validation/deployment is isolated to the `cloudflare/vinext-staging` branch and the `kaamkitpro-staging` Worker on `workers.dev`. Never add production domains or routes to this workflow.
- A staging deployment is gated behind successful build, compatibility, TypeScript, lint, and browser checks, and must be explicitly requested with the `[deploy-staging]` commit marker or the workflow's manual deployment input.

## Privacy and support

Review the site's [Privacy Policy](https://kaamkitpro.com/privacy-policy), [Terms and Conditions](https://kaamkitpro.com/terms), and [Disclaimer](https://kaamkitpro.com/disclaimer). For support, contact support@kaamkitpro.com.

## Staging security regression tests

The Cloudflare Workers Free staging workflow validates authenticated daily quota enforcement (three allowed uses, then HTTP 429) and Admin Access grant/revoke using disposable Supabase staging identities. These tests run only against the isolated `kaamkitpro-staging` Worker and clean up temporary test identities; they do not authorize or deploy production changes.
