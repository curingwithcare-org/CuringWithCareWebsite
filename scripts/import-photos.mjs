// One-off import of the event photos and team headshots that lived in the old
// images/ folder (git commit f87633d). Resizes them into public/ and writes
// data/events.js and data/team.js with placeholders where facts are unknown.
// Run from the repo root: node scripts/import-photos.mjs
import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import sharp from "sharp";

const COMMIT = "f87633d";
const MAX_PHOTOS = 10;

// Folder -> what we know. `branch` must match a region name in data/chapters.js
// or be null (shown under "Across CARE" until the team assigns it).
const events = [
  { folder: "pittsburghacs_24", slug: "relay-for-life-butler-county-2024", title: "Relay for Life, Butler County", branch: "Pittsburgh, PA", year: 2024, description: "The North Allegheny chapter's Relay for Life team at the American Cancer Society event in Butler County." },
  { folder: "hillman_24", slug: "hillman-cancer-center-visit-2024", title: "Visit to UPMC Hillman Cancer Center", branch: "Pittsburgh, PA", year: 2024, description: "Members toured the cancer center and met the staff." },
  { folder: "nash_fair_24", slug: "club-fair-2024", title: "Club fair", branch: null, year: 2024, description: "[TODO: which school, and what the table was about]" },
  { folder: "pinkout", slug: "pink-out-game", title: "Pink Out game", branch: "Pittsburgh, PA", year: null, description: "A home game turned pink for breast cancer awareness, with ribbons, a banner and the chapter at the gate." },
  { folder: "hillman", slug: "hillman-cancer-center-visit", title: "Visit to UPMC Hillman Cancer Center", branch: "Pittsburgh, PA", year: null, description: "A group visit to the cancer center in Pittsburgh." },
  { folder: "relay", slug: "relay-for-life", title: "Relay for Life", branch: "Pittsburgh, PA", year: null, description: "The chapter's team at the American Cancer Society's Relay for Life." },
  { folder: "acs", slug: "american-cancer-society-event", title: "American Cancer Society event", branch: null, year: null, description: "[TODO: which event and where]" },
  { folder: "pennsburyacs", slug: "relay-for-life-pennsbury", title: "Relay for Life at Pennsbury", branch: "Greater Philadelphia Region", year: null, description: "Under the HOPE letters at the Relay for Life in Bucks County." },
  { folder: "philly_cards", slug: "cards-for-patients-philadelphia", title: "Cards for patients", branch: "Greater Philadelphia Region", year: null, description: "Hand-drawn cards for patients at a local hospital." },
  { folder: "hope_for_holidays", slug: "hope-for-the-holidays", title: "Hope for the Holidays", branch: null, year: null, description: "[TODO: which branch and what was delivered]" },
  { folder: "christmas", slug: "holiday-cards", title: "Holiday cards", branch: null, year: null, description: "Holiday cards and small gifts made for patients." },
  { folder: "valentines", slug: "valentines-cards", title: "Valentine's cards", branch: null, year: null, description: "Valentine's Day cards for patients and families." },
  { folder: "minithon", slug: "card-making-drive", title: "Card-making drive", branch: null, year: null, description: "A lunch-period table where students made cards for a nearby cancer center." },
  { folder: "letters", slug: "letters-to-patients", title: "Letters to patients", branch: null, year: null, description: "Students writing letters to people in treatment." },
  { folder: "jl_letters", slug: "letters-to-patients-james-logan", title: "Letters to patients at James Logan High School", branch: null, year: null, description: "[TODO: branch]" },
  { folder: "daffodil", slug: "daffodil-days", title: "Flower fundraiser", branch: null, year: null, description: "Flowers sold and delivered to raise money for the American Cancer Society." },
  { folder: "bracelet", slug: "bracelet-making", title: "Bracelet making", branch: null, year: null, description: "Beaded #CARE bracelets made and sold by the chapter." },
  { folder: "food_fundraiser", slug: "food-fundraiser", title: "Food fundraiser", branch: null, year: null, description: "[TODO: what was sold and where the money went]" },
  { folder: "phoenix_bakesale", slug: "bake-sale", title: "Bake sale", branch: null, year: null, description: "[TODO: which chapter]" },
  { folder: "phoenix_chipotle", slug: "chipotle-fundraiser", title: "Chipotle fundraiser night", branch: null, year: null, description: "[TODO: which chapter]" },
  { folder: "james_logan_club_fair", slug: "club-fair-james-logan", title: "Club fair at James Logan High School", branch: null, year: null, description: "The chapter's photo frame and table at the school club fair." },
  { folder: "jamesloganactivity", slug: "chapter-activity-james-logan", title: "Chapter activity at James Logan High School", branch: null, year: null, description: "[TODO: what the activity was]" },
  { folder: "gabrielino_club_rush", slug: "club-rush-gabrielino", title: "Club rush at Gabrielino High School", branch: null, year: null, description: "Signing up new members at the start of the year." },
  { folder: "walnut_club_rush", slug: "club-rush-walnut", title: "Club rush at Walnut High School", branch: null, year: null, description: "The chapter's display board at club rush." },
  { folder: "eastlake_cards", slug: "card-making-eastlake", title: "Card making at Eastlake", branch: null, year: null, description: "[TODO: branch]" },
  { folder: "utsav_mela", slug: "utsav-mela-booth", title: "Booth at Utsav Mela", branch: null, year: null, description: "A CARE table at a community festival." },
  { folder: "steam", slug: "steam-night", title: "STEAM night", branch: null, year: null, description: "Teaching younger students at a school STEAM night. [TODO: which school]" },
  { folder: "laurensRun", slug: "laurens-run", title: "Lauren's Run", branch: null, year: null, description: "[TODO: what the run supports and which chapter took part]" },
  { folder: "activity", slug: "chapter-activity", title: "Chapter activity", branch: null, year: null, description: "[TODO: what this was]" },
  { folder: "ROOT_EVENTS", slug: "guest-speaker-event", title: "Guest speaker event", branch: null, year: null, description: "Students in the auditorium for a talk on cancer research. [TODO: speaker and school]" },
];

