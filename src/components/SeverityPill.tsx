import React from 'react';
import { Chip, useTheme } from '@mui/material';

export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';

interface SeverityPillProps {
    severity: Severity | string;
}

export const SeverityPill: React.FC<SeverityPillProps> = ({ severity }) => {
    const theme = useTheme();

    const color = severity === 'Critical' ? theme.palette.error.main :
        severity === 'High' ? theme.palette.warning.main :
            severity === 'Medium' ? theme.palette.info.main : theme.palette.success.main;

    return (
        <Chip
            label={severity}
            size="small"
            sx={{
                backgroundColor: `${color}15`,
                color: color,
                fontWeight: 700,
                border: `1px solid ${color}40`,
                borderRadius: '6px',
                boxShadow: `0 0 8px ${color}40`,
                minWidth: 80
            }}
        />
    );
};
