import React from 'react';
import { Box, Typography, Switch, FormControlLabel, CircularProgress, Button } from '@mui/material';
import { Grid } from '@mui/material';
import { useColorMode } from '../contexts/ColorModeContext';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { useData } from '../contexts/DataContext';

// Components
import { SecurityKPIs } from '../components/dashboard/SecurityKPIs';
import { HealthGauge } from '../components/dashboard/HealthGauge';
import { RecentActivityFeed } from '../components/dashboard/RecentActivityFeed';
import OrbitalThreatMap from '../components/dashboard/OrbitalThreatMap';
import { SeverityDistributionChart } from '../components/dashboard/SeverityDistributionChart';
import { TopRiskFactorsChart } from '../components/dashboard/TopRiskFactorsChart';

import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
    const { mode, toggleColorMode } = useColorMode();
    const { stats, loading } = useDashboardStats();
    const { data } = useData();
    const navigate = useNavigate();

    if (loading || !stats) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress size={60} thickness={4} />
            </Box>
        );
    }

    return (
        <Box sx={{ pb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 1 }}>Security Overview</Typography>
                    <Typography variant="body1" color="text.secondary">Real-time insights and performance metrics.</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate('/modern')}
                        sx={{ borderRadius: 4, textTransform: 'none', fontWeight: 600 }}
                    >
                        Try Modern View ✨
                    </Button>
                    <FormControlLabel
                        control={<Switch checked={mode === 'dark'} onChange={toggleColorMode} color="primary" />}
                        label={mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
                        labelPlacement="start"
                    />
                </Box>
            </Box>

            <SecurityKPIs stats={stats} />

            <Grid container spacing={4}>
                {/* Left Column: Health & Recent Activity */}
                <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <HealthGauge score={stats.healthScore} />
                        <RecentActivityFeed data={data} />
                    </Box>
                </Grid>

                {/* Right Column: Charts */}
                <Grid size={{ xs: 12, md: 8, lg: 9 }}>
                    {/* Charts Section */}
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12 }}>
                            <OrbitalThreatMap />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <SeverityDistributionChart data={stats.severityData} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TopRiskFactorsChart data={stats.riskData} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};
