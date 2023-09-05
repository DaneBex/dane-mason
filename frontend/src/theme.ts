import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EF6461",
    },
    secondary: {
      main: "#FFCF99",
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
});

export default theme;
