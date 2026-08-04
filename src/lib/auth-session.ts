export const SESSION_MAX_AGE = 8 * 60 * 60; // 8 hours

export const INACTIVITY_TIMEOUT = 30 * 60; // 30 minutes

export function isTokenInactive(
  lastActivity: unknown,
  now = Math.floor(Date.now() / 1000)
) {
  return (
    typeof lastActivity === "number" &&
    now - lastActivity > INACTIVITY_TIMEOUT
  );
}
