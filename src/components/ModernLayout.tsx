import React from 'react';
import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme, Avatar, Tooltip as MuiTooltip } from '@mui/material';
import { Dashboard as DashboardIcon, BugReport, CompareArrows, Settings, MenuOpen, Search, Notifications, Brightness4, Brightness7 } from '@mui/icons-material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useColorMode } from '../contexts/ColorModeContext';
import { motion } from 'framer-motion';

const SIDEBAR_WIDTH = 260;
const COLLAPSED_WIDTH = 80;

interface ModernLayoutProps {
    children?: React.ReactNode;
}

export const ModernLayout: React.FC<ModernLayoutProps> = ({ children }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { mode, toggleColorMode } = useColorMode();
    const [collapsed, setCollapsed] = React.useState(false);

    const menuItems = [
        { text: 'Overview', icon: <DashboardIcon />, path: '/' },
        { text: 'Vulnerabilities', icon: <BugReport />, path: '/vulnerabilities' },
        { text: 'Compare', icon: <CompareArrows />, path: '/compare' },
        { text: 'Settings', icon: <Settings />, path: '/settings' },
    ];

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: theme.palette.background.default }}>
            {/* Glassmorphic Sidebar */}
            <motion.div
                initial={{ width: SIDEBAR_WIDTH }}
                animate={{ width: collapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    zIndex: 1200,
                    backgroundColor: mode === 'dark' ? 'rgba(10, 25, 41, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)',
                    borderRight: `1px solid ${theme.palette.divider}`,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Logo Section */}
                <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, height: 80 }}>
                    <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ minWidth: 40 }}>
                        <defs>
                            <linearGradient id="logoGradient2" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#00E5FF" />
                                <stop offset="100%" stopColor="#651FFF" />
                            </linearGradient>
                        </defs>
                        <path d="M4 6L16 28L28 6H4Z" fill="url(#logoGradient2)" />
                        <path d="M18 6L13 16H17L14 24L21 12H16L18 6Z" fill="#FFD740" stroke="#0A1929" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    {!collapsed && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.5, fontSize: '1.25rem', lineHeight: 1 }}>
                                <span style={{ color: '#448AFF' }}>SECURE</span>
                                <span style={{ color: '#00E5FF' }}>VISA</span>
                            </Typography>
                        </motion.div>
                    )}
                </Box>

                {/* Navigation */}
                <List sx={{ px: 2, mt: 2, flexGrow: 1 }}>
                    {menuItems.map((item) => {
                        const active = location.pathname === item.path;
                        return (
                            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                                <MuiTooltip title={collapsed ? item.text : ''} placement="right">
                                    <ListItemButton
                                        onClick={() => navigate(item.path)}
                                        sx={{
                                            height: 48,
                                            borderRadius: 3,
                                            justifyContent: collapsed ? 'center' : 'initial',
                                            bgcolor: active ? (mode === 'dark' ? 'rgba(68, 138, 255, 0.15)' : 'rgba(68, 138, 255, 0.1)') : 'transparent',
                                            color: active ? '#448AFF' : 'text.secondary',
                                            '&:hover': {
                                                bgcolor: active ? (mode === 'dark' ? 'rgba(68, 138, 255, 0.25)' : 'rgba(68, 138, 255, 0.2)') : 'action.hover',
                                            }
                                        }}
                                    >
                                        <ListItemIcon sx={{
                                            minWidth: 0,
                                            mr: collapsed ? 0 : 2,
                                            justifyContent: 'center',
                                            color: 'inherit'
                                        }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        {!collapsed && (
                                            <ListItemText
                                                primary={item.text}
                                                primaryTypographyProps={{ fontWeight: active ? 700 : 500 }}
                                            />
                                        )}
                                        {active && !collapsed && (
                                            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#448AFF', ml: 1 }} />
                                        )}
                                    </ListItemButton>
                                </MuiTooltip>
                            </ListItem>
                        );
                    })}
                </List>

                {/* Bottom Actions */}
                <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                    <ListItemButton onClick={() => setCollapsed(!collapsed)} sx={{ borderRadius: 3, mb: 1, justifyContent: collapsed ? 'center' : 'initial' }}>
                        <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 2 }}><MenuOpen /></ListItemIcon>
                        {!collapsed && <ListItemText primary="Collapse" />}
                    </ListItemButton>
                </Box>
            </motion.div>

            {/* Main Content Area */}
            <Box sx={{
                flexGrow: 1,
                ml: `${collapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH}px`,
                transition: 'margin-left 0.3s ease-in-out',
                width: `calc(100% - ${collapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH}px)`
            }}>
                {/* Minimal Header */}
                <Box sx={{
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 4,
                    position: 'sticky',
                    top: 0,
                    zIndex: 1100,
                    bgcolor: theme.palette.background.default, // Opaque to hide content scrolling under
                    borderBottom: `1px solid ${theme.palette.divider}`
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'text.secondary' }}>
                        <Search />
                        <Typography>Type to search...</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton onClick={toggleColorMode} color="inherit">
                            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                        </IconButton>
                        <IconButton color="inherit">
                            <Notifications />
                        </IconButton>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 32, height: 32 }}>PS</Avatar>
                    </Box>
                </Box>

                {/* Page Content */}
                <Box sx={{ p: 4, width: '100%', mx: 'auto' }}>
                    {children || <Outlet />}
                </Box>
            </Box>
        </Box>
    );
};
