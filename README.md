# Premium Editor & Designer Portfolio

A full Next.js 14 (App Router) portfolio site with glassmorphism UI, GSAP/Framer
Motion/Lenis animations, a protected admin dashboard, and a CMS-style content
layer. Built and verified with `npm run build` — compiles clean with zero
errors.

## 1. Quick start (local)

```bash
npm install
cp .env.local.example .env.local   # then fill in the values below
npm run dev
```

Visit `http://localhost:3000` for the site and `http://localhost:3000/admin`
for the admin login.

## 2. Required environment variables

Set these in `.env.local` for local dev, and in your host's dashboard
(Vercel → Project Settings → Environment Variables) for production. **Never**
commit real secrets or hardcode them in source — the app reads all of these
from `process.env` only.

| Variable | Purpose |
|---|---|
| `ADMIN_EMAIL` | The only email allowed to log into `/admin` |
| `ADMIN_PASSWORD` | The admin password (plaintext env var by default — see "Hardening" below to use a hash instead) |
| `AUTH_SECRET` | Random string used to sign admin session cookies. Generate with `openssl rand -base64 48` |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name (free tier is fine) |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | An **unsigned** upload preset — create one in Cloudinary Dashboard → Settings → Upload → Add upload preset → Signing mode: Unsigned |

Optional, for production-grade persistence (see section 4):
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

## 3. What's implemented

- **Pages**: Home, About, Portfolio (with category filters), individual
  project pages (video, before/after slider, client result, software used),
  Services (with pricing), Testimonials, Contact (working form UI + API
  route), Admin Login, Admin Dashboard.
- **Design**: dark glassmorphism theme, custom cursor, mouse glow, cinematic
  hero, premium loading animation, GSAP/Framer Motion/Lenis smooth scroll,
  page-section reveal animations, mobile-responsive throughout.
- **Admin auth**: email/password checked against env vars (never hardcoded),
  session issued as a signed, httpOnly JWT cookie, `/admin/dashboard/*`
  protected by `middleware.ts` at the edge — visitors are redirected to the
  login page and never reach the dashboard UI or its data.
- **Admin dashboard**: Dashboard home (stats + quick links), Portfolio
  Manager (add/edit/delete projects, category select, cover image + hover
  video + before/after image uploads via Cloudinary drag-and-drop, software
  tags, featured toggle), Settings (edit About copy/stats/skills, Services,
  Testimonials, Contact links), Media Library (drag-and-drop uploads, copy
  URL), Profile, Logout. All edits publish immediately to the live site.
- **SEO**: metadata, Open Graph tags, `robots.ts`, `sitemap.ts` (auto-includes
  every project page), semantic headings.

## 4. Important: data persistence in production

This starter's "database" is `data/content.json`, read/written through
`lib/data.ts`. That makes the Admin Dashboard **fully functional locally**
with zero setup. On Vercel, the filesystem is read-only/ephemeral in
production, so admin edits will work during the request but won't reliably
persist across deploys or serverless cold starts.

**To make Admin edits permanent, connect Supabase** (recommended — free
tier is enough):

1. Create a Supabase project and a `content` table (or just a single-row
   JSON `content jsonb` table — the simplest option given the shape of
   `SiteContent` in `lib/types.ts`).
2. Add the three `SUPABASE_*` env vars.
3. Replace the two functions in `lib/data.ts` (`getContent` / `saveContent`)
   with Supabase client calls. Every page and API route in the app already
   goes through these two functions, so that's the only file that needs to
   change.

Firebase Firestore works the same way if you prefer it over Supabase.

## 5. Cloudinary setup (for media uploads)

1. Create a free account at cloudinary.com.
2. Copy your **Cloud name** from the dashboard → `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`.
3. Settings → Upload → Add upload preset → Signing Mode: **Unsigned** → copy
   the preset name → `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`.
4. That's it — the drag-and-drop uploader in the admin dashboard will now
   upload directly to your Cloudinary account and store the resulting URL.

For production hardening, switch to **signed** uploads (harder to abuse) —
`app/api/upload-signature/route.ts` is scaffolded for this; wire it up with
the `cloudinary` npm package and your `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET`.

## 6. Hardening checklist before going live

- [ ] Set a long, random `AUTH_SECRET`.
- [ ] Consider storing `ADMIN_PASSWORD` as a bcrypt hash
      (`ADMIN_PASSWORD_HASH`) and comparing with `bcrypt.compare()` in
      `app/api/auth/login/route.ts` instead of a plaintext env var.
- [ ] Connect Supabase/Firebase for persistent content (section 4).
- [ ] Switch Cloudinary to signed uploads (section 5).
- [ ] Wire `app/api/contact/route.ts` to a real email provider (Resend,
      Postmark, SendGrid) so contact form submissions actually reach your
      inbox.
- [ ] Replace placeholder copy, images, and the `/resume.pdf` link with your
      real content (or manage it all from the Admin Dashboard instead).
- [ ] Update `app/robots.ts` and `app/sitemap.ts` with your real domain.
- [ ] Add a real favicon and OG image.

## 7. Deployment (Vercel)

```bash
npm i -g vercel
vercel
```

Add the environment variables from section 2 in the Vercel dashboard, then
redeploy. Vercel provisions SSL, a CDN, and image optimization automatically.

## 8. Tech stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Framer
Motion · GSAP · Lenis · jose (JWT) · Cloudinary · lucide-react.

## 9. Project structure

```
app/
  page.tsx                    Home
  about/page.tsx
  portfolio/page.tsx           Portfolio grid + category filter
  portfolio/[slug]/page.tsx    Individual project page
  services/page.tsx
  testimonials/page.tsx
  contact/page.tsx
  admin/page.tsx               Admin login
  admin/dashboard/...          Protected admin dashboard
  api/auth/...                 Login / logout (sets/clears session cookie)
  api/content/route.ts         GET (public) / PUT (admin-only) site content
components/                    Shared UI (Navbar, Footer, Hero, cards, cursor, etc.)
lib/
  auth.ts                      Session creation/verification (JWT)
  data.ts                      Content read/write — swap this for Supabase
  types.ts                     Shared TypeScript types
data/content.json              Seed content / local "database"
middleware.ts                  Protects /admin/dashboard/*
```
