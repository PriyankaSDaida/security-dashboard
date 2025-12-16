import React, { useState } from 'react';
import { Paper, Typography, Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import BugReportIcon from '@mui/icons-material/BugReport';
import { CHART_COLORS } from '../../utils/constants';



interface RecentActivityFeedProps {
    data: any[]; // In a real app, pass proper type
}

export const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ data }) => {
    const theme = useTheme();

    // Generate recent activity with stable randoms
    // Ideally this data transformation should happen in a hook or usage layer, not here.
    // However, to match previous behavior, we'll keep the logic but move state up if needed.
    // Here we assume data is passed in, but we need to transform it to activity items if they aren't already.
    // For now, let's assume the parent passes raw data and we transform it once.

    const [recentActivity] = useState(() => {
        return data.slice(0, 5).map((item, i) => ({
            id: i,
            cve: item.cveId,
            pkg: item.packageName,
            severity: item.severity,
            time: `${Math.floor(Math.random() * 23) + 1}h ago` // Only runs once on mount
        }));
    });

    return (
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
                                    <Avatar sx={{ bgcolor: `${CHART_COLORS[activity.severity as keyof typeof CHART_COLORS]}20`, color: CHART_COLORS[activity.severity as keyof typeof CHART_COLORS] }}>
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
    );
};
