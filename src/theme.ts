import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#6C63FF', // Modern purple
      light: '#8F88FF',
      dark: '#4B44CC',
    },
    secondary: {
      main: '#00E5FF', // Cyan accent
      light: '#5FFFFF',
      dark: '#00B2CC',
    },
    background: {
      default: '#0A0E17', // Very dark blue/black
      paper: '#141A29', // Slightly lighter for cards
    },
    text: {
      primary: '#F3F4F6',
      secondary: '#9CA3AF',
    },
    error: {
      main: '#FF4C4C',
    },
    warning: {
      main: '#FFB74D',
    },
    success: {
      main: '#00C853',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#333 #0A0E17',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: 'transparent',
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#333',
            minHeight: 24,
            border: '2px solid #0A0E17',
          },
        },
      },
    },
  },
};

export const theme = createTheme(darkThemeOptions);
