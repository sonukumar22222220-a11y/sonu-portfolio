import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/data";
import { getSession } from "@/lib/auth";

// Public: anyone can GET the site content (used to render the live site).
export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

// Admin-only: PUT overwrites content. Guarded by session check, not just
// the middleware, since API routes aren't covered by the /admin/dashboard
// matcher.
export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  await saveContent(body);
  return NextResponse.json({ success: true });
}
