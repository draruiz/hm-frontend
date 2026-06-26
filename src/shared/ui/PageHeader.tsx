import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface PageHeaderProps {
  /** Small eyebrow label shown above the title, e.g. "01 — Contacts". */
  eyebrow?: string;
  title: string;
  /** Optional supporting description rendered under the title. */
  description?: ReactNode;
  /** Optional actions aligned to the right of the title (buttons, etc.). */
  actions?: ReactNode;
}

/**
 * Standard page heading used across admin pages.
 * Typography and colors come entirely from the theme — no per-page styles.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        gap: 2,
        mb: { xs: 3, md: 4 },
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        {eyebrow && (
          <Typography
            variant='overline'
            color='primary.dark'
            sx={{ display: "block" }}
          >
            {eyebrow}
          </Typography>
        )}
        <Typography variant='h2' color='text.primary'>
          {title}
        </Typography>
        {description && (
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ mt: 1, maxWidth: 820 }}
          >
            {description}
          </Typography>
        )}
      </Box>
      {actions && <Box sx={{ flexShrink: 0 }}>{actions}</Box>}
    </Box>
  );
}
