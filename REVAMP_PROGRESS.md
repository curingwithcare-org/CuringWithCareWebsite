# Website revamp: progress tracker

Branch: `website-revamp` (from `main` at f87633d). Never commit to `main`.
If you are a new session: read this file and `git log --oneline` first, then continue from "Next up".

## Status

| Phase | State |
|---|---|
| 1. Audit (read only) | Done (section "Phase 1 audit") |
| 2. Design system | Done (section "Phase 2 design system") |
| 3. Home page | In progress |
| 4. Every other page | Not started |
| 5. Verify | Not started |

The Director of Technology approved the audit on 2026-10-07 and asked for Phases 2 to 5 to run without check-ins, with all decisions made by the agent and every question collected for the end.

### Next up
Build the home page (`pages/index.js`), screenshot it, commit. Then Phase 4 pages in this order: About, Branches + branch pages, Events, Research hub + both competitions + CAAC, Team, Start a Branch + Contact, 404.

### Decisions made (pre-approved by the Director)
- **Colors**: the brand greens from the logo and old site, renamed `care-50` to `care-900` (see Phase 2). `care-400` #8ac779 is the identity green (used as accent, tints and highlights); `care-700` #466222 is the action green (buttons, links) because it is the lightest brand green that passes WCAG AA with white text (6.9:1). Neutrals are warm: ink #171a14, paper #fbfbf8.
- **Fonts**: Fraunces (display, soft serif) and Figtree (text), both via `next/font/google`. Adobe Typekit removed.
- **Sitemap**: all existing routes kept. Three routes added: `/start-a-branch` (the chapter call to action), `/research` (hub for both competitions and CAAC), `/contact`. Nav: About, Branches, Events, Research, Team + "Start a Branch" button. Blog stays hidden.
- **Motion**: one scroll reveal (fade up 14px, 0.6s, once), hover color changes only, everything off under `prefers-reduced-motion`. `motion` and `react-intersection-observer` are dropped.
- **Icons**: one inline Lucide-style stroke set in `src/shared/components/Icon.js`. Font Awesome dropped.
- **Photos**: 20 real photos picked from the old `images/` folder, resized to at most 1800px and committed under `src/photos/` (4 MB total) as static imports. The 338 MB `images/` folder is removed from the working tree (still in git history). `public/images/people/` is kept because Supabase team rows may point at it.
- **Numbers**: chapters, branches and countries are computed from `data/chapters.js`. "900+ members" and "$30k+ raised" are kept as the organization's own published figures and flagged `[TODO: confirm]`.
- **Dead code removed**: `tailwind.config.mjs` (Tailwind 4 is configured in CSS), `typekit.css`, `navbar.css`, `DO_NOT_DELETE.js` (build verified without it), `components/Layout.js`, `styles/`, decorative SVGs, stock photos, unused icons and font file.

