import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/data";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Public: anyone can GET the site content (used to render the live site).
export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

// Admin-only: overwrites content. Guarded by session check, not just
// the middleware, since API routes aren't covered by the /admin/dashboard
// matcher. Uses POST (not PUT) since some hosts restrict PUT on API routes.
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  await saveContent(body);
  return NextResponse.json({ success: true });
}

// Kept as an alias in case anything still calls PUT.
export async function PUT(req: NextRequest) {
  return POST(req);
}
