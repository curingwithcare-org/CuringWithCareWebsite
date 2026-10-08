# Website revamp: progress tracker

Branch: `website-revamp` (from `main` at f87633d). PR #5 (draft). Never commit to `main`.
If you are a new session: read this file and `git log --oneline` first.

## Status

| Phase | State |
|---|---|
| 1. Audit (read only) | Done (section "Phase 1 audit") |
| 2. Design system | Done (section "Phase 2 design system") |
| 3. Home page | Done (section "Phase 3 and 4: pages") |
| 4. Every other page | Done |
| 5. Verify | Done (section "Phase 5 verification") |

All five phases are complete. The Director of Technology approved the audit on 2026-10-07 and asked for Phases 2 to 5 to run without check-ins; every decision below was made by the agent under that approval. **What is left is the team's: answer the open questions and supply the content for the `[TODO]` placeholders.**

### Next up
1. The Director reviews the PR (and the Vercel preview once Vercel is re-enabled).
2. The team answers the open questions and sends the TODO content.
3. Replace each `[TODO]` string in the pages with the real content and remove the note under the stats.

### How to work on it
```bash
npm install
# .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (never commit it)
npm run dev        # http://localhost:3000
npm run lint && npm run build
```
Chapters: edit `data/chapters.js`. Photos: add a resized JPEG to `src/photos/` and an entry with alt text in `src/shared/photos.js`. Links and names: `src/shared/site.js`. Tokens: `src/shared/globals.css`.

---

## Open questions for the team

Answered on 2026-10-08: members (900+) and raised ($30k+) confirmed; the events table has no date column; the single Google Form stays for Start a Branch and Join; `/caac` now redirects to `/research` (its summary lives on the Research hub); the nav label stays "Branches"; `public/images/people/` deleted; Hyderabad has a page at `/branches/hyderabad` built from `data/chapters.js` (a Supabase `branches` row with slug `hyderabad` will add its photo and description later).

Still open:

1. **The live site is down.** `https://curingwithcare.org` returns HTTP 402 from Vercel with `X-Vercel-Error: DEPLOYMENT_DISABLED`, and `https://www.curingwithcare.org` serves an expired TLS certificate. Until it is fixed the PR gets no preview and the public site stays offline.
2. **Supabase keys for local work.** Create `.env.local` with the two `NEXT_PUBLIC_SUPABASE_*` values (never commit it) and restart `npm run dev`. Team, Events and branch photos show their "not loading" state until then. If team photos used to live in the deleted `public/images/people/` folder, restore it from git history (`git checkout f87633d -- public/images/people`).
3. **Content for the `[TODO]` placeholders** (list below).

### `[TODO]` placeholders that need real content

| Page | Placeholder |
|---|---|
| Home | A real quote from a chapter head, with name and school (the pull-quote section) |
| About | Two or three sentences on how CARE began (year, first school, who started it, why) |
| Research | Dates, prompts and submission link for the third edition of the review paper competition |
| Research | Whether the Cancer Awareness & Action Challenge runs in 2026; the 2025 semifinalists and winner if they may be published |
| Research competition, 2nd edition | Paper titles for places 1 to 10 and the first-place PDF |
| Team | When board, team and intern applications open and where to apply |
| Start a Branch | What CARE provides to a new chapter (starter kit, templates, constitution); whether there are any dues or costs; typical reply time |
| Contact | Mailing address and EIN, if the board wants them published |

---

## Decisions made (pre-approved by the Director)
- **Colors**: the brand greens from the logo and old site, renamed `care-50` to `care-900`. `care-400` #8ac779 is the identity green (accents, tints, highlights); `care-700` #466222 is the action green (buttons, links) because it is the lightest brand green that passes WCAG AA with white text (6.9:1). Neutrals are warm: ink #171a14, paper #fbfbf8.
- **Fonts**: Fraunces (display serif with optical sizing) and Figtree (text), both via `next/font/google`, self-hosted at build. Adobe Typekit removed.
- **Sitemap**: all existing routes kept and verified. Three routes added: `/start-a-branch`, `/research`, `/contact`. Nav: About, Branches, Events, Research, Team + "Start a Branch" button. Blog stays hidden (`site.blogEnabled`).
- **Motion**: one scroll reveal (fade up 14px, 0.6s, once, one shared IntersectionObserver), hover color changes only, everything off under `prefers-reduced-motion`. `motion` and `react-intersection-observer` dropped.
- **Icons**: one inline Lucide-style stroke set in `src/shared/components/Icon.js`. Font Awesome dropped.
- **Photos**: 21 real photos picked from the old `images/` folder, resized to at most 1800px, committed under `src/photos/` (4 MB) as static imports with alt text. The 338 MB `images/` folder is removed from the working tree (still in git history).
- **Numbers**: chapters, branches and countries are computed from `data/chapters.js`; the two published figures are kept and flagged.
- **Data**: Supabase stays read only and is loaded lazily (the client library is not in the initial bundle) and only after the browser is idle, so it never competes with first paint. Pages that can render from `data/chapters.js` do so at build time.
- **Removed**: `tailwind.config.mjs`, `typekit.css`, `navbar.css`, `DO_NOT_DELETE.js` (the site builds without it), `components/Layout.js`, `styles/`, decorative SVGs, stock photos, unused icons and font file, and the five unused npm packages.

