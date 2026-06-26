import CloseIcon from "@mui/icons-material/Close";
import { Box, Divider, Drawer, IconButton, Typography } from "@mui/material";
import { useContactSubmissionDetail } from "../hooks/useContactSubmissions";
import { useContactSubmissionsStore } from "../model/store";

export function ContactSubmissionDetailDrawer() {
  const selectedId = useContactSubmissionsStore((s) => s.selectedId);
  const setSelectedId = useContactSubmissionsStore((s) => s.setSelectedId);
  const { data, isLoading, isError } = useContactSubmissionDetail(
    selectedId || undefined,
  );

  const handleClose = () => setSelectedId(null);

  return (
    <Drawer
      anchor='right'
      open={!!selectedId}
      onClose={handleClose}
      slotProps={{
        paper: { sx: { width: { xs: "100%", md: 480 } } },
      }}
    >
      <Box sx={{ p: 3, minHeight: "100vh", bgcolor: "background.paper" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant='h5' color='text.primary'>
            Submission Detail
          </Typography>
          <IconButton onClick={handleClose} aria-label='Close detail drawer'>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        {isLoading && <Typography>Loading...</Typography>}
        {isError && (
          <Typography color='error'>Error loading submission.</Typography>
        )}
        {data && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography>
              <b>Name:</b> {data.name}
            </Typography>
            <Typography>
              <b>Email:</b> {data.email}
            </Typography>
            {data.phone && (
              <Typography>
                <b>Phone:</b> {data.phone}
              </Typography>
            )}

            {(data.preferredDate || data.time) && (
              <>
                <Divider sx={{ my: 0.5 }} />
                <Typography variant='overline' color='text.secondary'>
                  Preferred Schedule
                </Typography>
                {data.preferredDate && (
                  <Typography>
                    <b>Preferred Date:</b> {data.preferredDate}
                  </Typography>
                )}
                {data.time && (
                  <Typography>
                    <b>Time:</b> {data.time}
                  </Typography>
                )}
                <Divider sx={{ my: 0.5 }} />
              </>
            )}

            {data.comment && (
              <Typography>
                <b>Comment:</b> {data.comment}
              </Typography>
            )}
            <Typography>
              <b>HIPAA Consent:</b> {data.hipaaConsent ? "Yes" : "No"}
            </Typography>
            <Typography>
              <b>Consented At:</b> {new Date(data.consentedAt).toLocaleString()}
            </Typography>
            <Typography>
              <b>Created At:</b> {new Date(data.createdAt).toLocaleString()}
            </Typography>
            <Typography>
              <b>Updated At:</b> {new Date(data.updatedAt).toLocaleString()}
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
