import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MomentsSection from './MomentsSection';
import { moments } from '../data/content';

// Mock GSAP and ScrollTrigger to avoid animation side effects in tests
vi.mock('gsap', () => ({
    gsap: {
        registerPlugin: vi.fn(),
        to: vi.fn(),
        context: vi.fn((_fn, _scope) => {
            return { revert: vi.fn() };
        }),
    },
}));

vi.mock('gsap/ScrollTrigger', () => ({
    ScrollTrigger: {},
}));

describe('MomentsSection', () => {
    it('renders section with id="moments"', () => {
        render(<MomentsSection />);
        const section = document.getElementById('moments');
        expect(section).toBeInTheDocument();
    });

    it('renders the "Iconic Moments" heading', () => {
        render(<MomentsSection />);
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Iconic Moments');
    });

    it('renders all moment images with correct alt text', () => {
        render(<MomentsSection />);
        for (const moment of moments) {
            const img = screen.getByAltText(moment.alt);
            expect(img).toBeInTheDocument();
            expect(img).toHaveAttribute('src', moment.imageUrl);
        }
    });

    it('applies lazy loading to all images', () => {
        render(<MomentsSection />);
        for (const moment of moments) {
            const img = screen.getByAltText(moment.alt);
            expect(img).toHaveAttribute('loading', 'lazy');
        }
    });

    it('uses a 2-column grid layout', () => {
        render(<MomentsSection />);
        const grid = document.querySelector('.grid');
        expect(grid?.className).toContain('grid-cols-1');
        expect(grid?.className).toContain('md:grid-cols-2');
    });

    it('applies staggered heights to odd-indexed images', () => {
        render(<MomentsSection />);
        const images = screen.getAllByRole('img');
        // Odd-indexed items (1, 3) should have parent with md:mt-12
        images.forEach((img, index) => {
            const wrapper = img.closest('div');
            if (index % 2 === 1) {
                expect(wrapper?.className).toContain('md:mt-12');
            } else {
                expect(wrapper?.className).not.toContain('md:mt-12');
            }
        });
    });
});
