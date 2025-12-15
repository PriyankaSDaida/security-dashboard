import React, { useMemo } from 'react';
import { Grid, Paper, Typography, Box, CircularProgress, Card, CardContent } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, AreaChart, Area } from 'recharts';
import { useData } from '../contexts/DataContext';


const COLORS = {
    Critical: '#FF4C4C',
    High: '#FFB74D',
    Medium: '#FFEB3B',
    Low: '#00C853',
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <Paper sx={{ p: 1.5, backgroundColor: 'rgba(20, 26, 41, 0.9)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{label}</Typography>
                <Typography variant="body2" color="primary.light">
                    {`${payload[0].name}: ${payload[0].value.toLocaleString()}`}
                </Typography>
            </Paper>
        );
    }
    return null;
};

export const Dashboard: React.FC = () => {
    const { data, loading } = useData();

    const stats = useMemo(() => {
        if (loading) return null;

        // Severity Distribution
        const severityCount: Record<string, number> = { Critical: 0, High: 0, Medium: 0, Low: 0 };
        // Risk Factors
        const riskCount: Record<string, number> = {};
        // Trend (Mock - Group by Month/Year or just random bins for demo since date parsing is expensive on 1M items potentially)
        // Actually for 50k it's fine.

        data.forEach(item => {
            if (item.severity in severityCount) severityCount[item.severity]++;

            item.riskFactors?.forEach(risk => {
                riskCount[risk] = (riskCount[risk] || 0) + 1;
            });
        });

        const severityData = Object.entries(severityCount).map(([name, value]) => ({ name, value }));
        const riskData = Object.entries(riskCount)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5); // Top 5

        // Mock Trend Data (Since date distribution is random in mock)
        const trendData = [
            { name: 'Jan', count: Math.floor(data.length * 0.1) },
            { name: 'Feb', count: Math.floor(data.length * 0.15) },
            { name: 'Mar', count: Math.floor(data.length * 0.12) },
            { name: 'Apr', count: Math.floor(data.length * 0.2) },
            { name: 'May', count: Math.floor(data.length * 0.18) },
            { name: 'Jun', count: Math.floor(data.length * 0.25) },
        ];

        return { severityData, riskData, trendData, total: data.length };
    }, [data, loading]);

    if (loading || !stats) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress size={60} thickness={4} />
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>Dashboard Overview</Typography>

            {/* KPI Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card sx={{ background: 'linear-gradient(135deg, #6C63FF 0%, #4B44CC 100%)', color: 'white' }}>
                        <CardContent>
                            <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>Total Vulnerabilities</Typography>
                            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{stats.total.toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card sx={{ background: 'linear-gradient(135deg, #FF4C4C 0%, #D32F2F 100%)', color: 'white' }}>
                        <CardContent>
                            <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>Critical Issues</Typography>
                            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                                {stats.severityData.find(d => d.name === 'Critical')?.value.toLocaleString() || 0}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Add more KPIs if needed */}
            </Grid>

            {/* Charts */}
            <Grid container spacing={3}>
                {/* Severity Pie Chart */}
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                    <Paper sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Severity Distribution</Typography>
                        <ResponsiveContainer width="100%" height="90%">
                            <PieChart>
                                <Pie
                                    data={stats.severityData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {stats.severityData.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#888'} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Risk Factors Bar Chart */}
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                    <Paper sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Top Risk Factors</Typography>
                        <ResponsiveContainer width="100%" height="90%">
                            <BarChart data={stats.riskData} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12, fill: '#aaa' }} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                                <Bar dataKey="value" fill="#00E5FF" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Trend Area Chart */}
                <Grid size={{ xs: 12, md: 12, lg: 4 }}>
                    <Paper sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Vulnerability Trends (6 Mo)</Typography>
                        <ResponsiveContainer width="100%" height="90%">
                            <AreaChart data={stats.trendData}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8F88FF" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8F88FF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#555" />
                                <YAxis stroke="#555" />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="count" stroke="#6C63FF" fillOpacity={1} fill="url(#colorCount)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
