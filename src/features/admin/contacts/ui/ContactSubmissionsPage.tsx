import { Box, Link } from "@mui/material";
import { PageHeader } from "../../../../shared/ui";
import { ContactSubmissionDetailDrawer } from "../ui/ContactSubmissionDetailDrawer";
import { ContactSubmissionsList } from "../ui/ContactSubmissionsList";

export default function ContactSubmissionsPage() {
  return (
    <Box>
      <PageHeader
        eyebrow='Contacts'
        title='Contact Submissions'
        description={
          <>
            All submissions are encrypted under HIPAA security standards and are
            only temporarily decrypted for this administrator session.{" "}
            <Link
              href='#'
              underline='always'
              onClick={(event) => event.preventDefault()}
            >
              Secure administrator session
            </Link>
          </>
        }
      />

      <ContactSubmissionsList />
      <ContactSubmissionDetailDrawer />
    </Box>
  );
}

export { ContactSubmissionsPage as Component };
