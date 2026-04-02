import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Adds scroll-triggered reveal animations to child elements.
 * Attach the returned ref to a container, and all elements with
 * `data-reveal` will animate in when scrolled into view.
 */
export function useScrollReveal() {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const items = el.querySelectorAll('[data-reveal]');

        const ctx = gsap.context(() => {
            items.forEach((item, i) => {
                const direction = item.getAttribute('data-reveal') || 'up';
                const delay = Number(item.getAttribute('data-reveal-delay') || 0);

                const from: gsap.TweenVars = {
                    opacity: 0,
                    duration: 0.8,
                    delay: delay + i * 0.1,
                    ease: 'power3.out',
                };

                if (direction === 'up') from.y = 40;
                else if (direction === 'down') from.y = -40;
                else if (direction === 'left') from.x = -60;
                else if (direction === 'right') from.x = 60;
                else if (direction === 'scale') { from.scale = 0.9; from.y = 20; }

                gsap.from(item, {
                    ...from,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                });
            });
        }, el);

        return () => ctx.revert();
    }, []);

    return containerRef;
}