const list = execSync(`git ls-tree -r --name-only ${COMMIT} -- images public/images/people`).toString().trim().split("\n");
const show = (path) => execSync(`git show "${COMMIT}:${path}"`, { maxBuffer: 1 << 28 });

rmSync("public/events", { recursive: true, force: true });
rmSync("public/team", { recursive: true, force: true });
const out = [];
for (const ev of events) {
  const files = list
    .filter((f) => (ev.folder === "ROOT_EVENTS" ? /^images\/events_\d\.jpg$/.test(f) : f.startsWith(`images/${ev.folder}/`)))
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .slice(0, MAX_PHOTOS);
  mkdirSync(`public/events/${ev.slug}`, { recursive: true });
  const photos = [];
  let n = 1;
  for (const f of files) {
    try {
      const img = sharp(show(f)).rotate();
      const meta = await img.metadata();
      if (!meta.width || meta.width < 300) continue;
      const file = `${n}.jpg`;
      const info = await img.resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toFile(`public/events/${ev.slug}/${file}`);
      photos.push({ src: `/events/${ev.slug}/${file}`, width: info.width, height: info.height });
      n++;
    } catch (e) {
      console.warn("skip", f, e.message);
    }
  }
  out.push({ ...ev, photos });
  console.log(ev.slug.padEnd(42), photos.length, "photos");
}

const js = `// Past events. One entry per event, newest first. Photos live in public/events/<slug>/.
// To add an event: make a folder of resized JPEGs (max 1400px) under public/events/,
// then add an entry here. \`branch\` must match a region name in data/chapters.js, or be
// null until it is known. Replace any "[TODO: ...]" text with the real detail.

const events = ${JSON.stringify(
  out.map(({ folder, ...e }) => e),
  null,
  2
).replace(/"(\w+)":/g, "$1:")};

export default events;
`;
writeFileSync("data/events.js", js);

// Team headshots: first names only; the team fills in the rest.
mkdirSync("public/team", { recursive: true });
const heads = list.filter((f) => f.startsWith("public/images/people/")).sort();
const team = [];
for (const f of heads) {
  const first = f.split("/").pop().replace(/\.[a-z]+$/i, "");
  const name = first.charAt(0).toUpperCase() + first.slice(1);
  try {
    const img = sharp(show(f)).rotate();
    const info = await img.resize({ width: 800, height: 800, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(`public/team/${first}.jpg`);
    team.push({ name: `${name} [TODO: last name]`, position: "[TODO: position]", category: "board", photo: `/team/${first}.jpg`, width: info.width, height: info.height, bio: "" });
  } catch (e) {
    console.warn("skip", f, e.message);
  }
}
const teamJs = `// The people on the site's Team page. Photos live in public/team/.
// category: "board" (card with photo and bio), "research", "journalism" (name lists) or
// "intern" (round photo with school). Board members are shown in this order.

const team = ${JSON.stringify(team, null, 2).replace(/"(\w+)":/g, "$1:")};

export default team;
`;
writeFileSync("data/team.js", teamJs);
console.log("events:", out.length, "team:", team.length);
