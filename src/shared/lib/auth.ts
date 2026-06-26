const FIFTEEN_DAYS_MS = 15 * 24 * 60 * 60 * 1000;

/**
 * Decodes a JWT payload and checks the `exp` claim.
 * Returns `true` when the token is missing, malformed, or expired.
 */
export function isTokenExpired(token: string | null): boolean {
  if (!token) return true;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;

    const payload = JSON.parse(atob(parts[1]));
    if (typeof payload.exp !== "number") return true;

    // Compare in seconds
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

/**
 * Returns `true` when the session is still valid:
 * - token is present and not JWT-expired
 * - token was saved within the last 15 days
 */
export function isSessionValid(
  token: string | null,
  savedAt: number | null,
): boolean {
  if (!token || !savedAt) return false;
  if (isTokenExpired(token)) return false;
  if (Date.now() - savedAt > FIFTEEN_DAYS_MS) return false;
  return true;
}
