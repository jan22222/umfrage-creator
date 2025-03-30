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
    width: { xs: "calc(100vw - 80px)", md: "calc(100vw - 320px)" },
    marginLeft: { xs: "80px", md: "320px" },
    background: "#f9f9f9",
    height: "calc(100%-200px)",
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
        <Box width="100%" height="100%" sx={{}}>
         
          <Feed children={props.children} className={classes.page} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