---

## Phase 2 design system

Tokens live in `src/shared/globals.css` (`@theme`). Shared components live in `src/shared/components/`.

| Token | Values |
|---|---|
| Greens | care-50 #f3f8ef · care-100 #e0f2de · care-200 #c7edc3 · care-300 #a0da95 · **care-400 #8ac779** (identity) · care-500 #73ac5a · care-600 #5d893c · **care-700 #466222** (actions) · care-800 #35491a · care-900 #2b370e (dark bands, footer) · lime #c8e888 (selection) |
| Neutrals | ink #171a14 · ink-2 #3f453a · muted #656b5e · line #e3e6dc · paper #fbfbf8 · paper-2 #f3f4ee · white |
| Type | Fraunces for h1/h2 and stats; Figtree for everything else. Fluid steps: display 42→80px, h1 34→56px, h2 28→42px, h3 20→24px, lead 18→21px, body 17px/1.6, eyebrow 13px uppercase tracked |
| Spacing | Tailwind 4 scale. Sections `py-16 md:py-24` (tight 12/16, loose 20/28/32). Container 72rem, gutters 20px / 32px |
| Radius | buttons and pills: full · cards: 14px (`rounded-card`) · photo bands: 20px (`rounded-band`) · small: 6px |
| Shadows | `shadow-card` and `shadow-card-hover`; nothing else |
| Motion | `Reveal`: opacity 0→1 and 14px rise, 0.6s, once. Buttons/links: 150ms color. No scale, spring, parallax or looping animation. Off under `prefers-reduced-motion` |

Shared pieces: `Navbar` (sticky white bar, active state, solid mobile panel that closes on tap, route change and Escape, locks scroll, 44px targets), `Footer`, `Button` (real `<a>`/`<Link>`/`<button>`; primary, secondary, ghost, inverse), `Section`/`Container`/`SectionHeading`, `Stat`/`StatRow`, `CtaBand` (closing section on every page), `Quote`, `Reveal`, `Icon`, `SiteHead` (title, description, canonical, Open Graph with `/og.jpg`), `EventCard` + `PhotoLightbox` (lazy loaded), `RecentEvents`.

---

## Phase 3 and 4: pages

Every page: one clear purpose, a strong first section with a real photo where one fits, varied layouts, and a "what next" band at the bottom. Routes unchanged.

| Route | Sections |
|---|---|
| `/` | Full-screen photo hero (students under giant HOPE letters at Relay for Life) with one headline and Start a Branch, photo on top and text below on phones and tablets; four computed/flagged numbers; "Three things, done locally" split list with photo thumbnails; chapters grouped by country with links to branch pages; latest three events from Supabase (real-photo fallback); student-voice pull quote (placeholder); CTA band with the CARE-letters photo |
| `/about` | Text-led opener; full-width Hillman Cancer Center photo with caption; "Where it started" (placeholder) with computed counts; awareness/research/care as alternating photo rows; numbers; board → branches → chapters explainer; CTA |
| `/branches` | Headline from the computed counts, photo, country jump links; per-country sections of branch cards (schools, chapter heads, New badges) in a column layout, built from `data/chapters.js` at build time with Supabase photos filled in after load; CTA |
| `/branches/[slug]` | Prerendered for the 17 known slugs (fallback through Supabase for others); region name, chapter count, Supabase photo and description; school cards; that branch's past events with lightbox; CTA. Retired or unknown slugs get a clear message and a way back |
| `/events` | Opener with photo; branch pill filters (scroll on phones, synced to `?branch=slug`); events grouped by branch, newest first, with photo grids and a lazy lightbox; skeleton, retry and empty states; CTA |
| `/research` (new) | Opener; the two editions as split cards; "how it works" steps; next-edition placeholder; link to the CAAC archive; CTA |
| `/research-competition` | Prompt as a pull quote; first-place paper with Read and Download (no embedded PDF); runners-up; honorable mentions as a real table; CTA to the second edition |
| `/research-competition-2` | Four prompts; first place with title/PDF placeholders; placements 2 to 10; CTA to the first edition |
| `/caac` | Permanent redirect to `/research`, where the 2025 challenge is summarized |
| `/team` | Opener with the CARE-letters photo; board cards (native details/summary bios, LinkedIn/Instagram if present); research & design and journalism as name columns; interns with round avatars; loading, empty and retry states; CTA |
| `/start-a-branch` (new) | Split hero with the application button; four steps; "a year in a chapter" photo cards; join / start / support options (`#join`); FAQ; "Be chapter number 29" closer |
| `/contact` (new) | Email and social buttons; "where to go for what" grid; CTA |
| `/404` (new) | Branded not-found page with links back into the site |

