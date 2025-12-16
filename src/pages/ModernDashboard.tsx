import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Grid } from '@mui/material';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { SeveritySunburst } from '../components/modern/SeveritySunburst';
import { TrendStream } from '../components/modern/TrendStream';
import { SecurityKPIs } from '../components/dashboard/SecurityKPIs';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const ModernDashboard: React.FC = () => {
    const { stats, loading } = useDashboardStats();
    const navigate = useNavigate();

    if (loading || !stats) {
        return <Box>Loading Modern Experience...</Box>;
    }

    return (
        <Container maxWidth="xl" sx={{ pb: 8, pt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
                <Box>
                    <Typography variant="overline" sx={{ letterSpacing: '0.2em', color: 'primary.main', fontWeight: 700 }}>
                        NEXT-GEN VISUALIZATION
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>
                        Security Overview
                    </Typography>
                </Box>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/')}
                    variant="outlined"
                    sx={{ borderRadius: 4 }}
                >
                    Back to Classic
                </Button>
            </Box>

            <SecurityKPIs stats={stats} />

            <Box sx={{ mt: 6 }}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <TrendStream data={stats.trendData} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <SeveritySunburst data={stats.severityData} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};
