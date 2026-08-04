type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const entries = new Map<string, RateLimitEntry>();
const MAX_ENTRIES = 10_000;

/**
 * Lightweight protection for anonymous form submissions. It deliberately
 * fails open across separate server instances; deploy behind an edge/WAF rate
 * limiter as well when horizontally scaling.
 */
export function checkRateLimit(key: string, options: RateLimitOptions) {
  const now = Date.now();

  if (entries.size >= MAX_ENTRIES) {
    for (const [entryKey, entry] of entries) {
      if (entry.resetAt <= now) entries.delete(entryKey);
    }
  }

  const entry = entries.get(key);
  if (!entry || entry.resetAt <= now) {
    entries.set(key, { count: 1, resetAt: now + options.windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  entry.count += 1;
  const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);
  return {
    allowed: entry.count <= options.limit,
    retryAfterSeconds,
  };
}
