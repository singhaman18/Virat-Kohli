import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { heroRoles } from '../data/content';

const HERO_VIDEO_URL = '/4e80e9cf3ac69705204708d507f5759f_720w.mp4';

function scrollToSection(targetId: string) {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
}

export default function HeroSection() {
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [roleVisible, setRoleVisible] = useState(true);

    const [isMuted, setIsMuted] = useState(true);

    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const eyebrowRef = useRef<HTMLParagraphElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const roleRef = useRef<HTMLDivElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    // Cycle through roles with fade animation
    useEffect(() => {
        const interval = setInterval(() => {
            setRoleVisible(false);
            setTimeout(() => {
                setCurrentRoleIndex((prev) => (prev + 1) % heroRoles.length);
                setRoleVisible(true);
            }, 300);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // GSAP entrance animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.from(eyebrowRef.current, { y: 30, opacity: 0, duration: 0.8 })
                .from(headingRef.current, { y: 40, opacity: 0, duration: 0.9 }, '-=0.4')
                .from(roleRef.current, { y: 30, opacity: 0, duration: 0.7 }, '-=0.3')
                .from(descRef.current, { y: 30, opacity: 0, duration: 0.7 }, '-=0.2')
                .from(ctaRef.current, { y: 30, opacity: 0, duration: 0.7 }, '-=0.2');
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="relative h-screen w-full overflow-hidden"
        >
            {/* Video Background */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <video
                    ref={videoRef}
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    className="absolute -rotate-90 object-cover"
                    style={{ width: '100vh', height: '100vw', maxWidth: 'none', maxHeight: 'none' }}
                    src={HERO_VIDEO_URL}
                />
                <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                <p
                    ref={eyebrowRef}
                    className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-muted"
                >
                    Indian Cricket Legend
                </p>

                <h1
                    ref={headingRef}
                    className="font-display italic text-6xl md:text-8xl lg:text-9xl text-text-primary"
                >
                    Virat Kohli
                </h1>

                <div ref={roleRef} className="mt-6 h-10">
                    <span
                        className={`inline-block text-lg md:text-xl font-light tracking-wide text-muted transition-all duration-300 ${roleVisible
                            ? 'animate-[role-fade-in_0.4s_ease-out_forwards]'
                            : 'opacity-0 translate-y-2'
                            }`}
                    >
                        {heroRoles[currentRoleIndex]}
                    </span>
                </div>

                <p
                    ref={descRef}
                    className="mt-6 max-w-xl text-base md:text-lg font-light leading-relaxed text-muted"
                >
                    One of the greatest batsmen in cricket history, redefining excellence
                    with unmatched passion, consistency, and an insatiable hunger for runs.
                </p>

                <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => scrollToSection('career')}
                        className="accent-gradient rounded-full px-8 py-3 text-sm font-semibold text-bg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    >
                        View Career
                    </button>
                    <button
                        onClick={() => scrollToSection('records')}
                        className="rounded-full border border-stroke px-8 py-3 text-sm font-semibold text-text-primary transition-all hover:border-muted hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    >
                        Explore Records
                    </button>
                </div>
            </div>

            {/* Mute/Unmute Toggle */}
            <button
                onClick={() => {
                    setIsMuted((prev) => !prev);
                    if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
                }}
                className="absolute bottom-8 right-8 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-bg/50 backdrop-blur-sm text-text-primary transition-colors hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
                {isMuted ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                )}
            </button>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2" aria-hidden="true">
                <span className="text-xs uppercase tracking-widest text-muted">Scroll</span>
                <svg
                    className="h-6 w-6 text-muted"
                    style={{ animation: 'scroll-down 2s ease-in-out infinite' }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </section>
    );
}
