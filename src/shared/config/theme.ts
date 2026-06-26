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

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
const BORDER = "rgba(26,26,26,0.1)";
const BORDER_SOFT = "rgba(26,26,26,0.08)";

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
      default: brand.cream,
      paper: "#ffffff",
    },
    text: {
      primary: brand.charcoal,
      secondary: brand.gray,
    },
    divider: BORDER_SOFT,
    error: {
      main: "#d32f2f",
    },
  },
  typography: {
    fontFamily: FONT,
    fontSize: 15,
    h1: {
      fontWeight: 700,
      fontSize: "2.75rem",
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.2,
      letterSpacing: "-0.015em",
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.6rem",
      lineHeight: 1.25,
      letterSpacing: "-0.01em",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.35rem",
      lineHeight: 1.3,
      letterSpacing: "-0.005em",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.15rem",
      lineHeight: 1.35,
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.4,
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    overline: {
      fontWeight: 600,
      fontSize: "0.7rem",
      letterSpacing: "0.12em",
      lineHeight: 2,
      textTransform: "uppercase" as const,
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.65,
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.9375rem",
      lineHeight: 1.6,
    },
    caption: {
      fontWeight: 400,
      fontSize: "0.8125rem",
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      fontSize: "0.9375rem",
      letterSpacing: "0.01em",
      textTransform: "none" as const,
    },
  },
  shape: {
    borderRadius: 10,
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
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        outlined: {
          borderColor: BORDER_SOFT,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "none",
          paddingInline: 20,
          paddingBlock: 10,
          transition: "all 0.25s ease",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: "#ffffff",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: BORDER,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(26,26,26,0.25)",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 600,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: BORDER_SOFT,
        },
        head: {
          fontWeight: 600,
          fontSize: "0.8125rem",
          color: brand.muted,
          backgroundColor: brand.cream,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: brand.goldDark,
          fontWeight: 600,
          textUnderlineOffset: "2px",
        },
      },
    },
  },
});
