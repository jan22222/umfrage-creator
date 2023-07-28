import { makeStyles } from "@mui/styles";
import Drawer from '@mui/material/Drawer';
import React from "react"
import Navbar from "./Navbar.js"
const useStyles = makeStyles({
    page:{
        width: "calc(100vw - 320px)",
        marginLeft : "300px",
        background: "#f9f9f9"
    },
    drawer:{
        width: "300px"
    }
})

export default function Layout({children}){
    const classes = useStyles()

    return(
        <div>
            <Drawer
             variant = "permanent"
             anchor = "left"
             className = {classes.drawer}
            >
               Menu
               <Navbar></Navbar>
            </Drawer>
            <div className = {classes.page} >
                {children}        
            </div>       
        </div>
    )
}