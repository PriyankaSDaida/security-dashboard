import React from 'react';
import { Box, Typography, Switch } from '@mui/material';

interface ToggleSettingProps {
    label: string;
    description?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    color?: 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info';
}

export const ToggleSetting: React.FC<ToggleSettingProps> = ({ label, description, checked, onChange, color = 'primary' }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ mr: 2 }}>
                <Typography variant="subtitle2" fontWeight={600}>{label}</Typography>
                {description && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5, lineHeight: 1.3 }}>
                        {description}
                    </Typography>
                )}
            </Box>
            <Switch
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                color={color}
            />
        </Box>
    );
};
