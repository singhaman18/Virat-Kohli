import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from './Navbar';

// Mock useScrollPosition hook
vi.mock('../hooks/useScrollPosition', () => ({
    useScrollPosition: vi.fn(() => 0),
}));

import { useScrollPosition } from '../hooks/useScrollPosition';

const mockedUseScrollPosition = vi.mocked(useScrollPosition);

describe('Navbar', () => {
    beforeEach(() => {
        mockedUseScrollPosition.mockReturnValue(0);
    });

    it('renders the VK logo', () => {
        render(<Navbar />);
        expect(screen.getByLabelText(/VK logo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/VK logo/i)).toHaveTextContent('VK');
    });

    it('renders all four navigation links (desktop and mobile)', () => {
        render(<Navbar />);
        // Each link appears twice: desktop + mobile
        expect(screen.getAllByText('Home')).toHaveLength(2);
        expect(screen.getAllByText('Career')).toHaveLength(2);
        expect(screen.getAllByText('Records')).toHaveLength(2);
        expect(screen.getAllByText('Legacy')).toHaveLength(2);
    });

    it('renders the Fan Zone button', () => {
        render(<Navbar />);
        const fanZoneButtons = screen.getAllByLabelText('Fan Zone');
        expect(fanZoneButtons.length).toBeGreaterThanOrEqual(1);
    });

    it('has a nav element with proper ARIA label', () => {
        render(<Navbar />);
        expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
    });

    it('does not apply backdrop blur when scroll position is 0', () => {
        mockedUseScrollPosition.mockReturnValue(0);
        render(<Navbar />);
        const nav = screen.getByRole('navigation');
        expect(nav.className).toContain('bg-transparent');
        expect(nav.className).not.toContain('backdrop-blur-md');
    });

    it('applies backdrop blur when scroll position > 50', () => {
        mockedUseScrollPosition.mockReturnValue(100);
        render(<Navbar />);
        const nav = screen.getByRole('navigation');
        expect(nav.className).toContain('backdrop-blur-md');
        expect(nav.className).not.toContain('bg-transparent');
    });

    it('calls scrollIntoView when a nav link is clicked', () => {
        const mockScrollIntoView = vi.fn();
        const mockElement = { scrollIntoView: mockScrollIntoView };
        vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as unknown as HTMLElement);

        render(<Navbar />);
        // Use getAllByText and click the first (desktop) one
        fireEvent.click(screen.getAllByText('Career')[0]);

        expect(document.getElementById).toHaveBeenCalledWith('career');
        expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

        vi.restoreAllMocks();
    });

    it('toggles mobile menu when hamburger button is clicked', () => {
        render(<Navbar />);
        const hamburger = screen.getByLabelText(/open navigation menu/i);
        const mobileMenu = screen.getByRole('menu');

        expect(mobileMenu.className).toContain('max-h-0');

        fireEvent.click(hamburger);

        expect(mobileMenu.className).toContain('max-h-80');
        expect(screen.getByLabelText(/close navigation menu/i)).toBeInTheDocument();
    });

    it('closes mobile menu when a mobile nav link is clicked', () => {
        const mockScrollIntoView = vi.fn();
        const mockElement = { scrollIntoView: mockScrollIntoView };
        vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as unknown as HTMLElement);

        render(<Navbar />);

        // Open mobile menu
        fireEvent.click(screen.getByLabelText(/open navigation menu/i));
        const mobileMenu = screen.getByRole('menu');
        expect(mobileMenu.className).toContain('max-h-80');

        // Click a mobile nav link (menuitems are inside mobile menu)
        const mobileMenuItems = screen.getAllByRole('menuitem');
        fireEvent.click(mobileMenuItems[0]);

        expect(mobileMenu.className).toContain('max-h-0');

        vi.restoreAllMocks();
    });

    it('all interactive elements are keyboard-focusable', () => {
        render(<Navbar />);
        const buttons = screen.getAllByRole('button');
        buttons.forEach((button) => {
            expect(button.tagName).toBe('BUTTON');
        });
    });

    it('hamburger button has aria-expanded attribute', () => {
        render(<Navbar />);
        const hamburger = screen.getByLabelText(/open navigation menu/i);
        expect(hamburger).toHaveAttribute('aria-expanded', 'false');

        fireEvent.click(hamburger);
        expect(screen.getByLabelText(/close navigation menu/i)).toHaveAttribute('aria-expanded', 'true');
    });
});
