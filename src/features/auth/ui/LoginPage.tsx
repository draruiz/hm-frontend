import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useLogin } from "../hooks/useLogin";

const LOGO_URL =
  "https://imagedelivery.net/B5r6pMfQRTYBHyjgaDFr8w/3d99200b-f6c7-41b4-5c63-c40b4fbc9000/public";

// Calm, editorial wellness imagery (stable Unsplash CDN).
const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80";

export default function LoginPage() {
  const { form, onSubmit, serverError, isSubmitting } = useLogin();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* ── Left: Editorial image panel ── */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          flex: { xs: "none", md: "1.15 1 0" },
          minHeight: { xs: "38vh", md: "100vh" },
          bgcolor: "#1a2332",
        }}
      >
        {/* Image layer with slow Ken Burns zoom */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${HERO_IMAGE_URL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transformOrigin: "center",
            animation: "heroZoom 18s ease-out forwards",
            "@keyframes heroZoom": {
              from: { transform: "scale(1.12)" },
              to: { transform: "scale(1)" },
            },
          }}
        />
        {/* Gradient overlay for legibility */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,15,26,0.55) 0%, rgba(10,15,26,0.25) 40%, rgba(10,15,26,0.85) 100%)",
          }}
        />

        {/* Content over image */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            minHeight: "inherit",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            p: { xs: 4, sm: 6, md: 8, lg: 10 },
            color: "#fff",
          }}
        >
          {/* Editorial quote */}
          <Box sx={{ maxWidth: 460 }}>
            <Box
              sx={{
                width: 56,
                height: "2px",
                bgcolor: "primary.main",
                mb: { xs: 3, md: 4 },
              }}
            />
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: { xs: "1.6rem", md: "2.1rem" },
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                textWrap: "balance",
              }}
            >
              A calm mind is the foundation of healing.
            </Typography>
            <Typography
              variant='overline'
              sx={{
                display: "block",
                mt: 3,
                color: "rgba(255,255,255,0.65)",
              }}
            >
              Healthy Mind Specialists Platform
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ── Right: Form panel ── */}
      <Box
        sx={{
          flex: { xs: "1 1 auto", md: "1 1 0" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 4, sm: 6, md: 8 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both",
            "@keyframes fadeUp": {
              from: { opacity: 0, transform: "translateY(12px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          <Box
            component='img'
            src={LOGO_URL}
            alt='Healthy Mind Specialists'
            sx={{
              height: { xs: 72, md: 88 },
              width: "auto",
              maxWidth: 300,
              objectFit: "contain",
              display: "block",
              mx: "auto",
              mb: { xs: 4, md: 5 },
            }}
          />

          <Typography
            variant='overline'
            color='primary.dark'
            sx={{ display: "block", mb: 1.5 }}
          >
            Welcome back
          </Typography>

          <Typography
            variant='h2'
            color='text.primary'
            sx={{ mb: 1, fontSize: { xs: "2rem", md: "2.4rem" } }}
          >
            Sign in
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 4 }}>
            Access your dashboard and manage your practice.
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

          <Box
            component='form'
            onSubmit={onSubmit}
            noValidate
            autoComplete='off'
          >
            <TextField
              fullWidth
              id='login-email'
              label='Email'
              type='email'
              inputMode='email'
              autoComplete='off'
              placeholder='you@example.com'
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ mb: 3 }}
              {...register("email")}
            />

            <TextField
              fullWidth
              id='login-password'
              label='Password'
              type='password'
              autoComplete='off'
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ mb: 4 }}
              {...register("password")}
            />

            <Button
              type='submit'
              variant='contained'
              color='primary'
              size='large'
              fullWidth
              disabled={isSubmitting}
              endIcon={
                !isSubmitting && (
                  <ArrowForwardIcon
                    sx={{
                      transition: "transform 0.25s ease",
                      ".MuiButton-root:hover &": {
                        transform: "translateX(4px)",
                      },
                    }}
                  />
                )
              }
              sx={{ py: 1.5 }}
            >
              {isSubmitting ? (
                <CircularProgress
                  size={20}
                  role='status'
                  aria-label='Signing in'
                  sx={{ color: "secondary.main" }}
                />
              ) : (
                "Log in"
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export { LoginPage as Component };
