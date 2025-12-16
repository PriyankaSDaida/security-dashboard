import React from 'react';
import { Grid, Paper, Typography, Box, Chip, List, ListItem, ListItemText, ListItemIcon, Button } from '@mui/material';
import { ResponsiveContainer, RadialBarChart, RadialBar, LineChart, Line, XAxis, Tooltip, AreaChart, Area, CartesianGrid, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import PublicIcon from '@mui/icons-material/Public';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import BoltIcon from '@mui/icons-material/Bolt';
import BugReportIcon from '@mui/icons-material/BugReport';

// --- Cyber Components ---

const BentoItem = ({ children, delay = 0, sx = {} }: any) => {
    const theme = useTheme();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay, type: 'spring', stiffness: 100 }}
            style={{ height: '100%' }}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
        >
            <Paper
                elevation={0}
                sx={{
                    height: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative',
                    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(68, 138, 255, 0.2)' : 'rgba(0,0,0,0.05)'}`,
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(10, 25, 41, 0.7) 0%, rgba(13, 30, 50, 0.4) 100%)'
                        : 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: theme.palette.mode === 'dark'
                        ? '0 0 20px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.05)'
                        : '0 10px 30px rgba(0,0,0,0.05)',
                    ...sx
                }}
            >
                {/* Cyber Corner Accents */}
                <Box sx={{ position: 'absolute', top: 0, left: 0, width: 20, height: 20, borderTop: '2px solid #448AFF', borderLeft: '2px solid #448AFF', borderTopLeftRadius: 12, opacity: 0.5 }} />
                <Box sx={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderBottom: '2px solid #00E5FF', borderRight: '2px solid #00E5FF', borderBottomRightRadius: 12, opacity: 0.5 }} />

                {children}
            </Paper>
        </motion.div>
    );
};

const NeonText = ({ variant = 'h4', children, color = '#fff' }: any) => (
    <Typography variant={variant} sx={{
        fontWeight: 800,
        color: color,
        textShadow: `0 0 20px ${color}80`,
        fontFamily: '"Rajdhani", "Roboto", sans-serif', // Assuming generic/available font if custom not loaded
        letterSpacing: 1
    }}>
        {children}
    </Typography>
);

// --- Filters & State ---

const FilterButton = ({ active, onClick, children }: any) => (
    <Button
        size="small"
        onClick={onClick}
        sx={{
            minWidth: 40,
            fontSize: '0.7rem',
            color: active ? '#fff' : 'text.secondary',
            bgcolor: active ? '#448AFF' : 'transparent',
            borderRadius: 2,
            px: 1,
            '&:hover': { bgcolor: active ? '#2979FF' : 'rgba(255,255,255,0.05)' }
        }}
    >
        {children}
    </Button>
);

const ThreatMap = ({ region }: { region: string }) => (
    <Box sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at center, rgba(68,138,255,0.08) 0%, transparent 70%)'
    }}>
        <PublicIcon sx={{ fontSize: 240, color: 'rgba(68,138,255,0.1)', filter: 'drop-shadow(0 0 20px rgba(68,138,255,0.2))' }} />

        {/* Animated Pings - Filtered by Region (Simulated) */}
        {[...Array(region === 'ALL' ? 8 : 3)].map((_, i) => (
            <motion.div
                key={i}
                style={{
                    position: 'absolute',
                    // Simulate region clusters if specific region selected
                    top: region === 'APAC' ? `${Math.random() * 30 + 50}%` : `${Math.random() * 60 + 20}%`,
                    left: region === 'APAC' ? `${Math.random() * 30 + 60}%` : `${Math.random() * 80 + 10}%`,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#00E5FF', // Unified Cyan
                    boxShadow: '0 0 10px #00E5FF'
                }}
                animate={{
                    scale: [1, 3, 1],
                    opacity: [0.8, 0, 0.8],
                    boxShadow: ['0 0 10px #00E5FF', '0 0 30px #00E5FF', '0 0 10px #00E5FF']
                }}
                transition={{ duration: 1.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
            />
        ))}

        <Box sx={{ position: 'absolute', bottom: 20, left: 20 }}>
            <NeonText variant="h6" color="#448AFF">{region} THREAT MONITOR</NeonText>
            <Typography variant="caption" sx={{ color: '#aaa', letterSpacing: 2 }}>LIVE INTEL FEED</Typography>
        </Box>
    </Box>
);

const SecurityRadar = () => {
    const data = [
        { subject: 'Network', A: 120, fullMark: 150 },
        { subject: 'App Sec', A: 98, fullMark: 150 },
        { subject: 'Cloud', A: 86, fullMark: 150 },
        { subject: 'Identity', A: 99, fullMark: 150 },
        { subject: 'Endpoint', A: 85, fullMark: 150 },
        { subject: 'Data', A: 65, fullMark: 150 },
    ];
    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10, fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="Coverage" dataKey="A" stroke="#00E5FF" strokeWidth={2} fill="#00E5FF" fillOpacity={0.3} />
                <Tooltip
                    contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid #448AFF', borderRadius: 8, color: '#fff' }}
                    itemStyle={{ color: '#00E5FF' }}
                />
            </RadarChart>
        </ResponsiveContainer>
    );
};

