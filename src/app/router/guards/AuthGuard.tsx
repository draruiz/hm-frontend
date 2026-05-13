import { Navigate, Outlet } from "react-router";
import { useAppStore } from "../../../shared/lib";
import { isTokenExpired } from "../../../shared/lib/auth";

/**
 * Wraps admin routes. Redirects to /login when
 * there is no active session or the token has expired.
 */
export default function AuthGuard() {
  const token = useAppStore((s) => s.token);
  const logout = useAppStore((s) => s.logout);

  if (!token || isTokenExpired(token)) {
    // Clean stale state before redirecting
    if (token) logout();
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
}

export { AuthGuard as Component };
