import { useEffect, useState } from "react";
import { getSupabase } from "./supabase";
import chapterList from "../../data/chapters";

// -----------------------------------------------------------------------------
// Where the chapter list comes from.
//
//   "file"     data/chapters.js. Photos and page links come from the matching
//              row in the existing Supabase `branches` table (read-only), found
//              through BRANCH_SLUGS below. Regions with no matching row show the
//              CARE-logo fallback and aren't clickable.
//
//   "supabase" the `chapters` table and the branches.region / branches.active
//              columns created by care-data/branches-2026-27.sql.
//
// To switch back to Supabase once the SQL has been run:
//   1. Run care-data/branches-2026-27.sql in the Supabase SQL editor.
//   2. Set CHAPTER_SOURCE below to "supabase".
//   3. Uncomment the redirects in next.config.mjs (the SQL renames three slugs).
// -----------------------------------------------------------------------------
const CHAPTER_SOURCE = "file";

// Region name in data/chapters.js -> slug of its existing row in `branches`.
// A region listed here gets a page even before it has a `branches` row in
// Supabase; the row only adds the photo and description.
const BRANCH_SLUGS = {
  "Altoona, PA": "altoona",
  "Atlanta, GA": "atlanta",
  "Buffalo, NY": "buffalo",
  "Cincinnati, OH": "cincinnati",
  "Dubai, UAE": "dubai",
  "Germantown, MD": "maryland",
  "Greater Philadelphia Region": "philadelphia",
  "Houston, TX": "houston",
  "Hyderabad, India": "hyderabad",
  "Irvine, CA": "irvine",
  "Milwaukee, WI": "milwaukee",
  "New Jersey": "robbinsville",
  "Ontario, Canada": "toronto",
  "Pittsburgh, PA": "pittsburgh",
  "Roanoke, VA": "roanoke",
  "San Jose, CA": "san-francisco",
  "Seattle, WA": "seattle",
};

const byName = (a, b) => a.localeCompare(b, "en", { sensitivity: "base" });

// Display name for a region. `region` is set for every active region;
// `city` is the older short name that the Past Events page still uses.
export const regionName = (branch) => branch.region || branch.city;

// ----------------------------------------------------------------------------
// "file" source
// ----------------------------------------------------------------------------

// data/chapters.js in the shape the components use (same as the Supabase rows).
const fileRegions = chapterList.map((region) => ({
  region: region.region,
  slug: BRANCH_SLUGS[region.region] || null,
  chapters: region.chapters
    .map((chapter) => ({
      id: `${region.region}/${chapter.school}`,
      school: chapter.school,
      state: chapter.state,
      heads: chapter.heads,
      is_new: Boolean(chapter.isNew),
      note: chapter.note || null,
    }))
    .sort((a, b) => byName(a.school, b.school)),
}));

// Adds each region's photo and description from its `branches` row, when
// there is one. The slug (and so the link) comes from BRANCH_SLUGS.
function withBranchRows(regions, rows) {
  const bySlug = new Map(rows.map((row) => [row.slug, row]));
  return regions.map((region) => {
    const row = region.slug && bySlug.get(region.slug);
    return {
      ...region,
      id: row ? row.id : region.region,
      slug: region.slug,
      image: row ? row.image : null,
      description: row ? row.description : null,
      active: true,
    };
  });
}

async function fetchRegionsFromFile() {
  const supabase = await getSupabase();
  const { data, error } = await supabase.from("branches").select("id, slug, image, description");
  // Without the branches rows there are no photos or links, but the chapter list still shows.
  if (error) console.warn("Branch photos unavailable:", error);
  return withBranchRows(fileRegions, error ? [] : data).sort((a, b) => byName(a.region, b.region));
}

async function fetchRegionFromFile(slug) {
  const supabase = await getSupabase();
  const { data: row, error } = await supabase
    .from("branches")
    .select("id, slug, city, image, description")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;

  const region = fileRegions.find((r) => r.slug === slug);
  // A region in the file without a Supabase row yet: page, no photo.
  if (!row) return region ? { id: region.region, slug, region: region.region, image: null, description: null, active: true, chapters: region.chapters } : null;
  // A branches row that no current region maps to is a retired region. Its old
  // `chapters` column is never shown, so removed chapters can't appear.
  if (!region) return { ...row, active: false, chapters: [] };
  return { ...row, region: region.region, active: true, chapters: region.chapters };
}

// ----------------------------------------------------------------------------
// "supabase" source (needs care-data/branches-2026-27.sql)
// ----------------------------------------------------------------------------

const BRANCH_FIELDS = "id, slug, city, region, image, description, active";
const CHAPTER_FIELDS = "id, branch_id, school, state, heads, is_new, note";

