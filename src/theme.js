import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
export {ThemeProvider as ThemeProvider};

export const theme = createTheme({
    palette:{
      primary:{
        main: "#1760a5",
        light: "skyblue"
      },
      secondary:{
        main: '#11119c',
      },
      otherColor:{
        main:"#11119c"
      }
    }
  })