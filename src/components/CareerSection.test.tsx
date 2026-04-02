import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CareerSection from './CareerSection';
import { careerCards } from '../data/content';

describe('CareerSection', () => {
    it('renders section with id="career"', () => {
        render(<CareerSection />);
        const section = document.getElementById('career');
        expect(section).toBeInTheDocument();
    });

    it('renders the "Career Highlights" heading', () => {
        render(<CareerSection />);
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Career Highlights');
    });

    it('renders all four career cards with correct titles', () => {
        render(<CareerSection />);
        for (const card of careerCards) {
            expect(screen.getByText(card.title)).toBeInTheDocument();
        }
    });

    it('renders descriptions for each card', () => {
        render(<CareerSection />);
        for (const card of careerCards) {
            expect(screen.getByText(card.description)).toBeInTheDocument();
        }
    });

    it('renders year badges for each card', () => {
        render(<CareerSection />);
        expect(screen.getByText('2008')).toBeInTheDocument();
        expect(screen.getByText('2011')).toBeInTheDocument();
        expect(screen.getByText('2014')).toBeInTheDocument();
        expect(screen.getByText('2017')).toBeInTheDocument();
    });

    it('uses timeline layout with vertical line', () => {
        render(<CareerSection />);
        const line = document.querySelector('.bg-stroke\\/40');
        expect(line).toBeInTheDocument();
    });
});
