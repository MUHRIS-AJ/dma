# 🌟 DIGITAL MOD ACADEMY — APPLE LIQUID GLASS & 3D MASCOT WEB EXPERIENCE

> **Apple-style, visionOS / iOS "liquid glass" premium website featuring scroll-driven 3D mascot frame scrubbing, high-definition video backgrounds, and interactive 3D WebGL micro-interactions.**  
> Built for **Digital MOD Academy**, Polonnaruwa, Sri Lanka.

---

## 🎨 Visual Identity & Brand System (Extracted from Official Logo)

- **Official Logo:** `/public/logo.png` (Gold laurel wreath, graduation cap on a red pen nib, cyan open book, three red stars, yellow ribbon).
- **Brand Colors:**
  - **Gold (`#FFD700`):** Laurel wreath, ribbon, badges, primary button accents.
  - **Red (`#E8112D`):** Pen nib, three stars, notification tags, accent details.
  - **Cyan (`#5CE1E6`):** Open book pages, glowing edges, tech accents.
  - **Ink (`#111827`):** Primary high-contrast text.
  - **Liquid Glass:** Frosted white / slate in light mode; smoked deep glass in dark mode.

---

## 🚀 Core Features & Technical Highlights

1. **Apple-Style ScrollCanvas Frame Scrubbing:**
   - 50 pre-rendered 3D frames extracted from `C:\Users\muhri\Downloads\DMA\VIDEO` scrubbed smoothly with **GSAP ScrollTrigger** and **Lenis smooth scrolling** (`scrub: 1.2`).
   - Seamless fallback to high-definition looping MP4 (`/public/videos/hero_background.mp4`) and logo reveal intro (`/public/videos/logo_reveal.mp4`).
2. **Liquid Glass Design System (iOS / visionOS):**
   - 3 glass levels (`glass-1`, `glass-2`, `glass-3`) with backdrop blur, specular top-edge sheen, dynamic mouse-following glare reflection, and 3D card tilt.
   - Animated fluid background gradient mesh with slow-moving blurred Gaussian orbs in Gold, Cyan, and Red.
3. **Interactive 3D Hamster Mascot ("Moddy"):**
   - Real-time Three.js / React Three Fiber layer featuring 6 rich animation clips (`idle`, `wave`, `run`, `eating`, `jump`, `sleep`), glossy expressive eyes with natural blinking, cursor look-at tracking, and instanced 3D particle bursts on click!
4. **Zero-Asset Web Audio API Synthesizer:**
   - Procedural audio synthesizer generating cute hamster squeaks, hops, nibbling crunches, and celebratory chimes without external MP3 network lag.
5. **Complete 10-Section Architecture:**
   - **Hero:** Real logo, looping video background, headline, pill CTAs, liquid glass stat chips.
   - **Courses:** Segmented control filter (All / Beginner / Advanced / Online) + squircle app-icon cards.
   - **Why Us:** Apple-style bento grid featuring Polonnaruwa smart campus (112 Sungavila) and Universal Bureau of Education (UBE) recognition.
   - **Learning Journey:** Interactive 5-stage scroll timeline with glowing pipeline.
   - **Instructors:** Glass profile cards featuring founder **Mohomed Suhith (B.ICT Hons)** and senior mentors.
   - **Testimonials:** iOS notification-style stacked cards.
   - **Pricing:** 3 glass plans with gold glow featured card.
   - **FAQ:** iOS Settings-style frosted glass accordion.
   - **CTA & Registration:** Glass form with floating labels, real-time validation, and confetti celebration.
   - **Footer:** Frosted glass footer with social links, WhatsApp hotline, and back-to-top button.
6. **Mobile First Experience:**
   - Floating iOS-style bottom tab bar with haptic spring feel.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Compile production build
npm run build

# 4. Preview production build
npm run preview
```

---

## 🏢 Academy Information

- **Institution:** Digital MOD Academy (Pvt) Ltd
- **Founder / Principal:** Mohomed Suhith (B.ICT Hons)
- **Academic Recognition:** Universal Bureau of Education (UBE)
- **Physical Campus:** 112 Sungavila, Polonnaruwa, Sri Lanka
- **WhatsApp Hotline:** +94 74 114 5464 / 074 114 5464
- **Official Facebook:** [Digitalmod Academy Facebook Page](https://www.facebook.com/people/Digitalmod-Academy-Pvt-Ltd/61573478505246/#)
