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
  Layout: {
    backgroundColor: "black",
    width: "100vw",
    height: "100vh",
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

  const user = props.user;
  const [mode, setMode] = useState("light");
  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  react.useEffect(() => {}, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
      <Header mode={mode} setMode={setMode} user={user}></Header>
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
          <Sidebar className={classes.drawer} />
        </Box>
        <Box width="100%" height="100%" sx={{}}>
          <Feed children={props.children} className={classes.page} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
