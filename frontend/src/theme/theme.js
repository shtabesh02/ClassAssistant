// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
    primary: {
      main: '#007BFF', // MD3 primary color
    },
    secondary: {
      main: '#dfeefeff',
    },
     success: {
      main: '#1F3B66',
    },
    warning: {
      main: '#FFDE2D',
    },
    info: {
      main: '#FAB25B',
    },
    error: {
      main: '#E7DCC4',
    },

    // 👉 Custom color (not in default palette)
    brand: {
      main: '#5F9EA0',
      contrastText: '#fff',
    },
  },
   typography: {
    fontFamily: `'Roboto', 'DM Mono', 'Inter', 'Lato',`,
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    caption: {
      fontStyle: 'italic',
    },
    // Custom variant (optional)
    customTitle: {
      fontSize: '1.8rem',
      fontWeight: 500,
      letterSpacing: '0.05em',
    },
  },
});

export default theme;