---

## Phase 5 verification

- **Lint**: `npm run lint` → 0 errors, 0 warnings. **Build**: `npm run build` → passes; 29 pages prerendered (`/`, `/about`, `/branches`, `/start-a-branch` and the 16 branch pages are SSG; the rest static).
- **Screenshots**: `docs/revamp/before/` (old site, desktop 1440 and phone 390, full page) and `docs/revamp/after/` (new site, same views, from the production build). The Supabase sections show loading or fallback states in both because no keys were available locally.
- **Accessibility**: axe-core (WCAG 2.1 A/AA + best practice) on all 13 routes at desktop and phone: **0 violations on 26 of 26**. Tab order lands on the skip link, logo, then nav links with a visible 3px focus ring. Mobile menu: solid white panel, `aria-expanded`, focus moves into it, Escape closes and returns focus to the toggle, tapping a link navigates and closes it, page scroll is locked while open. Every image has alt text (descriptive for photos, empty for decorative). Contrast: body ink on paper 16:1, action green on white 6.9:1, white on dark green bands 12:1.
- **No horizontal overflow** on any route at 375, 390 or 430 px (iPhone SE, 14/15 and Pro Max widths), checked after a phone polish pass on 2026-10-08: stats in two columns, photo-beside-text rows for the home pillars, Start a Branch steps and event ideas, side-by-side footer columns, a stacked honorable-mentions list instead of a scrolling table, a shorter phone hero, and `viewport-fit=cover` with safe-area padding for notched iPhones.
- **Links and routes**: every internal link from every page returns 200; all 16 old branch slugs, `/caac`, `/events`, `/research-competition`, `/research-competition-2`, `/team`, the research PDF and the logo still resolve. External links (Zeffy, Google Form, Instagram, LinkedIn, Facebook, hshrf.org) respond 200. The only non-200 is the site's own domain (see open question 1).
- **Lighthouse 12** (production build, local, `--only-categories` perf/a11y/best-practices/seo; mobile = default throttled Moto G Power, desktop = `--preset=desktop`):

| Route | Preset | Perf | A11y | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|---|
| `/` | mobile | 82–92 (median 86, see note) | 100 | 96 | 100 | 3.2–4.7 s | 0 |
| `/` | desktop | 100 | 100 | 96 | 100 | 0.7 s | 0 |
| `/about` | mobile | 93 | 100 | 100 | 100 | 3.2 s | 0 |
| `/about` | desktop | 98 | 100 | 100 | 100 | 1.0 s | 0 |
| `/branches` | mobile | 94 | 100 | 96 | 100 | 3.1 s | 0.001 |
| `/branches` | desktop | 100 | 100 | 96 | 100 | 0.6 s | 0.003 |
| `/branches/pittsburgh` | mobile | 95 | 100 | 96 | 100 | 2.8 s | 0 |
| `/branches/pittsburgh` | desktop | 100 | 100 | 96 | 100 | 0.6 s | 0 |
| `/events` | mobile | 92 | 100 | 96 | 100 | 3.3 s | 0 |
| `/events` | desktop | 100 | 100 | 96 | 100 | 0.7 s | 0 |
| `/research` | mobile | 92 | 100 | 100 | 100 | 3.2 s | 0 |
| `/research` | desktop | 100 | 100 | 100 | 100 | 0.7 s | 0.034 |
| `/team` | mobile | 93 | 100 | 96 | 100 | 3.2 s | 0 |
| `/team` | desktop | 100 | 100 | 96 | 100 | 0.7 s | 0 |
| `/start-a-branch` | mobile | 91 | 100 | 100 | 100 | 3.5 s | 0 |
| `/start-a-branch` | desktop | 100 | 100 | 100 | 100 | 0.6 s | 0 |

  **Home page note (2026-10-08):** after the hero photo was changed to the HOPE photo, repeated mobile runs on the development machine scored 82, 86, 81 and 92 for identical builds. A/B tests (old photo in the new layout, WebP vs AVIF, blur placeholder on or off, tile reveals on or off) all produced the same spread, so the variance comes from an intermittent ~1 s stall in Lighthouse's recording on this machine, not from the page. Images are now served as AVIF (hero 26 KB instead of 85 KB WebP). Re-measure on the Vercel preview for a stable number.

  The 96 in best practices appears only on pages that call Supabase and is the "errors in console" audit from the missing local keys; with keys set (as on Vercel) it is 100, as the pages without Supabase show. Mobile LCP is the hero photo on a simulated slow 4G connection; it went from 4.4–4.9 s to 2.8–3.5 s by slimming the display font, lazy-loading the Supabase client, deferring data fetches until idle, giving hero images `fetchpriority=high`, and replacing per-element observers (which thrashed layout during hydration) with one shared observer.

