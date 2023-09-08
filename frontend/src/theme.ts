import {
  PaletteColor,
  PaletteColorOptions,
  createTheme,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    diamond?: PaletteColor;
  }

  interface PaletteOptions {
    diamond?: PaletteColorOptions;
  }
}

const theme = createTheme({
  palette: {
    diamond: {
      main: "#AFECE7",
    },
    primary: {
      main: "#60D394",
    },
    secondary: {
      main: "#FF9B85",
    },
    background: {
      default: "#FFF8F0",
      paper: "#FFF8F0",
    },
    text: {
      primary: "#1E1E24",
      secondary: "#788585",
    },
    action: {
      active: "#EF6461",
    },
    divider: "#CACACA",
  },
  typography: {
    fontFamily: "Lato",
  },
});

export default theme;
