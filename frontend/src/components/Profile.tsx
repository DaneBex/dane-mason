import "react";
import { useContext } from "react";
import { UserContext } from "../app";
import {
  useTheme,
  ThemeProvider,
  Box,
  Typography,
  Grid,
  styled,
  Button,
} from "@mui/material";
import { Navbar } from "./Navbar";
import DiamondIcon from "@mui/icons-material/Diamond";
import React from "react";
import { EditProfile } from "./EditProfileModal";

export function Profile() {
  const [open, setOpen] = React.useState(false);
  const defaultTheme = useTheme();
  const user = useContext(UserContext)?.user;
  const handleOpen = () => setOpen(true);

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
        <Grid container height="70%">
          <AvatarSection item sm={8}>
            <img
              style={{ height: "80%", borderRadius: "50%" }}
              src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
            />
            <Box
              sx={{
                height: "10%",
                display: "flex",
                flexDirection: "column",
                gap: "25%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <RegularText>Hi {user?.username}</RegularText>
              <RegularText>{user?.email}</RegularText>
              <Button
                onClick={handleOpen}
                sx={{ height: "5%", marginTop: "5px" }}
              >
                Edit
              </Button>
            </Box>
          </AvatarSection>
          <Grid item xs={4}>
            <Box
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <RegularText fontSize="200%">{user?.echoes}</RegularText>
              <DiamondIcon style={{ fontSize: "200%" }} color="diamond" />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <EditProfile open={open} setOpen={setOpen} />
    </ThemeProvider>
  );
}

const AvatarSection = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 75%;
  gap: 5%;
`;

export const RegularText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));
