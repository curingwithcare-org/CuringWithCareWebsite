import { useEffect, useState } from "react";
import { supabase } from "./supabase";

const byName = (a, b) => a.localeCompare(b, "en", { sensitivity: "base" });

// Display name for a branch row. `region` is set for every active branch;
// `city` is the older short name that the Past Events page still uses.
export const regionName = (branch) => branch.region || branch.city;

const BRANCH_FIELDS = "id, slug, city, region, image, description, active";
const CHAPTER_FIELDS = "id, branch_id, school, state, heads, is_new, note";

// Active regions with their chapters: regions A–Z, chapters A–Z within each.
export async function fetchRegions() {
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

// One region by slug, with its chapters A–Z. Returns null if there is no such slug.
export async function fetchRegion(slug) {
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

// Number of chapters in active regions, for the "Chapters" stats.
export async function fetchChapterCount() {
  const regions = await fetchRegions();
  return regions.reduce((total, region) => total + region.chapters.length, 0);
}

// The chapter count as a display string: "–" until it loads (or if it fails).
export function useChapterCount() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetchChapterCount()
      .then(setCount)
      .catch((e) => console.error("Error fetching chapter count:", e));
  }, []);

  return count === null ? "–" : String(count);
}
