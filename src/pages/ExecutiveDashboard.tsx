import React, { useState } from 'react';
import { Paper, Typography, Box, Chip, Button, IconButton } from '@mui/material';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

import CloseIcon from '@mui/icons-material/Close';
import BugReportIcon from '@mui/icons-material/BugReport';
import BoltIcon from '@mui/icons-material/Bolt';

// --- Cyber Components ---

interface BentoItemProps {
    children: React.ReactNode;
    delay?: number;
    sx?: any;
    id?: string;
    onClick?: () => void;
}

const BentoItem = ({ children, delay = 0, sx = {}, id, onClick }: BentoItemProps) => {
    const theme = useTheme();

    return (
        <motion.div
            layoutId={id}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30, delay }}
            style={{
                height: '100%',
                width: '100%',
                cursor: 'pointer',
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative',
                    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(68, 138, 255, 0.2)' : 'rgba(0,0,0,0.05)'}`,
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(10, 25, 41, 0.95) 0%, rgba(13, 30, 50, 0.95) 100%)'
                        : 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: theme.palette.mode === 'dark'
                        ? '0 0 20px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.05)'
                        : '0 10px 30px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
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

interface NeonTextProps {
    variant?: any;
    children: React.ReactNode;
    color?: string;
}

const NeonText = ({ variant = 'h4', children, color = '#fff' }: NeonTextProps) => (
    <Typography variant={variant} sx={{
        fontWeight: 800,
        color: color,
        textShadow: `0 0 20px ${color}80`,
        fontFamily: '"Rajdhani", "Roboto", sans-serif',
        letterSpacing: 1
    }}>
        {children}
    </Typography>
);

// --- Filters & State ---

interface FilterButtonProps {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

const FilterButton = ({ active, onClick, children }: FilterButtonProps) => (
    <Button
        size="small"
        onClick={(e) => { e.stopPropagation(); onClick(); }} // Stop propagation specifically
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

// Re-using chart components (ThreatMap, SecurityRadar, AreaGradientChart need prop tweaks to fit container)
// We will simply render them as children.

const ThreatMap = ({ region }: { region: string }) => {
    const theme = useTheme();
    // Generate static random positions for the map
    const [connectionPoints] = useState(() => {
        return Array.from({ length: 15 }).map(() => ({
            top: region === 'APAC' ? Math.random() * 30 + 50 : Math.random() * 60 + 20,
            left: region === 'APAC' ? Math.random() * 30 + 60 : Math.random() * 80 + 10,
            delay: Math.random()
        }));
    });

    return (
        <div style={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden' }}>
            {/* ... Map SVG ... */}
            <svg viewBox="0 0 800 400" style={{ width: '100%', height: '100%', opacity: 0.8 }}>
                {/* Simplified World Map Path */}
                <path d="M399.999,0.001C179.088,0.001,0,179.089,0,400.001c0,220.912,179.088,400,399.999,400c220.912,0,400.001-179.088,400.001-400C800,179.089,620.911,0.001,399.999,0.001z M399.999,720.001c-176.73,0-319.999-143.27-319.999-320c0-176.73,143.269-319.999,319.999-319.999c176.73,0,320.001,143.269,320.001,319.999C720,576.731,576.73,720.001,399.999,720.001z" fill={theme.palette.primary.main} fillOpacity={0.2} />
            </svg>

            {/* Connection Points */}
            {connectionPoints.map((point: { top: number; left: number; delay: number }, i: number) => (
                <motion.div
                    key={i}
                    style={{
                        position: 'absolute',
                        top: `${point.top}%`,
                        left: `${point.left}%`,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: theme.palette.secondary.main,
                        boxShadow: `0 0 10px ${theme.palette.secondary.main}`
                    }}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 2 + point.delay,
                        repeat: Infinity,
                        delay: point.delay
                    }}
                />
            ))}

            {/* Attack Lines (Decorative) */}
            {connectionPoints.slice(0, 5).map((point: { delay: number }, i: number) => (
                <motion.div
                    key={`line-${i}`}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '2px',
                        height: '2px',
                        background: '#00E5FF',
                        transformOrigin: '0 0',
                        boxShadow: '0 0 8px #00E5FF'
                    }}
                    animate={{
                        height: [0, 100, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, 360]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: point.delay * 2, ease: "linear" }}
                />
            ))}
        </div>
    );
};

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
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // Common Content Renderers to ensure consistency between Grid and Overlay
    const renderMapContent = () => (
        <>
            <Box sx={{ position: 'absolute', top: 20, right: 20, zIndex: 10, display: 'flex', gap: 1, p: 0.5, bgcolor: 'rgba(0,0,0,0.3)', borderRadius: 3 }}>
                {['ALL', 'NA', 'APAC', 'EMEA'].map(r => (
                    <FilterButton key={r} active={region === r} onClick={() => setRegion(r)}>{r}</FilterButton>
                ))}
            </Box>
            <ThreatMap region={region} />
        </>
    );

    const renderScoreContent = () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3, height: '100%' }}>
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
        </Box>
    );

    const renderAlertsContent = () => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 4, height: '100%' }}>
            <Box>
                <Typography variant="overline" sx={{ fontWeight: 800, color: '#448AFF' }}>ACTIVE ALERTS</Typography>
                <NeonText variant="h2" color="#fff">3</NeonText>
            </Box>
            <BugReportIcon sx={{ fontSize: 60, color: '#448AFF', opacity: 0.5 }} />
        </Box>
    );

    const renderTrafficContent = () => (
        <Box sx={{ p: 4, height: '100%' }}>
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
        </Box>
    );

    const renderRadarContent = () => (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="overline" sx={{ fontWeight: 700, ml: 2, color: '#00E5FF' }}>DEFENSE VECTORS</Typography>
            <Box sx={{ flex: 1, width: '100%', minHeight: 0 }}>
                <SecurityRadar />
            </Box>
        </Box>
    );

    return (
        <Box sx={{ p: { xs: 1, md: 0 }, position: 'relative' }}>
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

            {/* Bento Grid - Default State */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {/* 1. Large Map (Top Left) */}
                <Box sx={{ width: { xs: '100%', lg: '66%' }, height: 400, flexGrow: 1 }}>
                    <BentoItem
                        id="map-card"
                        onClick={() => setExpandedId('map-card')}
                        delay={0.1}
                    >
                        {renderMapContent()}
                    </BentoItem>
                </Box>

                {/* 2. Key Stats (Right Column) */}
                <Box sx={{ width: { xs: '100%', lg: '32%' } }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
                        {/* Risk Score */}
                        <Box sx={{ flex: 1 }}>
                            <BentoItem
                                id="score-card"
                                onClick={() => setExpandedId('score-card')}
                                delay={0.2}
                            >
                                {renderScoreContent()}
                            </BentoItem>
                        </Box>

                        {/* Critical Issues */}
                        <Box sx={{ flex: 1 }}>
                            <BentoItem
                                id="alerts-card"
                                onClick={() => setExpandedId('alerts-card')}
                                delay={0.3}
                            >
                                {renderAlertsContent()}
                            </BentoItem>
                        </Box>
                    </Box>
                </Box>

                {/* 3. Traffic Graph (Bottom Left) */}
                <Box sx={{ width: { xs: '100%', md: '58%' }, height: 350, flexGrow: 1 }}>
                    <BentoItem
                        id="traffic-card"
                        onClick={() => setExpandedId('traffic-card')}
                        delay={0.4}
                    >
                        {renderTrafficContent()}
                    </BentoItem>
                </Box>

                {/* 4. Radar Chart (Bottom Mid) */}
                <Box sx={{ width: { xs: '100%', md: '39%' }, height: 350 }}>
                    <BentoItem
                        id="radar-card"
                        onClick={() => setExpandedId('radar-card')}
                        delay={0.5}
                    >
                        {renderRadarContent()}
                    </BentoItem>
                </Box>
            </Box>

            {/* Expanded Overlay - Shared Layout */}
            <AnimatePresence>
                {expandedId && (
                    <Box sx={{ position: 'fixed', inset: 0, zIndex: 1300, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setExpandedId(null)}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(0, 0, 0, 0.5)',
                                backdropFilter: 'blur(8px)',
                                pointerEvents: 'auto'
                            }}
                        />

                        {/* Expanded Card */}
                        <Box sx={{ width: '85vw', height: '85vh', position: 'relative', pointerEvents: 'auto' }}>
                            <BentoItem id={expandedId} onClick={() => { }} sx={{ height: '100%' }}>
                                <IconButton
                                    onClick={(e) => { e.stopPropagation(); setExpandedId(null); }}
                                    sx={{ position: 'absolute', top: 16, right: 16, zIndex: 20 }}
                                >
                                    <CloseIcon />
                                </IconButton>

                                {/* Render Content based on ID */}
                                {expandedId === 'map-card' && renderMapContent()}
                                {expandedId === 'score-card' && renderScoreContent()}
                                {expandedId === 'alerts-card' && renderAlertsContent()}
                                {expandedId === 'traffic-card' && renderTrafficContent()}
                                {expandedId === 'radar-card' && renderRadarContent()}

                                {/* Extra Details for Expanded View */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    style={{ padding: 40, borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 20 }}
                                >
                                    <Typography variant="h5" color="primary" gutterBottom>Detailed Analytics</Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Advanced metrics and historical data would appear here in the full view.
                                    </Typography>
                                </motion.div>
                            </BentoItem>
                        </Box>
                    </Box>
                )}
            </AnimatePresence>
        </Box>
    );
}
