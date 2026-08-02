import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// ---------------------------------------------------------------------------
// AUTH LAYER
// ---------------------------------------------------------------------------
// Admin credentials are NEVER hardcoded. They live in environment variables
// (ADMIN_EMAIL / ADMIN_PASSWORD) set in your hosting provider's dashboard.
// A signed, httpOnly session cookie (JWT) is issued on successful login and
// verified by middleware.ts on every request to /admin/dashboard/*.
//
// For a production app with multiple admins, swap the credential check in
// app/api/auth/login/route.ts for a Supabase Auth / Firebase Auth call —
// the cookie/session plumbing here stays the same.
// ---------------------------------------------------------------------------

const COOKIE_NAME = "admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8; // 8 hours

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error(
      "AUTH_SECRET is not set. Add it to your environment variables (see .env.local.example)."
    );
  }
  return new TextEncoder().encode(secret);
}

export async function createSession(email: string) {
  const token = await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecret());

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload;
  } catch {
    return null;
  }
}

export async function getSession() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export function destroySession() {
  cookies().set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
