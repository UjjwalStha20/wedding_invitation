# Invitation frontend

This React, TypeScript, and Vite application is a static wedding invitation.
Wedding details are loaded from `src/config/wedding.ts`; no API or database is
required.

Run the frontend from the repository root:

```bash
npm run dev
```

Edit `src/config/wedding.ts` to update the invitation details. An optional
`?name=` query parameter displays a personalized greeting.

Visit `/generate` to create personalized invitation links using that same
`?name=` format.
Vercel rewrites `/generate` to the app entry point so the route works on direct
visits and page refreshes.

Set `VITE_SITE_URL` in `.env` to configure the canonical and social-sharing
URLs for deployment.
