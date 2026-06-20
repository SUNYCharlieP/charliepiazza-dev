# Handoff: Charlie Piazza — Portfolio Site (charliepiazza.dev)

A single-page personal portfolio for **Charlie Piazza**, a self-taught iOS developer in Buffalo, NY. The page presents three apps (Jarvis, FloorSnap, Arca), a short background story, and a contact block. Goal: build and **launch it on Netlify** with a custom domain.

---

## TL;DR for the developer

This handoff is **production-ready, not just a mockup.** `index.html` + `assets/` + `netlify.toml` in this folder are a complete, self-contained static site. The fastest path to launch:

1. Drop this folder's contents into a repo (or straight into Netlify's drag-and-drop deploy).
2. Do the **3 required content swaps** below (App Store URL, confirm contact links, confirm OG/domain).
3. Deploy. No build step, no dependencies, no framework required.

If you'd rather rebuild it inside an existing framework (React/Vite/Astro/Next), the **full spec** further down lets you reproduce it pixel-for-pixel. For a one-page static marketing site, **plain HTML/CSS (what's provided) is the recommended choice** — a framework adds tooling overhead with no benefit here. Astro is a reasonable upgrade only if Charlie plans to add a blog or many pages later.

---

## About the design files

`index.html` here is a **clean production rebuild** of the HTML prototype that was designed in conversation (`Portfolio - Blueprint.dc.html` in the parent project). The prototype used a component-runtime wrapper for live editing; this version strips that out and replaces inline hover/animation hacks with a proper `<style>` sheet and a small vanilla-JS scroll-reveal. It is meant to ship as-is.

- Fonts load from Google Fonts (Inter + JetBrains Mono) via `<link>`. No local font files.
- All imagery is in `assets/` with semantic filenames.
- No analytics, cookies, or third-party scripts are included. Add if desired.

## Fidelity

**High-fidelity (hifi).** Final colors, typography, spacing, copy, and interactions. Recreate pixel-perfectly if porting to a framework.

---

## Required content swaps before launch

| # | What | Where | Action |
|---|------|-------|--------|
| 1 | **App Store URL** | `index.html` → FloorSnap `<a class="appstore" href="#">` (marked with a `TODO` comment) | Replace `#` with the real `https://apps.apple.com/...` link once FloorSnap is live. |
| 2 | **Contact links** | Contact section | Email `cpiazza717@gmail.com` and `github.com/SUNYCharlieP` are live values — confirm they're current. Add Threads/X/LinkedIn here if wanted (same `.links` list). |
| 3 | **OG image + domain** | `<head>` meta | `og:image` points to `assets/og-image.png` (relative). For correct social previews set it to the **absolute** deployed URL, e.g. `https://charliepiazza.dev/assets/og-image.png`. |

Optional: the favicon is an inline SVG "cp" monogram in `<head>`. Swap for a real favicon/app-icon set if desired.

---

## Layout & structure

Single column, centered content well: `max-width: 1280px`, horizontal padding `clamp(24px, 6vw, 80px)` (the `.wrap` class). Vertical rhythm between sections uses `clamp()` so it compresses gracefully on mobile. Sections, top to bottom:

### 1. Header (sticky)
- Sticky top bar, `z-index:10`, 1px bottom hairline `#E4DFD3`, translucent paper background `rgba(245,242,236,0.82)` with `backdrop-filter: blur(10px)`.
- Left: wordmark "Charlie Piazza" — JetBrains Mono, 14px, weight 600, letter-spacing 0.02em.
- Right: nav links Work / Background / Contact — JetBrains Mono, 12px, letter-spacing 0.06em, color `#6B675E`; "Contact" is accent blue `#1D4ED8`. Gap `clamp(18px, 3vw, 34px)`. Anchor links to `#work`, `#background`, `#contact` with smooth scroll.

### 2. Hero
- Two-column flex (`flex-wrap: wrap`, gap `clamp(40px, 6vw, 96px)`), vertically centered. Wraps to stacked on narrow screens.
- **Left (copy):** `flex: 1 1 480px; min-width: 300px`.
  - Eyebrow: mono 12px, letter-spacing 0.14em, blue `#1D4ED8`, preceded by a 38×1px blue rule. Text: `iOS DEVELOPER · BUFFALO, NY`.
  - H1: `clamp(40px, 6.4vw, 80px)`, line-height 1.0, weight 800, letter-spacing -0.03em, `max-width: 15ch`. Text: **"I build the iOS apps I wish existed."**
  - Lede paragraph: `clamp(17px, 2vw, 20px)`, line-height 1.6, color `#4A463E`, `max-width: 52ch`. Text: "I design, build, and ship iOS apps solo, from the first sketch to the App Store. Three of them are below."