---

## Phase 1 audit

Captured 2026-10-07 on the local dev server (Next.js 16.3.6, Node 24). Baseline screenshots (desktop 1440 px and phone 390 px, full page) are in `docs/revamp/before/`. Because the live deployment is disabled and there are no Supabase keys locally, every data-driven section appears in its loading state in the baseline; the static parts are accurate.

Baseline checks: `npm run lint` passed with 0 errors and 5 warnings (four `<img>` elements, one anonymous default export). `npm run build` passed; all 10 routes prerendered as static.

### Stack and shared pieces (before)

- Next.js 16 **Pages Router**, React 19, Tailwind 4 (with a v3 compatibility layer), `motion`, `react-intersection-observer`, `yet-another-react-lightbox`, Font Awesome brand icons, Supabase JS (anon key, read only).
- Every page was client rendered: data fetched in `useEffect`, so the HTML had no chapter, event or team content, and each page showed a spinner until the request returned (forever, if Supabase was unreachable).
- No `pages/404.js`. Navbar: transparent, switched to a near-black bar after scrolling; logo squashed to 50×40. Footer inline in `_app.js`. `Button` rendered a `<div>` inside a `<Link>` even for click handlers. `components/Layout.js`, everything in `styles/`, `DO_NOT_DELETE.js`, several SVGs and a font file were unreferenced.
- Brand tokens `--color-50..900` existed but most pages used Tailwind's `green-500`, `green-400` and `emerald-500` instead, so at least four greens appeared, plus yellow award badges, pink/blue social buttons and a navy wordmark. Fonts came from Adobe Typekit through a 16 KB CSS file.

### Page by page (before)

| Route | What it contained | Data | What was weak or broken |
|---|---|---|---|
| `/` | Letter-by-letter animated wordmark on a green wave; Donate and "Join Our Cause" (Google Form); Awareness/Research/Education tabs with four unsourced percentages, a competition banner and a YouTube embed; "Our Events" over a hexagon photo grid; "By The Numbers" blobs; social buttons | Supabase `data` + storage; `data/chapters.js` | No real photo in the hero; headline was the org name; hard-coded numbers; no Start a Branch; empty until Supabase answered; off-brand social colors; layout shift from the letter animation |
| `/about` | Group photo under a 60% black overlay; dense paragraph; three split rows with stock photos (the same pipette photo twice); stats; one button to the Google Form | `data/chapters.js` | Stock imagery; abstract copy; `green-400` text on photo failed contrast; `<img>` and `dangerouslySetInnerHTML` |
| `/branches` | Regions A–Z with identical cards; gradient CTA box | `data/chapters.js` + Supabase `branches` | Waited on Supabase although the list was local; no overview; Hyderabad had no page |
| `/branches/[slug]` | Region hero with hot-linked photo, description shown twice, chapter cards | Supabase `branches` + file | Client-only (blank HTML); no branch events; unoptimized images |
| `/events` | Title; large research-competition promo; branch tabs; events by city with six photos and a lightbox | Supabase `branches`, `events`, storage | N+1 storage calls; ordered by title with no dates; tabs overflowed on phones; promo out of place |
| `/team` | Board cards, Research & Design, Journalism, Interns | Supabase `team_members` (4 queries) | Missing fallback image; dynamic Tailwind classes that could not render; blue/indigo in the palette; `<img>` |
| `/research-competition` | Prompt; first place with an embedded 24-page PDF; runners-up; table | Static + PDF | Meta description said "Climate Action and Renewable Energy"; yellow pills; heavy iframe; not in the nav |
| `/research-competition-2` | Prompts; placements with "coming soon" | Static | Placeholders in production |
| `/caac` | 2025 challenge text with a disabled "Opens Aug 1st" button | Static | Orphan page; stale |
| `/404` | Next default on black | | Unbranded; transparent nav over black |

### Assets (before)

- `images/` (338 MB, 316 files, tracked but not served) held the real photos; the strongest were brought into `src/photos/`. `public/` held the logo, favicon, `mission.png`, three stock photos, a 3.2 MB skyline placeholder, `images/people/` (86 MB), the research PDF and decorative SVGs. Supabase storage bucket `images` holds event photos; branch photos are external URLs.
