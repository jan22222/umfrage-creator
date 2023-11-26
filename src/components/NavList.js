import React from 'react';
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SubjectIcon from '@mui/icons-material/Subject';
import ModeEdit from '@mui/icons-material/ModeEdit';
import AppRegistration from '@mui/icons-material/AppRegistration';
import Logout from '@mui/icons-material/Logout';
import Login from '@mui/icons-material/Login';
import {makeStyles} from "@mui/styles"
import { useNavigate } from "react-router-dom"
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material/"
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";

const theme = createTheme({
    palette:{
      primary:{
        main: "#1760a5",
        light: "skyblue"
      },
      secondary:{
        main: '#e6290b',
      },
      otherColor:{
        main:"#999"
      }
    }
  })

const useStyles = makeStyles({

})

export default function Navbar(){
  const classes = useStyles()
  const navigate = useNavigate()
  const menuItems = [
    {
      text: "Umfragen",
      icon: <ModeEdit color="secondary"/>,
      path : "/editor"
    },
    {
      text: "Home",
      icon: <SubjectIcon color="secondary"/>,
      path : "/"
    },
    {
      text: "Einschreiben",
      icon: <AppRegistration color="secondary"/>,
      path : "/signup"
    },
    {
      text: "Anmelden",
      icon: <Login color="secondary"/>,
      path : "/signin"
    },
    {
      text: "Ausloggen",
      icon: <Logout color="secondary"/>,
      path : "/logout"
    },
   
  ]
  const hoveredStyle = {
      cursor: "grab"
  }
  return (
  <ThemeProvider theme={theme}>
    <List>
      {menuItems.map((item)=>{ 
        return(
          <ListItem 
            key={item.text}
            onClick={()=>{navigate(item.path)}}
          >
            <ListItemButton  hoveredStyle={hoveredStyle} color="primary">
              <ListItemIcon >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} tooltip="Description here"/>
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  </ThemeProvider>
  );
}