async function fetchRegionsFromSupabase() {
  const supabase = await getSupabase();
  const [branchesRes, chaptersRes] = await Promise.all([
    supabase.from("branches").select(BRANCH_FIELDS).eq("active", true),
    supabase.from("chapters").select(CHAPTER_FIELDS),
  ]);
  if (branchesRes.error) throw branchesRes.error;
  if (chaptersRes.error) throw chaptersRes.error;

  return branchesRes.data
    .map((branch) => ({
      ...branch,
      chapters: chaptersRes.data
        .filter((chapter) => chapter.branch_id === branch.id)
        .sort((a, b) => byName(a.school, b.school)),
    }))
    .sort((a, b) => byName(regionName(a), regionName(b)));
}

async function fetchRegionFromSupabase(slug) {
  const supabase = await getSupabase();
  const { data: branch, error } = await supabase
    .from("branches")
    .select(BRANCH_FIELDS)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  if (!branch) return null;

  const { data: chapters, error: chaptersError } = await supabase
    .from("chapters")
    .select(CHAPTER_FIELDS)
    .eq("branch_id", branch.id);
  if (chaptersError) throw chaptersError;

  return { ...branch, chapters: chapters.sort((a, b) => byName(a.school, b.school)) };
}

// ----------------------------------------------------------------------------
// Used by the pages
// ----------------------------------------------------------------------------

// Active regions with their chapters: regions A–Z, chapters A–Z within each.
// A region with no `slug` has no page and its cards aren't links.
export function fetchRegions() {
  return CHAPTER_SOURCE === "supabase" ? fetchRegionsFromSupabase() : fetchRegionsFromFile();
}

// One region by slug, with its chapters A–Z. Returns null if there is no such slug.
export function fetchRegion(slug) {
  return CHAPTER_SOURCE === "supabase" ? fetchRegionFromSupabase(slug) : fetchRegionFromFile(slug);
}

const fileChapterCount = fileRegions.reduce((total, region) => total + region.chapters.length, 0);

// Number of chapters in active regions, for the "Chapters" stats.
export async function fetchChapterCount() {
  if (CHAPTER_SOURCE !== "supabase") return fileChapterCount;
  const regions = await fetchRegions();
  return regions.reduce((total, region) => total + region.chapters.length, 0);
}

// The chapter count as a display string: "–" until it loads (or if it fails).
// From the file it's known up front, so there's nothing to wait for.
export function useChapterCount() {
  const [count, setCount] = useState(CHAPTER_SOURCE === "supabase" ? null : fileChapterCount);

  useEffect(() => {
    if (CHAPTER_SOURCE !== "supabase") return;
    fetchChapterCount()
      .then(setCount)
      .catch((e) => console.warn("Chapter count unavailable:", e));
  }, []);

  return count === null ? "–" : String(count);
}

// ----------------------------------------------------------------------------
// Headline numbers, computed from data/chapters.js (no network needed)
// ----------------------------------------------------------------------------

const countryOf = (regionName) => {
  if (/\bUAE\b/.test(regionName)) return "United Arab Emirates";
  if (/\bIndia\b/.test(regionName)) return "India";
  if (/\bCanada\b/.test(regionName)) return "Canada";
  return "United States";
};

export function chapterStats() {
  const countries = new Set(chapterList.map((region) => countryOf(region.region)));
  const newChapters = chapterList.reduce(
    (total, region) => total + region.chapters.filter((chapter) => chapter.isNew).length,
    0
  );
  return {
    chapters: fileChapterCount,
    branches: chapterList.length,
    countries: countries.size,
    countryNames: [...countries],
    newChapters,
  };
}

// Regions grouped by country, for the Branches overview. Each entry keeps the
// region name, its chapter count and its page slug (if it has one).
export function regionsByCountry() {
  const groups = new Map();
  for (const region of fileRegions) {
    const country = countryOf(region.region);
    if (!groups.has(country)) groups.set(country, []);
    groups.get(country).push({
      region: region.region,
      slug: region.slug,
      chapterCount: region.chapters.length,
      isNew: region.chapters.some((chapter) => chapter.is_new),
    });
  }
  const order = ["United States", "Canada", "India", "United Arab Emirates"];
  return order
    .filter((country) => groups.has(country))
    .map((country) => ({ country, regions: groups.get(country).sort((a, b) => byName(a.region, b.region)) }));
}

// The chapter list straight from the file, in the shape the pages use.
export function staticRegions() {
  return fileRegions.map((region) => ({ ...region, image: null, description: null, active: true })).sort((a, b) => byName(a.region, b.region));
}

export function staticRegion(slug) {
  return fileRegions.find((region) => region.slug === slug) || null;
}

export const branchSlugs = Object.values(BRANCH_SLUGS);
