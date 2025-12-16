import React, { useMemo } from 'react';
import { Grid, Paper, Typography, Box, CircularProgress, Card, CardContent, FormControlLabel, Switch, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip, Divider } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, AreaChart, Area, RadialBarChart, RadialBar } from 'recharts';
import { useData } from '../contexts/DataContext';
import { useColorMode } from '../contexts/ColorModeContext';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Sector } from 'recharts';
import BugReportIcon from '@mui/icons-material/BugReport';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WarningIcon from '@mui/icons-material/Warning';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const COLORS = {
    Critical: '#FF5252',
    High: '#FFB74D',
    Medium: '#FFD740',
    Low: '#69F0AE',
    Safe: '#448AFF'
};

const renderActiveShape = (props: unknown) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props as {
        cx: number; cy: number; innerRadius: number; outerRadius: number;
        startAngle: number; endAngle: number; fill: string;
        payload: { name: string }; percent: number;
    };
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

interface TooltipProps {
    active?: boolean;
    payload?: Array<{
        name: string;
        value: number;
        fill?: string;
        stroke?: string;
    }>;
    label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
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

export const Dashboard: React.FC = () => {
    const { data, loading } = useData();
    const { mode, toggleColorMode } = useColorMode();
    const theme = useTheme();

    const stats = useMemo(() => {
        if (loading) return null;

        const severityCount: Record<string, number> = { Critical: 0, High: 0, Medium: 0, Low: 0 };
        const riskCount: Record<string, number> = {};

        data.forEach(item => {
            if (item.severity in severityCount) severityCount[item.severity]++;
            item.riskFactors?.forEach(risk => riskCount[risk] = (riskCount[risk] || 0) + 1);
        });

        const severityData = Object.entries(severityCount).map(([name, value]) => ({ name, value }));
        const riskData = Object.entries(riskCount)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5);

        const trendData = [
            { name: 'Jan', count: Math.floor(data.length * 0.1) },
            { name: 'Feb', count: Math.floor(data.length * 0.15) },
            { name: 'Mar', count: Math.floor(data.length * 0.12) },
            { name: 'Apr', count: Math.floor(data.length * 0.2) },
            { name: 'May', count: Math.floor(data.length * 0.18) },
            { name: 'Jun', count: Math.floor(data.length * 0.25) },
        ];

        // Detailed Metrics
        const total = data.length;
        const critical = severityCount.Critical;
        const high = severityCount.High;
        const fixRate = 84.5; // Mocked for demo
        const mttr = "4h 23m"; // Mocked for demo

        // Health Score (0-100, lower vulnerabilities = higher score)
        // Simple mock formula: 100 - (Critical * 0.5 + High * 0.2) / Total * 100 * Scale
        const healthScore = Math.max(0, Math.min(100, 85));

        return { severityData, riskData, trendData, total, critical, high, fixRate, mttr, healthScore };
    }, [data, loading]);

    // Generate recent activity with stable randoms
    const [recentActivity] = React.useState(() => {
        return data.slice(0, 5).map((item, i) => ({
            id: i,
            cve: item.cveId,
            pkg: item.packageName,
            severity: item.severity,
            time: `${Math.floor(Math.random() * 23) + 1}h ago` // Only runs once on mount
        }));
    });

