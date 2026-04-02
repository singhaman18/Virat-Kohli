import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { LoadingScreen } from './LoadingScreen';

describe('LoadingScreen', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders "King Kohli" text', () => {
        render(<LoadingScreen onComplete={vi.fn()} />);
        expect(screen.getByText('King Kohli')).toBeInTheDocument();
    });

    it('displays counter starting at "000"', () => {
        render(<LoadingScreen onComplete={vi.fn()} />);
        expect(screen.getByText('000')).toBeInTheDocument();
    });

    it('displays a rotating word from the list', () => {
        render(<LoadingScreen onComplete={vi.fn()} />);
        const word = screen.getByText(/Passion|Aggression|Legacy/);
        expect(word).toBeInTheDocument();
    });

    it('renders the progress bar', () => {
        const { container } = render(<LoadingScreen onComplete={vi.fn()} />);
        const progressBar = container.querySelector('.accent-gradient');
        expect(progressBar).toBeInTheDocument();
        expect(progressBar).toHaveStyle({ width: '0%' });
    });

    it('has full-screen fixed overlay with correct classes', () => {
        const { container } = render(<LoadingScreen onComplete={vi.fn()} />);
        const overlay = container.firstElementChild;
        expect(overlay).toHaveClass('fixed', 'inset-0', 'z-[9999]', 'bg-bg');
    });

    it('calls onComplete after counter reaches 100 and 400ms delay', () => {
        const onComplete = vi.fn();
        render(<LoadingScreen onComplete={onComplete} />);

        // Simulate requestAnimationFrame progression over 2700ms
        // Advance through the counter animation
        let time = 0;
        const step = 16; // ~60fps
        while (time <= 2700) {
            time += step;
            act(() => {
                vi.advanceTimersByTime(step);
            });
        }

        // Counter should be at 100 now, but onComplete not yet called
        expect(onComplete).not.toHaveBeenCalled();

        // Advance 400ms for the delay
        act(() => {
            vi.advanceTimersByTime(400);
        });

        expect(onComplete).toHaveBeenCalledTimes(1);
    });

    it('does not call onComplete multiple times', () => {
        const onComplete = vi.fn();
        render(<LoadingScreen onComplete={onComplete} />);

        // Step through the counter animation
        let time = 0;
        const step = 16;
        while (time <= 2700) {
            time += step;
            act(() => {
                vi.advanceTimersByTime(step);
            });
        }

        // Advance past the 400ms delay
        act(() => {
            vi.advanceTimersByTime(500);
        });

        expect(onComplete).toHaveBeenCalledTimes(1);

        // Advance more time — should not call again
        act(() => {
            vi.advanceTimersByTime(2000);
        });

        expect(onComplete).toHaveBeenCalledTimes(1);
    });
});
