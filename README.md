# Curing with Care website

Source for [curingwithcare.org](https://curingwithcare.org), the site of Curing with Care (CARE), a student-run 501(c)(3) nonprofit with high school chapters across the US, Canada, India and the UAE.

Built with Next.js 16 (Pages Router), React 19 and Tailwind CSS 4. All content (chapters, events, team, photos) lives in this repo, so the site is fully static with no database or API keys. Hosted on Vercel.

## Running it locally

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Before opening a pull request:

```bash
npm run lint
npm run build
```

Both must pass with no errors.

## Where things live

```
data/chapters.js      The chapter list: every branch, school and chapter head
data/events.js        Past events, newest first, with their photos
data/team.js          Board, research, journalism and intern members
pages/                One file per route
public/               Logo, favicon, social preview, research PDF, event photos (events/), headshots (team/)
src/photos/           Photos used on the site, resized to at most 1800px
src/shared/           Design tokens (globals.css), fonts, site links, shared components
src/utils/            Chapter and event helpers
docs/revamp/          Screenshots from before and after the 2026 redesign
REVAMP_PROGRESS.md    Design decisions, verification results and open items from the redesign
```

## Updating content

**Chapters.** Edit `data/chapters.js`. Each entry is a branch (a city or region) with its schools and chapter heads. Mark a new chapter with `isNew: true`. The chapter, branch and country counts on the home and about pages are computed from this file. To give a new region a page at `/branches/<slug>`, add its slug to `BRANCH_SLUGS` in `src/utils/chapters.js`.

**Events.** Put the photos in a new folder under `public/events/<slug>/` as JPEGs no wider than 1400px, named `1.jpg`, `2.jpg` and so on. Then add an entry at the top of `data/events.js` with the title, the branch name exactly as it appears in `data/chapters.js` (or `null`), the year, a sentence of description, and a `photos` list with each file's width and height. Events appear on the Events page, on their branch's page, and the three newest on the home page.

**Team.** Edit `data/team.js`. Headshots go in `public/team/`. Each person has a `category`: `board` shows a photo card with position and bio, `research` and `journalism` show name lists, and `intern` shows a round photo with a school. Board members appear in file order; the others alphabetically.

**Photos.** Add a JPEG no wider than 1800px to `src/photos/`, then add an entry with a short, specific alt text to `src/shared/photos.js`. Use it from a page with `photos.yourName`.

**Links, name and socials.** `src/shared/site.js` holds the email address, donation link, the chapter application form, social links and the nav items. The blog link stays hidden until `blogEnabled` is set to `true`.

**Colors, type and spacing.** All tokens are in `src/shared/globals.css` under `@theme`. The greens come from the logo; `care-700` is the one used for buttons and links because it passes WCAG AA on white.

**Placeholders.** Text in square brackets starting with `TODO` is a placeholder waiting on real content. Search the `pages/` folder for `[TODO` to find them all.

## Deployment

Vercel builds the site from GitHub. Every push to `main` deploys production, and every other branch gets a preview URL on its pull request. No environment variables are needed.

## Contributing

1. Branch from `main`.
2. Make the change and check it with `npm run dev`.
3. Run `npm run lint` and `npm run build`.
4. Open a pull request with a short description of what changed and why.

Do not push to `main` directly.

## Contact

Website questions go to the CARE technology team at curingwithcare@gmail.com.
