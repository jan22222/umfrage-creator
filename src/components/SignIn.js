import React, {useEffect, useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate, useParams } from 'react-router-dom'

import Alert from '@mui/material/Alert';
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
import { getAuth } from "firebase/auth";
 // TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn(props) {

    const [email, setEmail] = useState("") 
    const [password, setPassword] = useState("") 
    const [errormessage, setErrormessage] = useState("")
    const navigate = useNavigate();
    const { message } = useParams();

    const handleSubmit = (event) => {
     event.preventDefault();

        
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                props.setUser(user)
                navigate("/")
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrormessage(errorCode, errorMessage)
            });
        
  }
  
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
            {message!= undefined && <Alert severity="info">
              {message}
            </Alert>}
            {errormessage!="" &&
              <Alert severity="error">
                {errormessage == "auth/wrong-password" &&
                  <>Passwort falsch.</>
                }
                {errormessage == "auth/invalid-email" &&
                  <>Email unbekannt.</>
                }
                <>({errormessage})</></Alert>
            }
        <Box
          sx={{
            marginTop: 8,
            display:"flex",
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Addresse"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e=>setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Passwort"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e=>setPassword(e.target.value)}

            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Anmelden
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Link href="../signup" variant="body2">
                  {"Neu einschreiben."}
                </Link>
              </Grid>
              <Grid item>
                <Link href="../forgot-pw" variant="body2">
                  {"Passwort vergessen?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}