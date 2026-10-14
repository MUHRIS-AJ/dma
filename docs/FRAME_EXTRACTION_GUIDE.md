# 🎬 3D Video to Frame Sequence Extraction Guide
**Project:** Digital MOD Academy — Apple-Style Scroll-Driven Experience  
**Core Technique:** HTML5 Canvas scrubbed by GSAP ScrollTrigger + Lenis Smooth Scroll

---

## 1. Overview of Frame Scrubbing Pipeline

To achieve Pixar/Apple-grade 60 FPS visual smoothness in the browser, 3D animations are pre-rendered into high-bitrate video and exported into an optimized image sequence (WebP or JPG). The HTML Canvas renders the exact frame corresponding to scroll position using `requestAnimationFrame`.

---

## 2. FFmpeg Extraction Commands

Ensure you have [FFmpeg](https://ffmpeg.org) installed on your system.

### Option A: Extract to High-Efficiency WebP Sequence (Recommended)
WebP provides up to 35% smaller file sizes than JPG with identical visual fidelity.

```bash
# Navigate to the video folder
cd "C:\Users\muhri\Downloads\DMA\VIDEO\Video 2 Website hero background loop (8-10 sec)"

# Extract 60 frames at 1280x720 in WebP format
ffmpeg -i "Education_website_background_vid._1080p_20261008130624.mp4" \
  -vf "fps=24,scale=1280:720:force_original_aspect_ratio=decrease" \
  -c:v libwebp -quality 85 -preset photo \
  "c:\Users\muhri\Downloads\DMA\public\frames\hero\ezgif-frame-%03d.webp"
```

### Option B: Extract to Progressive JPG Sequence (Current Setup)
```bash
ffmpeg -i "Education_website_background_vid._1080p_20261008130624.mp4" \
  -vf "fps=24,scale=1280:720" \
  -qscale:v 2 \
  "c:\Users\muhri\Downloads\DMA\public\frames\hero\ezgif-frame-%03d.jpg"
```

### Option C: Extract from Video 1 (Logo Reveal Intro)
```bash
ffmpeg -i "Logo_reveal_animation_1080p_20261008131023.mp4" \
  -vf "fps=24,scale=1280:720" \
  -qscale:v 2 \
  "c:\Users\muhri\Downloads\DMA\public\frames\reveal\ezgif-frame-%03d.jpg"
```

---

## 3. Frame Budget & Performance Targets

| Target Display | Recommended Resolution | Frame Count | Target Total Size |
| :--- | :--- | :--- | :--- |
| **Desktop High-DPI** | 1280 × 720 px | 50 – 120 frames | 2.5 MB – 4.5 MB |
| **Mobile Retina** | 854 × 480 px | 40 – 60 frames | 1.2 MB – 2.0 MB |

---

## 4. How the Frontend Scrubs the Frames

In `src/components/3d/ScrollCanvas.tsx`:
1. The component preloads the 50 frames into memory:
   ```ts
   img.src = `/frames/hero/ezgif-frame-${padNum}.jpg`;
   ```
2. GSAP ScrollTrigger updates the scrub progress `0.0` to `1.0`:
   ```ts
   ScrollTrigger.create({
     trigger: document.body,
     start: 'top top',
     end: 'bottom bottom',
     scrub: 1.2,
     onUpdate: (self) => {
       const frameIndex = Math.floor(self.progress * FRAME_COUNT);
       renderFrame(frameIndex);
     }
   });
   ```
3. The `<canvas>` draws the active frame with `object-fit: cover` aspect math for zero distortion across all screen aspect ratios.
