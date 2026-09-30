/**
 * In-memory fixed-window rate limiter.
 *
 * ⚠️ Suitable for a single-instance VPS deployment (the documented target).
 * For multi-instance deployments swap the Map for Redis — the interface stays
 * identical. See README → Deployment.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const globalStore = globalThis as typeof globalThis & {
  __rateLimitBuckets?: Map<string, Bucket>;
};
const store = globalStore.__rateLimitBuckets ?? buckets;
globalStore.__rateLimitBuckets = store;

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 10 * 60 * 1000,
): RateLimitResult {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || existing.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  if (existing.count >= limit) {
    return {
      success: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  store.set(key, existing);
  return { success: true, remaining: limit - existing.count, retryAfterSeconds: 0 };
}

/** Best-effort client identifier from proxy headers. */
export function clientKey(headers: Headers, scope: string) {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || headers.get("x-real-ip") || "unknown";
  return `${scope}:${ip}`;
}
