import "react";
import { useContext } from "react";
import { UserContext } from "../app";
import {
  useTheme,
  ThemeProvider,
  Box,
  Avatar,
  Typography,
  Grid,
  styled,
} from "@mui/material";
import { Navbar } from "./Navbar";

export function Profile() {
  const defaultTheme = useTheme();
  const user = useContext(UserContext)?.user;

  console.log(user?.username);

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
        <Grid container padding="12px" border="1px solid red" height="60%">
          <AvatarSection item xs={6}>
            <Avatar sx={{ height: "90%", width: "50%" }} alt={user?.username} />
            <Box>
              <Typography color={defaultTheme.palette.text.primary}>
                {user?.username}
              </Typography>
              <Typography mt="5px" color={defaultTheme.palette.text.primary}>
                Edit Profile Picture
              </Typography>
            </Box>
          </AvatarSection>
          <Grid item xs={6}></Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

const AvatarSection = styled(Grid)`
  padding: 12px;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
