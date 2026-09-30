import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";

import {
  CSRF_COOKIE,
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
} from "@/lib/constants";

export { CSRF_COOKIE, SESSION_COOKIE };

export type Role = "admin" | "editor" | "viewer";

export interface SessionUser {
  id: number;
  email: string;
  name: string;
  role: Role;
}

function secretKey() {
  const secret =
    process.env.AUTH_SECRET ??
    (process.env.NODE_ENV !== "production"
      ? "development-only-insecure-secret-change-me-32chars"
      : undefined);
  if (!secret || secret.length < 32) {
    throw new Error(
      "AUTH_SECRET must be set to a random string of at least 32 characters.",
    );
  }
  return new TextEncoder().encode(secret);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSession(user: SessionUser) {
  const token = await new SignJWT({
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(user.id))
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(secretKey());

  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const jar = await cookies();
    const token = jar.get(SESSION_COOKIE)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, secretKey());
    if (!payload.sub) return null;
    return {
      id: Number(payload.sub),
      email: String(payload.email ?? ""),
      name: String(payload.name ?? ""),
      role: (payload.role as Role) ?? "viewer",
    };
  } catch {
    return null;
  }
}

/** Role hierarchy: admin > editor > viewer */
const rank: Record<Role, number> = { admin: 3, editor: 2, viewer: 1 };

export function hasRole(user: SessionUser | null, required: Role) {
  if (!user) return false;
  return rank[user.role] >= rank[required];
}

export async function authenticate(email: string, password: string) {
  const [record] = await db
    .select()
    .from(users)
    .where(eq(users.email, email.toLowerCase()))
    .limit(1);

  if (!record || !record.isActive) return null;
  const ok = await verifyPassword(password, record.passwordHash);
  if (!ok) return null;

  await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, record.id));

  return {
    id: record.id,
    email: record.email,
    name: record.name,
    role: record.role as Role,
  } satisfies SessionUser;
}

/* --------------------------------------------------------------- CSRF */

/**
 * Mints a CSRF token from a Route Handler / Server Action context.
 * The admin login page receives its token from `src/middleware.ts`, because
 * cookies cannot be written while rendering a Server Component.
 */
export async function issueCsrfToken() {
  const jar = await cookies();
  const existing = jar.get(CSRF_COOKIE)?.value;
  if (existing) return existing;
  const token = randomBytes(24).toString("hex");
  jar.set(CSRF_COOKIE, token, {
    httpOnly: false,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return token;
}

export async function verifyCsrfToken(submitted: string | null | undefined) {
  if (!submitted) return false;
  const jar = await cookies();
  const expected = jar.get(CSRF_COOKIE)?.value;
  if (!expected || expected.length !== submitted.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(submitted));
  } catch {
    return false;
  }
}

/** One-way hash of the submitter IP, stored for abuse analysis without PII. */
export function hashIp(ip: string) {
  return createHash("sha256")
    .update(`${ip}:${process.env.AUTH_SECRET ?? "dev-salt"}`)
    .digest("hex")
    .slice(0, 64);
}
