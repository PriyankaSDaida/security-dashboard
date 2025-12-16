import React from 'react';
import { Paper, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Sector } from 'recharts';
import { CHART_COLORS } from '../../utils/constants';

interface SeverityDistributionChartProps {
    data: any[];
}

const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;

    return (
        <g>
            <text x={cx} y={cy} dy={-10} textAnchor="middle" fill="#fff" fontWeight="bold" fontSize={14}>
                {payload.name}
            </text>
            <text x={cx} y={cy} dy={15} textAnchor="middle" fill="#999" fontSize={12}>
                {`${(percent * 100).toFixed(0)}%`}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 8}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 10}
                outerRadius={outerRadius + 14}
                fill={fill}
                fillOpacity={0.3}
            />
        </g>
    );
};

export const SeverityDistributionChart: React.FC<SeverityDistributionChartProps> = ({ data }) => {
    const theme = useTheme();

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <Paper elevation={0} sx={{ p: 4, height: 400, borderRadius: 4, border: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="h6" sx={{ mb: 4, fontWeight: 700 }}>Severity Distribution</Typography>
                <ResponsiveContainer width="100%" height="85%">
                    <PieChart>
                        <Pie
                            activeShape={renderActiveShape}
                            data={data}
                            cx="50%" cy="50%"
                            innerRadius={80} outerRadius={110}
                            paddingAngle={4}
                            dataKey="value"
                            cornerRadius={6}
                        >
                            {data.map((entry: { name: string; value: number }, index: number) => (
                                <Cell key={`cell-${index}`} fill={CHART_COLORS[entry.name as keyof typeof CHART_COLORS] || '#888'} stroke="none" />
                            ))}
                        </Pie>
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </Paper>
        </motion.div>
    );
};
