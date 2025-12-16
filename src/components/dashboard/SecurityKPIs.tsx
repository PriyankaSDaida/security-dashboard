import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Chip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WarningIcon from '@mui/icons-material/Warning';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { CHART_COLORS } from '../../utils/constants';
import type { DashboardStats } from '../../hooks/useDashboardStats';

interface SecurityKPIsProps {
    stats: DashboardStats;
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const SecurityKPIs: React.FC<SecurityKPIsProps> = ({ stats }) => {
    const theme = useTheme();

    const items = [
        { title: 'Security Score', value: `${stats.healthScore}/100`, sub: 'Excellent', icon: <VerifiedUserIcon />, color: CHART_COLORS.Safe },
        { title: 'Critical Issues', value: stats.critical.toLocaleString(), sub: '-12% vs last week', icon: <WarningIcon />, color: CHART_COLORS.Critical },
        { title: 'Fix Rate', value: `${stats.fixRate}%`, sub: 'Top 10% Industry', icon: <TrendingUpIcon />, color: CHART_COLORS.Low },
        { title: 'MTTR', value: stats.mttr, sub: 'Mean Time to Resolve', icon: <AccessTimeIcon />, color: theme.palette.primary.main }
    ];

    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            {items.map((item, index) => (
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
    );
};
