import { createTheme } from "@mui/material/styles";
import "@fontsource/nunito";

const fontFamily = "Nunito, sans-serif";

export const theme = mode =>
  createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#303167",
        dark: "#8181A4",
        light: "#DEE4FF",
      },
      secondary: {
        main: "#FF067E",
      },
      info: {
        main: "#7BB0FF",
        secondary: "#F6F8FF",
        indigo: "#30316799",
        lightblue: "#E6EAFF",
        lightblue2: "#EFF2FF",
        lightblue3: "#D0D8FF",
        dark: "#B2C0FF",
        light: "#f0f4ff",
      },
      error: {
        main: "#d50000",
        light: "#fce6e5",
      },
      warning: {
        main: "#ff9600",
        dark: "#f4970b",
        light: "#f7f1e4",
      },
      success: {
        main: "#63b335",
        dark: "#BFDB38",
        light: "#f1f6e5",
      },
      background: {
        default: "#FFFFFF",
      },
    },
    typography: {
      fontFamily,
    },
    components: {
      MuiCheckbox: {
        styleOverrides: {
          colorSecondary: {
            "&.Mui-checked": {
              color: "#7BB0FF",
            },
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: "#F3F5FF",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontSize: "0.8rem",
            padding: "10px 16px",
          },
          head: {
            color: "#3c4d6f",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "0px",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          rounded: {
            borderRadius: "10px",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          label: {
            fontFamily,
          },
        },
      },
    },
    shadows: [
      "none",
      "0px 1px 3px rgba(0,0,0,0.2)",
      ...Array(21).fill("none"),
      "0 5px 10px rgba(222,228,255,0.8)",
      "0 1px 15px 1px rgba(69,65,78,.08)",
    ],
  });

export default theme;
