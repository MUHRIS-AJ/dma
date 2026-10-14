# Digital MOD Academy — existing project audit and upgrade

Audit date: 10 October 2026. This is a source and supplied-media audit; it does not claim a measured field-performance baseline. Reviewed the original App, CSS, HeroSection, InstructorsSection, FeedbackSection, EnrollmentModal, asset inventory, and a representative existing video frame before replacement.

## Keep

- The supplied crest at `public/logo.png` as the brand reference. Its gold becomes the single interface accent; the original logo retains its own colors.
- The working React + TypeScript + Vite foundation and Tailwind toolchain. A framework migration would add cost without improving this brief.
- Course discovery, learning journey, FAQ, instructor and contact concepts, rebuilt around the requested seven disciplines.
- The existing WhatsApp contact channel, subject to owner confirmation before launch.
- The intent of glass surfaces and scroll storytelling, with one cohesive cinematic art direction.

## Replace and why

| Existing evidence | Problem | Upgrade direction |
| --- | --- | --- |
| `HeroSection.tsx`: centered crest, accreditation pills, two-line generic headline, four stat tiles | Too many equal priorities before the course value is understood | Asymmetric editorial headline, focused course action, restrained supporting evidence, dark 3D infinity visual |
| `index.css`: gold, red, cyan plus automatic light/dark behavior | Multiple competing accents and system-controlled appearance weaken the requested art direction | Gold and neutral charcoal tokens, consistent dark canvas and restrained translucent surfaces |
| Supplied hero frame: pastel floating books, graduation caps and blue devices | Bright generic education imagery mismatches dark premium glass | Gold optical-glass infinity artwork with a subtle eight-second periodic motion treatment |
| Original App imports mascot context, scroll canvas, cinematic wrapper and multiple effect systems | More simultaneous motion and rendering work than the conversion task needs | Consolidated GSAP/Lenis motion with reduced-motion fallbacks and optional decorative depth |
| Original catalog/hero: 21 courses and uniform Rs. 5,000 claims | Conflicts with the requested seven-topic marketing curriculum; prices were not freshly verified | Seven dedicated course detail pages; avoid inventing tuition, placement figures or intake promises |
| `InstructorsSection.tsx`: Unsplash portraits attached to named faculty and credentials | Stock photos do not establish the real instructors' identities or credentials | Use approved real faculty profiles only; otherwise clearly labeled teaching-specialism content |
| `FeedbackSection.tsx`: “verified feedback” text and locally added reviews | A local form does not verify enrollment or consent | Publish only sourced, permissioned student testimonials; show project outcome examples transparently while proof is pending |
| `EnrollmentModal.tsx`: name, phone, email, program, mode, batch, notes | High friction before a conversation begins | Three visible fields maximum, a clear next step and honest submission status |
| Single app HTML entry | Missing page-specific discovery and sharing foundations | Unique course metadata, canonicals, breadcrumbs, structured data, social assets, sitemap and robots configuration |

## Visual system

Use the crest's gold as the primary accent on a near-black cinematic base. White is reserved for legible text, hairline borders and soft specular reflections. Glass is a material, not a treatment for every element: blur 24–40 px on selected navigation and key panels, lightweight opaque fallbacks elsewhere. Large editorial typography, wide spacing and a restrained grid distinguish this from an all-card template.

Depth should support meaning. The hero establishes aspiration; course artwork differentiates subject matter; the journey explains progression. Motion uses transforms and opacity, stops when offscreen, and yields to reduced-motion preferences. Touch and keyboard users must receive every action without magnetic or hover interactions.

## Evidence still needed before public launch

Owner-approved faculty portraits and biographies; documented testimonials and consent; validated enrollment/placement counts; verified accreditation identifiers; current fees and intake dates; production domain, analytics identifiers, and final lead destination. No invented achievement counts or stock-photo identities should be published to fill these gaps.

## Acceptance checks

- All seven course cards open substantive detail pages and return to the catalog.
- Keyboard navigation, focus visibility, FAQ operation and form validation work without pointer effects.
- Reduced motion disables autoplay/parallax/pins while leaving all content visible.
- Mobile content has no horizontal overflow, and horizontal course navigation remains directly scrollable.
- Pages have one H1, distinct titles/descriptions, valid canonicals and visible answers matching structured data.
- Test final deployment using Lighthouse and real field data; LCP <2.5 s, CLS <0.1 and INP <200 ms are targets, not guaranteed local measurements.
