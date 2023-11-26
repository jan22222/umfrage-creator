import react from "react"
import NavList from "./NavList";
import Box from '@mui/material/Box';
import {makeStyles} from "@mui/styles"
import {ThemeProvider, createTheme} from "@mui/material/styles"

const theme = createTheme({
    palette:{
      primary:{
        main: "#1760a5",
        light: "skyblue"
      },
      secondary:{
        main: '#15c630',
      },
      otherColor:{
        main:"#999"
      }
    }
  })

const useStyles = makeStyles({
    page:{
        width: "calc(100vw - 320px)",
        marginLeft : "300px",
        
    },
    drawer:{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        gap:"3px",
        background: theme.palette.primary.light,
        height: "100vh"
    },
        abRoot: {
          backgroundColor: "red"
        },
        abStatic: {
        
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