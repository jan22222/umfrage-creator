import { makeStyles} from "@mui/styles";
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import react from "react"
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar"
import Feed from "./Feed";
import { Box, Stack, Paper} from "@mui/material";
import { ThemeProvider, createTheme} from '@mui/material/styles';

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
        <ThemeProvider theme={darkTheme}>
            <Paper sx={{height:"100vh", width:"100vw"}}>
                <Box>
                    <Topbar user={props.user} setMode={setMode} mode={mode}/>
                </Box>
                <Box>
                    <Stack direction="row" >
                        <Sidebar />
                        <Feed children={props.children} />
                    </Stack>
                </Box>
            </Paper>
        </ThemeProvider>
    )
}