# Mellanie Rodriguez — Portfolio

Dark, retro-futuristic engineering portfolio. React + Vite, zero UI framework,
route-level code splitting, and an image pipeline that keeps the heaviest page
under 70 KB of imagery.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:5173
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run media` | Re-encode `media-source/` → `public/media/` (incremental) |
| `npm run media:force` | Re-encode everything from scratch |
| `npm run check` | Verify every media reference resolves + alt text present |
| `npm run smoke` | Render every route in Node to catch crashes |
| `npm run lint` | ESLint |

---

## Architecture

```
media-source/          Original masters. Never served. Source of truth.
public/media/          Generated derivatives (AVIF/WebP/JPEG × 400/800/1600).
scripts/
  optimize-media.mjs   Image pipeline. Writes src/data/media.json.
  check-links.mjs      Reference integrity + alt-text audit.
  smoke-test.mjs       Offline SSR render check for every route.
src/
  data/                All content. Projects, art, socials, about.
    media.json         Generated — do not edit by hand.
  components/          Reusable UI. One component per file.
  pages/               One per route.
  hooks/               useReveal
  styles/
    tokens.css         Design tokens. The only place colours/spacing exist.
    base.css           Reset + shared primitives.
  utils/asset.js       Base-path-aware public asset URLs.
```

### Content is data, not markup

Every project lives in `src/data/projects.js`. Nothing about a project is
hardcoded in JSX. To add a project, add an object — the card, the detail route,
the gallery and the "next project" link all follow automatically.

The old site required editing three separate places to add one project, which
is why its content drifted out of sync.

### Missing information is visible, never invented

Each data entry has a `needs[]` array. Anything listed there renders as an
amber note **in dev only** (`import.meta.env.DEV`) — visible to you while
working, compiled out of production. See `CONTENT-TODO.md` for the full list.

---

## Adding a project

1. Drop images into `media-source/`.
2. `npm run media`
3. Add an entry to `src/data/projects.js`:

```js
{
  id: 'my-project',              // becomes /projects/my-project
  title: 'My Project',
  category: 'Embedded · Design',
  tagline: 'One line. Cards show nothing longer.',
  technologies: ['ESP32', 'KiCad'],
  hero: 'my-hero-image',         // filename in media-source/, no extension
  gallery: [
    { media: 'detail-1', caption: '...', alt: '...' },
    { video: '/media/clip.mp4', poster: 'my-hero-image', caption: '...' },
  ],
  summary: '1–2 sentences.',
  glance: [{ label: 'Compute', value: 'ESP32-S3' }],
  sections: [{ heading: 'The problem', body: ['para one', 'para two'] }],
  links: [{ label: 'GitHub', href: 'https://github.com/...' }],
  featured: true,
  status: 'complete',
  needs: [],
}
```

4. `npm run check` to confirm nothing is broken.

`sections` is free-form — projects do not have to share a structure. Give each
one the sections its story actually needs.

---

## Design system

All tokens are in `src/styles/tokens.css`. **Never hardcode a colour, spacing
value, duration or radius** anywhere else.

| | |
|---|---|
| Background | `#07070b` near-black with a blue cast |
| Accent | `#7ed8ff` cyan · `#b3a6ff` lavender (art) · `#ffb27e` amber (status) |
| Type | System monospace for UI and headings; system sans for body prose |
| Radii | 2–4 px. Sharp — this is an instrument panel, not a consumer app |
| Motion | 120/200/320/500 ms, zeroed under `prefers-reduced-motion` |

Contrast is verified: body text 16.8:1, secondary 8.8:1, muted 5.6:1, accents
11–13:1. `--text-faint` (3.0:1) is decorative only — never use it for content.

The art archive re-points `--accent` to lavender at the page scope, so it reads
as a different space without leaving the design language.

### Styling approach

CSS Modules with design tokens, not Tailwind. The visual language here is
bespoke (thin borders, corner ticks, registration marks, restrained glow), which
in Tailwind becomes mostly arbitrary-value classes anyway. This adds no build
dependency and no config, and Vite supports it natively. Tokens are identical
either way, so switching later is a mechanical change.

### Animation approach

CSS transitions plus a small `useReveal` IntersectionObserver hook, not Framer
Motion. What the brief calls for — page fades, card hover, staggered reveal,
arrow nudges — is native CSS. Framer Motion is ~40 KB gzipped for behaviour
already covered. If genuinely complex sequencing is needed later, add it then.

---

## Performance

The previous site loaded **93.3 MB of images on every page** because all 23
images sat in the DOM at parse time (including those inside hidden modals) at
full camera resolution, and its "lazy loader" ran after the preload scanner had
already fetched everything, then fetched them a second time.

Current, measured from generated files:

| Route | Images loaded |
|---|---|
| `/` | **0 KB** — no images |
| `/projects` | 33 KB mobile · 67 KB desktop |
| `/projects/gurt` initial | 14 KB — hero only |
| `/projects/gurt` scrolled | 532 KB — gallery lazy-loads |
| `/art` initial | 180 KB — first plate |

**~1350× smaller** on the heaviest image page.

How:

- AVIF/WebP/JPEG at 400/800/1600 with correct `sizes` — the browser downloads
  exactly one file per image
- native `loading="lazy"`, plus base64 LQIP so there is no layout flash
- `width`/`height` from the manifest → zero cumulative layout shift
- route-level code splitting — never opening `/art` means never downloading it
- **video is click-to-load**: no `<video>` element exists until play is pressed,
  so the 9.7 MB GURT clip costs nothing to visitors who do not watch it
- no web fonts. System stacks only — zero font requests, zero FOUT

Video was re-encoded 51.1 MB → 9.7 MB (720p, faststart).

---

## Accessibility

- Semantic landmarks, single `h1` per route, correct heading order
- Skip link; visible `:focus-visible` rings everywhere, never removed
- Whole-card links — one tab stop per card, no nested interactive elements
- `prefers-reduced-motion` honoured at the token level, so every component
  inherits it; the starfield renders one static frame and never animates
- Mobile nav uses `inert` when collapsed, closes on Escape, restores focus
- Alt text enforced by `npm run check`

---

## Deployment

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on push to
`main`. It runs `npm run check` first, so a broken image reference fails the
build rather than shipping.

Enable **Settings → Pages → Source: GitHub Actions** once.

`BASE_PATH` is set automatically from the repo name for project sites. For a
custom domain or a user site (`mini-debug.github.io`), delete the `env` block in
the workflow.

**Deep links:** GitHub Pages has no SPA rewrite, so the build copies
`index.html` to `404.html`. Direct hits on `/projects/gurt` resolve correctly
but return a 404 *status*. If that matters for SEO, deploy to Cloudflare Pages
or Netlify, which support real rewrites — both are free and neither needs a
code change.

---

## What was removed from the old site

- `mellanie_mainport.html` — stale 84 KB duplicate of `index.html`
- `.vscode/launch.json` — broken (`${mellportfolio}` is not a VS Code variable,
  hardcoded Windows Edge paths, referenced a deleted file)
- `crot1.jpg`, `el3.jpg`, `skectchp5.jpg` — 14.4 MB, referenced nowhere
- "Miscellaneous Projects" — six unsubstantiated cards
- Mouse-following blobs, custom cursor, typing animation, decorative `.art-bg`
  layer (its own source comment said "no actual purpose")
- The Google Fonts request for Roboto, which was loaded but never applied
- ~15 dead CSS classes and an abandoned `.page` router

Recovered: `20920.jpg`, deleted in commit `3db7730` but still referenced by a
live `<img>` tag. Pulled back out of git history and restored.

UTF-16LE → UTF-8 across the board.
