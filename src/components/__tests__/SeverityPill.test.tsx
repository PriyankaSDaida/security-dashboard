import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SeverityPill } from '../SeverityPill';
import { ThemeProvider, createTheme } from '@mui/material';
import { describe, it, expect } from 'vitest';

// Create a mock theme provider since the component uses useTheme
const MockTheme = ({ children }: { children: React.ReactNode }) => {
    const theme = createTheme();
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe('SeverityPill', () => {
    it('renders the severity label correctly', () => {
        render(
            <MockTheme>
                <SeverityPill severity="Critical" />
            </MockTheme>
        );
        expect(screen.getByText('Critical')).toBeInTheDocument();
    });

    it('renders High severity', () => {
        render(
            <MockTheme>
                <SeverityPill severity="High" />
            </MockTheme>
        );
        expect(screen.getByText('High')).toBeInTheDocument();
    });
});
