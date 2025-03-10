import React from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SubjectIcon from "@mui/icons-material/Subject";
import ModeEdit from "@mui/icons-material/ModeEdit";
import AppRegistration from "@mui/icons-material/AppRegistration";
import Logout from "@mui/icons-material/Logout";
import Login from "@mui/icons-material/Login";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material/";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";

const StyledList = styled("List")(({ theme }) => ({
  height: "100%",
  background: theme.palette.primary.main,
}));

export default function Navbar() {
  const navigate = useNavigate();
  const menuItems = [
    {
      text: "Umfragen",
      icon: <ModeEdit color="secondary" />,
      path: "/editor",
    },
    {
      text: "Home",
      icon: <SubjectIcon color="secondary" />,
      path: "/",
    },
    {
      text: "Einschreiben",
      icon: <AppRegistration color="secondary" />,
      path: "/signup",
    },
    {
      text: "Anmelden",
      icon: <Login color="secondary" />,
      path: "/signin",
    },
    {
      text: "Ausloggen",
      icon: <Logout color="secondary" />,
      path: "/logout",
    },
  ];
  const hoveredStyle = {
    cursor: "grab",
  };
  return (
    <StyledList>
      {menuItems.map((item) => {
        return (
          <ListItem
            key={item.text}
            onClick={() => {
              navigate(item.path);
            }}
          >
            <ListItemButton hoveredStyle={hoveredStyle} color="primary">
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                sx={{ display: { xs: "none", md: "block" } }}
                primary={item.text}
                tooltip={item.text}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </StyledList>
  );
}
