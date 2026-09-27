import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
    "Add them to .env.local (see README). Data-driven sections will fail to load."
  );
}

// Fall back to an unroutable URL so a missing env var shows each page's
// error state instead of crashing the build.
export const supabase = createClient(
  supabaseUrl || "https://missing-supabase-url.invalid",
  supabaseKey || "missing-anon-key"
);
