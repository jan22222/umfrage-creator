import react from "react"
import NavList from "./NavList";
import Box from '@mui/material/Box';
import {makeStyles} from "@mui/styles"

const useStyles = makeStyles({
    drawer:{
        width: {xs: "80px", md:"300px"},
        display: "flex",
        flexDirection: "column",
        gap:"3px"
    }
})

export default function Sidebar(){
    const classes = useStyles()
    return(
        <Box 
            className = {classes.drawer}
        >
            <NavList/>
        </Box>
    )
}