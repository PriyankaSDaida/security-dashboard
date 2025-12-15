import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme, IconButton } from '@mui/material';
import { Dashboard as DashboardIcon, BugReport, CompareArrows, Settings, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 240;

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
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
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <img src="/vite.svg" alt="Logo" width={30} height={30} />
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
                    SECURE<span style={{ color: theme.palette.secondary.main }}>VISA</span>
                </Typography>
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
