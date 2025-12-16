import React from 'react';
import { ResponsiveSunburst } from '@nivo/sunburst';
import { Paper, Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface SeveritySunburstProps {
    data: any[];
}

export const SeveritySunburst: React.FC<SeveritySunburstProps> = ({ data }) => {
    const theme = useTheme();

    // Transform data for Nivo Sunburst
    const sunburstData = {
        name: "vulnerabilities",
        color: theme.palette.primary.main,
        children: data.map(item => ({
            name: item.name,
            loc: item.value,
            color: item.color // Assuming mapped externally or handled by Nivo scheme
        }))
    };

    return (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <Paper
                elevation={0}
                sx={{
                    height: 400,
                    p: 3,
                    borderRadius: 4,
                    bgcolor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    overflow: 'hidden'
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Severity Impact (Sunburst)</Typography>
                <Box sx={{ height: 320 }}>
                    <ResponsiveSunburst
                        data={sunburstData}
                        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                        id="name"
                        value="loc"
                        cornerRadius={4}
                        borderWidth={2}
                        borderColor={{ theme: 'background' }}
                        colors={{ scheme: 'nivo' }}
                        childColor={{
                            from: 'color',
                            modifiers: [['brighter', 0.1]]
                        }}
                        enableArcLabels={true}
                        arcLabel="id"
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor={{
                            from: 'color',
                            modifiers: [['darker', 1.4]]
                        }}
                    />
                </Box>
            </Paper>
        </motion.div>
    );
};
