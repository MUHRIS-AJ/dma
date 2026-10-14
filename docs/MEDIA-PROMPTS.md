# Digital MOD Academy — media production

## Current supplied-media production — 10 October 2026

The user's supplied education video is now the primary hero source. The infinity image treatment below is retained as an earlier design exploration, not the current hero. Run `node scripts/media-update.mjs` to reproduce the current assets.

Source: `VIDEO/Video 2 Website hero background loop (8-10 sec)/Education_website_background_vid…_1080p_20261008130624.mp4`. The original is preserved. Production applies a restrained contrast and color-balance adjustment while preserving its gold/cyan education objects, then folds the opening half-second over the final half-second for a continuous boundary. The output is 9.5 seconds at 30 fps without audio.

Current web assets:

- `public/media/academy-1080.mp4`: H.264, CRF 20, fast-start.
- `public/media/academy-1080.webm`: VP9 alternative.
- `public/media/academy-mobile.mp4`: 720p H.264, constrained below 2 MB by an explicit script assertion.
- `public/media/academy-poster-{768,1600}.{webp,avif}`: responsive posters from the graded supplied video.
- `public/media/story-1.webp`: selected frame from the supplied `source-assets/hero 1` sequence.
- `public/media/story-2.webp`: selected hero 2 frame when available; otherwise an explicitly recorded frame from the supplied primary video. See the manifest for its exact source.
- `public/media/certificate-{1,2,3}.webp`: real supplied photographs of rolled academy certificates. Selected rolls display institutional branding without student recipient names. Certificate 1 is cropped to omit the bottom QR code. These are sample presentation visuals, not independently verified accreditation evidence.
- `public/media/academy-manifest.json`: source attribution, crops, alternate text, processing and actual byte sizes.

The certificate contact sheet was inspected before selection. Flat certificates containing recipient names, signatures and QR codes, and separate certification seal photos, are not used in these public sample exports. Original photographs remain under `source-assets` for the owner's records.

No Real-ESRGAN, Topaz or generative image alteration was used in this update. These are conventional resizing, color correction and codec optimization operations, not invented resolution detail. The 1080p video is not labeled a native 4K master. Real source media takes priority over optional generation prompts below.

## Earlier infinity exploration and provenance

The earlier `public/media/hero-source.png` exploration used gold glass infinity on a dark surface, with negative space at left. No photo of a student or instructor was generated or presented as a real person. This exploration is superseded by the supplied-video assets above.

Run `node scripts/process-media.mjs` from the repository root with FFmpeg on PATH. Sharp is a project development dependency. The script produces:

- `hero-768`, `hero-1600`, `hero-2400` in AVIF and WebP, with the size embedded in each filename.
- `hero-master-4k.png`, a 3840×2160 conventional enlargement for delivery.
- `hero-mobile.mp4`, 1280×720 H.264, eight seconds, 24 fps, no audio, strictly checked below 4 MB.
- `hero-1080.mp4`, 1920×1080 H.264, eight seconds, 24 fps, no audio, fast-start enabled.
- `hero-1080.webm`, VP9 alternative.
- `hero-1080-h265.mp4`, HEVC alternative for compatible players.
- `hero-4k-h264.mp4` and `hero-4k-h265.mp4`, 3840×2160 delivery exports. These are conventionally enlarged from the motion treatment, not native 4K moving detail.
- `manifest.json` records actual source dimensions, duration, provenance and file sizes.

The motion is a subtle periodic camera push on the still source. A cosine cycle returns to its starting crop with matching velocity, so playback wraps continuously. The existing gold lighting and deep blacks are retained. Artificial grain is deliberately not added to the web loop: moving noise would increase bandwidth without helping the subject. This is not a newly rendered 3D film, and Topaz or Real-ESRGAN was not used. For a true 4K production master, render the source scene or regenerate at native resolution using the brief below.

## Hero art prompt

Create a luxury editorial 3D hero for Digital MOD Academy. One large sculptural infinity loop made of optical glass with gold-metal internal ribbons and physically plausible refraction. Deep near-black studio, soft gold rim lights sampled from the supplied logo, reflective charcoal floor, restrained warm particles. Object occupies right two thirds; left third is dark negative space for headline. Low camera, 50 mm lens, cinematic highlights, deep clean shadows, no cyan, no red, no purple, no typography, no logos, no watermarks. Avoid busy science-fiction HUDs. Photoreal material, exquisite crafted silhouette. Landscape 16:9, native 3840×2160 or larger if supported.

## True motion master prompt

Animate the approved gold-glass infinity still into an eight-second seamless loop. Preserve composition and all geometry. Camera makes an extremely slow 1.5% forward/back movement returning exactly to its initial transform; object gently rotates less than two degrees and returns; a sparse field of gold dust follows a periodic path. No object morphing, no new letters or artifacts, no flashing light. Optical-glass refraction, deep black studio and accent lighting remain consistent. Native 3840×2160 master, 24 fps, clean temporal consistency; first and last frame match in geometry and exposure. Export a visually lossless master before web derivatives.

## Course artwork directions

Use the same black/gold lighting, dark studio and material language for all seven. Produce clean isolated conceptual objects with generous breathing room; no fake readable interface copy, certification badges or misleading results.

1. UI/UX: three translucent browser frames arranged in precision perspective, a gold cursor and simple wireframe geometry.
2. SEO: a glass search lens over a gold index of content tiles; discovery rather than ranking guarantees.
3. Technical SEO: a glass architectural node lattice, with a single illuminated path representing crawl structure.
4. AEO/GEO: two curved glass answer ribbons orbiting a small gold knowledge node, suggesting retrieval and synthesis.
5. Google Analytics: a restrained glass bar graph and line chart; abstract illustrative data without invented business results.
6. CRO: two glass experiment panels with a single gold conversion path connecting them.
7. SEM/SMM: orbiting glass audience nodes and concentric gold signal arcs.

## Real photography brief

Commission consenting real students and faculty using academy equipment and genuine course work. Photograph against charcoal environments with soft warm side light and neutral skin tones. Deliver release documentation, accurate captions and native-resolution masters. Do not use generated students as testimonials or assign stock portraits to named teachers.

## Web integration

Use AVIF source with WebP fallback and explicit dimensions/aspect ratio. Set `srcset` at 768/1600/2400 widths, appropriate `sizes`, and high fetch priority only for the hero poster. Lazy-load below-fold imagery. The video element must be muted, looping and playsinline, with a poster and a dark contrast overlay. Select the mobile H.264 on small screens; do not download 4K delivery assets for normal page playback. Keep the poster visible for reduced-motion/data-saving users. Full source and 4K master files are delivery assets and can be excluded from the production web build.
