import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

// Temporary diagnostic endpoint. Visit /api/debug on the live site to see
// exactly why admin edits aren't persisting. Safe to delete once fixed —
// it never exposes actual secret values, only whether they're present.
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const report: Record<string, unknown> = {
    env_NEXT_PUBLIC_SUPABASE_URL_present: !!url,
    env_NEXT_PUBLIC_SUPABASE_ANON_KEY_present: !!anonKey,
    env_SUPABASE_SERVICE_ROLE_KEY_present: !!serviceKey,
    url_value_preview: url ? url.slice(0, 20) + "..." : null,
  };

  if (!url || !serviceKey) {
    report.verdict =
      "Supabase env vars are NOT visible to this serverless function at runtime. The app is silently falling back to the ephemeral local JSON file, which is why admin edits don't persist. Double-check the variable names exactly match (no typos, no extra spaces) in Netlify's Environment Variables screen, and that they're available to the 'Functions'/'Runtime' scope, then trigger a fresh deploy.";
    return NextResponse.json(report, { status: 200 });
  }

  try {
    const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });
    const { data, error } = await supabase.from("site_content").select("id, data").eq("id", 1).single();

    if (error) {
      report.supabase_connected = true;
      report.table_query_error_code = error.code;
      report.table_query_error_message = error.message;
      if (error.code === "42P01") {
        report.verdict =
          "The 'site_content' table does NOT exist in Supabase yet. Run the CREATE TABLE SQL in Supabase's SQL Editor.";
      } else if (error.code === "PGRST116") {
        report.verdict =
          "Supabase connected fine, table exists, but has no row with id=1 yet. It should auto-seed on first read — try loading the homepage once, then re-check this page.";
      } else {
        report.verdict = "Supabase connected, but query failed for a different reason — see error_message above.";
      }
      return NextResponse.json(report, { status: 200 });
    }

    report.supabase_connected = true;
    report.row_found = true;
    report.current_about_content = (data?.data as any)?.about ?? null;
    report.verdict = "Supabase IS connected and the row exists. If the live site still shows old numbers, the issue is something else (caching) — send this whole JSON output back.";
    return NextResponse.json(report, { status: 200 });
  } catch (e) {
    report.verdict = "Unexpected error while contacting Supabase: " + (e as Error).message;
    return NextResponse.json(report, { status: 200 });
  }
}
