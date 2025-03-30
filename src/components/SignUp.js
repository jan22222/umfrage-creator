import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import  auth from "../firebase";
import Alert from "@mui/material/Alert";
import emailjs from "@emailjs/browser";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

  import { AuthContext } from "../AuthProvider";
import { useContext } from "react";



const Signup = () => {

    const { createUser,
    user,
    userId,
    userDisplayName,
    userEmail,
    userPhotoURL,
    
    loginUser,
    logOut,
    loading,
    isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormessage, setErrormessage] = useState("");

  //Check for valid REgistration values gets prepared here.

  function ValidateEmail(input) {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex)) {
      return true;
    } else {
      setErrormessage("Email ungültig.");
      return false;
    }
  }

  function ValidatePassword(input) {
    if (input.length > 5) {
      return true;
    }
    setErrormessage("Passwort ungültig.");
    return false;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    emailjs.init("UyDRDWE8kWGKZilvk");
    //REgistration validation.
    if (ValidateEmail(email) && ValidatePassword(password)) {
      //REgistration with firebase
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          const sender = "jan.weitzel@gmail.com";
          const serviceId = "service_hsd4xpj";
          const templateId = "template_g72cq0o";
          const data = {
            sender,
            email,
            pw: password,
          };

          async function sendEmail() {
            await emailjs.send(serviceId, templateId, data);
            alert("Per Email informiert.");
          }
          sendEmail();
          alert("Erfolgreich registriert.");
          navigate("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrormessage(errorCode, errorMessage);
          // ..
        });
    } else {
      alert("Ungültige Email oder Passwort!");
    }
  };

  return (
    <Card sx={{ padding: "30px" }}>
      {errormessage != "" && (
        <Alert severity="error">
          {errormessage == "auth/wrong-password" && <>Passwort falsch.</>}
          {errormessage == "auth/invalid-email" && <>Email unbekannt.</>}
          {errormessage == "auth/email-already-in-use" && (
            <>Email wird bereits verwendet.</>
          )}

          <>({errormessage})</>
        </Alert>
      )}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
            <Grid item>
              <Link href="./signin" variant="body2">
                {"Sie haben bereits einen Account? Login."}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Card>
  );
};

export default Signup;
