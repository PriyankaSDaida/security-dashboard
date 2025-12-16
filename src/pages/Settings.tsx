import React from 'react';
import { Box, Typography, Paper, FormControlLabel, Switch, Divider } from '@mui/material';
import { useColorMode } from '../contexts/ColorModeContext';

export const Settings: React.FC = () => {
    const { mode, toggleColorMode } = useColorMode();

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                Settings
            </Typography>

            <Paper sx={{ p: 4, maxWidth: 600 }}>
                <Typography variant="h6" gutterBottom>
                    Appearance
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Customize how the application looks and feels.
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant="subtitle1">Dark Mode</Typography>
                        <Typography variant="caption" color="text.secondary">
                            Switch between dark and light color themes
                        </Typography>
                    </Box>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={mode === 'dark'}
                                onChange={toggleColorMode}
                                color="primary"
                            />
                        }
                        label={mode === 'dark' ? 'On' : 'Off'}
                        labelPlacement="start"
                    />
                </Box>
            </Paper>

            <Paper sx={{ p: 4, mt: 3, maxWidth: 600, opacity: 0.5, pointerEvents: 'none' }}>
                <Typography variant="h6" gutterBottom>
                    Notifications (Coming Soon)
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary">
                    Configure your alert preferences and email notifications.
                </Typography>
            </Paper>
        </Box>
    );
};
