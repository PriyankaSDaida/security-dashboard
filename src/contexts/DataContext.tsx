import React, { createContext, useContext, useState, useMemo } from 'react';
import type { Vulnerability } from '../api/types';
import { generateMockData } from '../api/mockData';
import { useQuery } from '@tanstack/react-query';

interface DataContextType {
    data: Vulnerability[];
    filteredData: Vulnerability[];
    loading: boolean;
    applyFilter: (filterId: string, isActive: boolean) => void;
    activeFilters: Set<string>;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    refetch: () => Promise<unknown>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) throw new Error('useData must be used within a DataProvider');
    return context;
};

// Simulate async API call
const fetchVulnerabilities = async (): Promise<Vulnerability[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(generateMockData(50000));
        }, 800);
    });
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
    const [searchQuery, setSearchQuery] = useState('');

    const { data: rawData = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['vulnerabilities'],
        queryFn: fetchVulnerabilities,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

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
        let result = rawData;

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
    }, [rawData, activeFilters, searchQuery]);

    return (
        <DataContext.Provider value={{
            data: rawData,
            filteredData,
            loading,
            applyFilter,
            activeFilters,
            searchQuery,
            setSearchQuery,
            refetch
        }}>
            {children}
        </DataContext.Provider>
    );
};
