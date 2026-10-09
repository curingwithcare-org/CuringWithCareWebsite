import chapterList from "../../data/chapters";

// Everything about chapters comes from data/chapters.js. A "region" (also
// called a branch on the site) is a city or area with one or more school
// chapters.

// Region name -> slug of its page at /branches/<slug>. Add a line here when a
// new region is added to data/chapters.js.
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

export const regionName = (region) => region.region || region.city;
export const regionSlug = (name) => BRANCH_SLUGS[name] || null;

const countryOf = (name) => {
  if (/\bUAE\b/.test(name)) return "United Arab Emirates";
  if (/\bIndia\b/.test(name)) return "India";
  if (/\bCanada\b/.test(name)) return "Canada";
  return "United States";
};

const regions = chapterList
  .map((region) => ({
    id: region.region,
    region: region.region,
    slug: BRANCH_SLUGS[region.region] || null,
    country: countryOf(region.region),
    description: region.description || null,
    chapters: region.chapters
      .map((chapter) => ({
        id: `${region.region}/${chapter.school}`,
        school: chapter.school,
        state: chapter.state,
        heads: chapter.heads || [],
        is_new: Boolean(chapter.isNew),
        note: chapter.note || null,
      }))
      .sort((a, b) => byName(a.school, b.school)),
  }))
  .sort((a, b) => byName(a.region, b.region));

/** All regions A to Z, each with its chapters A to Z. */
export const allRegions = () => regions;

/** One region by its page slug, or null. */
export const regionBySlug = (slug) => regions.find((r) => r.slug === slug) || null;

export const branchSlugs = regions.filter((r) => r.slug).map((r) => r.slug);

const chapterCount = regions.reduce((total, r) => total + r.chapters.length, 0);

/** Headline numbers for the home and about pages. */
export function chapterStats() {
  const countries = [...new Set(regions.map((r) => r.country))];
  return {
    chapters: chapterCount,
    branches: regions.length,
    countries: countries.length,
    countryNames: countries,
    newChapters: regions.reduce((total, r) => total + r.chapters.filter((c) => c.is_new).length, 0),
  };
}

/** Regions grouped by country, in a fixed country order. */
export function regionsByCountry() {
  const order = ["United States", "Canada", "India", "United Arab Emirates"];
  return order
    .map((country) => ({
      country,
      regions: regions
        .filter((r) => r.country === country)
        .map((r) => ({ region: r.region, slug: r.slug, chapterCount: r.chapters.length, isNew: r.chapters.some((c) => c.is_new) })),
    }))
    .filter((g) => g.regions.length);
}
