import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { RegularText } from "./Profile";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import { Income, Race, Sex } from "../__generated__/graphql";

interface EditProfileProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditProfile({ open, setOpen }: EditProfileProps) {
  const defaultTheme = useTheme();
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RegularText id="modal-modal-title" variant="h6" marginBottom="5%">
              Edit Profile
            </RegularText>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField id="username" label="Username" variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField id="email" label="Email" variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="age"
                  label="Age"
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Income Range</InputLabel>
                  <Select id="income" label="Income Range">
                    {Object.values(Income)
                      .reverse()
                      .map((income) => (
                        <MenuItem value={income}>
                          {income === Income.Zero
                            ? "$0 - 20,000"
                            : income === Income.Twenty
                            ? "$20,000 - 50,000"
                            : income === Income.Fifty
                            ? "$50,000 - 80,000"
                            : "$80,000+"}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Are you married?</InputLabel>
                  <Select
                    id="married"
                    label="Are you married?"
                    variant="outlined"
                  >
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Race</InputLabel>
                  <Select id="race" label="Race" variant="outlined">
                    {Object.values(Race).map((race) => {
                      if (race === Race.AmericanIndian) {
                        return (
                          <MenuItem value={race}>American Indian</MenuItem>
                        );
                      } else {
                        return (
                          <MenuItem value={race}>
                            {race.charAt(0)}
                            {race.slice(1).toLowerCase()}
                          </MenuItem>
                        );
                      }
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item display="flex" justifyContent="center" xs={12}>
                <FormControl sx={{ width: "50%" }} fullWidth>
                  <InputLabel>Sex</InputLabel>
                  <Select id="sex" label="Sex" variant="outlined">
                    {Object.values(Sex).map((sex) => (
                      <MenuItem value={sex}>
                        {sex.charAt(0)}
                        {sex.slice(1).toLowerCase()}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
