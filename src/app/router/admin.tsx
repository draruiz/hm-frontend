import type { RouteObject } from "react-router";

export const adminRoutes: RouteObject[] = [
  {
    // AdminLayout wraps all admin pages (appbar + rail nav)
    lazy: () => import("../../features/admin/layout/ui/AdminLayout"),
    children: [
      {
        path: "dashboard",
        lazy: () => import("../../features/admin/dashboard/ui/DashboardPage"),
      },
      {
        path: "contacts",
        lazy: () =>
          import("../../features/admin/contacts/ui/ContactSubmissionsPage"),
      },
      {
        path: "blog",
        lazy: () => import("../../features/admin/blog/ui/BlogPage"),
      },
    ],
  },
];
