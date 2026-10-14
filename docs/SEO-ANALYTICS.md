# Search and measurement handover

## Static page delivery

Run `npm run build`, then `node scripts/generate-pages.mjs` if the build script does not already include it. The generator emits a homepage and seven real `/courses/<slug>/index.html` documents with semantic fallback content, unique titles/descriptions, canonical URLs, social cards, and JSON-LD. React replaces the fallback when JavaScript loads. This is static prerendered content, not server rendering.

Configure both `SITE_URL` and `VITE_SITE_URL` to the same verified HTTPS production origin before building. The generator defaults to `https://digitalmodacademy.example` solely as a placeholder. Do not submit a placeholder sitemap to search engines. Trailing-slash course URLs are canonical; configure hosting redirects from slashless URLs and from alternative domains.

The generated homepage exposes EducationalOrganization. Every course exposes EducationalOrganization, Course, FAQPage and BreadcrumbList. Course answers contain 40–60 words and are sourced from the same typed data as the UI. The homepage includes all 30 online certificates and 35 departmental IT courses from `src/premium/catalog.ts`, including the supplied proposed prices and durations, even without JavaScript. Department fee ranges remain departmental; no individual-course amounts are inferred. There are no invented reviews, ratings, instructors, accreditations, placements or job guarantees. FAQ markup does not guarantee search rich-result eligibility, and structured content does not guarantee citations in AI answers.

## Launch checklist

- [ ] Replace placeholder production domain; rebuild and inspect all eight canonical tags.
- [ ] Confirm each course's curriculum, intake, delivery method, prerequisites and fees with the owner. Current curricula are explicitly indicative.
- [ ] Verify one visible H1 per page with JavaScript enabled and disabled.
- [ ] Check direct navigation and refresh on all seven course URLs; confirm generated files are served before SPA fallback.
- [ ] Validate JSON-LD syntax and run relevant search-engine structured-data validators.
- [ ] Confirm generated FAQs remain visible and exactly match the answers in structured data.
- [ ] Check `/robots.txt`, `/sitemap.xml`, image response codes and OpenGraph previews.
- [ ] Test the three-field enquiry flow: prepare the WhatsApp draft, review it, open WhatsApp, then explicitly send it to the academy. No server endpoint or delivery confirmation is implemented.
- [ ] Add a real privacy notice and approved consent handling for every enabled analytics vendor.
- [ ] Confirm +94 78 445 0088 with the academy; it comes from the supplied brand brief. Footer developer credit A.J.MUHRIS links to tel:0775551712.
- [ ] Submit the verified sitemap in Search Console; monitor indexing, excluded canonicals and crawl errors.
- [ ] Measure performance using the methodology below, then collect real-user data after launch.

## GA4 event contract

Set `VITE_GA4_ID=G-...` before building. Events are wired in `src/App.tsx` and sent by `src/config.ts` only after analytics consent (`dma_analytics=granted`). No measurement ID means no GA4 requests. Verify collection in GA4 DebugView using a real configured property; local event wiring does not prove production delivery.

| Event | Implemented trigger | Parameters | Count behavior |
| --- | --- | --- | --- |
| `cta_click` | An element with `data-cta` is activated, including the WhatsApp handoff | `cta_id`, `page` | Once per activation |
| `course_view` | A specialist course detail route mounts / analytics consent effect runs | `course_id`, `course_name` | May repeat when consent changes; verify in DebugView |
| `form_submit` | Valid enquiry form prepares a WhatsApp draft | `form_id=enrollment`, `course`, `delivery_status=draft_prepared` | Once per valid submission; does not prove sending or delivery |
| `scroll_depth` | Visitor crosses 25%, 50%, 75%, 90% | `percent` | Each threshold once per route/consent effect lifecycle |
| `video_play` | Hero video fires `play` | `video_id=academy_hero` | Can repeat on resume; not deduplicated to first playback |

All explicit events also receive the five standard UTM values when present: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` (each limited to 120 characters). `course` is a predefined selection label, not a free-text answer. The tracker sends no form name, email, phone, or message. It sanitizes automatic page location to origin plus path and the referrer to origin only. Campaign values should be reviewed to avoid accidental personal information.

`form_submit` describes a prepared draft only. Do not report it as a delivered lead, confirmed enrollment or purchase, and do not mark it as a delivered-lead key event. The visitor must still open WhatsApp and send the message; this site cannot observe delivery. A later verified CRM/server acknowledgement should use a separate event if a delivery integration is built.

Before enabling GA4, disable Enhanced Measurement **form interactions and outbound clicks** in the web stream. Automatic outbound events could otherwise capture the WhatsApp link's draft text (including personal information). The explicit CTA event records only its identifier and page. Stream settings cannot be reliably disabled through the current client configuration. Register useful low-cardinality fields such as `cta_id`, `delivery_status` and `course_id`; scroll-animation progress is not scroll-depth analytics.

`VITE_META_PIXEL_ID` is an inactive placeholder. Add a consent-aware loader only after approval of the privacy implementation and a real pixel ID. Do not equate the placeholder with an installed Meta Pixel.

## Performance verification

Targets are LCP <2.5 seconds, CLS <0.1 and INP <200 ms at the 75th percentile of actual visits. These are launch objectives, not measured guarantees. Local Lighthouse scores cannot establish field INP or production Core Web Vitals.

1. Build the production bundle and serve `dist`; test the homepage and a course route on a representative mobile profile.
2. Run three mobile Lighthouse measurements with a cold cache; record the median and preserve reports with the build commit, browser version and test conditions.
3. Inspect the network waterfall: the hero poster should be discoverable in initial HTML, font loading should not hide text, and below-fold imagery should load lazily.
4. Check layout-shift entries while fonts/media load; media should reserve dimensions. Verify reduced-motion mode and low-power mobile behavior without relying on desktop frame rate.
5. Inspect a performance trace through the pinned/horizontal sections. Keep transforms compositor-friendly and avoid simultaneous full-screen blur layers.
6. After launch, collect privacy-approved Web Vitals or use available field datasets. Assess INP using real interactions, including navigation, course selection, accordions and form validation.

Document actual asset sizes and measured results in the performance report. A 4K source does not imply a 4K export, AI enhancement, or successful mobile encoding; verify each delivered asset independently.
