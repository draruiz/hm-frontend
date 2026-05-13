import { createBrowserRouter } from "react-router";
import { adminRoutes } from "./admin";
import { usersRoutes } from "./users";

export const router = createBrowserRouter([
  // Root — redirects based on session state
  {
    path: "/",
    lazy: () => import("../../App"),
  },

  // Public
  {
    path: "/login",
    lazy: () => import("../../features/auth/ui/LoginPage"),
  },

  // Admin (protected)
  {
    path: "/admin",
    lazy: () => import("./guards/AuthGuard"),
    children: adminRoutes,
  },

  // Users (placeholder)
  ...(usersRoutes.length ? [{ path: "/users", children: usersRoutes }] : []),
]);
