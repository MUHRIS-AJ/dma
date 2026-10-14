# Design audit — Digital MOD Academy

Reviewed 10 October 2026, before upgrade. Evidence: App.tsx, HeroSection, ScrollCanvas, EnrollmentModal, InstructorsSection, TestimonialsSection, index.html and local media.

## Keep
- React 18 / Vite / TypeScript / Tailwind; GSAP and Lenis already installed.
- Supplied official crest; gold from its laurel and ribbon is the single interface accent.
- Existing academy name, founder name, campus address and WhatsApp contact from README.
- Local source videos and frames, preserved for future production.

## Replace and why
- Three competing accent colors, automatic light theme, repeated glass panels and centered headlines → consistent charcoal, gold and warm white; asymmetric editorial composition.
- 50-frame preload and global 3D/background layers → one responsive hero poster, compressed looping media, transform-only motion scoped to desktop.
- 21 generic programs and uniform price claims → the seven requested pathways, each with an individual detail page. Prices and dates require academy confirmation.
- Stock portraits presented as named faculty and unverified student achievements → founder initials and honest learning deliverables. No invented reviews, placement rates or enrollment totals.
- Seven-field enrollment modal and delayed popup → accessible native dialog, three fields, explicit WhatsApp handoff. Never imply a draft has been sent.
- Hamster-focused document metadata and missing page routes → static prerendered course pages, unique titles/descriptions, canonical/OG tags, sitemap, robots and structured data.
- Dense animation on every device → reduced-motion support, native mobile scrolling, keyboard-accessible catalog and visible focus states.

## Content required before public launch
Approved instructor portraits/bios, consented testimonials, verified student/placement counts, confirmed fees/timetables, final domain and GA4 ID. The implementation avoids representing these as facts until supplied.