const AreaGradientChart = ({ timeRange }: { timeRange: string }) => {
    // Mock data changes based on timeRange
    const data = timeRange === '24H'
        ? [{ name: '00:00', uv: 2000 }, { name: '06:00', uv: 5000 }, { name: '12:00', uv: 4500 }, { name: '18:00', uv: 7000 }]
        : [{ name: 'Mon', uv: 4000 }, { name: 'Tue', uv: 3000 }, { name: 'Wed', uv: 5000 }, { name: 'Thu', uv: 2780 }, { name: 'Fri', uv: 1890 }, { name: 'Sat', uv: 2390 }, { name: 'Sun', uv: 3490 }];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#448AFF" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#448AFF" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <Tooltip
                    contentStyle={{ background: 'rgba(10, 25, 41, 0.95)', border: '1px solid #448AFF', borderRadius: 8 }}
                    itemStyle={{ color: '#448AFF', fontWeight: 'bold' }}
                    labelStyle={{ color: '#888' }}
                />
                <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#448AFF"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorUv)"
                    animationDuration={1500}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export const ExecutiveDashboard: React.FC = () => {
    const [region, setRegion] = React.useState('ALL');
    const [timeRange, setTimeRange] = React.useState('7D');

    return (
        <Box sx={{ p: { xs: 1, md: 0 } }}>
            {/* Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <Box>
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                        <NeonText variant="h3" color="#fff">SECUREVISA <span style={{ color: '#448AFF' }}>OPS</span></NeonText>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#00E5FF', boxShadow: '0 0 10px #00E5FF' }} />
                            <Typography variant="overline" sx={{ letterSpacing: 2, color: 'text.secondary', fontWeight: 700 }}>SYSTEM OPERATIONAL</Typography>
                        </Box>
                    </motion.div>
                </Box>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                    <Chip
                        icon={<BoltIcon sx={{ color: '#00E5FF !important' }} />}
                        label="LEVEL 3 DEFENSE ACTIVE"
                        sx={{
                            background: 'rgba(0, 229, 255, 0.1)',
                            color: '#00E5FF',
                            border: '1px solid rgba(0, 229, 255, 0.3)',
                            fontWeight: 800
                        }}
                    />
                </motion.div>
            </Box>

            {/* Bento Grid */}
            <Grid container spacing={3}>
                {/* 1. Large Map (Top Left) */}
                <Grid item xs={12} lg={8} sx={{ height: 400 }}>
                    <BentoItem delay={0.1}>
                        <Box sx={{ position: 'absolute', top: 20, right: 20, zIndex: 10, display: 'flex', gap: 1, p: 0.5, bgcolor: 'rgba(0,0,0,0.3)', borderRadius: 3 }}>
                            {['ALL', 'NA', 'APAC', 'EMEA'].map(r => (
                                <FilterButton key={r} active={region === r} onClick={() => setRegion(r)}>{r}</FilterButton>
                            ))}
                        </Box>
                        <ThreatMap region={region} />
                    </BentoItem>
                </Grid>

                {/* 2. Key Stats (Right Column) */}
                <Grid item xs={12} lg={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
                        {/* Risk Score */}
                        <Box sx={{ flex: 1 }}>
                            <BentoItem delay={0.2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3 }}>
                                <NeonText variant="h1" color="#00E5FF">94</NeonText>
                                <Typography variant="button" sx={{ letterSpacing: 2, color: 'text.secondary' }}>SECURITY SCORE</Typography>
                                <Box sx={{ width: '80%', height: 4, bgcolor: 'rgba(255,255,255,0.1)', mt: 2, borderRadius: 2 }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '94%' }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                        style={{ height: '100%', background: '#00E5FF', borderRadius: 2, boxShadow: '0 0 10px #00E5FF' }}
                                    />
                                </Box>
                            </BentoItem>
                        </Box>

                        {/* Critical Issues */}
                        <Box sx={{ flex: 1 }}>
                            <BentoItem delay={0.3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 4 }}>
                                <Box>
                                    <Typography variant="overline" sx={{ fontWeight: 800, color: '#448AFF' }}>ACTIVE ALERTS</Typography>
                                    <NeonText variant="h2" color="#fff">3</NeonText>
                                </Box>
                                <BugReportIcon sx={{ fontSize: 60, color: '#448AFF', opacity: 0.5 }} />
                            </BentoItem>
                        </Box>
                    </Box>
                </Grid>

                {/* 3. Traffic Graph (Bottom Left) */}
                <Grid item xs={12} md={7} sx={{ height: 350 }}>
                    <BentoItem delay={0.4} sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#448AFF' }}>NETWORK TRAFFIC</Typography>
                            <Box sx={{ display: 'flex', gap: 1, bgcolor: 'rgba(0,0,0,0.3)', p: 0.5, borderRadius: 2 }}>
                                {['24H', '7D', '30D'].map(t => (
                                    <FilterButton key={t} active={timeRange === t} onClick={() => setTimeRange(t)}>{t}</FilterButton>
                                ))}
                            </Box>
                        </Box>
                        <Box sx={{ height: '85%', width: '100%' }}>
                            <AreaGradientChart timeRange={timeRange} />
                        </Box>
                    </BentoItem>
                </Grid>

                {/* 4. Radar Chart (Bottom Mid) */}
                <Grid item xs={12} md={5} sx={{ height: 350 }}>
                    <BentoItem delay={0.5} sx={{ p: 2 }}>
                        <Typography variant="overline" sx={{ fontWeight: 700, ml: 2, color: '#00E5FF' }}>DEFENSE VECTORS</Typography>
                        <Box sx={{ height: '90%', width: '100%' }}>
                            <SecurityRadar />
                        </Box>
                    </BentoItem>
                </Grid>
            </Grid>
        </Box>
    );
}