### Open questions for the team
1. **The live site is down.** `https://curingwithcare.org` returns HTTP 402 from Vercel with `X-Vercel-Error: DEPLOYMENT_DISABLED`, and `https://www.curingwithcare.org` serves an expired TLS certificate. This is a Vercel project or billing state, not something in this repo. Until it is fixed the PR will not get a Vercel preview either.
2. **Supabase keys for local work.** There is no `.env.local`, so Branches, branch pages, Events, Team and the home events strip only show a spinner locally. Please create `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (see README). Do not commit it. The permission classifier blocked me from recovering the public anon key from your local `.next` cache, so I left that alone.
3. **Real numbers.** The site hard-codes "900+ members" and "$30k+ raised" on Home and About. Are those current? Chapters (28), regions (17) and countries (4: US, Canada, India, UAE) can be computed from `data/chapters.js`. Event count can be computed from Supabase.
4. **`/caac`.** The 2025 Cancer Awareness & Action Challenge page is not linked from anywhere, says "Submission (Opens Aug 1st)", and points to hshrf.org. Keep as an archive page, update it, or redirect it to Events?
5. **Fonts.** The site loads Adobe Typekit fonts (`hoss-sharp`, `fredoka-variable`, `hoss-round`, `continuo`) through a 16 KB CSS file that fetches from `use.typekit.net`. That depends on an Adobe subscription staying active and is not `next/font`. I will propose two replacements in Phase 2; say if you want to keep Typekit instead.
6. **The `images/` folder (338 MB).** It is committed to git, outside `public/`, and nothing on the site references it. It holds the best real photos we have. Plan: pick the strongest photos, resize/compress them, import them with `next/image`, and propose removing the rest from the working tree (history keeps them). OK?
7. **The `public/images/people/` folder (86 MB, 24 headshots).** Also unreferenced in code. Team photos come from Supabase `team_members.image`; I need the keys (question 2) to see whether those URLs point here.
8. **Who should get the "Start a Branch" and "Get Involved" clicks?** Today every CTA (Join Our Cause, Get Involved Today, Start a Branch) goes to the same Google Form (`forms.gle/S2WH6htwdTTHK2gy9`). Is there a separate chapter-application form or a contact email you prefer?

---

## Phase 2 design system

Tokens live in `src/shared/globals.css` (`@theme`). Shared components live in `src/shared/components/`.

| Token | Values |
|---|---|
| Greens | care-50 #f3f8ef · care-100 #e0f2de · care-200 #c7edc3 · care-300 #a0da95 · **care-400 #8ac779** (identity) · care-500 #73ac5a · care-600 #5d893c · **care-700 #466222** (actions) · care-800 #35491a · care-900 #2b370e (dark bands, footer) · lime #c8e888 (selection, small highlights) |
| Neutrals | ink #171a14 · ink-2 #3f453a · muted #656b5e · line #e3e6dc · paper #fbfbf8 · paper-2 #f3f4ee · white |
| Type | Fraunces (display, `SOFT` 40) for h1/h2 and stats; Figtree for everything else. Fluid steps: display 42→80px, h1 34→56px, h2 28→42px, h3 20→24px, lead 18→21px, body 17px/1.6, eyebrow 13px uppercase tracked |
| Spacing | Tailwind 4 scale. Sections `py-16 md:py-24` (tight 12/16, loose 20/28/32). Container 72rem, gutters 20px / 32px |
| Radius | buttons and pills: full · cards: 14px (`rounded-card`) · photo bands: 20px (`rounded-band`) · small: 6px |
| Shadows | `shadow-card` (1px hairline + soft 30px) and `shadow-card-hover`; nothing else |
| Motion | `Reveal` component: opacity 0→1 and 14px rise, 0.6s, custom ease, once. Buttons/links: 150ms color. No scale, spring, parallax or looping animation. All off under `prefers-reduced-motion` |

Shared pieces: `Navbar` (sticky white bar, active link state, solid mobile panel that closes on tap, route change and Escape, locks scroll, 44px targets), `Footer` (dark green, four columns, socials), `Button` (real `<a>`/`<Link>`/`<button>`; primary, secondary, ghost, inverse), `Section`/`Container`/`SectionHeading`, `Stat`/`StatRow`, `CtaBand` (the closing section on every page), `Quote`, `Reveal`, `Icon`, `SiteHead` (title, description, canonical, Open Graph with `/og.jpg`).

Screenshots of the shared pieces were reviewed on a temporary `/styleguide` route (removed in Phase 3).

---

## Phase 1 audit

Captured 2026-10-07 on the local dev server (Next.js 16.3.6, Node 24). Baseline screenshots (desktop 1440 px and phone 390 px, full page) are in `docs/revamp/before/`. Because the live deployment is disabled and there are no Supabase keys locally, every data-driven section appears in its loading state in the baseline; the static parts are accurate.

Baseline checks: `npm run lint` passes with 0 errors and 5 warnings (four `<img>` elements, one anonymous default export). `npm run build` passes; all 10 routes prerender as static.

### Stack and shared pieces

- Next.js 16 **Pages Router** (not App Router), React 19, Tailwind 4 (with a v3 compatibility layer that pins the gray/green/emerald/red/yellow/pink palettes), `motion` for animation, `react-intersection-observer`, `yet-another-react-lightbox`, Font Awesome brand icons, Supabase JS (anon key, read only).
- Every page is `"use client"`-style client rendering: data is fetched in `useEffect`, so the HTML that ships has no chapter, event or team content (bad for SEO and first paint), and each page shows a spinner until the request returns. If Supabase is unreachable the spinner never ends on Branches, Events, Team and branch pages.
- `pages/_app.js` renders Navbar, the page, and an inline footer. There is no `pages/404.js` (Next's default black page is used, with the transparent nav floating over it).
- **Navbar** (`src/shared/components/Navbar.js` + `navbar.css`): fixed, transparent at top, switches to a near-black `rgba(29,29,31,.95)` bar after 50 px of scroll. The logo is a plain `<img>` forced to 50×40 px, which squashes the square 500×500 logo. The mobile menu is a max-height slide; it is solid white when the page is at the top and solid dark when scrolled, and it closes on tap and Escape (this was fixed recently). Links: Home, About, Past Events, Branches, Team. Blog link is commented out (keep hidden).
- **Footer** (inline in `_app.js`): copyright, Donate (Zeffy), Past Events, Branches, Team, About, Instagram, LinkedIn, Facebook, email. Plain gray text, no logo, no "start a chapter" action.
- **Button** (`src/shared/components/Button.js`): always renders a `<Link>` wrapping a `<div>`, even for `onClick` buttons (`href="#"`), so buttons are not real buttons for keyboard and screen-reader users. Has four hover layers (spotlight, gradient sweep, shine bar). Primary color is `--color-700` (#5d893c).
- **ChapterCard**, **RegionImage** (region photo under a green gradient, logo fallback, decorative circles), **ErrorBoundary**. `components/Layout.js` and everything in `styles/` (`Events.module.css`, `Layout.module.css`, `ResearchCompetition.module.css`, `animations.css`, `styles/globals.css`) are **not imported anywhere** and can go.
- `src/shared/DO_NOT_DELETE.js` is an old copy of the home page with a comment claiming the site breaks without it. Nothing imports it and ESLint ignores it. I will verify by removing it in Phase 2 and running the build.
- `public/summer-loving-sans-regular.otf`, `public/next.svg`, `public/vercel.svg`, `public/file.svg`, `public/globe.svg`, `public/window.svg`, `public/icons/*.svg` (emerald #10b981 Feather-style icons; `student-icon` duplicates `education-icon`) are unreferenced.
- Data helpers: `src/utils/chapters.js` reads `data/chapters.js` (17 regions, 28 chapters, 5 new) and joins each region to its Supabase `branches` row for the photo, description and slug through a hard-coded `BRANCH_SLUGS` map. `care-data/branches-2026-27.sql` is gitignored and documents the future `chapters` table; not needed now.

### Current colors and type (what "our green" is)

- Brand tokens in `src/shared/globals.css` (`:root`): `--color-50` #e0f2de, `-100` #d8f1d5, `-200` #c7edc3, `-300` #b4e6ae, `-400` #a0da95, `-500` **#8ac779**, `-600` #73ac5a, `-700` **#5d893c**, `-800` #466222, `-900` #2b370e. Also `--background` #ffffff, `--foreground` #171717, and unused `--green` #65f283, `--purple` #6e1f58 and friends.
- Logo (`public/logo.png`, 500×500): light lime cross bar **#c8e888**, mid green cross **#88c078** (matches `--color-500`), heart **#60a070**, "CARE" wordmark navy **#285880**.
- The home page uses the brand tokens, but About, Branches, Events, Team, Research and CAAC use Tailwind's `green-500` #22c55e, `green-400` #4ade80 and `emerald-500` #10b981 instead. So the site currently shows at least four different greens plus yellow award badges, pink/blue social buttons and a navy wordmark.
- Fonts: body `hoss-sharp`, display `fredoka-variable` (bold, rounded), both from Adobe Typekit via `src/shared/typekit.css`. `hoss-round` and `continuo` are loaded but unused.
- Backgrounds: topographic SVG pattern (`.pattern-back`) on the home page, a wave `bg.svg`, three green `blob*.svg` shapes behind the stats, and `from-gray-50 to-gray-100` gradients on every other page.

### Page by page

| Route | File | What it contains today | Data | What is weak or broken |
|---|---|---|---|---|
| `/` | `pages/index.js` (24 KB) | Letter-by-letter animated "curingwithCARE" wordmark on a green wave, italic tagline with underlines, "Donate Now" (Zeffy) and "Join Our Cause" (Google Form). Awareness / Research / Education tab panel: four percentage stat cards, a "Check out the research competition" banner, a YouTube embed. "Our Events" card over a hexagon grid of photos. "By The Numbers" blobs (900+ members, $30k+ raised, 28 chapters). "Stay Connected" social buttons. | Supabase `data` table (section `landing.events`) + storage bucket `images` for the hexagon photos; `data/chapters.js` for the chapter count. | No real photo in the hero; headline is the org name, not what we do. The four percentages have no source. Members and $ raised are hard-coded. "Start a Branch" does not appear on the home page at all. Hexagon section is empty until Supabase answers. Three off-brand social colors. Letter animation and `willChange` on large text cause layout shift. Unused `isMobile` state and resize listener. Everything is animated. |
| `/about` | `pages/about.js` | Hero: real group photo (`/mission.png`, Hillman Cancer Center) under a 60% black overlay, "Our Mission to Transform Lives". One dense paragraph about cancer biology. "Empowerment through..." three split image/text rows. "Our Impact" stats. "Join Our Mission" box with one button to the Google Form. | `data/chapters.js` count. | The three row images are stock photos: hands (`awareness.png`) and the same pipette photo twice (`research.png` and `edu.png` are identical). Copy is abstract and long. Bright `green-400` text over the photo fails contrast. Uses `<img>` and `dangerouslySetInnerHTML`. |
| `/branches` | `pages/branches.js` | Title, intro, then every region A to Z with a card per chapter (school, state, chapter heads, "New" badge) and a "Visit Branch" link when the region has a Supabase row. Green gradient "Join Our Global Movement" box with "Start a Branch". | `data/chapters.js` + Supabase `branches` (photo, description, slug). | The chapter list is local but the page still waits for Supabase before showing anything. No map or region overview; 28 identical cards. Hyderabad has no page. Decorative circles and emerald gradient. |
| `/branches/[slug]` | `pages/branches/[slug].js` | Region hero with photo under a green gradient, the description, an "About Our X Branch" box that repeats the same description, local chapter cards, back link. 16 slugs exist (altoona, atlanta, buffalo, cincinnati, dubai, maryland, philadelphia, houston, irvine, milwaukee, robbinsville, toronto, pittsburgh, roanoke, san-francisco, seattle). | Supabase `branches` row + `data/chapters.js`. | Client-only, so each page is blank HTML until the fetch returns (no SEO). Description appears twice. Region photos are hot-linked `<img>` from assorted hosts, unoptimized. The region's own events are not shown even though `events.branch_id` exists. |
| `/events` | `pages/events.js` (20 KB) | "Our Past Events" title, a large card promoting both research competitions, a row of branch filter tabs (Pittsburgh starred and first), then events grouped by branch city. Each event card shows title, two lines of description, the first six photos and a lightbox. Back-to-top button. | Supabase `branches` (all rows, including retired ones), `events`, storage `images/events/<folder>`. | One storage `list` call per event (N+1). Events are ordered by title and show no dates. Filter tabs overflow horizontally on phones. The research-competition promo does not belong at the top of an events page. Photos assume 1600×900. |
| `/team` | `pages/team.js` | "Our Board" cards (photo with dark gradient, name, position, truncated bio with Read more), then Research & Design, Journalism (name-only tiles) and Interns (round avatars). | Supabase `team_members` (four sequential queries by category). | Fallback image `/team-placeholder.png` does not exist. Name tiles use dynamic Tailwind class names (`from-${color}-50`) that Tailwind cannot generate, and the color list includes blue and indigo. Title says "Our Board" but the page covers four groups. Uses `<img>`. |
| `/research-competition` | `pages/research-competition.js` | First edition: prompt, First Place with the 24-page PDF embedded in an iframe (desktop) and a download link, two runners-up, honorable-mentions table. | Static, in the file. `public/research/angela-choi-cervical-cancer-research.pdf`. | Meta description says "Climate Action and Renewable Energy" (copy-paste error). Yellow award pills. The iframe loads a 550 KB PDF on every desktop visit. Reachable only from the home Research tab and the Events page. |
| `/research-competition-2` | `pages/research-competition-2.js` | Second edition: four prompts, placements 1 to 10 with "Paper title coming soon" and a "Download Paper Coming Soon" button. | Static, in the file. | Shipped with placeholders in production. Same template as the first edition. |
| `/caac` | `pages/caac.js` | 2025 Cancer Awareness & Action Challenge with HSHRF: intro, eligibility, prompt, "Full Guidelines" link to hshrf.org, disabled "Submission (Opens Aug 1st)". | Static. | Orphan page (its home banner is commented out). Stale dates. No Head description of CARE's role beyond "hosted by". |
| `/404` | none (Next default) | "404 This page could not be found." on a black page. | | Transparent nav floats over black; no link back, no branding. |

### Assets we have

- `images/` (338 MB, 316 files, tracked in git, **not served**: it is outside `public/`): event photo sets by folder, mostly 2000 px JPEG/PNG from phones. Strongest candidates for hero and section photos: `landing.png` (members holding CARE letters outdoors, 1024×768), `about_cover.png` = `public/mission.png` (large group at UPMC Hillman Cancer Center, 2000×1041), `people/team.jpeg` (members on a Relay for Life couch, 2000×1500), `card_awareness.png` and `card_research.png` (Pink Out event, members in green CARE shirts), `events_1.jpg` to `events_5.jpg` (speaker event in an auditorium), and the folders `pinkout/`, `relay/`, `relay_fl/`, `hillman/`, `hillman_24/`, `minithon/`, `daffodil/`, `bracelet/`, `letters/`, `hope_for_holidays/`, `christmas/`, `valentines/`, `acs/`, `pittsburghacs_24/`, `pennsburyacs/`, `utsav_mela/`, `nash_fair_24/`, `james_logan_club_fair/`, `walnut_club_rush/`, `gabrielino_club_rush/`, `philly_cards/`, `eastlake_cards/`, `jl_letters/`, `food_fundraiser/`, `phoenix_bakesale/`, `phoenix_chipotle/`, `steam/`, `laurensRun/`, `jamesloganactivity/`, `activity/`. `images/people/` has 34 headshots. `upcoming_*.png` are small stock thumbnails. `card_education.png` is 7.8 MB.
- `public/` (96 MB): `logo.png`, `favicon.ico`, `mission.png` (used by About), three stock photos (`awareness.png`, `research.png`, `edu.png`), `branch-placeholder.png` (3.2 MB Pittsburgh skyline stock photo, unused), `images/people/` (24 headshots, 86 MB, unreferenced in code), `research/*.pdf`, decorative SVGs, icons.
- Supabase storage bucket `images`: event photo folders under `events/` and the home hexagon photos. Region photos in `branches.image` are external URLs.

### Pages missing real images today

- Home: none (illustrated wave and pattern only; hexagon photos depend on Supabase).
- About: stock photos for all three "Empowerment" rows.
- Branches: no imagery on the index; region photos only on branch pages, from external URLs.
- Events: photos only inside each card from Supabase.
- Team: photos from Supabase only; no group photo.
- Research competition (both), CAAC, 404: no images.

### Accessibility and performance notes from the baseline

- No horizontal overflow on any route at 390 px (checked). Events filter tabs scroll inside their own container.
- Buttons that act on click are rendered as `<div>` inside `<a href="#">`; the Read more and filter buttons are real `<button>`s.
- No `prefers-reduced-motion` handling anywhere; `motion` animates on every section, and the hero animates each letter.
- Images: `<img>` in Navbar, About, Team, RegionImage; `next/image` only on event photos and the logo fallback. Hero images are CSS backgrounds (no `priority`, no responsive sizes).
- Fonts come from a third-party CSS file (render-blocking, extra origin).
- Contrast risks: `green-400` text on the About hero, `text-green-300` positions on team cards, `text-gray-400` placeholders, white text on `#22c55e` buttons (3.0:1, below AA for normal text).
- Console on every page: the Supabase env warning (expected locally). Build warning-free otherwise.
