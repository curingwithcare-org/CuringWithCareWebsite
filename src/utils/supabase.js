export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let clientPromise = null;

/**
 * The shared read-only Supabase client, created on first use so the library
 * is not part of the initial page bundle. Rejects at once when the env vars
 * are missing, so pages show their "unavailable" state instead of waiting on
 * a request that can never succeed.
 */
export function getSupabase() {
  if (!clientPromise) {
    if (!supabaseUrl || !supabaseKey) {
      console.warn(
        "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
          "Add them to .env.local (see README). Data-driven sections will show their unavailable state."
      );
      clientPromise = Promise.reject(new Error("Supabase is not configured"));
      clientPromise.catch(() => {});
    } else {
      clientPromise = import("@supabase/supabase-js").then(({ createClient }) => createClient(supabaseUrl, supabaseKey));
    }
  }
  return clientPromise;
}
