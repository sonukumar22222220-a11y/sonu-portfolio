import { NextResponse } from "next/server";
import { saveContent } from "@/lib/data";
import { getSession } from "@/lib/auth";
import defaultContent from "@/data/content.json";
import type { SiteContent } from "@/lib/types";

export const dynamic = "force-dynamic";

// One-time helper: visiting /api/reseed while logged in as admin overwrites
// the live content with the latest data/content.json (used to push new
// bio/experience/education without retyping everything in the dashboard).
// Safe to delete this file once you no longer need it.
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized. Log into /admin first, then visit this URL again." }, { status: 401 });
  }

  await saveContent(defaultContent as SiteContent);
  return NextResponse.json({ success: true, message: "Live content has been reset to the latest default content.json (new bio, experience, education, skills)." });
}
