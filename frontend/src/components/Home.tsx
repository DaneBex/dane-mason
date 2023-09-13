import "react";
import { Navbar } from "./Navbar";
import Box from "@mui/material/Box";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { SignIn } from "./SignIn";
import { UserContext } from "../app";

export function Home() {
  const defaultTheme = useTheme();
  const user = useContext(UserContext)?.user;
  const token = localStorage.getItem("AUTH_TOKEN");
  if (!token) {
    return <SignIn />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Navbar />
      </Box>
    </ThemeProvider>
  );
}
