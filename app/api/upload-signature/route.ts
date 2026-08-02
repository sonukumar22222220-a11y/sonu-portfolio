import { NextResponse } from "next/server";

// Placeholder endpoint for SIGNED Cloudinary uploads (more secure than
// unsigned upload presets, recommended once you go live). Add your
// CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET env vars and implement signing
// here with the `cloudinary` npm package. The admin UI currently uses
// unsigned uploads (NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) for simplicity —
// this route is scaffolded for when you're ready to upgrade.
export async function GET() {
  return NextResponse.json(
    { message: "Configure signed Cloudinary uploads here for production." },
    { status: 501 }
  );
}
