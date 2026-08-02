import fs from "fs/promises";
import path from "path";
import type { SiteContent } from "./types";
import { getSupabaseServerClient } from "./supabase";

// ---------------------------------------------------------------------------
// DATA LAYER
// ---------------------------------------------------------------------------
// Two backends are supported:
//   1. Supabase (permanent, works on Netlify/Vercel) — used automatically
//      when NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set.
//   2. Local JSON file (data/content.json) — fallback for local dev when
//      Supabase env vars aren't configured. Note: on Netlify/Vercel the
//      filesystem is read-only in production, so this fallback will not
//      persist writes there — configure Supabase for production use.
//
// Every place in the app that reads/writes content goes through this single
// file, so that's the only file that needed to change to add persistence.
// ---------------------------------------------------------------------------

const DATA_PATH = path.join(process.cwd(), "data", "content.json");
const TABLE = "site_content";
const ROW_ID = 1;

export async function getContent(): Promise<SiteContent> {
  const supabase = getSupabaseServerClient();

  if (supabase) {
    const { data, error } = await supabase
      .from(TABLE)
      .select("data")
      .eq("id", ROW_ID)
      .single();

    if (!error && data?.data) {
      return data.data as SiteContent;
    }
    // If the row doesn't exist yet, seed it from the local JSON file so the
    // site has content on first run, then fall through to the file read below.
    if (error?.code === "PGRST116") {
      const raw = await fs.readFile(DATA_PATH, "utf-8");
      const seeded = JSON.parse(raw) as SiteContent;
      await supabase.from(TABLE).insert({ id: ROW_ID, data: seeded });
      return seeded;
    }
  }

  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw) as SiteContent;
}

export async function saveContent(content: SiteContent): Promise<void> {
  const supabase = getSupabaseServerClient();

  if (supabase) {
    const { error } = await supabase
      .from(TABLE)
      .upsert({ id: ROW_ID, data: content });
    if (error) throw new Error(error.message);
    return;
  }

  await fs.writeFile(DATA_PATH, JSON.stringify(content, null, 2), "utf-8");
}
