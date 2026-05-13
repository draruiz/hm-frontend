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
