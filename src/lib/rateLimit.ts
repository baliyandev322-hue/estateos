// In-memory token bucket rate limiter for serverless / Next.js API routes

interface RateLimitStore {
  [key: string]: {
    tokens: number;
    lastRefill: number;
  };
}

const store: RateLimitStore = {};

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 60,
  windowMs: number = 60000
): { success: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const client = store[identifier] || { tokens: maxRequests, lastRefill: now };

  // Refill tokens based on elapsed time
  const elapsed = now - client.lastRefill;
  if (elapsed > windowMs) {
    client.tokens = maxRequests;
    client.lastRefill = now;
  } else {
    const refill = Math.floor((elapsed / windowMs) * maxRequests);
    if (refill > 0) {
      client.tokens = Math.min(maxRequests, client.tokens + refill);
      client.lastRefill = now;
    }
  }

  if (client.tokens > 0) {
    client.tokens -= 1;
    store[identifier] = client;
    return { success: true, remaining: client.tokens, reset: client.lastRefill + windowMs };
  }

  return { success: false, remaining: 0, reset: client.lastRefill + windowMs };
}
