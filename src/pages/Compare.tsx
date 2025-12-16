import React, { useState, useMemo } from 'react';
import { Box, Paper, Typography, Grid, MenuItem, Select, FormControl, InputLabel, Chip, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Collapse } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { ArrowUpward, ArrowDownward, RemoveCircle, AddCircle, BugReport, History, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

// --- Components ---

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
                overflow: 'hidden',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' }
            }}
        >
            <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}>{title}</Typography>
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

const DiffRow = ({ item }: any) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' }, cursor: 'pointer', '&:hover': { bgcolor: theme.palette.action.hover } }} onClick={() => setOpen(!open)}>
                <TableCell>
                    <IconButton size="small" onClick={(e) => { e.stopPropagation(); setOpen(!open); }}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>{item.id}</Typography>
                </TableCell>
                <TableCell>{item.pkg}</TableCell>
                <TableCell>
                    <Chip
                        label={item.severity}
                        size="small"
                        sx={{
                            bgcolor: item.severity === 'Critical' ? `${theme.palette.error.main}20` : `${theme.palette.warning.main}20`,
                            color: item.severity === 'Critical' ? theme.palette.error.main : theme.palette.warning.main,
                            fontWeight: 700,
                            borderRadius: '6px'
                        }}
                    />
                </TableCell>
                <TableCell>
                    <Chip
                        label={item.type}
                        size="small"
                        color={item.type === 'NEW' ? 'error' : item.type === 'FIXED' ? 'success' : 'warning'}
                        variant="outlined"
                        sx={{ fontWeight: 800 }}
                    />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 2, p: 2, bgcolor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)', borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom component="div" sx={{ fontSize: '0.9rem', fontWeight: 700 }}>
                                Change Details
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="caption" color="text.secondary">Description</Typography>
                                    <Typography variant="body2">{item.desc}</Typography>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Typography variant="caption" color="text.secondary">Version</Typography>
                                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{item.bver} → {item.aver || 'N/A'}</Typography>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Typography variant="caption" color="text.secondary">CVSS Delta</Typography>
                                    <Typography variant="body2" color="error">+{item.cvssDelta}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export const Compare: React.FC = () => {
    const theme = useTheme();
    const [scenarioA, setScenarioA] = useState('main');
    const [scenarioB, setScenarioB] = useState('feature-branch');

    // Simulate Data
    const diffData = useMemo(() => {
        const baseStats = { Critical: 12, High: 25, Medium: 40 };
        const compareStats = { Critical: 15, High: 22, Medium: 45 };

        const chartData = Object.keys(baseStats).map(key => ({
            name: key,
            Baseline: baseStats[key as keyof typeof baseStats],
            Comparison: compareStats[key as keyof typeof compareStats]
        }));

        const newIssues = 5;
        const fixedIssues = 3;
        const regressions = 2;

        const diffList = [
            { id: 'CVE-2024-9901', pkg: 'lodash', severity: 'Critical', type: 'NEW', desc: 'Prototype pollution in utility function allow RCE.', bver: '4.17.20', aver: '4.17.21', cvssDelta: 9.8 },
            { id: 'CVE-2024-8821', pkg: 'axios', severity: 'High', type: 'NEW', desc: 'SSRF vulnerability in request handling.', bver: '0.21.1', aver: '0.21.2', cvssDelta: 7.5 },
            { id: 'CVE-2023-1204', pkg: 'express', severity: 'High', type: 'FIXED', desc: 'Resolved via upgrade to v5.0.', bver: '4.16.0', aver: '5.0.0', cvssDelta: 0 },
            { id: 'CVE-2024-5502', pkg: 'react-dom', severity: 'Medium', type: 'FIXED', desc: 'Script injection flaw fixed.', bver: '16.8.0', aver: '18.2.0', cvssDelta: 0 },
            { id: 'CVE-2024-1102', pkg: 'moment', severity: 'Low', type: 'REGRESSION', desc: 'Re-introduced ReDoS vulnerability in date parsing.', bver: '2.29.1', aver: '2.29.4', cvssDelta: 4.3 },
            { id: 'CVE-2024-3321', pkg: 'django', severity: 'Critical', type: 'NEW', desc: 'SQL Injection in ORM layer.', bver: '3.2.0', aver: '3.2.5', cvssDelta: 9.1 },
        ];

        return { chartData, newIssues, fixedIssues, regressions, diffList };
    }, [scenarioA, scenarioB]);

    return (
        <Box sx={{ animation: 'fadeIn 0.5s ease-in-out', width: '100%', maxWidth: '100%' }}>

            {/* Header */}
            <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 4, bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 3 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Diff Engine
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Comparing security posture between <b>{scenarioA}</b> and <b>{scenarioB}</b>.
                        </Typography>
                    </Box>

                    {/* Selectors */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: theme.palette.action.hover, p: 1, borderRadius: 3 }}>
                        <FormControl size="small" variant="standard" sx={{ minWidth: 120 }}>
                            <Select value={scenarioA} onChange={(e) => setScenarioA(e.target.value)} disableUnderline sx={{ fontWeight: 700, px: 1 }}>
                                <MenuItem value="main">main</MenuItem>
                                <MenuItem value="prod">production</MenuItem>
                            </Select>
                        </FormControl>
                        <ArrowUpward sx={{ transform: 'rotate(90deg)', color: 'text.disabled' }} />
                        <FormControl size="small" variant="standard" sx={{ minWidth: 120 }}>
                            <Select value={scenarioB} onChange={(e) => setScenarioB(e.target.value)} disableUnderline sx={{ fontWeight: 700, px: 1, color: theme.palette.primary.main }}>
                                <MenuItem value="feature-branch">feat/login</MenuItem>
                                <MenuItem value="dev">develop</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </Paper>

            {/* Metrics Grid */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="New Vulns"
                        value={`+${diffData.newIssues}`}
                        sub="Since last scan"
                        color={theme.palette.error.main}
                        icon={<AddCircle fontSize="large" />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Fixed"
                        value={diffData.fixedIssues}
                        sub="Resolved issues"
                        color={theme.palette.success.main}
                        icon={<RemoveCircle fontSize="large" />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Regressions"
                        value={diffData.regressions}
                        sub="Re-opened issues"
                        color={theme.palette.warning.main}
                        icon={<History fontSize="large" />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Risk Delta"
                        value="+12%"
                        sub="Posture change"
                        color={theme.palette.info.main}
                        icon={<ArrowUpward fontSize="large" />}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {/* Chart Section */}
                <Grid item xs={12} lg={4}>
                    <Paper sx={{
                        p: 3,
                        height: '100%',
                        minHeight: 500,
                        borderRadius: 4,
                        border: `1px solid ${theme.palette.divider}`,
                        background: theme.palette.mode === 'dark' ? 'rgba(10, 25, 41, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                    }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 4 }}>Severity Impact</Typography>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={diffData.chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', backgroundColor: theme.palette.background.paper }}
                                />
                                <Legend />
                                <Bar dataKey="Baseline" fill={theme.palette.grey[500]} radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Comparison" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Detailed Table Section */}
                <Grid item xs={12} lg={8}>
                    <Paper sx={{
                        height: '100%',
                        minHeight: 500,
                        borderRadius: 4,
                        border: `1px solid ${theme.palette.divider}`,
                        overflow: 'hidden',
                        background: theme.palette.mode === 'dark' ? 'rgba(10, 25, 41, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                    }}>
                        <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}`, display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>Comparison Details</Typography>
                            <Chip label={`${diffData.diffList.length} Differences`} size="small" color="primary" variant="outlined" />
                        </Box>
                        <TableContainer sx={{ maxHeight: 600 }}>
                            <Table stickyHeader aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>CVE ID</TableCell>
                                        <TableCell>Package</TableCell>
                                        <TableCell>Severity</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {diffData.diffList.map((row) => (
                                        <DiffRow key={row.id} item={row} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
