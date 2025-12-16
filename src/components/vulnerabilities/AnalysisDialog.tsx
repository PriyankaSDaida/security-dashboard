import React, { useMemo } from 'react';
import {
    Dialog, DialogTitle, DialogContent, Box, Typography, Button,
    List, ListItem, ListItemText, useTheme
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import type { Vulnerability } from '../../api/types';
import { CHART_COLORS } from '../../utils/constants';

interface AnalysisDialogProps {
    open: boolean;
    onClose: () => void;
    data: Vulnerability[];
}

export const AnalysisDialog: React.FC<AnalysisDialogProps> = ({ open, onClose, data }) => {
    const theme = useTheme();

    const pieData = useMemo(() => {
        const severityCounts = data.reduce((acc: Record<string, number>, curr: Vulnerability) => {
            acc[curr.severity] = (acc[curr.severity] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return Object.keys(severityCounts).map(k => ({ name: k, value: severityCounts[k] }));
    }, [data]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{ sx: { borderRadius: 4, bgcolor: theme.palette.background.paper } }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight={700}>Security Analysis</Typography>
                <Button onClick={onClose} startIcon={<Close />}>Close</Button>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', gap: 4, height: 300, mt: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" gutterBottom align="center">Severity Distribution</Typography>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {pieData.map((entry: { name: string; value: number }, index: number) => (
                                        <Cell key={`cell-${index}`} fill={CHART_COLORS[entry.name as keyof typeof CHART_COLORS] || '#888'} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                    <Box sx={{ flex: 1, borderLeft: `1px solid ${theme.palette.divider}`, pl: 4 }}>
                        <Typography variant="subtitle2" gutterBottom>Top Affected Packages</Typography>
                        <List dense>
                            {/* In a real app, calculate this from 'data' */}
                            {['openssl', 'logit', 'express', 'lodash', 'jackson-databind'].map((pkg, i) => (
                                <ListItem key={pkg}>
                                    <ListItemText primary={pkg} secondary={`${12 - i * 2} Vulnerabilities`} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};
