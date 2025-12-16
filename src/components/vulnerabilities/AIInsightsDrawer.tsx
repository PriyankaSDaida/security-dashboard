import React from 'react';
import {
    Drawer, Box, Typography, Paper, List, ListItem,
    ListItemIcon, ListItemText, Divider, Button, useTheme
} from '@mui/material';
import { SmartToy, Lightbulb, CheckCircle } from '@mui/icons-material';

interface AIInsightsDrawerProps {
    open: boolean;
    onClose: () => void;
}

export const AIInsightsDrawer: React.FC<AIInsightsDrawerProps> = ({ open, onClose }) => {
    const theme = useTheme();

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{ sx: { width: 400, bgcolor: theme.palette.background.default, backgroundImage: 'none' } }}
        >
            <Box sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                    <SmartToy sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                    <Typography variant="h5" fontWeight={800}>AI Insights</Typography>
                </Box>

                <Paper sx={{ p: 2, mb: 3, borderRadius: 3, bgcolor: `${theme.palette.primary.main}15`, border: `1px solid ${theme.palette.primary.main}40` }}>
                    <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Lightbulb fontSize="small" /> INTELLIGENT SUMMARY
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Your security posture has degraded slightly over the last 7 days tailored primarily by invalid version constraints in <b>openssl</b>.
                    </Typography>
                </Paper>

                <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700 }}>REMEDIATION PLAN</Typography>
                <List>
                    <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                        <ListItemText
                            primary={<Typography variant="body2" fontWeight={600}>Update OpenSSL to 3.0.1</Typography>}
                            secondary="Fixes 5 Critical CVEs. High priority."
                        />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                        <ListItemText
                            primary={<Typography variant="body2" fontWeight={600}>Patch Log4j Configuration</Typography>}
                            secondary="Mitigates RCE vulnerability in legacy modules."
                        />
                    </ListItem>
                </List>

                <Button variant="contained" fullWidth sx={{ mt: 4, borderRadius: 3, py: 1.5 }}>
                    Generate Fix PRs
                </Button>
            </Box>
        </Drawer>
    );
};
