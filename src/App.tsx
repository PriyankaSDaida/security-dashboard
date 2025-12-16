import React, { useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getTheme } from './theme';
import { DataProvider } from './contexts/DataContext';
import { ColorModeProvider, useColorMode } from './contexts/ColorModeContext';
import { ModernLayout } from './components/ModernLayout';
import { Dashboard } from './pages/Dashboard';
import { ExecutiveDashboard } from './pages/ExecutiveDashboard';
import { VulnerabilityList } from './pages/VulnerabilityList';
import { Compare } from './pages/Compare';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';

const AppContent: React.FC = () => {
  const { mode } = useColorMode();
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<ModernLayout />}>
                <Route path="/" element={<ExecutiveDashboard />} />
                <Route path="/detailed" element={<Dashboard />} />
                <Route path="/vulnerabilities" element={<VulnerabilityList />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </ThemeProvider>
  );
};

function App() {
  return (
    <ColorModeProvider>
      <AppContent />
    </ColorModeProvider>
  );
}

export default App;

