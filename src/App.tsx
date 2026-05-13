import { Navigate } from "react-router";
import { useAppStore } from "./shared/lib";
import { isTokenExpired } from "./shared/lib/auth";

/**
 * Root route (`/`).
 * Redirects to `/admin/dashboard` when there is a valid session,
 * otherwise sends the user to `/login`.
 */
function App() {
  const token = useAppStore((s) => s.token);
  const logout = useAppStore((s) => s.logout);

  if (!token || isTokenExpired(token)) {
    if (token) logout();
    return <Navigate to='/login' replace />;
  }

  return <Navigate to='/admin/dashboard' replace />;
}

export default App;

// react-router lazy() convention
export const Component = App;
