import { Box, Link, Typography } from "@mui/material";
import { ContactSubmissionDetailDrawer } from "../ui/ContactSubmissionDetailDrawer";
import { ContactSubmissionsList } from "../ui/ContactSubmissionsList";

export default function ContactSubmissionsPage() {
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
        01 — Contacts
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
        Contact Submissions
      </Typography>

      <Typography
        sx={{
          mt: 1.5,
          maxWidth: 820,
          fontSize: "0.95rem",
          color: "#6b7280",
          lineHeight: 1.6,
        }}
      >
        All submissions are encrypted under HIPAA security standards and are
        only temporarily decrypted for this administrator session.{" "}
        <Link
          href='#'
          underline='always'
          onClick={(event) => event.preventDefault()}
          sx={{
            color: "#c8a45c",
            fontWeight: 600,
            textUnderlineOffset: "2px",
          }}
        >
          Secure administrator session
        </Link>
      </Typography>

      <ContactSubmissionsList />
      <ContactSubmissionDetailDrawer />
    </Box>
  );
}

export { ContactSubmissionsPage as Component };
