import { NextRequest, NextResponse } from "next/server";

// Placeholder contact-form handler. It validates input and returns success
// so the UI works end-to-end out of the box. To actually deliver emails,
// wire this up to Resend, Postmark, SendGrid, or a Supabase Edge Function —
// just replace the TODO below with a real send call using an API key stored
// in an environment variable (never hardcoded).
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message } = body ?? {};

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  // TODO: send email via your provider of choice, e.g.:
  // await resend.emails.send({ from: ..., to: process.env.ADMIN_EMAIL, subject: `New inquiry from ${name}`, text: message });

  return NextResponse.json({ success: true });
}
