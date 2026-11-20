# KaamKitPro Professional Platform Blueprint

Status: staging-only planning document. This file does not authorize production deployment.

## Product objective
Build KaamKitPro as a polished, trustworthy, English-first global utility and business-solutions platform. Prioritize usability, search discovery, repeat usage, and sustainable monetization. Do not promise earnings or add paid infrastructure without approval.

## Non-negotiable release controls
- Preserve the currently live kaamkitpro.com experience and its production data.
- Work only on an isolated staging branch and isolated workers.dev preview.
- Keep staging noindex/nofollow and clearly identify it as a preview.
- Do not change production DNS, Worker, database, authentication, users, email, AdSense, analytics, payment settings, or secrets.
- Keep checkout demonstrative/mock only; Razorpay and paid subscriptions remain on hold.
- No production deployment until the owner has reviewed the complete preview and explicitly approved it.

## Information architecture
1. Home
2. Tools
   - PDF
   - Image
   - Calculators
   - Text
   - SEO
   - Social Media
   - Developer
3. Digital Products
   - Templates and spreadsheets
   - Business kits
   - Product detail pages
4. Business Solutions
   - Healthcare and hospital procurement
   - Pharmacy operations
   - Vendor and inventory workflows
5. Resources
   - Practical guides
   - Tool explainers
   - Help and FAQs
6. About
7. Contact / Support
8. Account (only after the existing auth implementation is audited)

Use 5–7 clear desktop top-level destinations. Use grouped dropdowns or a curated mega-menu only where the catalog warrants it. On mobile, use a clear drawer/disclosure menu with a visible close action and accessible touch targets.

## Homepage structure
- Slim announcement/trust strip only when there is a real announcement.
- Header with brand, primary navigation, search, and account entry.
- Focused hero with one clear value proposition, primary search action, and concise supporting copy.
- Popular tools and category discovery.
- Featured digital products with honest previews and clear use cases.
- Business solutions section for higher-value B2B enquiries.
- Helpful guides and educational content.
- Trust, privacy, and workflow explanations grounded in actual product behavior.
- FAQ section with accurate answers.
- Complete footer with legal, contact, help, and sitemap links.

## Design system
- Use a consistent, restrained professional visual language; avoid clutter, excessive gradients, oversized decoration, and inconsistent card styles.
- Establish design tokens for color, typography, spacing, radius, borders, shadows, focus rings, and responsive breakpoints.
- Use a legible type scale, clear heading hierarchy, consistent iconography, strong contrast, and generous whitespace.
- Buttons must have clear labels, consistent variants, hover/focus/disabled/loading states, and real actions.
- Inputs need labels, helpful validation, error and success states, and keyboard support.
- Dropdowns must work with mouse, keyboard, and touch; never rely on hover alone.
- Keep layout responsive across narrow phones, tablets, laptops, and wide desktop screens.

## Tool directory and tool pages
- Provide search, category filters, clear result counts, empty states, and useful sorting.
- Each tool page should explain purpose, supported inputs/formats, privacy behavior, step-by-step use, limitations, and relevant FAQs.
- Keep the actual tool workflow prominent; do not bury it under ads or long SEO text.
- Add related tools and useful internal links.
- Preserve existing working tools; do not remove a tool unless testing proves it is broken and the owner approves removal.
- Add accessible upload/drop zones, progress, cancel/retry where applicable, and clear download/result actions.

## Digital product experience
- Dedicated product detail pages with audience, problem solved, included files, screenshots/previews, compatibility, instructions, FAQs, and transparent pricing.
- Cart/checkout/delivery must remain mock-only until a separately approved payment implementation is ready.
- No fake testimonials, fabricated ratings, false scarcity, or unsupported claims.

## Business solutions
- Present healthcare/pharmacy procurement workflows as practical solutions, not vague claims.
- Explain intended users, key workflows, sample outputs, implementation scope, and enquiry path.
- Avoid implying clinical advice or regulatory certification.

## Trust, SEO, privacy, and monetization
- Keep About, Contact, Privacy Policy, Terms, Disclaimer, and support information complete and consistent.
- Unique page titles, descriptions, canonical URLs, sitemap, robots policy, breadcrumbs, descriptive internal links, and structured data only where accurate.
- Create original, genuinely useful tool instructions and guides; avoid thin or duplicated SEO pages.
- Place ads only in non-disruptive, clearly separated locations and only where the production AdSense configuration is later approved.
- Do not block basic free-tool use behind a paywall. Do not activate paid plans or payment processing in this staging phase.
- Measure real traffic and engagement only with a separately approved staging analytics setup; do not alter production analytics.

## Quality assurance gate
- Build and lint pass; no runtime or console errors.
- Every navigation link, dropdown, CTA, form, filter, upload, tool action, and download tested.
- Desktop, tablet, and mobile visual checks, including intermediate widths.
- Keyboard-only navigation, visible focus, labels, contrast, screen-reader semantics, and reduced-motion checks.
- Tool regression tests using representative valid, invalid, large, and edge-case inputs.
- Performance checks for Core Web Vitals, image/font loading, and unnecessary scripts.
- SEO checks: indexability only on production after approval; staging remains noindex.
- Privacy checks: no unexpected third-party uploads, tracking, or data collection.
- Final owner preview and explicit approval before any production action.

## Current audit note
The GitHub default-branch homepage source currently contains mixed Hindi/English copy and a basic navigation structure. It is not assumed to be the exact source of the live Cloudflare Worker. The current Cloudflare account listing shows the production Worker and a separate store-preview Worker; production must remain untouched while the actual live artifact and its source lineage are verified.
