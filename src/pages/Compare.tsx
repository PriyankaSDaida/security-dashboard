import React, { useState, useMemo } from 'react';
import { Box, Paper, Typography, Grid, MenuItem, Select, FormControl, InputLabel, Chip, useTheme } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { ArrowUpward, ArrowDownward, RemoveCircle, AddCircle, BugReport } from '@mui/icons-material';
import { motion } from 'framer-motion';

// Mock Data Generator for Comparison
const generateScenario = (baseData: any[], variance: number) => {
    return baseData.map(item => ({
        ...item,
        severity: Math.random() > 0.9 ? (['Critical', 'High', 'Medium', 'Low'][Math.floor(Math.random() * 4)]) : item.severity
    })).concat(
        // Add some random new items
        Array.from({ length: Math.floor(Math.random() * variance) }).map((_, i) => ({
            cveId: `CVE-2024-${9000 + i}`,
            packageName: `new-dep-${i}`,
            severity: ['Critical', 'High'][Math.floor(Math.random() * 2)],
            status: 'New'
        }))
    );
};

const StatCard = ({ title, value, sub, color, icon }: any) => {
    const theme = useTheme();
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                height: '100%',
                borderRadius: 4,
                border: `1px solid ${theme.palette.divider}`,
                background: theme.palette.mode === 'dark' ? 'rgba(10, 25, 41, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>{title}</Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, color: color }}>{value}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>{sub}</Typography>
            </Box>
            <Box sx={{
                p: 2,
                borderRadius: '50%',
                bgcolor: `${color}15`,
                color: color,
                display: 'flex',
                boxShadow: `0 0 20px ${color}30`
            }}>
                {icon}
            </Box>
        </Paper>
    );
};

export const Compare: React.FC = () => {
    const theme = useTheme();
    const [scenarioA, setScenarioA] = useState('main');
    const [scenarioB, setScenarioB] = useState('feature-branch');

    // Simulate Data
    const diffData = useMemo(() => {
        const baseStats = { Critical: 12, High: 25, Medium: 40, Low: 60 };
        const compareStats = { Critical: 15, High: 22, Medium: 45, Low: 58 };

        const chartData = Object.keys(baseStats).map(key => ({
            name: key,
            Current: baseStats[key as keyof typeof baseStats],
            New: compareStats[key as keyof typeof compareStats]
        }));

        const newIssues = 5;
        const fixedIssues = 3;
        const riskScore = "+12% Risk";

        const diffList = [
            { id: 'CVE-2024-9901', pkg: 'lodash', severity: 'Critical', type: 'NEW', desc: 'Prototype pollution in utility.' },
            { id: 'CVE-2024-8821', pkg: 'axios', severity: 'High', type: 'NEW', desc: 'SSRF vulnerability.' },
            { id: 'CVE-2023-1204', pkg: 'express', severity: 'High', type: 'FIXED', desc: 'Resolved via upgrade to v5.0.' },
            { id: 'CVE-2024-5502', pkg: 'react-dom', severity: 'Medium', type: 'FIXED', desc: 'Script injection flaw fixed.' },
            { id: 'CVE-2024-1102', pkg: 'moment', severity: 'Low', type: 'NEW', desc: 'ReDoS vulnerability.' },
        ];

        return { chartData, newIssues, fixedIssues, riskScore, diffList };
    }, [scenarioA, scenarioB]);

    return (
        <Box sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Scan Comparison</Typography>
                    <Typography color="text.secondary">Compare vulnerability results between branches or timeframes.</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Baseline</InputLabel>
                        <Select value={scenarioA} label="Baseline" onChange={(e) => setScenarioA(e.target.value)}>
                            <MenuItem value="main">main (v1.2)</MenuItem>
                            <MenuItem value="prod">production</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography variant="h5" sx={{ alignSelf: 'center', color: 'text.secondary' }}>vs</Typography>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Comparison</InputLabel>
                        <Select value={scenarioB} label="Comparison" onChange={(e) => setScenarioB(e.target.value)}>
                            <MenuItem value="feature-branch">feat/login-v2</MenuItem>
                            <MenuItem value="dev">develop</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                    <StatCard
                        title="New Vulnerabilities"
                        value={diffData.newIssues}
                        sub="Introduced in this branch"
                        color={theme.palette.error.main}
                        icon={<AddCircle fontSize="large" />}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard
                        title="Fixed Issues"
                        value={diffData.fixedIssues}
                        sub="Resolved in this branch"
                        color={theme.palette.success.main}
                        icon={<RemoveCircle fontSize="large" />}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard
                        title="Risk Delta"
                        value={diffData.riskScore}
                        sub="Overall security posture change"
                        color={theme.palette.warning.main}
                        icon={<ArrowUpward fontSize="large" />}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={4}>
                {/* Visual Comparison */}
                <Grid item xs={12} lg={6}>
                    <Paper sx={{
                        p: 3,
                        height: 450,
                        borderRadius: 4,
                        border: `1px solid ${theme.palette.divider}`,
                        background: theme.palette.mode === 'dark' ? 'rgba(10, 25, 41, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                    }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Severity Distribution Delta</Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <BarChart data={diffData.chartData} barCategoryGap="20%">
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{
                                        borderRadius: 12,
                                        border: 'none',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                                        background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)'
                                    }}
                                />
                                <Bar dataKey="Current" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} name="Baseline" />
                                <Bar dataKey="New" fill={theme.palette.secondary.main} radius={[4, 4, 0, 0]} name="Comparison" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Diff List */}
                <Grid item xs={12} lg={6}>
                    <Paper sx={{
                        p: 0,
                        height: 450,
                        borderRadius: 4,
                        border: `1px solid ${theme.palette.divider}`,
                        overflow: 'hidden',
                        background: theme.palette.background.paper
                    }}>
                        <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.action.hover }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>Detailed Differences</Typography>
                        </Box>
                        <Box sx={{ overflowY: 'auto', height: 380 }}>
                            {diffData.diffList.map((item, index) => (
                                <Box key={index} sx={{
                                    p: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderBottom: `1px solid ${theme.palette.divider}`,
                                    '&:hover': { bgcolor: theme.palette.action.hover }
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box sx={{
                                            width: 40, height: 40,
                                            borderRadius: '50%',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            bgcolor: item.type === 'NEW' ? `${theme.palette.error.main}15` : `${theme.palette.success.main}15`,
                                            color: item.type === 'NEW' ? theme.palette.error.main : theme.palette.success.main
                                        }}>
                                            <BugReport fontSize="small" />
                                        </Box>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{item.id} <span style={{ opacity: 0.6, fontWeight: 400 }}>in {item.pkg}</span></Typography>
                                            <Typography variant="caption" color="text.secondary">{item.desc}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Chip
                                            label={item.type}
                                            size="small"
                                            color={item.type === 'NEW' ? 'error' : 'success'}
                                            sx={{ borderRadius: 1, fontWeight: 800, mb: 0.5 }}
                                        />
                                        <Typography variant="caption" display="block" sx={{ fontWeight: 600, color: item.severity === 'Critical' ? 'error.main' : 'warning.main' }}>
                                            {item.severity}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
