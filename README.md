# WebNova Studio — Cinematic 3D Digital Experience

An Awwwards Jury-level cinematic 3D digital experience and web development studio platform built for **WebNova Studio**.

---

## 🌌 The Liquid Aurora Colour System

- **Background:** `#000000` (Pure Void Black)
- **Surface 1:** `#0A0E1A` (Abyss Blue-Black)
- **Surface 2:** `#12101F` (Nebula Violet-Black)
- **Primary:** `#FF2E63` (Liquid Magma Pink)
- **Secondary:** `#FFD93D` (Molten Gold)
- **Accent 1:** `#00FFA3` (Radiation Mint)
- **Accent 2:** `#00C2FF` (Cyber Ice Blue)
- **Accent 3:** `#C77DFF` (Cosmic Orchid)

### Signature Gradients:
1. **Magma Flow:** `#FF2E63` → `#FFD93D` → `#FF2E63` (continuous loop)
2. **Aurora Ice:** `#00FFA3` → `#00C2FF` → `#C77DFF`
3. **Chrome Liquid:** `45deg linear-gradient(#C77DFF, #00FFA3, #FFD93D, #FF2E63)` (400% background-size)

---

## 🚨 10 Shock Factors Implemented

1. **Cinematic Preloader (3s):** Liquid chrome droplet falls, splashes into the WebNova emblem, crystallizes with horizon reflections, and shatters into a particle explosion with camera flythrough. Includes skip flag in `localStorage` and replay trigger in navigation.
2. **"Nova Core 2.0" 3D Planet:** Liquid chrome morphing icosahedron with physical iridescence (`MeshPhysicalMaterial`, iridescence: 1.0, IOR: 1.5, transmission: 0.15). Smoothly morphs every 3s: Sphere → Cube → Torus → TorusKnot → Sphere. Features 15,000 instanced particles in 8 helix rings that vortex towards the cursor, and explode in a supernova shockwave on click.
3. **Continuous Cinematic Camera Journey:** Scroll dynamically drives 3D camera trajectory: Hero (split right) → Services (chrome tunnel recession) → Portfolio (floating gallery elevation) → Process (timeline descent) → Final CTA (Nova Core returns smaller with upward drifting particles).
4. **Real Glass Refraction & Chromatic Dispersion:** Specular highlights, chromatic edge dispersion, dynamic mouse-tracking lighting, and frosted glass backdrops.
5. **Magnetic Cursor + Liquid Metal Trail:** Glowing orb with chrome reflection that spawns dissolving liquid metal droplets and morphs into contextual states (`VIEW →`, `EXPLORE`, `DISCOVER`, `BUILD`).
6. **3D Split Text Typography:** Kinetic headings pairing *Instrument Serif* italic accents with *Sora* extra bold and *JetBrains Mono*.
7. **Live Number Counters:** Animated statistics with screen celebration micro-bursts and tabular numerals.
8. **Bento Services Grid with Mouse-Tracking Glow:** Real refraction glass cards with spring physics 3D tilt (max 8°), dynamic radial cursor illumination, and Magma-to-Orchid border highlights.
9. **Portfolio Cards in 3D Space:** 3D hover zoom (1.05x), browser mockup frames, category filtering, and interactive full Case Study Viewer modal with sticky "Back to Work" control.
10. **Final CTA Planet Return:** The Nova Core returns centered at the bottom of the journey, orbiting slowly with upward drifting atmospheric particles.

---

## 🚀 Technical Architecture

- **Frontend:** React 18 + Vite + TypeScript
- **Styling:** Tailwind CSS + Liquid Aurora Design System
- **3D Graphics & WebGL:** Three.js r186 + Custom GLSL Shaders
- **Smooth Scrolling:** Lenis Virtual Scroll
- **AI Intelligence:** Gemini 3.1 Pro Preview with high thinking level (`thinkingLevel: HIGH`) for instant technical feasibility scoping
- **Contact Inquiries:** Web3Forms integration with validated fields and honeypot protection
- **SEO & Accessibility:** WCAG 2.1 AA compliant, JSON-LD Schema.org, OpenGraph, Twitter Cards, `robots.txt`, and `sitemap.xml`

---

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run full-stack dev server
npm run dev

# 3. Production build
npm run build
```
