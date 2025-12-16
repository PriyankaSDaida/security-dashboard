import React from 'react';
import { Paper, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { CHART_COLORS } from '../../utils/constants';

interface TopRiskFactorsChartProps {
    data: any[];
}

export const TopRiskFactorsChart: React.FC<TopRiskFactorsChartProps> = ({ data }) => {
    const theme = useTheme();

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
            <Paper elevation={0} sx={{ p: 4, height: 400, borderRadius: 4, border: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="h6" sx={{ mb: 4, fontWeight: 700 }}>Top Risk Factors</Typography>
                <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor={CHART_COLORS.Low} stopOpacity={0.6} />
                                <stop offset="100%" stopColor={CHART_COLORS.Low} stopOpacity={1} />
                            </linearGradient>
                        </defs>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11, fill: theme.palette.text.secondary }} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{ fill: theme.palette.action.hover }} />
                        <Bar dataKey="value" fill="url(#barGradient)" radius={[0, 6, 6, 0]} barSize={24} animationDuration={1500} />
                    </BarChart>
                </ResponsiveContainer>
            </Paper>
        </motion.div>
    );
};
