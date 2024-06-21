import { createTheme } from '@mui/material/styles';

// This custom theme that I made is very basic, it could be expanded to include brand colors and more variations. 

const theme = createTheme({
  typography: {
    fontFamily: 'Josefin Sans, sans-serif',
  },
  palette: {
    primary: {
      main: '#073B4C',
    },
    secondary: {
      main: '#E4EAF2',
    },
    error: {
      main: '#EF476F',
    },
    warning: {
      main: '#FFD166',
    },
    info: {
      main: '#1F1F1F',
    },
    success: {
      main: '#ffffff',
    },
  },
});

export default theme;
