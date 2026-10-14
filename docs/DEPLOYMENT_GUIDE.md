# 🚀 Setup, Run & Deployment Guide
**Project:** DIGITALMOD ACADEMY (PVT) LTD - 3D Mascot Hero Experience

---

## 1. Local Development Setup

### Prerequisites
- Node.js `18.x` or `20.x` or `22.x+`
- npm `9.x+` (or pnpm / yarn / bun)

### Installation
```bash
# Clone or navigate to the project directory
cd DMA

# Install dependencies
npm install

# Start local development server with Hot Module Replacement (HMR)
npm run dev
```

Open your browser at `http://localhost:3000`.

---

## 2. Production Build & Local Preview

```bash
# Typecheck and compile production bundle
npm run build

# Preview the production build locally
npm run preview
```

The output will be placed in the `dist/` directory, optimized with:
- Code-splitting into dedicated chunks (`three.js`, `@react-three/fiber`, application code)
- Minified CSS and JavaScript
- Tree-shaken icon libraries.

---

## 3. Deploy to Vercel (Recommended)

### Option A: Via Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy directly from terminal
vercel
```

### Option B: Via GitHub & Vercel Dashboard
1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"New Project"**.
3. Import your GitHub repository.
4. Framework Preset: **Vite**
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**.

---

## 4. Deploy to Netlify

### Option A: Netlify Drop / Drag & Drop
1. Run `npm run build` locally.
2. Drag and drop the generated `dist` folder into the Netlify Dashboard.

### Option B: Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Configuration (`netlify.toml` included)
Create a `netlify.toml` in your root directory:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.glb"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    Content-Type = "model/gltf-binary"
```

---

## 5. Mobile & Lighthouse Performance Checklist

- [x] **Adaptive DPR:** Scales between 1.0x and 2.0x based on hardware framerate via `PerformanceMonitor`.
- [x] **Instanced Particle Systems:** Particle bursts utilize single-draw-call `instancedMesh`.
- [x] **Web Audio API:** Zero network requests for audio clips; instant audio synthesis without lag.
- [x] **Reduced Motion Support:** CSS and Three.js respect `@media (prefers-reduced-motion: reduce)`.
- [x] **Draco / GLTF Caching:** 3D assets cached indefinitely via HTTP headers.
