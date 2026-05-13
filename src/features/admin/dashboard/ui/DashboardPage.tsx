import { Box, Typography } from "@mui/material";

export default function DashboardPage() {
  return (
    <Box>
      <Typography
        sx={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.6875rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#94918a",
          mb: 1.5,
        }}
      >
        00 — Overview
      </Typography>
      <Typography
        variant='h2'
        sx={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          color: "#1a1a1a",
          fontSize: { xs: "1.75rem", md: "2.25rem" },
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
        }}
      >
        Dashboard
      </Typography>
    </Box>
  );
}

export { DashboardPage as Component };
