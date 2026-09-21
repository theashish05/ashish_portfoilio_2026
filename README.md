# Ashish Acharya — Portfolio (React + Vite)

A modern rebuild of the original CRA portfolio using React 19, Vite, Tailwind CSS v4, Framer Motion, and React Three Fiber for an interactive 3D hero.

## Stack

- **Vite + React** — build tooling and UI library
- **Tailwind CSS v4** — styling via `@tailwindcss/vite`, design tokens in `src/index.css`
- **Framer Motion** — scroll reveals, page transitions, micro-interactions
- **React Three Fiber + Three.js** — the animated node-graph in the hero section
- **React Router** — Home / About / Portfolio / Contact, plus `/react`, `/data-engineering` and `/cards`
- **@emailjs/browser** — contact form submissions (same provider as the original site)

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

The static output lands in `dist/`.

## Deploying

Any static host works. Two easy options:

**Vercel**
```bash
npm i -g vercel
vercel
```

**Netlify**
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

Build command: `npm run build` · Publish directory: `dist`.

## Wiring up the contact form (EmailJS)

The form in `src/pages/Contact.jsx` is ready to send mail, but needs two values from your EmailJS dashboard (emailjs.com/docs/examples/reactjs):

1. Create an email template in EmailJS and copy its **Template ID**.
2. Copy your **Public Key** from Account -> API Keys.
3. In `src/pages/Contact.jsx`, replace:
   - `"YOUR_TEMPLATE_ID"` with your template ID
   - `"YOUR_PUBLIC_KEY"` with your public key

The Service ID is already set in `src/data/content.js` (`contactConfig.serviceId`), carried over from the original site.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Hero, "Currently focused on" cards (clouds -> Azure on hover), skills gauges, resume buttons |
| `/` (hero) | Interactive portrait: black & white until hovered (then full colour), face -> "AI is on the way", sides -> tech logos (`src/components/PhotoHero.jsx`) |
| `/react` | React details with a 3D atom |
| `/data-engineering` | Three project pipelines as 3D hoverable diagrams (`src/data/pipelines.js`) |
| `/cards` | Ten working card templates (`src/components/cards/CardSamples.jsx`) |
| `/about#skills` | Full skills grid, tools, services |

Scroll effects: `ZoomSection` zooms sections in on the way down and out on the way up; `NatureBackdrop` dollies the 3D forest camera with scroll.

## Editing content

All personal content -- intro text, skills (with ratings), timeline, services, resume link, portfolio links, social links, contact info -- lives in one place: **`src/data/content.js`**. Project diagrams live in `src/data/pipelines.js`. Nothing else needs to change for a text/link update.

## Performance notes

- The 3D hero (`src/scenes/HeroScene.jsx`) is lazy-loaded and only rendered when `useDeviceCapability` determines the device can handle it (desktop-class hardware, no reduced-motion preference). Everything else gets a lightweight CSS-only fallback (`HeroFallback.jsx`).
- Visuals are procedural (SVG/WebGL) rather than image-based, so there's very little to download.
- Respects `prefers-reduced-motion` globally.

## Folder structure

```
src/
  components/   Header, Footer, buttons, reveal wrapper, social icons, theme toggle
  data/         content.js -- all editable copy/links in one file
  hooks/        useTheme, useDeviceCapability
  pages/        Home, About, Portfolio, Contact
  scenes/       HeroScene (R3F), HeroFallback (CSS)
```
