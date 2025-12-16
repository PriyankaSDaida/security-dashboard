import React from 'react';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import { CHART_COLORS } from '../../utils/constants';

interface HealthGaugeProps {
    score: number;
}

export const HealthGauge: React.FC<HealthGaugeProps> = ({ score }) => {
    const theme = useTheme();

    return (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: `1px solid ${theme.palette.divider}`, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>System Health</Typography>
                <Box sx={{ height: 200, position: 'relative' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                            innerRadius="70%"
                            outerRadius="100%"
                            data={[{ name: 'Score', value: score, fill: CHART_COLORS.Safe }]}
                            startAngle={180}
                            endAngle={0}
                        >
                            <RadialBar background dataKey="value" cornerRadius={30} />
                        </RadialBarChart>
                    </ResponsiveContainer>
                    <Box sx={{ position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                        <Typography variant="h3" sx={{ fontWeight: 800, color: CHART_COLORS.Safe }}>{score}</Typography>
                        <Typography variant="caption" color="text.secondary">/ 100</Typography>
                    </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: -4 }}>Your system is verified safe.</Typography>
            </Paper>
        </motion.div>
    );
};
