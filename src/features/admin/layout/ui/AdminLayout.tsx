import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import {
  AppBar,
  Box,
  ButtonBase,
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

const RAIL_WIDTH = 64;
const RAIL_WIDTH_EXPANDED = 240;
const APPBAR_HEIGHT = 64;

export default function AdminLayout() {
  const {
    navItems,
    anchorEl,
    menuOpen,
    railExpanded,
    setRailExpanded,
    handleMenuOpen,
    handleMenuClose,
    handleLogout,
    handleNavigate,
    isActive,
  } = useAdminLayout();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f3ee" }}>
      {/* ── Rail Navigation ── */}
      <Box
        component='nav'
        aria-label='Admin navigation'
        onMouseEnter={() => setRailExpanded(true)}
        onMouseLeave={() => setRailExpanded(false)}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: railExpanded ? RAIL_WIDTH_EXPANDED : RAIL_WIDTH,
          bgcolor: "#050810",
          transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
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
              opacity: railExpanded ? 1 : 0.7,
              transition: "opacity 0.3s ease",
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
                  borderRadius: 0,
                  transition: "all 0.3s ease",
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
                        borderRadius: 0,
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
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    opacity: railExpanded ? 1 : 0,
                    transform: railExpanded
                      ? "translateX(0)"
                      : "translateX(-8px)",
                    transition:
                      "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    fontWeight: active ? 500 : 400,
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
            sx={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.5625rem",
              letterSpacing: "0.2em",
              color: "rgba(250,250,250,0.2)",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              opacity: railExpanded ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          >
            v0.1.0
          </Typography>
        </Box>
      </Box>

      {/* ── Main Content Area ── */}
      <Box
        sx={{
          flex: 1,
          ml: `${RAIL_WIDTH}px`,
          transition: "margin-left 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
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
              px: { xs: 3, md: 4 },
              justifyContent: "space-between",
            }}
          >
            {/* Left — CMS Label */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Typography
                sx={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#1a1a1a",
                  letterSpacing: "-0.02em",
                }}
              >
                CMS
              </Typography>
              <Box
                sx={{
                  width: 4,
                  height: 4,
                  bgcolor: "#c8a45c",
                  flexShrink: 0,
                }}
              />
              <Typography
                sx={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.625rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#94918a",
                }}
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
                  borderRadius: 0,
                  border: "1px solid rgba(26,26,26,0.1)",
                  color: "#1a1a1a",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#c8a45c",
                    color: "#c8a45c",
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
                      borderRadius: 0,
                      border: "1px solid rgba(26,26,26,0.08)",
                      boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08)",
                      minWidth: 200,
                      bgcolor: "#fafafa",
                    },
                  },
                }}
              >
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    color: "#1a1a1a",
                    gap: 1.5,
                    py: 1.25,
                    px: 2.5,
                    transition: "all 0.3s ease",
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
            p: { xs: 3, md: 5 },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export { AdminLayout as Component };
