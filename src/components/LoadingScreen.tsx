import { useEffect, useRef, useState, useCallback } from 'react';
import { useCountUp } from '../hooks/useCountUp';
import { rotatingWords } from '../data/content';

interface LoadingScreenProps {
    onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const hasCalledComplete = useRef(false);
    const counter = useCountUp(100, 2700, true);

    const handleComplete = useCallback(() => {
        if (hasCalledComplete.current) return;
        hasCalledComplete.current = true;
        onComplete();
    }, [onComplete]);

    const completedRef = useRef(false);

    // Rotate words while loading
    useEffect(() => {
        const interval = setInterval(() => {
            if (!completedRef.current) {
                setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
            }
        }, 900);

        return () => clearInterval(interval);
    }, []);

    // Track completion
    useEffect(() => {
        if (counter >= 100) {
            completedRef.current = true;
        }
    }, [counter]);

    // Wait 400ms after reaching 100, then call onComplete
    useEffect(() => {
        if (counter < 100) return;

        const timeout = setTimeout(() => {
            handleComplete();
        }, 400);

        return () => clearTimeout(timeout);
    }, [counter, handleComplete]);

    const paddedCounter = String(counter).padStart(3, '0');

    return (
        <div
            className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between overflow-hidden"
            role="status"
            aria-live="polite"
            aria-label={`Loading: ${counter} percent`}
        >
            {/* Background Image */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
                <img
                    src="/download.jpeg"
                    alt=""
                    className="absolute -rotate-90 object-cover opacity-20"
                    style={{ width: '100vh', height: '100vw', maxWidth: 'none', maxHeight: 'none' }}
                />
            </div>
            {/* Top-left: King Kohli */}
            <div className="relative z-10 p-8 md:p-12">
                <span className="text-text-primary font-display italic text-2xl md:text-3xl">
                    King Kohli
                </span>
            </div>

            {/* Center: Rotating word */}
            <div className="relative z-10 flex-1 flex items-center justify-center">
                <span
                    key={currentWordIndex}
                    className="text-text-primary font-display italic text-5xl md:text-7xl lg:text-8xl animate-in fade-in duration-500"
                >
                    {rotatingWords[currentWordIndex]}
                </span>
            </div>

            {/* Bottom-right: Counter */}
            <div className="relative z-10 p-8 md:p-12 flex justify-end">
                <span className="text-text-primary font-body text-6xl md:text-8xl font-light tracking-tighter tabular-nums">
                    {paddedCounter}
                </span>
            </div>

            {/* Progress bar at very bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1">
                <div
                    className="accent-gradient h-full transition-[width] duration-100 ease-linear"
                    style={{ width: `${counter}%` }}
                />
            </div>
        </div>
    );
}
