import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme, IconButton } from '@mui/material';
import { Dashboard as DashboardIcon, BugReport, CompareArrows, Settings, Menu as MenuIcon, Brightness4, Brightness7 } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useColorMode } from '../contexts/ColorModeContext';

const DRAWER_WIDTH = 240;

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { mode, toggleColorMode } = useColorMode();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        { text: 'Vulnerabilities', icon: <BugReport />, path: '/vulnerabilities' },
        { text: 'Compare', icon: <CompareArrows />, path: '/compare' },
        { text: 'Settings', icon: <Settings />, path: '/settings' },
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box sx={{ height: '100%', backgroundColor: 'rgba(10, 14, 23, 0.95)' }}>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {/* SecureVisa Logo: Gradient Triangle + Lightning Bolt */}
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="logoGradient" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#00E5FF" />
                                <stop offset="100%" stopColor="#651FFF" />
                            </linearGradient>
                        </defs>
                        {/* Downward pointing triangle/shield */}
                        <path d="M4 6L16 28L28 6H4Z" fill="url(#logoGradient)" />
                        {/* Lightning Bolt */}
                        <path d="M18 6L13 16H17L14 24L21 12H16L18 6Z" fill="#FFD740" stroke="#0A1929" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.5, fontSize: '1.25rem' }}>
                        <span style={{ color: '#448AFF' }}>SECURE</span>
                        <span style={{ color: '#00E5FF' }}>VISA</span>
                    </Typography>
                </Box>
                <IconButton onClick={toggleColorMode} color="inherit">
                    {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
            </Box>
            <List sx={{ mt: 2 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            onClick={() => navigate(item.path)}
                            selected={location.pathname === item.path}
                            sx={{
                                mx: 1,
                                borderRadius: 2,
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(108, 99, 255, 0.15)',
                                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                                    '&:hover': { backgroundColor: 'rgba(108, 99, 255, 0.25)' },
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                }
                            }}
                        >
                            <ListItemIcon sx={{ color: location.pathname === item.path ? theme.palette.primary.main : theme.palette.text.secondary }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontWeight: location.pathname === item.path ? 600 : 400,
                                    color: location.pathname === item.path ? 'text.primary' : 'text.secondary'
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ position: 'absolute', bottom: 20, left: 0, right: 0, px: 2, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                    v1.0.0 Alpha
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' }, position: 'absolute', top: 12, left: 12, zIndex: 1200 }}
            >
                <MenuIcon />
            </IconButton>

            <Box
                component="nav"
                sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, borderRight: '1px solid rgba(255,255,255,0.05)' },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, borderRight: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'transparent' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }, minHeight: '100vh' }}
            >
                {children}
            </Box>
        </Box>
    );
};
