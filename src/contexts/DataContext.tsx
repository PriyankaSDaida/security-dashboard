import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import type { Vulnerability } from '../api/types';
import { generateMockData } from '../api/mockData';

interface DataContextType {
    data: Vulnerability[];
    filteredData: Vulnerability[];
    loading: boolean;
    applyFilter: (filterId: string, isActive: boolean) => void;
    activeFilters: Set<string>;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    loadData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) throw new Error('useData must be used within a DataProvider');
    return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<Vulnerability[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
    const [searchQuery, setSearchQuery] = useState('');

    // Initial Data Load
    const loadData = useCallback(async () => {
        setLoading(true);
        // Simulate network delay or real fetch
        // For now, use Mock Data
        setTimeout(() => {
            const mock = generateMockData(50000); // 50k records to test performance
            setData(mock);
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const applyFilter = (filterId: string, isActive: boolean) => {
        setActiveFilters(prev => {
            const newFilters = new Set(prev);
            if (isActive) {
                newFilters.add(filterId);
            } else {
                newFilters.delete(filterId);
            }
            return newFilters;
        });
    };

    const filteredData = useMemo(() => {
        let result = data;

        // 1. Text Search
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(item =>
                item.cveId.toLowerCase().includes(lowerQuery) ||
                item.packageName.toLowerCase().includes(lowerQuery) ||
                item.description.toLowerCase().includes(lowerQuery) ||
                item.severity.toLowerCase().includes(lowerQuery)
            );
        }

        // 2. Specific Logic Filters
        // "Analysis" button: filter out "invalid - norisk"
        if (activeFilters.has('analysis')) {
            result = result.filter(item => item.kaiStatus !== 'invalid - norisk');
        }

        // "AI Analysis" button: filter out "ai-invalid-norisk"
        if (activeFilters.has('aiAnalysis')) {
            result = result.filter(item => item.kaiStatus !== 'ai-invalid-norisk');
        }

        // Example: High Severity Only
        if (activeFilters.has('highSeverity')) {
            result = result.filter(item => item.severity === 'Critical' || item.severity === 'High');
        }

        return result;
    }, [data, activeFilters, searchQuery]);

    return (
        <DataContext.Provider value={{
            data,
            filteredData,
            loading,
            applyFilter,
            activeFilters,
            searchQuery,
            setSearchQuery,
            loadData
        }}>
            {children}
        </DataContext.Provider>
    );
};
