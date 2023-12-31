import { useTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { z } from "zod";
import logo from "../images/EconEcho.png";
import React, { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LoginUserDocument } from "../__generated__/graphql";
import { useNavigate } from "react-router-dom";
import { useUser } from "../app";
import { Carousel } from "./Carousel";

export const SignInValidate = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function SignIn() {
  const [email, setEmail] = React.useState<string>("");
  const [emailError, setEmailError] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordError, setPasswordError] = React.useState<string>("");
  const [shouldRedirect, setShouldRedirect] = React.useState(false);
  const navigate = useNavigate();

  const [login, { data, loading, error }] = useMutation(LoginUserDocument);
  const { setUser } = useUser();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const results = SignInValidate.safeParse({
      email,
      password,
    });

    if (results.success) {
      return login({
        variables: {
          email,
          password,
        },
      });
    } else {
      const errorMap: Record<string, string> = {};

      results.error.errors.forEach((error) => {
        const errorPath = error.path[0];
        const errorMessage = error.message;

        if (errorPath) {
          errorMap[errorPath] = errorMessage;
        }
      });
      setEmailError(errorMap.email || "");
      setPasswordError(errorMap.password || "");
    }
  };

  const defaultTheme = useTheme();

  useEffect(() => {
    if (data?.loginUser?.token && data.loginUser.user) {
      localStorage.setItem("AUTH_TOKEN", data?.loginUser.token);
      localStorage.setItem("USER_DATA", JSON.stringify(data.loginUser.user));
      setUser(data.loginUser.user);
      setShouldRedirect(true);
    }
  }, [data, setUser]);

  useEffect(() => {
    if (shouldRedirect) {
      navigate("/");
    }
  }, [navigate, shouldRedirect]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                error={emailError ? true : false}
                helperText={emailError}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError ? true : false}
                helperText={passwordError}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/sign-up" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {loading ? <Box>Loading...</Box> : null}
              {data?.loginUser?.error ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  marginTop="20px"
                  color="red"
                >
                  {data?.loginUser?.error}
                </Box>
              ) : null}
            </Box>
            <Box>
              <img
                src={logo}
                style={{
                  height: "250px",
                  borderRadius: "50%",
                  padding: "20px",
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Carousel />
      </Grid>
    </ThemeProvider>
  );
}
