import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import { Box, ButtonBase, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { PageHeader } from "../../../../shared/ui";

const SHORTCUTS = [
  {
    label: "Blog",
    description: "Create and manage articles",
    path: "/admin/blog",
    Icon: EditNoteOutlinedIcon,
  },
  {
    label: "Contact Submissions",
    description: "Review incoming messages",
    path: "/admin/contacts",
    Icon: MailOutlinedIcon,
  },
] as const;

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <Box>
      <PageHeader eyebrow='Overview' title='Dashboard' />

      <Box
        sx={{
          display: "grid",
          gap: 2.5,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
        }}
      >
        {SHORTCUTS.map(({ label, description, path, Icon }) => (
          <ButtonBase
            key={path}
            onClick={() => navigate(path)}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              p: 3,
              textAlign: "left",
              justifyContent: "flex-start",
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              transition: "all 0.25s ease",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: "rgba(200,164,92,0.04)",
                "& .shortcut-arrow": {
                  transform: "translateX(4px)",
                  color: "primary.main",
                },
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                flexShrink: 0,
                borderRadius: 2,
                bgcolor: "secondary.dark",
                color: "primary.main",
              }}
            >
              <Icon sx={{ fontSize: 22 }} />
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant='h6' color='text.primary'>
                {label}
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
                {description}
              </Typography>
            </Box>

            <ArrowForwardIcon
              className='shortcut-arrow'
              sx={{
                fontSize: 18,
                color: "text.disabled",
                flexShrink: 0,
                transition: "all 0.25s ease",
              }}
            />
          </ButtonBase>
        ))}
      </Box>
    </Box>
  );
}

export { DashboardPage as Component };
