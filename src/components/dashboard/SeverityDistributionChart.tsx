import React from 'react';
import { Paper, Typography, useTheme, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { CHART_COLORS } from '../../utils/constants';

interface SeverityDistributionChartProps {
    data: any[];
}

export const SeverityDistributionChart: React.FC<SeverityDistributionChartProps> = ({ data }) => {
    const theme = useTheme();

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    height: 380, // Match trend chart height
                    borderRadius: 4,
                    border: `1px solid ${theme.palette.divider}`,
                    background: theme.palette.background.paper,
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '-0.01em' }}>Severity Distribution</Typography>
                </Box>

                <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={theme.palette.divider} />
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="name"
                            type="category"
                            stroke={theme.palette.text.primary}
                            fontSize={13}
                            fontWeight={600}
                            tickLine={false}
                            axisLine={false}
                            width={70}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: 4,
                                border: `1px solid ${theme.palette.divider}`,
                                boxShadow: theme.shadows[4]
                            }}
                            cursor={{ fill: theme.palette.action.hover }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={CHART_COLORS[entry.name as keyof typeof CHART_COLORS] || theme.palette.grey[500]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Paper>
        </motion.div>
    );
};
