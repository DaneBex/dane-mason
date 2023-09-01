import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER } from '../mutations/signup.muation';
import { z } from 'zod'

export const User = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      path: ['confirmPassword'],
      code: 'custom',
      message: 'The passwords did not match'
    })
  }
})

const defaultTheme = createTheme();

export function SignUp() {
  const [username, setUsername] = React.useState<string>('')
  const [usernameError, setUsernameError] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [emailError, setEmailError] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [passwordError, setPasswordError] = React.useState<string>('')
  const [confirmPassword, setConfirmPassword] = React.useState<string>('')
  const [confirmPasswordError, setConfirmPasswordError] = React.useState<string>('')
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const createUserInputs = {
      username,
      email,
      password,
      confirmPassword
    }

  const results = User.safeParse(createUserInputs)

  if (results.success) {
    return createUser({
      variables: {
        createUserInputs
      }
     })
  } else {
    const errorMap: Record<string, string> = {};

    results.error.errors.forEach(error => {
      const errorPath = error.path[0];
      const errorMessage = error.message;

      if (errorPath) {
        errorMap[errorPath] = errorMessage;
      }
    });

    setUsernameError(errorMap.username || '');
    setEmailError(errorMap.email || '');
    setPasswordError(errorMap.password || '');
    setConfirmPasswordError(errorMap.confirmPassword || '');
  }
  };

  if (loading) return "Loading..."
  if (error) return `Error: ${error}`
  if (data) return `${data}`
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            margin: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="family-name"
                  onChange={(e) => setUsername(e.target.value)}
                  error={usernameError ? true : false}
                  helperText={usernameError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  error={emailError ? true : false}
                  helperText={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  error={passwordError ? true : false}
                  helperText={passwordError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={confirmPasswordError ? true : false}
                  helperText={confirmPasswordError}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}




