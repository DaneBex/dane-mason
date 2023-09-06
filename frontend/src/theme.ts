import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#60D394",
    },
    secondary: {
      main: "#FF9B85",
    },
    background: {
      default: "#FFF8F0",
      paper: "#FFFFFF",
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
