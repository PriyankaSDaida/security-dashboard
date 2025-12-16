import React from 'react';
import { ResponsiveStream } from '@nivo/stream';
import { Paper, Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface TrendStreamProps {
    data: any[];
}

export const TrendStream: React.FC<TrendStreamProps> = ({ data }) => {
    const theme = useTheme();

    // Transform mock data or use real data structure. 
    // Ideally we need multiple keys for a stream. 
    // For now, let's simulate layers based on the single count we have, 
    // or just show a single layer stream which looks like a smooth area chart.

    // Simulating layers for visual effect from the single data point
    const streamData = data.map(d => ({
        "Critical": Math.floor(d.count * 0.1),
        "High": Math.floor(d.count * 0.3),
        "Medium": Math.floor(d.count * 0.4),
        "Low": Math.floor(d.count * 0.2),
    }));

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Paper
                elevation={0}
                sx={{
                    height: 400,
                    p: 3,
                    borderRadius: 4,
                    bgcolor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Threat Stream</Typography>
                <Box sx={{ height: 320 }}>
                    <ResponsiveStream
                        data={streamData}
                        keys={['Critical', 'High', 'Medium', 'Low']}
                        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: '',
                            legendOffset: 36
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: '',
                            legendOffset: -40
                        }}
                        enableGridX={false} // Clean look
                        enableGridY={false}
                        offsetType="silhouette" // Cool organic shape
                        colors={{ scheme: 'nivo' }}
                        fillOpacity={0.85}
                        borderColor={{ theme: 'background' }}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: '#2c998f',
                                size: 4,
                                padding: 2,
                                stagger: true
                            },
                            {
                                id: 'squares',
                                type: 'patternSquares',
                                background: 'inherit',
                                color: '#e8c1a0',
                                size: 6,
                                padding: 2,
                                stagger: true
                            }
                        ]}
                        /* 
                           fill={[
                               { match: { id: 'High' }, id: 'dots' },
                               { match: { id: 'Critical' }, id: 'squares' }
                           ]}
                        */
                        dotSize={8}
                        dotColor={{ from: 'color' }}
                        dotBorderWidth={2}
                        dotBorderColor={{ from: 'color', modifiers: [['darker', 0.7]] }}
                        legends={[
                            {
                                anchor: 'bottom-right',
                                direction: 'column',
                                translateX: 100,
                                itemWidth: 80,
                                itemHeight: 20,
                                itemTextColor: '#999999',
                                symbolSize: 12,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000000'
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                </Box>
            </Paper>
        </motion.div>
    );
};
