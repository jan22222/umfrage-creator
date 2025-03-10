import react from "react";
import NavList from "./NavList";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { ThemeConsumer } from "styled-components";

const useStyles = makeStyles((theme) => ({
  drawer: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    height: "100vh",
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  return (
    <Box className={classes.drawer}>
      <NavList />
    </Box>
  );
}
