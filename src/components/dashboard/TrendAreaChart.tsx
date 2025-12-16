import React from 'react';
import { Paper, Typography, Box, Chip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface TrendAreaChartProps {
    data: any[];
}

export const TrendAreaChart: React.FC<TrendAreaChartProps> = ({ data }) => {
    const theme = useTheme();

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    height: 380, // Slightly taller for breathing room
                    borderRadius: 4,
                    border: `1px solid ${theme.palette.divider}`,
                    background: theme.palette.background.paper,
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '-0.01em' }}>Detection Analytics</Typography>
                        <Typography variant="body2" color="text.secondary">Volume vs. Trends</Typography>
                    </Box>
                    <Chip
                        label="Last 30 Days"
                        size="small"
                        sx={{
                            borderRadius: 2,
                            bgcolor: theme.palette.action.selected,
                            fontWeight: 600,
                            color: theme.palette.text.primary
                        }}
                    />
                </Box>
                <ResponsiveContainer width="100%" height="80%">
                    <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                        <XAxis
                            dataKey="name"
                            stroke={theme.palette.text.secondary}
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke={theme.palette.text.secondary}
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
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
                        <Bar dataKey="count" name="New Findings" barSize={20} fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} />
                        <Line type="monotone" dataKey="count" name="Trend" stroke={theme.palette.secondary.main} strokeWidth={3} dot={{ r: 4, fill: theme.palette.background.paper, strokeWidth: 2 }} />
                    </ComposedChart>
                </ResponsiveContainer>
            </Paper>
        </motion.div>
    );
};