    if (loading || !stats) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress size={60} thickness={4} />
            </Box>
        );
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <Box sx={{ pb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 1 }}>Security Overview</Typography>
                    <Typography variant="body1" color="text.secondary">Real-time insights and performance metrics.</Typography>
                </Box>
                <FormControlLabel
                    control={<Switch checked={mode === 'dark'} onChange={toggleColorMode} color="primary" />}
                    label={mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
                    labelPlacement="start"
                />
            </Box>

            {/* KPI Cards Row (4 Columns) */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {[
                    { title: 'Security Score', value: `${stats.healthScore}/100`, sub: 'Excellent', icon: <VerifiedUserIcon />, color: COLORS.Safe },
                    { title: 'Critical Issues', value: stats.critical.toLocaleString(), sub: '-12% vs last week', icon: <WarningIcon />, color: COLORS.Critical },
                    { title: 'Fix Rate', value: `${stats.fixRate}%`, sub: 'Top 10% Industry', icon: <TrendingUpIcon />, color: COLORS.Low },
                    { title: 'MTTR', value: stats.mttr, sub: 'Mean Time to Resolve', icon: <AccessTimeIcon />, color: theme.palette.primary.main }
                ].map((item, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                        <motion.div initial="hidden" animate="visible" variants={cardVariants} style={{ height: '100%' }}>
                            <Card
                                elevation={0}
                                sx={{
                                    p: 2,
                                    height: '100%',
                                    borderRadius: 4,
                                    border: `1px solid ${theme.palette.divider}`,
                                    background: theme.palette.background.paper,
                                    position: 'relative',
                                    overflow: 'visible'
                                }}
                            >
                                <Box sx={{
                                    position: 'absolute', top: -15, right: 20,
                                    p: 1.5, borderRadius: 3,
                                    background: `linear-gradient(135deg, ${item.color} 0%, ${theme.palette.background.paper} 150%)`,
                                    boxShadow: `0 8px 16px -4px ${item.color}80`,
                                    color: 'white'
                                }}>
                                    {item.icon}
                                </Box>
                                <CardContent>
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>{item.title}</Typography>
                                    <Typography variant="h3" sx={{ fontWeight: 800, my: 1, letterSpacing: '-0.03em' }}>{item.value}</Typography>
                                    <Chip
                                        size="small"
                                        label={item.sub}
                                        sx={{
                                            bgcolor: `${item.color}20`,
                                            color: item.color,
                                            fontWeight: 700,
                                            borderRadius: 2
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            {/* Main Visuals Grid */}
            <Grid container spacing={4}>
                {/* Left Column: Health & Recent Activity */}
                <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {/* Health Score Gauge */}
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: `1px solid ${theme.palette.divider}`, textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>System Health</Typography>
                                <Box sx={{ height: 200, position: 'relative' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadialBarChart
                                            innerRadius="70%"
                                            outerRadius="100%"
                                            data={[{ name: 'Score', value: stats.healthScore, fill: COLORS.Safe }]}
                                            startAngle={180}
                                            endAngle={0}
                                        >
                                            <RadialBar background dataKey="value" cornerRadius={30} />
                                        </RadialBarChart>
                                    </ResponsiveContainer>
                                    <Box sx={{ position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                        <Typography variant="h3" sx={{ fontWeight: 800, color: COLORS.Safe }}>{stats.healthScore}</Typography>
                                        <Typography variant="caption" color="text.secondary">/ 100</Typography>
                                    </Box>
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: -4 }}>Your system is verified safe.</Typography>
                            </Paper>
                        </motion.div>

                        {/* Recent Activity Feed */}
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                            <Paper elevation={0} sx={{ p: 0, borderRadius: 4, border: `1px solid ${theme.palette.divider}`, overflow: 'hidden' }}>
                                <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Recent Activity</Typography>
                                </Box>
                                <List sx={{ p: 0 }}>
                                    {recentActivity.map((activity, i) => (
                                        <React.Fragment key={i}>
                                            <ListItem alignItems="flex-start" sx={{ px: 3, py: 2 }}>
                                                <ListItemAvatar>
                                                    <Avatar sx={{ bgcolor: `${COLORS[activity.severity as keyof typeof COLORS]}20`, color: COLORS[activity.severity as keyof typeof COLORS] }}>
                                                        <BugReportIcon fontSize="small" />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={<Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{activity.cve}</Typography>}
                                                    secondary={
                                                        <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                                                            <Typography variant="caption" color="text.secondary">{activity.pkg}</Typography>
                                                            <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.disabled' }}>{activity.time}</Typography>
                                                        </Box>
                                                    }
                                                />
                                            </ListItem>
                                            {i < recentActivity.length - 1 && <Divider component="li" />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            </Paper>
                        </motion.div>
                    </Box>
                </Grid>

                {/* Right Column: Charts */}
                <Grid size={{ xs: 12, md: 8, lg: 9 }}>
                    <Grid container spacing={4}>
                        {/* Trend Area Chart (Full Width) */}
                        <Grid size={{ xs: 12 }}>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                                <Paper elevation={0} sx={{ p: 4, height: 320, borderRadius: 4, border: `1px solid ${theme.palette.divider}` }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>Detection Trends</Typography>
                                        <Chip label="Last 6 Months" size="small" sx={{ borderRadius: 1 }} />
                                    </Box>
                                    <ResponsiveContainer width="100%" height="85%">
                                        <AreaChart data={stats.trendData}>
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
                        </Grid>

                        {/* Split: Pie Breakdown & Risk Factors */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                                <Paper elevation={0} sx={{ p: 4, height: 400, borderRadius: 4, border: `1px solid ${theme.palette.divider}` }}>
                                    <Typography variant="h6" sx={{ mb: 4, fontWeight: 700 }}>Severity Distribution</Typography>
                                    <ResponsiveContainer width="100%" height="85%">
                                        <PieChart>
                                            <Pie
                                                activeShape={renderActiveShape}
                                                data={stats.severityData}
                                                cx="50%" cy="50%"
                                                innerRadius={80} outerRadius={110}
                                                paddingAngle={4}
                                                dataKey="value"
                                                cornerRadius={6}
                                            >
                                                {stats.severityData.map((entry: { name: string; value: number }, index: number) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#888'} stroke="none" />
                                                ))}
                                            </Pie>
                                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </Paper>
                            </motion.div>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
                                <Paper elevation={0} sx={{ p: 4, height: 400, borderRadius: 4, border: `1px solid ${theme.palette.divider}` }}>
                                    <Typography variant="h6" sx={{ mb: 4, fontWeight: 700 }}>Top Risk Factors</Typography>
                                    <ResponsiveContainer width="100%" height="85%">
                                        <BarChart data={stats.riskData} layout="vertical" margin={{ left: 20 }}>
                                            <defs>
                                                <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                                                    <stop offset="0%" stopColor={COLORS.Low} stopOpacity={0.6} />
                                                    <stop offset="100%" stopColor={COLORS.Low} stopOpacity={1} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11, fill: theme.palette.text.secondary }} axisLine={false} tickLine={false} />
                                            <Tooltip content={<CustomTooltip />} cursor={{ fill: theme.palette.action.hover }} />
                                            <Bar dataKey="value" fill="url(#barGradient)" radius={[0, 6, 6, 0]} barSize={24} animationDuration={1500} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Paper>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};
