import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import react from "react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Feed from "./Feed";
import { Box, Stack, Paper } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { lime, purple } from "@mui/material/colors";
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';


import {
  Card,
  CardHeader,
  CardContent,
  FormGroup,
  FormControlLabel,
  Typography,
} from "@mui/material";

import { CssBaseline } from "@mui/material";

const useStyles = makeStyles({
  paper: {
    backgroundColor: "lime",
  },

  page: {
    width: "100%",
    overflow: "hidden",
    marginLeft: { xs: "80px", md: "320px" },
    background: "#f9f9f9",
    height: "calc(100%-200px)",
    display: "flex",  
    justifyContent: "space-around"
  },
  drawer: {
    width: { xs: "80px", md: "320px" },
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    height: "calc(100%-200px)",
    color: "white",
  },
});

export default function Layout(props) {

  const classes = useStyles();

  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false)


  const lightTheme = createTheme({
    typography: {
      fontFamily: [
        "Nunito",
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),
    },
    palette: {
      mode: mode,
      primary: {
        main: "#39c0d0",
      },
      secondary: {
        main: "#52181c",
      },
      contrastText: "#fff",
    },
  });
  const darkTheme = createTheme({
    typography: {
      fontFamily: [
        "Nunito",
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),
    },
    palette: {
      mode: mode,
      primary: {
        main: "#3653b8",
      },
      secondary: {
        main: "#ffe9bf",
      },
    },
  });


  return (
    <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      <CssBaseline></CssBaseline>

      <Header mode={mode} setMode={setMode}></Header>
      <Box
        className={Layout}
        position="fixed"
        top="100px"
        left="0px"
        width="100vw"
        height="100vh"
        sx={{ display: "flex", flexDirection: "row" }}
      >
        
        <Box height="100%" sx={{ width: { xs: "120px", md: "300px" } }}>
          
          <Card>
            <CardContent>
              <Typography variant="body1">
                Dark Mode is {mode == "dark" ? "On" : "Off"}
              </Typography>
            </CardContent>
          </Card>
          <Sidebar className={classes.drawer} mode={mode} />
        </Box>
        <Paper  height="100%" className={classes.page}>
           
             
                <div style={{height: "80vh"}}>
                   <Container maxWidth= "m"  >
                  { loading ?
                    <div style={{height: "50%", width:"50px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                      <CircularProgress />
                    </div>:
                    <>
                        <h1 style={{display: "block"}}>
                          Eigene Umfragen
                        </h1>
                        
                        <Feed children={props.children} className={classes.page} />

                  
                    </>
                  }
                  </Container>
                </div>
              
           
        </Paper>
       
      </Box>
    </ThemeProvider>
  );
}
