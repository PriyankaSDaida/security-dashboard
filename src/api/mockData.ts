import type { Vulnerability } from '../api/types';
import type { Severity } from './types';

const PACKAGES = ['react', 'lodash', 'express', 'django', 'spring-boot', 'jquery', 'bootstrap', 'axios', 'moment', 'next'];
const SEVERITIES: Severity[] = ['Critical', 'High', 'Medium', 'Low'];
const KAI_STATUSES = [
    'valid',
    'invalid - norisk',
    'ai-invalid-norisk',
    'available',
    'investigate',
    'pending'
];
const RISK_FACTORS = ['Remote Code Execution', 'DoS', 'XSS', 'SQL Injection', 'Privilege Escalation', 'Information Disclosure'];

const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomDate = (start: Date, end: Date) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();

export function generateMockData(count: number): Vulnerability[] {
    return Array.from({ length: count }, (_, i) => {
        const severity = randomItem(SEVERITIES);
        const cvss = severity === 'Critical' ? 9 + Math.random() :
            severity === 'High' ? 7 + Math.random() * 2 :
                severity === 'Medium' ? 4 + Math.random() * 3 :
                    Math.random() * 4;

        return {
            cveId: `CVE-${2020 + Math.floor(Math.random() * 5)}-${1000 + i}`,
            packageName: randomItem(PACKAGES),
            currentVersion: `${Math.floor(Math.random() * 5)}.${Math.floor(Math.random() * 10)}.0`,
            fixedVersion: Math.random() > 0.5 ? `${Math.floor(Math.random() * 6)}.${Math.floor(Math.random() * 10)}.0` : null,
            severity,
            cvss: Number(cvss.toFixed(1)),
            publishedDate: randomDate(new Date(2023, 0, 1), new Date()),
            description: `Sample security vulnerability description for ${randomItem(PACKAGES)}. This issue allows attackers to...`,
            riskFactors: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => randomItem(RISK_FACTORS)),
            kaiStatus: randomItem(KAI_STATUSES),
        };
    });
}
