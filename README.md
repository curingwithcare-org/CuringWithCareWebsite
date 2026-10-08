# Curing with Care website

Source for [curingwithcare.org](https://curingwithcare.org), the site of Curing with Care (CARE), a student-run 501(c)(3) nonprofit with high school chapters across the US, Canada, India and the UAE.

Built with Next.js 16 (Pages Router), React 19 and Tailwind CSS 4. Chapter data lives in this repo; events, team members and branch photos come from a Supabase project, read only. Hosted on Vercel.

## Running it locally

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Pages that read from Supabase (Events, Team, branch photos and the recent-events strip on the home page) need two values in a file named `.env.local` in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Both are under Project Settings → API in the Supabase dashboard. Without them those sections show a "not loading right now" message and everything else works. Never commit `.env.local`.

Before opening a pull request:

```bash
npm run lint
npm run build
```

Both must pass with no errors.

## Where things live

```
data/chapters.js      The chapter list: every branch, school and chapter head
pages/                One file per route
public/               Logo, favicon, social preview image, the research PDF
src/photos/           Photos used on the site, resized to at most 1800px
src/shared/           Design tokens (globals.css), fonts, site links, shared components
src/utils/            Supabase client, chapter helpers, event helpers
docs/revamp/          Screenshots from before and after the 2026 redesign
REVAMP_PROGRESS.md    Design decisions, verification results and open items from the redesign
```

## Updating content

**Chapters.** Edit `data/chapters.js`. Each entry is a branch (a city or region) with its schools and chapter heads. Mark a new chapter with `isNew: true`. The chapter, branch and country counts on the home and about pages are computed from this file, and every branch gets a page at `/branches/<slug>`. To add a branch page for a new region, add its slug to `BRANCH_SLUGS` in `src/utils/chapters.js`.

**Photos.** Add a JPEG no wider than 1800px to `src/photos/`, then add an entry with a short, specific alt text to `src/shared/photos.js`. Use it from a page with `photos.yourName`.

**Links, name and socials.** `src/shared/site.js` holds the email address, donation link, the chapter application form, social links and the nav items. The blog link stays hidden until `blogEnabled` is set to `true`.

**Colors, type and spacing.** All tokens are in `src/shared/globals.css` under `@theme`. The greens come from the logo; `care-700` is the one used for buttons and links because it passes WCAG AA on white.

**Placeholders.** Text in square brackets starting with `TODO` is a placeholder waiting on real content. Search the `pages/` folder for `[TODO` to find them all.

## Data in Supabase

The site only reads. It never writes to Supabase or changes the schema.

| Table or bucket | Used by | Columns read |
|---|---|---|
| `branches` | Branches, branch pages, Events | `id`, `slug`, `city`, `region`, `image`, `description`, `active` |
| `events` | Events, branch pages, home page | `id`, `title`, `description`, `images_folder`, `branch_id` |
| `team_members` | Team | `name`, `position`, `description`, `image`, `category`, `order_rank`, `university`, `social` |
| storage bucket `images` | Events, home page | photos under `events/<images_folder>/` |

If a branch has no row in `branches`, its page still renders from `data/chapters.js`, just without a photo or description.

## Deployment

Vercel builds the site. Every push to `main` deploys production, and every other branch gets a preview URL on its pull request. The two Supabase values above must be set as environment variables in the Vercel project for Production and Preview.

## Contributing

1. Branch from `main`.
2. Make the change and check it with `npm run dev`.
3. Run `npm run lint` and `npm run build`.
4. Open a pull request with a short description of what changed and why.

Do not push to `main` directly.

## Contact

Website questions go to the CARE technology team at curingwithcare@gmail.com.
