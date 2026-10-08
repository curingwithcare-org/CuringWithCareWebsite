export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let clientPromise = null;

/**
 * The shared read-only Supabase client, created on first use so the library
 * is not part of the initial page bundle. Resolves to a client that fails
 * every request (instead of crashing) when the env vars are missing.
 */
export function getSupabase() {
  if (!clientPromise) {
    clientPromise = import("@supabase/supabase-js").then(({ createClient }) => {
      if (!supabaseUrl || !supabaseKey) {
        console.warn(
          "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
            "Add them to .env.local (see README). Data-driven sections will fail to load."
        );
      }
      return createClient(supabaseUrl || "https://missing-supabase-url.invalid", supabaseKey || "missing-anon-key");
    });
  }
  return clientPromise;
}
