import React from 'react';
import { Paper, Typography, Box, Divider, useTheme } from '@mui/material';

interface SettingsSectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({ title, description, children }) => {
    const theme = useTheme();

    return (
        <Paper
            elevation={0}
            sx={{
                p: 4,
                mb: 3,
                borderRadius: 4,
                border: `1px solid ${theme.palette.divider}`,
                background: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.4)' : '#fff',
                backdropFilter: 'blur(10px)'
            }}
        >
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight={700}>{title}</Typography>
                {description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {description}
                    </Typography>
                )}
            </Box>
            <Divider sx={{ mb: 3 }} />
            {children}
        </Paper>
    );
};
