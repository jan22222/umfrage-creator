import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import RalewayWoff2 from './fonts/Raleway-Regular.woff2';
export {ThemeProvider}
export let theme = createTheme({
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
      mode:"light"
    }
  })

  export function setModeDirectly(mode){
    theme.palette.mode = mode
  }