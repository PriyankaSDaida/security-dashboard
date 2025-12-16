import React from 'react';
import { Paper, Typography, Box, Button, TextField, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface IntegrationCardProps {
    name: string;
    icon: React.ReactNode;
    status: 'connected' | 'disconnected' | 'error';
    apiKey?: string;
    onConnect?: () => void;
    onDisconnect?: () => void;
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({ name, icon, status, onConnect, onDisconnect }) => {
    const theme = useTheme();
    const isConnected = status === 'connected';

    return (
        <Paper
            variant="outlined"
            sx={{
                p: 3,
                mb: 2,
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: theme.palette.background.paper, boxShadow: 1 }}>
                        {icon}
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" fontWeight={700}>{name}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            {isConnected ? (
                                <CheckCircleIcon sx={{ fontSize: 14, color: theme.palette.success.main }} />
                            ) : (
                                <ErrorOutlineIcon sx={{ fontSize: 14, color: theme.palette.text.disabled }} />
                            )}
                            <Typography variant="caption" color={isConnected ? 'success.main' : 'text.disabled'} fontWeight={500}>
                                {isConnected ? 'Active' : 'Not Connected'}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Button
                    variant={isConnected ? "outlined" : "contained"}
                    color={isConnected ? "error" : "primary"}
                    size="small"
                    onClick={isConnected ? onDisconnect : onConnect}
                >
                    {isConnected ? 'Disconnect' : 'Connect'}
                </Button>
            </Box>

            {isConnected && (
                <TextField
                    label="API Key"
                    type="password"
                    defaultValue="sk_test_********************"
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                    sx={{ mt: 1 }}
                />
            )}
        </Paper>
    );
};
