# 🎨 Customization Guide — Digital MOD Academy
**Client:** Digital MOD Academy (Polonnaruwa, Sri Lanka)  
**Style:** Apple / visionOS Liquid Glass Interface + Cinematic 3D Mascot Experience

---

## 1. Brand Color System (Extracted from Official Logo)

The official logo (`/public/logo.png`) contains:
- **Gold (`#FFD700`):** Laurel wreath, ribbon, star highlights, main button accents.
- **Red (`#E8112D`):** Pen nib, three stars, notification tags, accent details.
- **Cyan (`#5CE1E6`):** Open book pages, glowing edges, tech accents.
- **Ink (`#111827`):** Primary high-contrast typography.
- **Surface:** Frosted white / slate in light mode; deep obsidian `#0A0D14` in dark mode.

### Modifying Tailwind Theme Tokens
In `tailwind.config.js`:
```javascript
colors: {
  brand: {
    gold: { DEFAULT: '#FFD700', light: '#FFE55C', dark: '#CCAC00' },
    red:  { DEFAULT: '#E8112D', light: '#FF4D63', dark: '#B80017' },
    cyan: { DEFAULT: '#5CE1E6', light: '#8AECF0', dark: '#20BFC5' },
    ink:  { DEFAULT: '#111827', muted: '#4B5563' }
  }
}
```

---

## 2. Liquid Glass Levels & Specular Sheen

The design system provides 3 glass levels in `src/index.css`:
- **`glass-1`**: Light overlay pills, subtle badges, floating navbar elements.
- **`glass-2`**: Standard iOS widgets, course cards, bento grid tiles.
- **`glass-3`**: Prominent visionOS focal cards, enrollment form, modal sheets.

Use `<GlassCard level={2} glow="gold" />` or `<GlassButton variant="gold" />` directly in any component.

---

## 3. Customizing Videos & Frame Sequences

The project uses videos from `C:\Users\muhri\Downloads\DMA\VIDEO`:
- **Hero Video Background:** `/public/videos/hero_background.mp4`
- **Logo Reveal Intro:** `/public/videos/logo_reveal.mp4`
- **Extracted Scrubbing Frames:** `/public/frames/hero/ezgif-frame-001.jpg` to `050.jpg`

To swap with new animations:
1. Export new video or frames from Blender/After Effects.
2. Follow the [FFmpeg Frame Extraction Guide](./FRAME_EXTRACTION_GUIDE.md).
3. Place new images in `public/frames/hero/`.

---

## 4. Modifying Courses & Pricing

Edit `src/components/sections/CoursesSection.tsx` and `src/components/sections/PricingSection.tsx`:
- Add or remove courses in the `courses` array.
- Update pricing in Sri Lankan Rupees (LKR) or USD.
- Change course duration, syllabus bullet points, and icons.

---

## 5. Contact & Social Media Links

In `src/components/sections/CTAContactSection.tsx` and `src/components/sections/FooterSection.tsx`:
- **Address:** `112 Sungavila, Polonnaruwa, Sri Lanka`
- **WhatsApp Hotline:** `074 114 5464` / `+94 74 114 5464`
- **Director:** `Mohomed Suhith (B.ICT Hons)`
- **Facebook:** `https://www.facebook.com/people/Digitalmod-Academy-Pvt-Ltd/61573478505246/#`
