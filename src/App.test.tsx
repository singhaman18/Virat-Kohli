import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock LoadingScreen to immediately call onComplete for main content tests
vi.mock('./components/LoadingScreen', () => ({
    LoadingScreen: ({ onComplete }: { onComplete: () => void }) => (
        <div data-testid="loading-screen">
            <button onClick={onComplete}>Complete</button>
        </div>
    ),
}));

// Mock MainPage to avoid GSAP ScrollTrigger matchMedia issues in jsdom
vi.mock('./components/MainPage', () => ({
    default: () => <div data-testid="main-page">MainPage Content</div>,
}));

describe('App', () => {
    it('renders LoadingScreen initially', () => {
        render(<App />);
        expect(screen.getByTestId('loading-screen')).toBeInTheDocument();
    });

    it('renders MainPage after loading completes', async () => {
        render(<App />);
        screen.getByText('Complete').click();
        expect(await screen.findByTestId('main-page')).toBeInTheDocument();
    });

    it('wraps content in BrowserRouter', () => {
        // If BrowserRouter is missing, render would throw an error
        // for any component using react-router hooks
        expect(() => render(<App />)).not.toThrow();
    });
});
