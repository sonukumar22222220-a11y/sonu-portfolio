import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return NextResponse.json(
      { error: "Admin credentials are not configured on the server." },
      { status: 500 }
    );
  }

  // Simple, constant-time-ish comparison. For extra hardening in production,
  // store a bcrypt hash of the password in ADMIN_PASSWORD_HASH and compare
  // with bcrypt.compare() instead of a plaintext env var.
  const isValid =
    email?.trim().toLowerCase() === adminEmail.trim().toLowerCase() &&
    password === adminPassword;

  if (!isValid) {
    return NextResponse.json(
      { error: "Invalid Email or Password" },
      { status: 401 }
    );
  }

  await createSession(email);
  return NextResponse.json({ success: true });
}
