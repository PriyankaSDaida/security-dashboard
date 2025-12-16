import React from 'react';
import { Button } from '@mui/material';

interface FilterButtonProps {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
    color: string;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ active, onClick, icon, label, color }) => (
    <Button
        variant={active ? "contained" : "outlined"}
        onClick={onClick}
        startIcon={icon}
        sx={{
            borderColor: active ? color : 'rgba(255,255,255,0.2)',
            backgroundColor: active ? color : 'transparent',
            color: active ? '#fff' : 'text.primary',
            '&:hover': {
                backgroundColor: active ? color : `${color}22`,
                borderColor: color,
            },
            transition: 'all 0.2s',
            borderRadius: 2,
            px: 3,
            textTransform: 'none',
            fontWeight: 600
        }}
    >
        {label}
    </Button>
);
