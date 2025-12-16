import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#448AFF', // Strong Blue (Light enough for dark mode)
      light: '#82B1FF',
      dark: '#2962FF',
    },
    secondary: {
      main: '#18FFFF', // Bright Cyan accent
      light: '#76FFFF',
      dark: '#00CBCC',
    },
    background: {
      default: '#0A1929', // Deep Navy
      paper: '#132F4C', // Lighter Navy for cards
    },
    text: {
      primary: '#F3F4F6',
      secondary: '#B0BEC5',
    },
    error: {
      main: '#FF5252',
    },
    warning: {
      main: '#FFB74D',
    },
    success: {
      main: '#69F0AE',
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
          scrollbarColor: '#448AFF #0A1929',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: 'transparent',
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#448AFF',
            minHeight: 24,
            border: '2px solid #0A1929',
          },
        },
      },
    },
  },
};

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#6366F1', // Electric Indigo
      light: '#818CF8',
      dark: '#4F46E5',
    },
    secondary: {
      main: '#EC4899', // Hot Pink / Magenta
      light: '#F472B6',
      dark: '#DB2777',
    },
    background: {
      default: '#F1F5F9', // Softer Slate Gray
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B', // Slate 800
      secondary: '#64748B', // Slate 500
    },
    error: {
      main: '#EF4444',
    },
    warning: {
      main: '#F59E0B',
    },
    success: {
      main: '#10B981', // Emerald
    },
    info: {
      main: '#3B82F6',
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
          backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent
          backdropFilter: 'blur(16px) saturate(160%)', // Frosted glass with boost
          backgroundImage: 'none',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          textTransform: 'none',
          '&:hover': {
            boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)', // Indigo glow
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease-in-out',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F8FAFC',
          backgroundImage: `
            radial-gradient(at 0% 0%, hsla(253,16%,7%,0) 0, transparent 50%), 
            radial-gradient(at 50% 0%, hsla(225,39%,30%,0) 0, transparent 50%), 
            radial-gradient(at 100% 0%, hsla(339,49%,30%,0) 0, transparent 50%),
            radial-gradient(at 10% 10%, hsla(256, 90%, 75%, 0.12) 0px, transparent 50%),
            radial-gradient(at 90% 10%, hsla(192, 90%, 70%, 0.12) 0px, transparent 50%),
            radial-gradient(at 50% 50%, hsla(320, 80%, 70%, 0.1) 0px, transparent 50%),
            radial-gradient(at 80% 90%, hsla(260, 90%, 80%, 0.12) 0px, transparent 50%),
            radial-gradient(at 10% 90%, hsla(200, 90%, 70%, 0.12) 0px, transparent 50%)
          `,
          backgroundAttachment: 'fixed',
          scrollbarColor: '#959595 #F4F6F8',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: 'transparent',
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#959595',
            minHeight: 24,
            border: '2px solid transparent',
            backgroundClip: 'content-box',
          },
        },
      },
    },
  },
};

export const getTheme = (mode: 'light' | 'dark') => {
  return createTheme(mode === 'light' ? lightThemeOptions : darkThemeOptions);
};

export const theme = createTheme(darkThemeOptions); // Default export kept for backward compat if needed temporarily

