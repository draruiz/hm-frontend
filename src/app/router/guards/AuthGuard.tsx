import { Navigate, Outlet } from "react-router";
import { useAppStore } from "../../../shared/lib";
import { isSessionValid } from "../../../shared/lib/auth";

/**
 * Wraps admin routes. Redirects to /login when
 * there is no active session, the token has expired,
 * or the session is older than 15 days.
 */
export default function AuthGuard() {
  const token = useAppStore((s) => s.token);
  const tokenSavedAt = useAppStore((s) => s.tokenSavedAt);
  const logout = useAppStore((s) => s.logout);

  if (!isSessionValid(token, tokenSavedAt)) {
    // Clean stale state before redirecting
    if (token) logout();
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
}

export { AuthGuard as Component };
