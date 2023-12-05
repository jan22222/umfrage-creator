import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase';

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
const defaultTheme = createTheme();



const Signup = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    //Check for valid REgistration values gets prepared here.

    function ValidateEmail(input) {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (input.match(validRegex)) {
          return true;
        } else {
          return false;
        }
    }

    function ValidatePassword(input){
        if(input.length > 5){
            return true
        }
        return false
    }

    const onSubmit = async (e) => {
      e.preventDefault()
      //REgistration validation.
      if(ValidateEmail(email) && ValidatePassword(password)){
            //REgistration with firebase
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(user);
                    alert("Erfolgreich eingeloggt.")
                    navigate("/signin")
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    // ..
                });
      }
      else
      {
        alert("Ungültige Email oder Passwort!")
      }          
    }
 
    return (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Einschreiben
              </Typography>
              <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
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
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Erinnern."
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Start
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Passwort vergessen?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Sie haben keinen Account? Einschreiben."}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
      
          </Container>
        </ThemeProvider>
      );
}
 
export default Signup