import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { moments } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function MomentsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            imageRefs.current.forEach((el, i) => {
                if (!el) return;
                const speed = moments[i]?.parallaxSpeed ?? 0.3;

                // Parallax on scroll
                gsap.to(el, {
                    y: speed * 100,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                });

                // Entrance animation
                gsap.from(el, {
                    opacity: 0,
                    y: 60,
                    scale: 0.95,
                    duration: 0.9,
                    delay: i * 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="moments" ref={sectionRef} className="px-6 py-20 md:py-28">
            <div className="mx-auto max-w-5xl">
                <h2 data-reveal="up" className="mb-12 text-center font-display italic text-4xl md:text-5xl text-text-primary">
                    Iconic Moments
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {moments.map((moment, index) => (
                        <div
                            key={moment.id}
                            ref={(el) => { imageRefs.current[index] = el; }}
                            className={`group relative overflow-hidden rounded-2xl ${index % 2 === 1 ? 'md:mt-12' : ''}`}
                        >
                            <img
                                src={moment.imageUrl}
                                alt={moment.alt}
                                loading="lazy"
                                className="block h-96 md:h-[28rem] w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 flex items-end justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                                <span className="mb-6 text-lg font-semibold text-text-primary opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                    {moment.alt.replace('Virat Kohli ', '').replace('playing a signature ', '').replace('showing his trademark ', '')}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
