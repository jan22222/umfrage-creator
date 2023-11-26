import react from "react"
import NavList from "./NavList";
import Box from '@mui/material/Box';
import {AppBar, Stack, Typography} from '@mui/material';
import {makeStyles} from "@mui/styles";
import {styled} from "@mui/material/styles"
import {ThemeProvider, createTheme} from "@mui/material/styles"
import RalewayWoff2 from '../fonts/Raleway-Regular.woff2';

const theme = createTheme({
    typography: {
        fontFamily: 'Raleway, Arial',
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: `
            @font-face {
              font-family: 'Raleway';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: local('Raleway'), local('Raleway-Regular'), url(${RalewayWoff2}) format('woff2');
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }
          `,
        },
      },
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
        width: "calc(100vw - 320px)",
        marginLeft : "300px",
        background: "#f9f9f9"
    },
    drawer:{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        gap:"3px"
    },
    abRoot: {
        backgroundColor: "red"
    },
    abStatic: {
    
    }
})
const StyledStack = styled(Stack)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: " 2px 40px"
}))

export default function Topbar(props){
    const classes = useStyles()
    return(
      <ThemeProvider theme={theme}>
        <Box
            className = {classes.drawer}
        >
             <AppBar    user={props.user}     position="static"
                style={{ height: "120px", background: "secondary", width:"100vw",
                  fontSize: '1.2rem',
                  '@media (min-width:600px)': {
                    fontSize: '1.5rem',
                  },
                  [theme.breakpoints.up('md')]: {
                    fontSize: '2.4rem',
                  },
                }}
                classes={{ 
                    root: classes.abRoot, 
                    positionStatic: classes.abStatic 
                }}>
                 <StyledStack> 
                    <Typography    sx={{fontFamily: 'Raleway'}}>
                        Umfragen-Creator App
                    </Typography>
                    <>
                        {props.user.uid !== null ?
                            <h1>
                                Logged in with user id {props.user.uid}
                            </h1>:
                            <h1>
                                Not logged in.
                            </h1>
                        }
                    </>
                 </StyledStack>
             </AppBar>
        </Box>
      </ThemeProvider>
    )
}