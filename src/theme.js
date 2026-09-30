import { createTheme } from "@mui/material/styles";

export function buildTheme(mode) {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#90caf9" : "#1976d2"
      },
      secondary: {
        main: "#f50057"
      },
      background: {
        default: mode === "dark" ? "#0b0d10" : "#f5f7fa",
        paper: mode === "dark" ? "#15181d" : "#ffffff"
      }
    },
    shape: {
      borderRadius: 12
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: { fontWeight: 800 },
      h5: { fontWeight: 700 }
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            overflow: "hidden"
          }
        }
      }
    }
  });
}
