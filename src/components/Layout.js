import { makeStyles} from "@mui/styles";
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import react from "react"
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar"
import Feed from "./Feed";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Add from "./Add";
export const theme = createTheme({
    palette:{
      primary:{
        main: "#1760a5",
        light: "skyblue"
      },
      secondary:{
        main: '#add8e6',
      },
      otherColor:{
        main:"#999"
      }
    }
  })
const useStyles = makeStyles({
    page:{
        width: "calc(100vw - 520px)",
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
            <Box bgcolor={"background.default"} color={"text.primary"}  width={"100vw"}>
                <Topbar user={props.user} />
            </Box>
            <Box bgcolor={"background.default"} color={"text.primary"}>
                <Stack direction="row" spacing={2} justifyContent="flex-start">
                    <Sidebar setMode={setMode} mode={mode}/>
                    <Feed children={props.children} />
                </Stack>
                <Add />
            </Box>
        </ThemeProvider>
    )
}