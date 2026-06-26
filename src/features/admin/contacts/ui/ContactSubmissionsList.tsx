import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { sanitizeInput } from "../../../../shared/lib/sanitize";
import { useContactSubmissions } from "../hooks/useContactSubmissions";
import type { ContactSubmission } from "../model/contactSubmission";
import { useContactSubmissionsStore } from "../model/store";

export function ContactSubmissionsList() {
  const { data, isLoading, isError } = useContactSubmissions();
  const setSelectedId = useContactSubmissionsStore((s) => s.setSelectedId);
  const [searchText, setSearchText] = useState("");
  const [hipaaFilter, setHipaaFilter] = useState<"all" | "yes" | "no">("all");

  const filteredData = useMemo(() => {
    const normalizedSearch = sanitizeInput(searchText).toLowerCase();
    const submissions = data ?? [];

    return submissions.filter((submission: ContactSubmission) => {
      const matchesHipaa =
        hipaaFilter === "all" ||
        (hipaaFilter === "yes" && submission.hipaaConsent) ||
        (hipaaFilter === "no" && !submission.hipaaConsent);

      if (!matchesHipaa) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const searchTarget = [
        submission.name,
        submission.email,
        submission.phone ?? "",
        submission.comment ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return searchTarget.includes(normalizedSearch);
    });
  }, [data, searchText, hipaaFilter]);

  if (isLoading) return <Typography>Loading submissions...</Typography>;
  if (isError)
    return <Typography color='error'>Error loading submissions.</Typography>;
  if (!data || data.length === 0)
    return <Typography>No submissions found.</Typography>;

  return (
    <>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ mt: 4, mb: 2 }}
      >
        <TextField
          fullWidth
          label='Search'
          placeholder='Name, email, phone or comment'
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          autoComplete='off'
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon fontSize='small' />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          select
          label='HIPAA Consent'
          value={hipaaFilter}
          onChange={(event) =>
            setHipaaFilter(event.target.value as "all" | "yes" | "no")
          }
          sx={{ width: { xs: "100%", md: 220 } }}
        >
          <MenuItem value='all'>All</MenuItem>
          <MenuItem value='yes'>Consent Given</MenuItem>
          <MenuItem value='no'>No Consent</MenuItem>
        </TextField>
      </Stack>

      <Typography
        variant='overline'
        color='text.secondary'
        sx={{ display: "block", mb: 1.5 }}
      >
        Showing {filteredData.length} of {data.length} submissions
      </Typography>

      <TableContainer component={Paper} variant='outlined'>
        <Table size='small' aria-label='Contact submissions table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>HIPAA</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography sx={{ py: 1.5, color: "#6b7280" }}>
                    No results found with current filters.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row: ContactSubmission) => (
                <TableRow key={row.id} hover sx={{ cursor: "pointer" }}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    {new Date(row.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{row.hipaaConsent ? "Yes" : "No"}</TableCell>
                  <TableCell align='right'>
                    <IconButton
                      aria-label='View details'
                      onClick={() => setSelectedId(row.id)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
