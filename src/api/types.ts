export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';

export interface Vulnerability {
    cveId: string;
    packageName: string;
    currentVersion: string;
    fixedVersion: string | null;
    severity: Severity;
    cvss: number;
    publishedDate: string;
    description: string;
    riskFactors: string[];
    kaiStatus: string; // e.g., "invalid - norisk", "ai-invalid-norisk", "valid", "investigate"
    analysis?: string; // AI analysis text?
    // Analyst Persona Fields
    exploitAvailable: boolean;
    internetFacing: boolean;
    assetCriticality: 'High' | 'Medium' | 'Low';
    slaStatus: 'On Track' | 'At Risk' | 'Overdue';
    owner: string;
    lastSynced: string;
}

export interface DashboardMetrics {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    needsAnalysis: number; // Based on kaiStatus
}