- **Right (art):** a phone mockup (`.phone-hero`) showing `assets/jarvis-workout.png`. Width `clamp(232px, 28vw, 304px)`. Hover lifts it `translateY(-8px)` with a deeper shadow (300ms ease).

### 3. Work
- Section label row: "SELECTED WORK" / "03" — mono 12px, letter-spacing 0.14em, color `#8A8576`.
- Three `.project` articles, each separated by a 1px top hairline, vertical padding `clamp(48px, 6.5vw, 84px)`. **Display order: 01 Jarvis → 02 FloorSnap → 03 Arca.**
- Each project header is a flex row (wraps): left = app icon + index numeral + name; right = status block.
  - **App icon:** `clamp(48px, 6.5vw, 68px)` square, `border-radius: 23%` (squircle approximation), soft shadow, 1px hairline border.
  - **Index numeral:** mono, `clamp(15px, 2vw, 17px)`, weight 500, color `#B7B1A2`.
  - **Name (h2):** `clamp(32px, 5vw, 52px)`, weight 800, letter-spacing -0.025em. Jarvis renders literally as `<Jarvis>` (escaped angle brackets — keep them).
  - **Status block:** mono 11px, right-aligned, line-height 1.9. Line 1 is the status word (FloorSnap = `ON THE APP STORE` in blue `#1D4ED8`; Jarvis = `PERSONAL PROJECT`, Arca = `IN DEVELOPMENT`, both in ink `#1A1815`), line 2 is the stack (e.g. `SWIFTUI · iOS`, Jarvis = `CLAUDE SDK · SWIFTUI`).
- **Description:** `clamp(16px, 2vw, 19px)`, line-height 1.6, color `#4A463E`, `max-width: 62ch`. Copy per app is in `index.html` — use verbatim.
- **Screenshot rail (`.shots`):** flex-wrap row, gap `clamp(20px, 3vw, 36px)`. Each `figure.shot` is `clamp(146px, 20vw, 218px)` wide: a `.phone` frame + a mono caption beneath (10px, letter-spacing 0.1em, color `#8A8576`). Hover lifts the figure `translateY(-8px)` (250ms).
  - Jarvis shots/captions: VOICE, CHAT, STATS · XP, LEARN.
  - FloorSnap: LiDAR, SCAN, ESTIMATE, CLIENT BID — **followed by the App Store badge**.
  - Arca: FEED, READER, LISTEN, SAVED.
- **App Store badge (FloorSnap only):** dark pill (`#1A1815`), white Apple glyph (inline SVG) + "Download on the / App Store" stacked label. Padding `11px 20px 11px 17px`, radius 13px. Hover lifts `translateY(-3px)`.

### 4. Background
- 1px top hairline. Two-column flex (wraps): left label "BACKGROUND" (mono 12px, `#8A8576`); right body `flex: 1 1 480px`.
  - Lead line: `clamp(22px, 3.2vw, 34px)`, weight 600, line-height 1.35, `max-width: 22ch`. "I taught myself to build and ship iOS apps, end to end."
  - Body: `clamp(15px, 1.9vw, 18px)`, line-height 1.72, color `#4A463E`, `max-width: 60ch`. (Full copy in `index.html`.)

### 5. Contact
- 1px top hairline. Two-column flex, bottom-aligned.
  - Left: an "available" status — mono 12px, green `#1D8A4E`, with an 8px green dot wrapped in a soft `rgba(29,138,78,0.16)` ring. Text `AVAILABLE FOR FREELANCE`. Below it, h2 "Let's build something." (`clamp(34px, 5.5vw, 60px)`, weight 800, letter-spacing -0.03em).
  - Right: link list (mono, `clamp(13px, 1.6vw, 15px)`, line-height 2.2, blue `#1D4ED8`): email + GitHub.
- Copyright line below: mono 10px, letter-spacing 0.1em, color `#ABA493`. "© 2026 CHARLIE PIAZZA · BUFFALO, NY".

---

## Interactions & behavior

