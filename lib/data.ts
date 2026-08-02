import fs from "fs/promises";
import path from "path";
import type { SiteContent } from "./types";

// ---------------------------------------------------------------------------
// DATA LAYER
// ---------------------------------------------------------------------------
// This starter ships with a JSON-file "database" (data/content.json) so the
// Admin Dashboard is fully functional out of the box with zero external setup.
//
// IMPORTANT (production note): Vercel's filesystem is read-only/ephemeral in
// production, so writes here will work locally but won't persist across
// deploys or serverless cold starts on Vercel. To make Admin edits permanent,
// swap the two functions below (getContent / saveContent) for calls to
// Supabase (or Firebase). Every place in the app that reads/writes content
// goes through this single file, so that's the only file you need to touch.
// ---------------------------------------------------------------------------

const DATA_PATH = path.join(process.cwd(), "data", "content.json");

export async function getContent(): Promise<SiteContent> {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw) as SiteContent;
}

export async function saveContent(content: SiteContent): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(content, null, 2), "utf-8");
}
