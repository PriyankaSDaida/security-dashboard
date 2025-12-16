import { useMemo } from 'react';
import { useData } from '../contexts/DataContext';

export interface DashboardStats {
    severityData: { name: string; value: number }[];
    riskData: { name: string; value: number }[];
    trendData: { name: string; count: number }[];
    total: number;
    critical: number;
    high: number;
    fixRate: number;
    mttr: string;
    healthScore: number;
}

export const useDashboardStats = () => {
    const { data, loading } = useData();

    const stats = useMemo<DashboardStats | null>(() => {
        if (loading) return null;

        const severityCount: Record<string, number> = { Critical: 0, High: 0, Medium: 0, Low: 0 };
        const riskCount: Record<string, number> = {};

        data.forEach(item => {
            if (item.severity in severityCount) severityCount[item.severity]++;
            // In a real app, we'd want to normalize these keys
            item.riskFactors?.forEach(risk => {
                riskCount[risk] = (riskCount[risk] || 0) + 1;
            });
        });

        const severityData = Object.entries(severityCount).map(([name, value]) => ({ name, value }));

        const riskData = Object.entries(riskCount)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5);

        // Mock trend data - in production this should come from historical data endpoint
        const trendData = [
            { name: 'Jan', count: Math.floor(data.length * 0.1) },
            { name: 'Feb', count: Math.floor(data.length * 0.15) },
            { name: 'Mar', count: Math.floor(data.length * 0.12) },
            { name: 'Apr', count: Math.floor(data.length * 0.2) },
            { name: 'May', count: Math.floor(data.length * 0.18) },
            { name: 'Jun', count: Math.floor(data.length * 0.25) },
        ];

        // Detailed Metrics
        const total = data.length;
        const critical = severityCount.Critical;
        const high = severityCount.High;

        // These would likely be calculated based on resolved tickets in a real system
        const fixRate = 84.5;
        const mttr = "4h 23m";

        // Health Score (0-100, lower vulnerabilities = higher score)
        // Capping at 85 for realism in this demo
        const healthScore = Math.max(0, Math.min(100, 85));

        return { severityData, riskData, trendData, total, critical, high, fixRate, mttr, healthScore };
    }, [data, loading]);

    return { stats, loading };
};