- **Smooth scroll** on anchor nav (`html { scroll-behavior: smooth }`).
- **Scroll reveal:** every `[data-reveal]` block (each project, background, contact) starts `opacity:0; translateY(18px)` and transitions to visible (700ms ease) when it enters the viewport. Implemented with `IntersectionObserver` (`rootMargin: '0px 0px -8% 0px'`, `threshold: 0.08`), with a 2.5s `setTimeout` safety net and a no-JS/`prefers-reduced-motion` fallback that shows everything immediately.
- **Hover lifts:** hero phone (-8px), each screenshot figure (-8px), App Store badge (-3px). All transform+shadow transitions.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables reveal transitions and smooth scroll.
- **Responsive:** every size uses `clamp()`; the hero and all flex rows wrap on narrow viewports. No fixed breakpoints needed, but verify at 375px, 768px, 1280px+.
- **Dark mode:** the current design is a single warm-paper light theme (no `prefers-color-scheme` variant). If a dark theme is wanted later, it's a new task — not in scope here.

## State management
None. Static page, no client state, no data fetching.

---

## Design tokens

Defined as CSS custom properties in `:root` (see top of `index.html`).

| Token | Hex | Use |
|-------|-----|-----|
| `--paper` | `#F5F2EC` | Page background |
| `--hairline` | `#E4DFD3` | Section dividers, header border |
| `--ink` | `#1A1815` | Primary text, App Store badge, dark status |
| `--body` | `#4A463E` | Paragraph / description text |
| `--muted` | `#8A8576` | Mono labels, captions, status |
| `--faint` | `#B7B1A2` | Project index numerals |
| `--footnote` | `#ABA493` | Copyright |
| `--blue` | `#1D4ED8` | Accent, links, "on the App Store" |
| `--blue-2` | `#1D8A4E` | "Available for freelance" green |
| `--bezel` | `#0b0c0e` | Phone mockup body |

**Typography**
- **Inter** (400/500/600/700/800/900) — headings, body, hero. `system-ui, sans-serif` fallback.
- **JetBrains Mono** (400/500/600/700) — eyebrows, labels, captions, status, nav, wordmark, links.
- Key sizes: H1 `clamp(40px,6.4vw,80px)`; project H2 `clamp(32px,5vw,52px)`; contact/bg-lead in the `clamp()` values above. Heading letter-spacing runs -0.025em to -0.03em; mono labels run +0.06em to +0.14em.

**Spacing / radius / shadow**
- Content max-width 1280px; text measures capped with `ch` units (15ch–62ch).
- Phone frame radius 38px (hero 44px), screen radius 33px (hero 38px), bezel padding 5px (hero 6px).
- App icon radius 23%; App Store badge radius 13px.
- Shadows: screenshots `0 24px 48px -20px rgba(26,24,21,.4)`; hero phone `0 40px 80px -28px rgba(26,24,21,.5)`. See `.phone` / `.phone-hero` in CSS for exact values.

---

## Assets

All in `assets/` (renamed from the original screenshot exports for clarity). These are real iOS screenshots (1206×2622, iPhone) and 1024px app icons supplied by Charlie.

| File | Used for |
|------|----------|
| `jarvis-icon.png`, `floorsnap-icon.png`, `arca-icon.png` | App icons (1024²) |
| `jarvis-workout.png` | Hero phone |
| `jarvis-voice.png`, `jarvis-chat.png`, `jarvis-stats.png`, `jarvis-learn.png` | Jarvis rail |
| `floorsnap-lidar.png`, `floorsnap-scan.png`, `floorsnap-estimate.png`, `floorsnap-bid.png` | FloorSnap rail |
| `arca-feed.png`, `arca-reader.png`, `arca-player.png`, `arca-saved.png` | Arca rail |
| `og-image.png` | Social share preview (1200×630) |

> Optional optimization: convert PNG screenshots to WebP/AVIF and add `loading="lazy"` to off-screen `<img>` for faster loads. Not required to launch.

---

## Deploy to Netlify

`netlify.toml` is included (no build command; publishes the folder root; long-cache for `/assets/*`, no-cache for HTML; basic security headers).

**Option A — drag & drop (fastest):** Netlify dashboard → Sites → drag this folder onto the deploy zone. Live in seconds.

**Option B — Git (recommended for ongoing edits):**
1. Put these files at the repo root and push to GitHub.
2. Netlify → Add new site → Import from Git → pick the repo. Build command: *(empty)*. Publish directory: `.` (repo root).
3. Deploy.

**Custom domain:** Netlify → Domain settings → add `charliepiazza.dev` → point the registrar's DNS at Netlify (or use Netlify DNS). HTTPS is automatic via Let's Encrypt. After the domain is live, set the absolute `og:image` URL (swap #3 above).

---

## Files in this handoff

- `index.html` — the complete production site (HTML + CSS + scroll-reveal JS, all inline).
- `assets/` — all images.
- `netlify.toml` — deploy config.
- `README.md` — this document.

A developer who wasn't in the original conversation can build and launch the site from this folder alone.
