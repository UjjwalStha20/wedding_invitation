# Shubh Vivah — Nepali Wedding Invitation

A premium, responsive digital wedding invitation inspired by traditional Nepali Hindu wedding cards. Built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Features

- Full-screen envelope intro — tap anywhere (or skip) and watch the wax Ganesh seal morph into the hero as the flap opens
- Personalized greeting from `?to=GuestName`
- Original SVG Ganesh, mandala, envelope, and gold ornaments
- Traditional photo gallery with a keyboard-accessible lightbox
- Bikram Sambat and Gregorian wedding details
- Configurable multi-event schedule and venue directions
- Personal invitation link generator with copy, preview, and WhatsApp sharing
- Self-hosted fonts, SEO/Open Graph metadata, favicon, and OG image
- Reduced-motion support and mobile-first responsive layouts

## Envelope intro

The invitation sits behind a full-screen envelope. Tapping anywhere (or using the skip control) opens the flap and morphs the wax Ganesh seal into the Ganesh hero of the first section, so the animation lands on the exact same layout. When `prefers-reduced-motion` is set, the envelope clears instantly.

## Local development

```bash
npm install
npm run dev
```

Useful URLs:

- `http://localhost:5173/`
- `http://localhost:5173/?to=Ram%20Sharma`
- `http://localhost:5173/?to=Sita+Thapa`

## Personalization

Guest names are read from the `to` query parameter with `URLSearchParams`. The name is normalized and rendered safely as text. No backend or database is required.

```text
https://your-domain.com/?to=Ram%20Sharma
```

WhatsApp link previews always use the common wedding title and image. A frontend-only site cannot generate a unique server-rendered preview per guest; the correct guest name still appears as soon as the page opens.

## Configuration

Edit `src/config/wedding.ts` to change:

- Couple names, Nepali names, and parents
- Wedding dates, weekday, and Muhurta
- Venue and Google Maps URL
- Event schedule (set `enabled: false` to hide an event)
- Family names, invitation copy, and WhatsApp template
- Optional couple photo (place it in `public/images/` and set `photos.couple`)
- Photo gallery images and captions (`photos.gallery`)
- SEO title and description

If you change the couple or event details, also update the static fallback metadata and JSON-LD in `index.html` so link previews and crawlers see the new information before JavaScript loads.

## Photo gallery

The gallery appears between the personal greeting and the wedding details. It ships with six elegant SVG placeholders in `public/images/gallery/`. To use real photographs:

1. Add optimised images to `public/images/gallery/` (for example `moment-1.jpg`).
2. Update the `photos.gallery` array in `src/config/wedding.ts`:

```ts
gallery: [
  { src: '/images/gallery/moment-1.jpg', alt: 'Aarav and Sita at the temple', caption: 'Where it all began' },
  // ...
],
```

Each entry needs `src` and `alt`; `caption` is optional. Remove entries you do not need, or set `photos.gallery` to an empty array to hide the section. If an image fails to load, the card falls back to the couple's monogram. Tapping a photo opens a lightbox with prev/next controls and arrow-key support.

## Site URL

Copy `.env.example` to `.env` and set your production URL:

```bash
VITE_SITE_URL=https://your-domain.com
```

This is used for generated invitation links, canonical URLs, and Open Graph image URLs.

## Personal invitation generator

Open the floating pen button, or the link in the closing section. Enter a guest name, generate the URL, then copy, preview, or share it on WhatsApp. All URL encoding is handled with `URLSearchParams`; spaces are displayed as `%20`.

## Assets

Generate the OG image and favicon PNGs from the source templates:

```bash
npm run assets
```

This requires a local Chrome/Chromium executable and ImageMagick. The source templates live in `scripts/`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
npm run preview
```

## Cloudflare Pages deployment

1. Push the repository to GitHub/GitLab, or use Cloudflare Pages direct upload.
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Node version: 22 (see `.nvmrc`)
5. Set the environment variable `VITE_SITE_URL` to your production URL.
6. Deploy. `public/_redirects` provides the SPA fallback (`/* /index.html 200`), and query parameters are preserved when the invitation loads.

No backend server is required.
