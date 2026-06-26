import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import {
  AppBar,
  Box,
  ButtonBase,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet } from "react-router";
import { useAdminLayout } from "../hooks/useAdminLayout";
import { NAV_ICONS } from "./navIcons";

const LOGO_URL =
  "https://imagedelivery.net/B5r6pMfQRTYBHyjgaDFr8w/3d99200b-f6c7-41b4-5c63-c40b4fbc9000/public";

const RAIL_WIDTH = 240;
const APPBAR_HEIGHT = 64;

export default function AdminLayout() {
  const {
    navItems,
    anchorEl,
    menuOpen,
    mobileOpen,
    handleDrawerToggle,
    handleDrawerClose,
    handleMenuOpen,
    handleMenuClose,
    handleLogout,
    handleNavigate,
    isActive,
  } = useAdminLayout();

  // Contenido del rail, reutilizado en el drawer permanente (desktop) y temporary (mobile)
  const railContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Rail Header — Logo */}
      <Box
        sx={{
          height: APPBAR_HEIGHT,
          display: "flex",
          alignItems: "center",
          px: 2,
          flexShrink: 0,
        }}
      >
        <Box
          component='img'
          src={LOGO_URL}
          alt='Healthy Mind Specialists'
          sx={{
            height: 28,
            width: "auto",
            filter: "brightness(0) invert(1)",
            flexShrink: 0,
          }}
        />
      </Box>

      {/* Navigation Items */}
      <Box
        sx={{
          flex: 1,
          pt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        {navItems.map((item) => {
          const Icon = NAV_ICONS[item.icon];
          const active = isActive(item.path);

          return (
            <ButtonBase
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              aria-current={active ? "page" : undefined}
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 2,
                px: 2,
                py: 1.5,
                mx: 1,
                justifyContent: "flex-start",
                textAlign: "left",
                borderRadius: 2,
                transition: "all 0.25s ease",
                color: active ? "#c8a45c" : "rgba(250,250,250,0.5)",
                bgcolor: active ? "rgba(200,164,92,0.08)" : "transparent",
                "&:hover": {
                  color: active ? "#c8a45c" : "rgba(250,250,250,0.85)",
                  bgcolor: active
                    ? "rgba(200,164,92,0.08)"
                    : "rgba(250,250,250,0.04)",
                },
                // Gold accent bar for active
                "&::before": active
                  ? {
                      content: '""',
                      position: "absolute",
                      left: -8,
                      top: "20%",
                      bottom: "20%",
                      width: 2,
                      bgcolor: "#c8a45c",
                      borderRadius: 4,
                    }
                  : {},
              }}
            >
              {Icon && (
                <Icon
                  sx={{
                    fontSize: 20,
                    flexShrink: 0,
                    transition: "transform 0.3s ease",
                  }}
                />
              )}
              <Typography
                sx={{
                  fontSize: "0.9375rem",
                  whiteSpace: "nowrap",
                  fontWeight: active ? 600 : 500,
                }}
              >
                {item.label}
              </Typography>
            </ButtonBase>
          );
        })}
      </Box>

      {/* Rail Footer — version */}
      <Box sx={{ px: 2, pb: 2, flexShrink: 0 }}>
        <Typography
          variant='caption'
          sx={{
            color: "rgba(250,250,250,0.25)",
            whiteSpace: "nowrap",
            letterSpacing: "0.05em",
          }}
        >
          v0.1.0
        </Typography>
      </Box>
    </Box>
  );

  const drawerPaperSx = {
    width: RAIL_WIDTH,
    bgcolor: "#050810",
    borderRight: "none",
    overflow: "hidden",
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f3ee" }}>
      {/* ── Rail Navigation ── */}
      <Box
        component='nav'
        aria-label='Admin navigation'
        sx={{
          width: { md: RAIL_WIDTH },
          flexShrink: { md: 0 },
        }}
      >
        {/* Mobile — temporary drawer */}
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": drawerPaperSx,
          }}
        >
          {railContent}
        </Drawer>

        {/* Desktop — permanent drawer */}
        <Drawer
          variant='permanent'
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": drawerPaperSx,
          }}
        >
          {railContent}
        </Drawer>
      </Box>

      {/* ── Main Content Area ── */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* AppBar */}
        <AppBar
          position='sticky'
          elevation={0}
          sx={{
            bgcolor: "#f5f3ee",
            borderBottom: "1px solid rgba(26,26,26,0.08)",
            height: APPBAR_HEIGHT,
          }}
        >
          <Toolbar
            sx={{
              minHeight: `${APPBAR_HEIGHT}px !important`,
              px: { xs: 2, md: 4 },
              justifyContent: "space-between",
            }}
          >
            {/* Left — Hamburger (mobile) + CMS Label */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <IconButton
                onClick={handleDrawerToggle}
                aria-label='Open navigation'
                edge='start'
                sx={{
                  display: { xs: "inline-flex", md: "none" },
                  color: "text.primary",
                }}
              >
                <MenuIcon sx={{ fontSize: 22 }} />
              </IconButton>

              <Typography variant='h6' color='text.primary'>
                CMS
              </Typography>
              <Box
                sx={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  flexShrink: 0,
                }}
              />
              <Typography
                variant='overline'
                color='text.secondary'
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Healthy Mind
              </Typography>
            </Box>

            {/* Right — User Menu */}
            <Box>
              <IconButton
                onClick={handleMenuOpen}
                aria-label='Account menu'
                aria-controls={menuOpen ? "account-menu" : undefined}
                aria-haspopup='true'
                aria-expanded={menuOpen ? "true" : undefined}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  color: "text.primary",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                    color: "primary.main",
                    bgcolor: "rgba(200,164,92,0.04)",
                  },
                }}
              >
                <PersonOutlinedIcon sx={{ fontSize: 20 }} />
              </IconButton>

              <Menu
                id='account-menu'
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                slotProps={{
                  paper: {
                    sx: {
                      mt: 1,
                      border: "1px solid",
                      borderColor: "divider",
                      boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08)",
                      minWidth: 200,
                    },
                  },
                }}
              >
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    fontWeight: 500,
                    color: "text.primary",
                    gap: 1.5,
                    py: 1.25,
                    px: 2.5,
                    transition: "all 0.25s ease",
                    "&:hover": {
                      bgcolor: "rgba(200,164,92,0.06)",
                      color: "#c8a45c",
                    },
                  }}
                >
                  <LogoutIcon sx={{ fontSize: 18 }} />
                  Log out
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box
          component='main'
          sx={{
            flex: 1,
            p: { xs: 2.5, md: 5 },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export { AdminLayout as Component };
