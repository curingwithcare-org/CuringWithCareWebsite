import { getSupabase, supabaseUrl } from "./supabase";

// Read-only helpers for the Supabase `events` and `branches` tables and the
// `images` storage bucket. Nothing here writes.

const IMAGE_RE = /\.(jpe?g|png|gif|webp)$/i;

export async function fetchBranches() {
  const supabase = await getSupabase();
  const { data, error } = await supabase.from("branches").select("id, slug, city, region, image, description").order("city");
  if (error) throw error;
  return data || [];
}

export async function fetchEvents({ limit } = {}) {
  const supabase = await getSupabase();
  let query = supabase.from("events").select("*").order("id", { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function listEventImages(folder, { limit } = {}) {
  if (!folder) return [];
  const supabase = await getSupabase();
  const { data, error } = await supabase.storage
    .from("images")
    .list(`events/${folder}`, { limit: limit || 100, sortBy: { column: "name", order: "asc" } });
  if (error) throw error;
  return (data || []).filter((item) => IMAGE_RE.test(item.name)).map((item) => ({
    name: item.name,
    url: eventImageUrl(folder, item.name),
  }));
}

// Public URL of one event photo (no client needed: it is a fixed path).
export function eventImageUrl(folder, name) {
  return `${supabaseUrl}/storage/v1/object/public/images/events/${folder}/${name}`;
}

// Best-effort date for an event row. The schema is read only and the date
// column (if any) is not documented, so accept the common names.
export function eventDate(event) {
  const raw = event.date || event.event_date || event.held_on || event.starts_at || null;
  if (!raw) return null;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatEventDate(date) {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
