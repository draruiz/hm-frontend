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
  const [railExpanded, setRailExpanded] = useState(false);

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
  };

  const isActive = (path: string) => location.pathname === path;

  return {
    navItems: NAV_ITEMS,
    anchorEl,
    menuOpen: Boolean(anchorEl),
    railExpanded,
    setRailExpanded,
    handleMenuOpen,
    handleMenuClose,
    handleLogout,
    handleNavigate,
    isActive,
  };
}
