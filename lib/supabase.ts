import { createClient } from "@supabase/supabase-js";

// Server-side client using the service role key (full read/write access).
// Only ever imported from server code (lib/data.ts, API routes) — never
// bundled into client components, since the service role key must stay secret.
export function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return null;
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
