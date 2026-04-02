import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HeroSection from './HeroSection';

// Mock GSAP
vi.mock('gsap', () => {
    const timeline = {
        from: vi.fn().mockReturnThis(),
    };
    return {
        default: {
            context: vi.fn((_fn: unknown, _ref: unknown) => {
                // Execute the callback so refs are used
                if (typeof _fn === 'function') _fn();
                return { revert: vi.fn() };
            }),
            timeline: vi.fn(() => timeline),
            from: vi.fn(),
        },
    };
});

describe('HeroSection', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the eyebrow text "INDIAN CRICKET LEGEND"', () => {
        render(<HeroSection />);
        expect(screen.getByText(/indian cricket legend/i)).toBeInTheDocument();
    });

    it('renders "Virat Kohli" heading in font-display', () => {
        render(<HeroSection />);
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toHaveTextContent('Virat Kohli');
        expect(heading.className).toContain('font-display');
    });

    it('renders the video background with dark overlay', () => {
        render(<HeroSection />);
        const video = document.querySelector('video');
        expect(video).toBeInTheDocument();
        expect(video).toHaveAttribute('autoplay');
        expect(video?.muted).toBe(true);
        expect(video).toHaveAttribute('loop');
        const overlay = document.querySelector('[aria-hidden="true"].bg-black\\/60');
        expect(overlay).toBeInTheDocument();
    });

    it('renders "View Career" and "Explore Records" CTA buttons', () => {
        render(<HeroSection />);
        expect(screen.getByRole('button', { name: /view career/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /explore records/i })).toBeInTheDocument();
    });

    it('renders a descriptive paragraph', () => {
        render(<HeroSection />);
        expect(screen.getByText(/greatest batsmen in cricket history/i)).toBeInTheDocument();
    });

    it('renders the scroll indicator', () => {
        render(<HeroSection />);
        expect(screen.getByText(/scroll/i)).toBeInTheDocument();
    });

    it('renders a cycling role from heroRoles', () => {
        render(<HeroSection />);
        // Initially should show the first role
        expect(screen.getByText('Run Machine')).toBeInTheDocument();
    });

    it('has section with id="hero" and full viewport classes', () => {
        render(<HeroSection />);
        const section = document.getElementById('hero');
        expect(section).toBeInTheDocument();
        expect(section?.className).toContain('h-screen');
        expect(section?.className).toContain('w-full');
    });

    it('smooth-scrolls to #career when "View Career" is clicked', () => {
        const mockElement = { scrollIntoView: vi.fn() };
        vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as unknown as HTMLElement);

        render(<HeroSection />);
        fireEvent.click(screen.getByRole('button', { name: /view career/i }));

        expect(document.getElementById).toHaveBeenCalledWith('career');
        expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

        vi.restoreAllMocks();
    });

    it('smooth-scrolls to #records when "Explore Records" is clicked', () => {
        const mockElement = { scrollIntoView: vi.fn() };
        vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as unknown as HTMLElement);

        render(<HeroSection />);
        fireEvent.click(screen.getByRole('button', { name: /explore records/i }));

        expect(document.getElementById).toHaveBeenCalledWith('records');
        expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

        vi.restoreAllMocks();
    });
});
