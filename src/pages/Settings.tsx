import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Stack, MenuItem } from '@mui/material';
import { GitHub, BugReport, Chat } from '@mui/icons-material';
import { useColorMode } from '../contexts/ColorModeContext';
import { useNotification } from '../contexts/NotificationContext';
import { useData } from '../contexts/DataContext';
import { SettingsSection } from '../components/settings/SettingsSection';
import { ToggleSetting } from '../components/settings/ToggleSetting';
import { IntegrationCard } from '../components/settings/IntegrationCard';
import { motion } from 'framer-motion';

export const Settings: React.FC = () => {
    const { mode, toggleColorMode } = useColorMode();
    const { showNotification } = useNotification();
    const { refreshInterval, setRefreshInterval } = useData(); // Use real data context

    // -- State Management (Persisted) --
    // Load from localStorage or default
    const [notifications, setNotifications] = useState(() => {
        const saved = localStorage.getItem('settings_notifications');
        return saved ? JSON.parse(saved) : { email: true, push: true, slack: false, reports: true };
    });

    const [integrations, setIntegrations] = useState(() => {
        const saved = localStorage.getItem('settings_integrations');
        return saved ? JSON.parse(saved) : { github: true, jira: false, slack: false };
    });

    const handleSave = () => {
        localStorage.setItem('settings_notifications', JSON.stringify(notifications));
        localStorage.setItem('settings_integrations', JSON.stringify(integrations));
        showNotification('Settings saved successfully', 'success');
    };

    // Helper to convert ms to selection value
    const getRefreshValue = (ms: number) => {
        if (ms === 60000) return '1m';
        if (ms === 300000) return '5m';
        if (ms === 900000) return '15m';
        return 'manual';
    };

    const handleRefreshChange = (val: string) => {
        let ms = 0;
        if (val === '1m') ms = 60000;
        if (val === '5m') ms = 300000;
        if (val === '15m') ms = 900000;
        setRefreshInterval(ms);
    };

    return (
        <Box sx={{ pb: 8, maxWidth: 800, mx: 'auto' }}>
            <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 800 }}>
                        Settings
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your workspace preferences and integrations
                    </Typography>
                </Box>
                <Button variant="contained" size="large" onClick={handleSave} sx={{ px: 4, borderRadius: 3 }}>
                    Save Changes
                </Button>
            </Box>

            <Stack spacing={3} component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

                {/* 1. Appearance (Existing functionality expanded) */}
                <SettingsSection title="Appearance" description="Customize the dashboard look and feel.">
                    <ToggleSetting
                        label="Dark Mode"
                        description="Switch between the Corporate Slate dark theme and the Professional Light theme."
                        checked={mode === 'dark'}
                        onChange={toggleColorMode}
                    />
                    <ToggleSetting
                        label="Reduced Motion"
                        description="Minimize transition animations for better accessibility."
                        checked={false}
                        onChange={() => { }}
                    />
                </SettingsSection>

                {/* 2. Notifications */}
                <SettingsSection title="Notifications" description="Control how and when you get alerted.">
                    <ToggleSetting
                        label="Critical Vulnerability Alerts"
                        description="Immediate notification when a critical CVE is detected."
                        checked={true}
                        onChange={() => { }}
                        color="error"
                    />
                    <ToggleSetting
                        label="Email Reports"
                        description="Receive a weekly summary of your security posture."
                        checked={notifications.reports}
                        onChange={(v) => setNotifications({ ...notifications, reports: v })}
                    />
                    <ToggleSetting
                        label="Slack Integration"
                        description="Send alerts directly to your #security channel."
                        checked={notifications.slack}
                        onChange={(v) => setNotifications({ ...notifications, slack: v })}
                        color="secondary"
                    />
                </SettingsSection>

                {/* 3. Integrations */}
                <SettingsSection title="Integrations" description="Connect external tools to automate your workflow.">
                    <IntegrationCard
                        name="GitHub"
                        icon={<GitHub fontSize="large" />}
                        status={integrations.github ? 'connected' : 'disconnected'}
                        onConnect={() => setIntegrations({ ...integrations, github: true })}
                        onDisconnect={() => setIntegrations({ ...integrations, github: false })}
                    />
                    <IntegrationCard
                        name="Jira"
                        icon={<BugReport fontSize="large" />}
                        status={integrations.jira ? 'connected' : 'disconnected'}
                        onConnect={() => setIntegrations({ ...integrations, jira: true })}
                        onDisconnect={() => setIntegrations({ ...integrations, jira: false })}
                    />
                    <IntegrationCard
                        name="Slack"
                        icon={<Chat fontSize="large" />}
                        status={integrations.slack ? 'connected' : 'disconnected'}
                        onConnect={() => setIntegrations({ ...integrations, slack: true })}
                        onDisconnect={() => setIntegrations({ ...integrations, slack: false })}
                    />
                </SettingsSection>

                {/* 4. Security & Account */}
                <SettingsSection title="Security & Account" description="Manage your access and session.">
                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                        <TextField
                            label="Display Name"
                            defaultValue="Analyst"
                            fullWidth
                            disabled
                            variant="outlined"
                        />
                        <TextField
                            label="Email"
                            defaultValue="analyst@corp.com"
                            fullWidth
                            disabled
                            variant="outlined"
                        />
                    </Box>
                    <ToggleSetting
                        label="Two-Factor Authentication"
                        description="Require 2FA for all logins."
                        checked={true}
                        onChange={() => { }}
                        color="success"
                    />
                    <Button variant="outlined" color="error" fullWidth sx={{ mt: 2 }}>
                        Sign out of all devices
                    </Button>
                </SettingsSection>

                {/* 5. System */}
                <SettingsSection title="System" description="Configure dashboard performance.">
                    <TextField
                        select
                        label="Auto-Refresh Interval"
                        value={getRefreshValue(refreshInterval)}
                        onChange={(e) => handleRefreshChange(e.target.value)}
                        fullWidth
                        size="small"
                        sx={{ mb: 2 }}
                    >
                        <MenuItem value="1m">Every 1 minute</MenuItem>
                        <MenuItem value="5m">Every 5 minutes</MenuItem>
                        <MenuItem value="15m">Every 15 minutes</MenuItem>
                        <MenuItem value="manual">Manual only</MenuItem>
                    </TextField>
                    <Button variant="outlined" fullWidth onClick={() => showNotification('Cache cleared', 'info')}>
                        Clear Local Cache
                    </Button>
                </SettingsSection>

            </Stack>
        </Box>
    );
};
