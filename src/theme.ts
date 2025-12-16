import { createTheme, type ThemeOptions } from '@mui/material/styles';

// 2. ENTERPRISE STANDARD (MNC Professional)
const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196F3', // Corporate Blue
      light: '#64B5F6',
      dark: '#1976D2',
    },
    secondary: {
      main: '#546E7A', // Blue Grey
      light: '#78909C',
      dark: '#37474F',
    },
    background: {
      default: '#121212', // Neutral Dark
      paper: '#1E1E1E',   // Elevated Surface
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0BEC5',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    error: {
      main: '#D32F2F', // Standard Red
    },
    warning: {
      main: '#ED6C02', // Standard Orange
    },
    success: {
      main: '#2E7D32', // Forest Green
    },
    info: {
      main: '#0288D1', // Info Blue
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Standard Enterprise Font
    h1: { fontWeight: 700, letterSpacing: '-0.01em' },
    h2: { fontWeight: 600, letterSpacing: '-0.005em' },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  shape: {
    borderRadius: 4, // Professional soft rounding
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#424242 #121212",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#121212",
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 4,
            backgroundColor: "#424242",
            minHeight: 24,
            border: "1px solid #121212",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid #333', // Subtle, clean border
          boxShadow: 'none', // Flat design
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: 'none',
          textTransform: 'none',
        },
        containedPrimary: {
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#1976D2',
          }
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: 'none',
          border: '1px solid #333',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1E1E1E',
          borderBottom: '1px solid #333',
          boxShadow: 'none',
        }
      }
    }
  },
};

// Option 1: Royal Indigo (Modern SaaS)
const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#4F46E5', // Indigo 600
      light: '#818CF8', // Indigo 400
      dark: '#3730A3', // Indigo 800
    },
    secondary: {
      main: '#64748B', // Slate 500
      light: '#94A3B8',
      dark: '#334155',
    },
    background: {
      default: '#FAFAFA', // Ice White
      paper: '#FFFFFF', // Pure White
    },
    text: {
      primary: '#1E293B', // Slate 800
      secondary: '#64748B', // Slate 500
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.025em' },
    h2: { fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontWeight: 700, letterSpacing: '-0.015em' },
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 12, // More modern, rounded look
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#CBD5E1 #FAFAFA",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#FAFAFA",
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#CBD5E1",
            minHeight: 24,
            border: "2px solid #FAFAFA",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', // Extremely subtle shadow
          border: '1px solid rgba(0, 0, 0, 0.05)',
        },
        elevation1: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:active': {
            transform: 'translateY(1px)',
          }
        },
        containedPrimary: {
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2), 0 2px 4px -1px rgba(79, 70, 229, 0.1)',
          }
        }
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        }
      }
    }
  },
};

export const getTheme = (mode: 'light' | 'dark') => {
  return createTheme(mode === 'dark' ? darkThemeOptions : lightThemeOptions);
};

export const theme = createTheme(lightThemeOptions);
