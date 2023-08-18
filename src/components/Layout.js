import { makeStyles} from "@mui/styles";
import AppBar from '@mui/material/AppBar';
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
    },
        abRoot: {
          backgroundColor: "red"
        },
        abStatic: {
        
        }
   
})

export default function Layout({children}){
    const classes = useStyles()

    return(
        <div>
            <AppBar         position="static"
                style={{ height: "80px", background: "secondary", marginLeft:"230px" }}
                classes={{ 
                root: classes.abRoot, 
                positionStatic: classes.abStatic 
                }}>
                You are 
            </AppBar>
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