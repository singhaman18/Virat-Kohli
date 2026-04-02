import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RecordsSection from './RecordsSection';
import { records } from '../data/content';

describe('RecordsSection', () => {
    it('renders section with id="records"', () => {
        render(<RecordsSection />);
        const section = document.getElementById('records');
        expect(section).toBeInTheDocument();
    });

    it('renders the "Records & Achievements" heading', () => {
        render(<RecordsSection />);
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Records & Achievements');
    });

    it('renders all four record entries with correct titles', () => {
        render(<RecordsSection />);
        for (const entry of records) {
            expect(screen.getByText(entry.title)).toBeInTheDocument();
        }
    });

    it('renders supporting detail for each record entry', () => {
        render(<RecordsSection />);
        for (const entry of records) {
            expect(screen.getByText(entry.detail)).toBeInTheDocument();
        }
    });

    it('renders record number labels', () => {
        render(<RecordsSection />);
        expect(screen.getByText('RECORD #01')).toBeInTheDocument();
        expect(screen.getByText('RECORD #02')).toBeInTheDocument();
    });
});
