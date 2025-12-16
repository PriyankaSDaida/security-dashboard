import React from 'react';
import { Paper, Typography, Box, Chip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

// A reusable custom tooltip could also be extracted if used in multiple places
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <Paper
                elevation={6}
                sx={{
                    p: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    color: 'text.primary'
                }}
            >
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{label}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 1 }}>
                    <Box sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '4px',
                        bgcolor: payload[0].fill || payload[0].stroke,
                        boxShadow: `0 0 10px ${payload[0].fill || payload[0].stroke}`
                    }} />
                    <Typography variant="body2" color="text.secondary">
                        {`${payload[0].name}:`}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {payload[0].value.toLocaleString()}
                    </Typography>
                </Box>
            </Paper>
        );
    }
    return null;
};

interface TrendAreaChartProps {
    data: any[];
}

export const TrendAreaChart: React.FC<TrendAreaChartProps> = ({ data }) => {
    const theme = useTheme();

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <Paper elevation={0} sx={{ p: 4, height: 320, borderRadius: 4, border: `1px solid ${theme.palette.divider}` }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Detection Trends</Typography>
                    <Chip label="Last 6 Months" size="small" sx={{ borderRadius: 1 }} />
                </Box>
                <ResponsiveContainer width="100%" height="85%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke={theme.palette.text.disabled} fontSize={12} tickLine={false} axisLine={false} dy={10} />
                        <YAxis hide />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="count" stroke={theme.palette.primary.main} strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" animationDuration={2000} />
                    </AreaChart>
                </ResponsiveContainer>
            </Paper>
        </motion.div>
    );
};
