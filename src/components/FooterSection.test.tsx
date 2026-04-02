import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FooterSection from './FooterSection';
import { socialLinks } from '../data/content';

vi.mock('gsap', () => ({
    gsap: {
        to: vi.fn(),
        context: vi.fn((_fn, _scope) => ({ revert: vi.fn() })),
    },
}));

describe('FooterSection', () => {
    it('renders footer with id="footer"', () => {
        render(<FooterSection />);
        const footer = document.getElementById('footer');
        expect(footer).toBeInTheDocument();
    });

    it('renders background image with overlay', () => {
        render(<FooterSection />);
        const img = document.querySelector('img[src="/Virat Kolhi.jpeg"]');
        expect(img).toBeInTheDocument();
        const overlay = document.querySelector('.bg-black\\/60');
        expect(overlay).toBeInTheDocument();
    });

    it('renders marquee text "KING KOHLI • RUN MACHINE • LEGEND •"', () => {
        render(<FooterSection />);
        const marqueeTexts = screen.getAllByText(/KING KOHLI • RUN MACHINE • LEGEND •/);
        expect(marqueeTexts.length).toBe(2);
    });

    it('renders "Join the Fan Army" CTA', () => {
        render(<FooterSection />);
        expect(screen.getByText('Join the Fan Army')).toBeInTheDocument();
    });

    it('renders 3 social links with correct ARIA labels', () => {
        render(<FooterSection />);
        for (const link of socialLinks) {
            const anchor = screen.getByLabelText(link.ariaLabel);
            expect(anchor).toBeInTheDocument();
            expect(anchor).toHaveAttribute('href', link.url);
            expect(anchor).toHaveAttribute('target', '_blank');
            expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
        }
    });

    it('renders status indicator "● Inspiring Millions Worldwide"', () => {
        render(<FooterSection />);
        expect(screen.getByText('Inspiring Millions Worldwide')).toBeInTheDocument();
        expect(screen.getByText('●')).toBeInTheDocument();
    });
});
