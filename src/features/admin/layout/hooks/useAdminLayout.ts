import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAppStore } from "../../../../shared/lib";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/admin/dashboard", icon: "grid" },
  { label: "Contact Submissions", path: "/admin/contacts", icon: "mail" },
  { label: "Blog", path: "/admin/blog", icon: "edit" },
] as const;

export function useAdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAppStore((s) => s.logout);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate("/login", { replace: true });
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return {
    navItems: NAV_ITEMS,
    anchorEl,
    menuOpen: Boolean(anchorEl),
    mobileOpen,
    handleDrawerToggle,
    handleDrawerClose,
    handleMenuOpen,
    handleMenuClose,
    handleLogout,
    handleNavigate,
    isActive,
  };
}
