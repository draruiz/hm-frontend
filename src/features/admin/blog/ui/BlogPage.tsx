import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Alert,
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
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
import { useBlogPage } from "../hooks/useBlogPage";

export default function BlogPage() {
  const {
    articles,
    isLoading,
    isError,
    refetch,
    form,
    onSubmit,
    editingArticleId,
    handleStartEdit,
    handleCancelEdit,
    handleDeleteArticle,
    serverError,
    isSubmitting,
    coverPreviewUrl,
    handleSelectCoverFile,
  } = useBlogPage();

  const {
    register,
    formState: { errors },
  } = form;

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
        02 — Blog
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
        Blog Management
      </Typography>

      <Typography
        sx={{
          mt: 1.5,
          maxWidth: 900,
          fontSize: "0.95rem",
          color: "#6b7280",
          lineHeight: 1.65,
        }}
      >
        Manage articles with secure validation and strict admin permissions. The
        backend generates the slug automatically and handles publish timestamps
        when status changes to published.
      </Typography>

      <Paper
        component='section'
        elevation={0}
        sx={{
          mt: 4,
          border: "1px solid rgba(26,26,26,0.1)",
          borderRadius: 0,
          bgcolor: "#fafafa",
          p: { xs: 2.5, md: 3.5 },
        }}
      >
        <Typography
          sx={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6875rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#94918a",
            mb: 1,
          }}
        >
          {editingArticleId ? "Editing article" : "Create new article"}
        </Typography>

        <Typography
          sx={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            color: "#1a1a1a",
            fontSize: { xs: "1.35rem", md: "1.6rem" },
            letterSpacing: "-0.01em",
            mb: 3,
          }}
        >
          {editingArticleId ? "Update Blog Article" : "New Blog Article"}
        </Typography>

        {serverError && (
          <Alert
            severity='error'
            role='alert'
            aria-live='assertive'
            sx={{ mb: 3 }}
          >
            {serverError}
          </Alert>
        )}

        <Box component='form' onSubmit={onSubmit} noValidate autoComplete='off'>
          <Stack spacing={2.5}>
            <FormControl fullWidth error={!!errors.title}>
              <InputLabel htmlFor='blog-title' shrink>
                Title
              </InputLabel>
              <OutlinedInput
                id='blog-title'
                autoComplete='off'
                aria-describedby='blog-title-error'
                {...register("title")}
              />
              {errors.title && (
                <FormHelperText
                  id='blog-title-error'
                  role='alert'
                  aria-live='polite'
                >
                  {errors.title.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={!!errors.excerpt}>
              <InputLabel htmlFor='blog-excerpt' shrink>
                Excerpt
              </InputLabel>
              <OutlinedInput
                id='blog-excerpt'
                autoComplete='off'
                aria-describedby='blog-excerpt-error'
                multiline
                minRows={2}
                {...register("excerpt")}
              />
              {errors.excerpt && (
                <FormHelperText
                  id='blog-excerpt-error'
                  role='alert'
                  aria-live='polite'
                >
                  {errors.excerpt.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={!!errors.content}>
              <InputLabel htmlFor='blog-content' shrink>
                Content
              </InputLabel>
              <OutlinedInput
                id='blog-content'
                autoComplete='off'
                aria-describedby='blog-content-error'
                multiline
                minRows={8}
                {...register("content")}
              />
              {errors.content && (
                <FormHelperText
                  id='blog-content-error'
                  role='alert'
                  aria-live='polite'
                >
                  {errors.content.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={!!errors.coverImageUrl}>
              <InputLabel htmlFor='blog-cover-image-url' shrink>
                Cover Image URL
              </InputLabel>
              <OutlinedInput
                id='blog-cover-image-url'
                autoComplete='off'
                aria-describedby='blog-cover-image-url-error'
                placeholder='https://cdn.example.com/blog/cover.jpg'
                {...register("coverImageUrl")}
              />
              {errors.coverImageUrl ? (
                <FormHelperText
                  id='blog-cover-image-url-error'
                  role='alert'
                  aria-live='polite'
                >
                  {errors.coverImageUrl.message}
                </FormHelperText>
              ) : (
                <FormHelperText id='blog-cover-image-url-error'>
                  Use a public HTTPS URL. The articles endpoint receives only
                  the final image URL.
                </FormHelperText>
              )}
            </FormControl>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                component='label'
                variant='outlined'
                sx={{ alignSelf: "flex-start" }}
              >
                Pick local image for preview
                <input
                  hidden
                  type='file'
                  accept='image/*'
                  onChange={handleSelectCoverFile}
                />
              </Button>

              <FormControl sx={{ minWidth: { xs: "100%", sm: 220 } }}>
                <TextField
                  select
                  label='Status'
                  defaultValue='draft'
                  {...register("status")}
                >
                  <MenuItem value='draft'>Draft</MenuItem>
                  <MenuItem value='published'>Published</MenuItem>
                </TextField>
              </FormControl>
            </Stack>

            {coverPreviewUrl && (
              <Box
                sx={{
                  border: "1px solid rgba(26,26,26,0.12)",
                  width: "100%",
                  maxWidth: 420,
                  bgcolor: "#fff",
                }}
              >
                <Box
                  component='img'
                  src={coverPreviewUrl}
                  alt='Cover image preview'
                  sx={{
                    width: "100%",
                    height: 220,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>
            )}

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
              <Button type='submit' variant='contained' disabled={isSubmitting}>
                {editingArticleId ? "Update Article" : "Create Article"}
              </Button>
              {editingArticleId && (
                <Button
                  type='button'
                  variant='outlined'
                  onClick={handleCancelEdit}
                  disabled={isSubmitting}
                >
                  Cancel editing
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>
      </Paper>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          mt: 4,
          mb: 1.5,
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6875rem",
            letterSpacing: "0.15em",
            color: "#94918a",
            textTransform: "uppercase",
          }}
        >
          Articles ({articles.length})
        </Typography>

        <Button
          type='button'
          variant='outlined'
          startIcon={<RefreshIcon />}
          onClick={() => refetch()}
          disabled={isLoading || isSubmitting}
        >
          Refresh
        </Button>
      </Stack>

      {isLoading && <Typography>Loading articles...</Typography>}

      {isError && (
        <Alert severity='error' role='alert' sx={{ mt: 2 }}>
          Error loading articles. Please refresh.
        </Alert>
      )}

      {!isLoading && !isError && (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 0,
            boxShadow: "none",
            border: "1px solid rgba(26,26,26,0.08)",
          }}
        >
          <Table size='small' aria-label='Blog articles table'>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f5f3ee" }}>
                <TableCell
                  sx={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "#94918a",
                    fontSize: 12,
                  }}
                >
                  Title
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "#94918a",
                    fontSize: 12,
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "#94918a",
                    fontSize: 12,
                  }}
                >
                  Published
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "#94918a",
                    fontSize: 12,
                  }}
                >
                  Updated
                </TableCell>
                <TableCell
                  align='right'
                  sx={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "#94918a",
                    fontSize: 12,
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography sx={{ py: 1.5, color: "#6b7280" }}>
                      No articles found.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                articles.map((article) => (
                  <TableRow key={article.id} hover>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                        {article.title}
                      </Typography>
                      <Typography
                        sx={{ color: "#6b7280", fontSize: "0.8125rem" }}
                      >
                        /{article.slug}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        size='small'
                        label={article.status}
                        sx={{
                          borderRadius: 0,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          bgcolor:
                            article.status === "published"
                              ? "rgba(200,164,92,0.14)"
                              : "rgba(26,26,26,0.06)",
                          color:
                            article.status === "published"
                              ? "#8a6c2f"
                              : "#6b7280",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {article.publishedAt
                        ? new Date(article.publishedAt).toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {new Date(article.updatedAt).toLocaleString()}
                    </TableCell>
                    <TableCell align='right'>
                      <IconButton
                        aria-label='Edit article'
                        onClick={() => handleStartEdit(article)}
                        disabled={isSubmitting}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label='Delete article'
                        onClick={() => handleDeleteArticle(article)}
                        disabled={isSubmitting}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export { BlogPage as Component };
