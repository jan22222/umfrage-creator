import { makeStyles} from "@mui/styles";
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import react from "react"
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar"
import Feed from "./Feed";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import {theme} from "../theme"

const useStyles = makeStyles({
    page:{
        width: "80vw",
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

export default function Layout(props){
    const classes = useStyles()
    const userData = { uid: null};
    const [user, setUser] = react.useState(userData)
    const [mode, setMode] = useState("light");
    const darkTheme = createTheme({
        palette: {
        mode: mode,
        },
    });
    react.useEffect(()=>{
     if(props.user===undefined){
         setUser(userData)
     }else{
         setUser(props.user)
     }
        
    },[props.user])
 
    return(
        <ThemeProvider theme={theme}>
            <Box>
                <Topbar user={props.user} />
            </Box>
            <Box>
                <Stack direction="row" >
                    <Sidebar setMode={setMode} mode={mode}/>
                    <Feed children={props.children} />
                </Stack>
            </Box>
        </ThemeProvider>
    )
}