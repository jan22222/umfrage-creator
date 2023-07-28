import React from 'react';
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SubjectIcon from '@mui/icons-material/Subject';
import {makeStyles} from "@mui/styles"
import { useNavigate } from "react-router-dom"
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material/"


const useStyles = makeStyles({

})

export default function Navbar(){
  const classes = useStyles()
  const navigate = useNavigate()
  const menuItems = [
    {
      text: "Edit the Surveys",
      icon: <SubjectIcon color="secondary"/>,
      path : "/editor"
    },
    {
      text: "Home",
      icon: <SubjectIcon color="secondary"/>,
      path : "/home"
    },
    {
      text: "Sign Up",
      icon: <SubjectIcon color="secondary"/>,
      path : "/signup"
    },
    {
      text: "Sign in",
      icon: <SubjectIcon color="secondary"/>,
      path : "/signin"
    },
    {
      text: "Edit the Surveys",
      icon: <SubjectIcon color="secondary"/>,
      path : "/editor"
    },
  ]
  const hoveredStyle = {
      cursor: "grab"
  }
  return (
  <>
    <List>
      {menuItems.map((item)=>{ 
        return(
        <ListItem
          key={item.text}
          onClick={()=>{navigate(item.path)}}
        >
          <ListItemButton  hoveredStyle={hoveredStyle}>

          <ListItemIcon >
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} tooltip="Description here"/>
          </ListItemButton>
        </ListItem>)
      })}
    
    </List>
    <FormControl>
  <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="female"
    name="radio-buttons-group"
  >
    <FormControlLabel value="female" control={<Radio />} label="Female" />
    <FormControlLabel value="male" control={<Radio />} label="Male" />
    <FormControlLabel value="other" control={<Radio />} label="Other" />
  </RadioGroup>
</FormControl>
  </>
  );
}
