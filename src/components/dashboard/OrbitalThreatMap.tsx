import React, { useState } from 'react';
import { Paper, Box, Typography, ButtonGroup, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const OrbitalThreatMap: React.FC = () => {
    const theme = useTheme();
    const [filter, setFilter] = useState('ALL');

    const regions = ['ALL', 'NA', 'APAC', 'EMEA'];

    // Mock nodes for visual effect
    const nodes = [
        { cx: 300, cy: 150, r: 4, fill: theme.palette.text.secondary },
        { cx: 250, cy: 180, r: 6, fill: theme.palette.primary.main },
        { cx: 350, cy: 200, r: 5, fill: theme.palette.text.secondary },
        { cx: 200, cy: 220, r: 4, fill: theme.palette.error.main },
        { cx: 400, cy: 210, r: 6, fill: theme.palette.text.secondary },
        { cx: 150, cy: 250, r: 5, fill: theme.palette.text.secondary },
        { cx: 450, cy: 240, r: 4, fill: theme.palette.primary.main },
        { cx: 100, cy: 280, r: 6, fill: theme.palette.text.secondary },
        { cx: 500, cy: 270, r: 5, fill: theme.palette.text.secondary },
        { cx: 300, cy: 220, r: 3, fill: theme.palette.info.main },
        { cx: 280, cy: 280, r: 4, fill: theme.palette.text.secondary },
        { cx: 320, cy: 260, r: 4, fill: theme.palette.text.secondary },
    ];

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    height: 400,
                    borderRadius: 6,
                    border: 'none',
                    background: '#F0F4FF', // Light blue-ish background from image
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Header Section */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#00E5FF' }} />
                        <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: '0.1em', color: theme.palette.text.secondary }}>
                            SYSTEM OPERATIONAL
                        </Typography>
                    </Box>
                    <Box sx={{
                        bgcolor: '#E0F7FA',
                        color: '#006064',
                        px: 2,
                        py: 0.5,
                        borderRadius: 4,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        boxShadow: '0 2px 8px rgba(0,229,255,0.15)'
                    }}>
                        <Typography variant="caption" sx={{ fontWeight: 700 }}>⚡ LEVEL 3 DEFENSE ACTIVE</Typography>
                    </Box>
                </Box>

                {/* Filter Pill */}
                <Box sx={{ position: 'absolute', top: 24, right: 24, zIndex: 2, mt: 6 }}>
                    <ButtonGroup variant="contained" size="small" sx={{ bgcolor: '#9E9E9E', borderRadius: 4, p: 0.5, boxShadow: 'none' }}>
                        {regions.map((region) => (
                            <Button
                                key={region}
                                onClick={() => setFilter(region)}
                                sx={{
                                    borderRadius: 4,
                                    fontSize: '0.65rem',
                                    fontWeight: 700,
                                    minWidth: 48,
                                    py: 0.2,
                                    bgcolor: filter === region ? '#2979FF' : 'transparent',
                                    color: filter === region ? '#fff' : '#424242',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        bgcolor: filter === region ? '#2962FF' : 'rgba(0,0,0,0.05)',
                                        boxShadow: 'none'
                                    }
                                }}
                            >
                                {region}
                            </Button>
                        ))}
                    </ButtonGroup>
                </Box>

                {/* Orbital Visualization */}
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', position: 'relative', mb: -4 }}>
                    <svg width="100%" height="300" viewBox="0 0 600 300" style={{ overflow: 'visible' }}>
                        <defs>
                            <linearGradient id="arcGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#C5CAE9" stopOpacity={0.6} />
                                <stop offset="100%" stopColor="#C5CAE9" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>

                        {/* Outer Arc */}
                        <path d="M 50 300 A 250 250 0 0 1 550 300" fill="none" stroke="#E8EAF6" strokeWidth="60" />

                        {/* Main Gradient Arc */}
                        <path d="M 100 300 A 200 200 0 0 1 500 300" fill="none" stroke="url(#arcGradient)" strokeWidth="80" strokeLinecap="round" />

                        {/* Inner Arc */}
                        <path d="M 180 300 A 120 120 0 0 1 420 300" fill="none" stroke="#E8EAF6" strokeWidth="2" strokeDasharray="4 4" />

                        {/* Central Active Lines */}
                        <motion.line
                            x1="300" y1="200" x2="250" y2="150"
                            stroke="#00E5FF" strokeWidth="2"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                        />
                        <motion.line
                            x1="300" y1="200" x2="380" y2="160"
                            stroke="#00E5FF" strokeWidth="2"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                        />
                        <motion.line
                            x1="300" y1="200" x2="300" y2="280"
                            stroke="#00E5FF" strokeWidth="2"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
                        />

                        {/* Nodes */}
                        {nodes.map((node, i) => (
                            <motion.circle
                                key={i}
                                cx={node.cx}
                                cy={node.cy}
                                r={node.r}
                                fill={node.fill}
                                initial={{ scale: 0 }}
                                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: Math.random() * 2 }}
                            />
                        ))}
                    </svg>
                </Box>
            </Paper>
        </motion.div>
    );
};

export default OrbitalThreatMap;
