import { createHash, timingSafeEqual } from "crypto";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "ist_admin";
const SESSION_DAYS = 7;
const isProd = process.env.NODE_ENV === "production";

function getSecret(): Uint8Array | null {
  const secret = (process.env.AUTH_SECRET ?? "").trim() || (isProd ? "" : "local-development-secret-do-not-use-in-production");
  if (!secret || secret.length < 16) return null;
  return new TextEncoder().encode(secret);
}

/** Admin credentials from environment variables. Local dev falls back to admin / admin123. */
export function getAdminCredentials() {
  const username = (process.env.ADMIN_USERNAME ?? "").trim() || "admin";
  const password = (process.env.ADMIN_PASSWORD ?? "").trim() || (isProd ? "" : "admin123");
  if (!password) return null;
  return { username, password };
}

export function isAuthConfigured() {
  return Boolean(getAdminCredentials() && getSecret());
}

function safeEqual(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function verifyCredentials(username: string, password: string) {
  const creds = getAdminCredentials();
  if (!creds) return false;
  const userOk = safeEqual(username.trim().toLowerCase(), creds.username.toLowerCase());
  const passOk = safeEqual(password, creds.password);
  return userOk && passOk;
}

export async function createSession(username: string) {
  const secret = getSecret();
  if (!secret) throw new Error("AUTH_SECRET is not configured");
  const token = await new SignJWT({ sub: username, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(secret);
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<{ username: string } | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const secret = getSecret();
  if (!secret || !token) return null;
  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
    if (payload.role !== "admin" || typeof payload.sub !== "string") return null;
    return { username: payload.sub };
  } catch {
    return null;
  }
}

/** Checks the session and (for write requests) that the request comes from this site. */
export async function authorizeAdminRequest(request: Request) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    const origin = request.headers.get("origin");
    const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
    if (origin && host) {
      try {
        if (new URL(origin).host !== host) return null;
      } catch {
        return null;
      }
    }
  }
  return getSession();
}

export function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
