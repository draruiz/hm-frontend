import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    brand: {
      blue: string;
      blueLight: string;
      blueDark: string;
      gold: string;
      goldLight: string;
      goldDark: string;
      white: string;
      cream: string;
      charcoal: string;
      gray: string;
      grayLight: string;
      muted: string;
      teal: string;
      tealLight: string;
    };
  }
  interface PaletteOptions {
    brand?: Palette["brand"];
  }
}

const brand = {
  blue: "#0a0f1a",
  blueLight: "#1a2332",
  blueDark: "#050810",
  gold: "#c8a45c",
  goldLight: "#dbbf7a",
  goldDark: "#a68b3e",
  white: "#fafafa",
  cream: "#f5f3ee",
  charcoal: "#1a1a1a",
  gray: "#6b7280",
  grayLight: "#f0f0f0",
  muted: "#94918a",
  teal: "#b8d8d8",
  tealLight: "#e0f0f0",
} as const;

export const theme = createTheme({
  palette: {
    brand,
    primary: {
      main: brand.gold,
      light: brand.goldLight,
      dark: brand.goldDark,
      contrastText: brand.blue,
    },
    secondary: {
      main: brand.blue,
      light: brand.blueLight,
      dark: brand.blueDark,
      contrastText: brand.white,
    },
    background: {
      default: brand.blue,
      paper: brand.cream,
    },
    text: {
      primary: brand.charcoal,
      secondary: brand.muted,
    },
    error: {
      main: "#d32f2f",
    },
  },
  typography: {
    fontFamily: "'Space Grotesk', system-ui, sans-serif",
    h1: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 800,
      lineHeight: 0.95,
      letterSpacing: "-0.03em",
    },
    h2: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 800,
      lineHeight: 1.05,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 700,
    },
    h4: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 700,
    },
    subtitle1: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "0.6875rem",
      letterSpacing: "0.3em",
      textTransform: "uppercase" as const,
    },
    body1: {
      fontFamily: "'Space Grotesk', system-ui, sans-serif",
      fontWeight: 300,
      lineHeight: 1.7,
    },
    body2: {
      fontFamily: "'Space Grotesk', system-ui, sans-serif",
      fontWeight: 300,
      fontSize: "0.875rem",
      lineHeight: 1.7,
    },
    button: {
      fontFamily: "'Space Grotesk', system-ui, sans-serif",
      fontWeight: 600,
      fontSize: "0.875rem",
      letterSpacing: "0.15em",
      textTransform: "uppercase" as const,
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "::selection": {
          backgroundColor: brand.gold,
          color: brand.blue,
        },
        body: {
          margin: 0,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: "none",
          transition: "all 0.5s ease",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 0,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
});
