# Digitalmod Academy - static website guide

These are the current production files. GitHub Pages publishes this folder from **main /docs** at **https://muhris-aj.github.io/dma/**. There is no build step or runtime dependency.

## Files

- index.html: Home and the full-screen cinematic film hero.
- about.html: Academy purpose and institutional information.
- courses.html: All 30 proposed courses, filtering, search, sorting and details.
- contact.html: Contact details, enrolment enquiry review and FAQs.
- 404.html: Custom missing-page design.
- css/style.css: Layout, glass surfaces and light/dark colour tokens.
- css/animations.css: Reusable motion classes and reduced-motion rules.
- js/main.js: Themes, intro, navigation, scroll motion and form behaviour.
- assets/: Logo, favicon, video, poster and optional illustration.
- robots.txt and sitemap.xml: Search-engine metadata.
- .nojekyll: Disable Jekyll processing on GitHub Pages.

The other Markdown guides in this directory are preserved notes from an earlier prototype.

## Editing

Edit page content directly in the HTML. Keep shared navigation and footer consistent across all five pages. Change colours through the CSS variables at the top of style.css, its dark-theme section and no-JavaScript dark fallback. Keep dark text on gold buttons for contrast.

Set --dur and --delay on animated elements to change speed and delay. A stagger list accepts data-stagger. Reveals replay when elements leave and re-enter view. Respect existing reduced-motion support. The intro appears once per session, is skippable and exits within 2.5 seconds. Theme preference is stored locally; personal form details are not stored there.

Update both course cards in courses.html and course options in contact.html when changing the catalogue. Update featured cards on Home if relevant. Fees and durations are proposed planning figures. Confirm teaching arrangements, final prices and certificate recognition before publishing confirmed intakes. Illustrations do not represent campus photographs.

The academy WhatsApp number is configured in js/main.js and HTML contact links. The enquiry form validates details, shows a local review and offers a WhatsApp message link. Visitors explicitly send the message in WhatsApp. It does not collect payments or save confirmed enrolments in a database.

## Preview

Use an HTTP static server mapping /dma/ to this directory. For a simple temporary preview, copy this folder to dma inside a separate directory, run python -m http.server 8000 from that parent directory and open http://localhost:8000/dma/. No installation or build is required by the website itself.

## GitHub Pages

Repository Settings > Pages > Deploy from a branch > main > /docs. Push edits to main to publish. Keep .nojekyll and 404.html in this folder. All local HTML href, src and video poster URLs include /dma/, including the 404 page. JavaScript derives its base from its own script URL.

## Other static hosts or domains

For a root-domain deployment, replace /dma/ with / in the local href, src and poster attributes of all five HTML files. Replace https://muhris-aj.github.io/dma with the new origin in all HTML files, sitemap.xml and robots.txt. For another subfolder, use that prefix instead. Keep fragment-only and external links unchanged.

- **Netlify:** Upload these finished files, or connect the repo with publish directory docs and no build command. The root 404.html is automatic.
- **Vercel:** Import the repository, choose Other as framework, Root Directory docs, empty Build Command and Output Directory .
- **Cloudflare Pages:** Use Direct Upload, or Git integration with no framework, Build Command exit 0, Output Directory docs.
- **GitHub Pages:** Keep the instructions and project prefix above. No custom build workflow is needed.

No SPA rewrite is required: each page is an actual HTML file. Check Home, About, Courses, Contact, mobile navigation, course-to-form selection, both themes and a nested missing URL after deployment.

## Browser behaviour

Supported browsers use View Transitions for shared elements and page changes; other browsers fall back gracefully. The full-screen film plays muted at rest and seeks frames forward/backward while scrolling a sticky 185svh runway. The film streams natively. A timed Blob fallback supports frame seeking on static hosts without HTTP byte ranges. Reduced motion or Motion off removes the pinned runway and stops automatic playback. Video pauses off screen. Visitors can use its play/pause control. Native links work without JavaScript. The form uses WhatsApp after an explicit review and visitor action.

Website developed by **A.J. Muhris** - [WhatsApp +94 77 555 1712](https://wa.me/94775551712).
