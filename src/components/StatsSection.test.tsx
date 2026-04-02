import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatsSection from './StatsSection';
import { stats } from '../data/content';

// Mock useInView to control viewport detection in tests
vi.mock('../hooks/useInView', () => ({
    useInView: () => {
        const ref = { current: null };
        return [ref, true]; // simulate in-view
    },
}));

// Mock useCountUp to return the target value immediately
vi.mock('../hooks/useCountUp', () => ({
    useCountUp: (target: number) => target,
}));

describe('StatsSection', () => {
    it('renders section with id="stats"', () => {
        render(<StatsSection />);
        const section = document.getElementById('stats');
        expect(section).toBeInTheDocument();
    });

    it('renders at least 3 stat items', () => {
        render(<StatsSection />);
        expect(stats.length).toBeGreaterThanOrEqual(3);
        for (const stat of stats) {
            expect(screen.getByText(stat.label)).toBeInTheDocument();
        }
    });

    it('displays numeric values with suffixes for each stat', () => {
        render(<StatsSection />);
        // "80+" for centuries
        expect(screen.getByText(/80\+/)).toBeInTheDocument();
        // "25,000+" for runs
        expect(screen.getByText(/25,000\+/)).toBeInTheDocument();
        // "#1" for rankings (matches both the value span and label)
        expect(screen.getAllByText(/#1/).length).toBeGreaterThanOrEqual(1);
    });

    it('displays descriptive labels for each stat', () => {
        render(<StatsSection />);
        expect(screen.getByText('International Centuries')).toBeInTheDocument();
        expect(screen.getByText('Runs')).toBeInTheDocument();
        expect(screen.getByText('#1 Rankings')).toBeInTheDocument();
    });
});
