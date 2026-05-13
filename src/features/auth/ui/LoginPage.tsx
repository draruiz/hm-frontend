import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useLogin } from "../hooks/useLogin";

const LOGO_URL =
  "https://imagedelivery.net/B5r6pMfQRTYBHyjgaDFr8w/3d99200b-f6c7-41b4-5c63-c40b4fbc9000/public";

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
        bgcolor: "brand.blue",
      }}
    >
      {/* ── Left Panel: Branding ── */}
      <Box
        sx={{
          flex: { xs: "none", md: 1 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: { xs: 4, sm: 6, md: 8, lg: 10 },
          minHeight: { xs: "40vh", md: "100vh" },
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(200,164,92,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          },
        }}
      >
        {/* Logo */}
        <Box>
          <Box
            component='img'
            src={LOGO_URL}
            alt='Healthy Mind Specialists'
            sx={{
              height: { xs: 36, md: 44 },
              width: "auto",
              display: "block",
              mb: { xs: 6, md: 0 },
              filter: "brightness(0) invert(1)",
            }}
          />
        </Box>

        {/* Hero Text */}
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant='subtitle1'
            sx={{
              color: "brand.gold",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6875rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            Log in
          </Typography>

          <Typography
            variant='h1'
            sx={{
              color: "brand.white",
              fontSize: {
                xs: "2.5rem",
                sm: "3.5rem",
                md: "3.5rem",
                lg: "4.5rem",
                xl: "5.5rem",
              },
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              mb: 3,
            }}
          >
            WELCOME
            <br />
            BACK
          </Typography>

          <Typography
            variant='body1'
            sx={{
              color: "rgba(250,250,250,0.6)",
              fontWeight: 300,
              maxWidth: 380,
              lineHeight: 1.7,
              fontSize: { xs: "0.875rem", md: "1rem" },
            }}
          >
            Sign back in to your account to access your
            <br />
            dashboard and manage your practice.
          </Typography>
        </Box>

        {/* Bottom decorative line */}
        <Box
          sx={{
            width: 48,
            height: "1px",
            bgcolor: "rgba(200,164,92,0.4)",
            mt: { xs: 4, md: 0 },
          }}
        />
      </Box>

      {/* ── Right Panel: Form ── */}
      <Box
        sx={{
          flex: { xs: "none", md: 1 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "brand.cream",
          p: { xs: 4, sm: 6, md: 8 },
          minHeight: { xs: "60vh", md: "100vh" },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 440,
          }}
        >
          <Typography
            variant='h2'
            sx={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              color: "brand.charcoal",
              fontSize: {
                xs: "1.75rem",
                sm: "2rem",
                md: "2.25rem",
              },
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              mb: 5,
            }}
          >
            YOUR ACCOUNT
          </Typography>

          {/* Server Error */}
          {serverError && (
            <Alert
              severity='error'
              role='alert'
              aria-live='assertive'
              sx={{
                mb: 3,
                borderRadius: 0,
                "& .MuiAlert-message": {
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.875rem",
                },
              }}
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
            {/* Email */}
            <FormControl fullWidth error={!!errors.email} sx={{ mb: 3.5 }}>
              <InputLabel
                htmlFor='login-email'
                shrink
                sx={{
                  position: "relative",
                  transform: "none",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "brand.charcoal",
                  mb: 1,
                }}
              >
                Email
              </InputLabel>
              <OutlinedInput
                id='login-email'
                type='email'
                inputMode='email'
                autoComplete='off'
                placeholder='you@example.com'
                aria-describedby='email-error'
                {...register("email")}
                sx={{
                  bgcolor: "transparent",
                  borderRadius: 0,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(26,26,26,0.15)",
                    borderWidth: "0 0 1px 0",
                    borderRadius: 0,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(26,26,26,0.3)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "brand.gold",
                    borderWidth: "0 0 2px 0",
                  },
                  "& input": {
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.9375rem",
                    py: 1.5,
                    px: 0,
                  },
                  "& input::placeholder": {
                    color: "rgba(26,26,26,0.3)",
                    opacity: 1,
                  },
                }}
              />
              {errors.email && (
                <FormHelperText
                  id='email-error'
                  role='alert'
                  aria-live='polite'
                  sx={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    mx: 0,
                  }}
                >
                  {errors.email.message}
                </FormHelperText>
              )}
            </FormControl>

            {/* Password */}
            <FormControl fullWidth error={!!errors.password} sx={{ mb: 5 }}>
              <InputLabel
                htmlFor='login-password'
                shrink
                sx={{
                  position: "relative",
                  transform: "none",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "brand.charcoal",
                  mb: 1,
                }}
              >
                Password
              </InputLabel>
              <OutlinedInput
                id='login-password'
                type='password'
                autoComplete='off'
                aria-describedby='password-error'
                {...register("password")}
                sx={{
                  bgcolor: "transparent",
                  borderRadius: 0,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(26,26,26,0.15)",
                    borderWidth: "0 0 1px 0",
                    borderRadius: 0,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(26,26,26,0.3)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "brand.gold",
                    borderWidth: "0 0 2px 0",
                  },
                  "& input": {
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.9375rem",
                    py: 1.5,
                    px: 0,
                  },
                }}
              />
              {errors.password && (
                <FormHelperText
                  id='password-error'
                  role='alert'
                  aria-live='polite'
                  sx={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    mx: 0,
                  }}
                >
                  {errors.password.message}
                </FormHelperText>
              )}
            </FormControl>

            {/* Submit */}
            <Button
              type='submit'
              variant='contained'
              disabled={isSubmitting}
              disableElevation
              sx={{
                bgcolor: "brand.gold",
                color: "brand.blue",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "0.8125rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                px: 4,
                py: 1.75,
                borderRadius: 0,
                transition: "all 0.5s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: 1.5,
                "&:hover": {
                  bgcolor: "brand.goldLight",
                },
                "&:disabled": {
                  bgcolor: "rgba(200,164,92,0.5)",
                  color: "rgba(10,15,26,0.5)",
                },
              }}
            >
              {isSubmitting ? (
                <CircularProgress
                  size={18}
                  role='status'
                  aria-label='Signing in'
                  sx={{ color: "brand.blue" }}
                />
              ) : (
                <>
                  <span>Log in</span>
                  <ArrowForwardIcon
                    sx={{
                      fontSize: 16,
                      transition: "transform 0.3s ease",
                      ".MuiButton-root:hover &": {
                        transform: "translateX(6px)",
                      },
                    }}
                  />
                </>
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export { LoginPage as Component };
