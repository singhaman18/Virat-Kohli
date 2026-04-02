import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { socialLinks } from '../data/content';

function InstagramIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.5" />
        </svg>
    );
}

function TwitterIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
            <path d="M4 20l6.768 -6.768" />
            <path d="M20 4l-6.768 6.768" />
        </svg>
    );
}

function FacebookIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
    );
}

const iconMap: Record<string, () => React.ReactElement> = {
    instagram: InstagramIcon,
    twitter: TwitterIcon,
    facebook: FacebookIcon,
};

export default function FooterSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => { }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <footer id="footer" ref={sectionRef} className="relative min-h-[80vh] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <img
                    src="/Virat Kolhi.jpeg"
                    alt=""
                    className="absolute -rotate-90 object-cover"
                    style={{ width: '100vh', height: '100vw', maxWidth: 'none', maxHeight: 'none' }}
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-6 py-20">
                {/* CSS Marquee */}
                <div className="mb-12 w-full overflow-hidden">
                    <div className="inline-flex whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite', width: 'max-content' }}>
                        {[...Array(6)].map((_, i) => (
                            <span key={i} className="text-5xl font-bold uppercase tracking-wider text-text-primary opacity-20 md:text-7xl lg:text-8xl px-4">
                                KING KOHLI • RUN MACHINE • LEGEND •
                            </span>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <h2 data-reveal="up" className="mb-8 text-center font-display italic text-4xl text-text-primary md:text-5xl">
                    Join the Fan Army
                </h2>

                {/* Social Links */}
                <div data-reveal="up" className="mb-12 flex items-center gap-6">
                    {socialLinks.map((link) => {
                        const Icon = iconMap[link.platform];
                        return (
                            <a
                                key={link.platform}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.ariaLabel}
                                className="text-muted transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] rounded"
                            >
                                {Icon ? <Icon /> : link.platform}
                            </a>
                        );
                    })}
                </div>

                {/* Status Indicator */}
                <p className="text-sm text-muted">
                    <span className="mr-1 text-green-500">●</span>
                    Inspiring Millions Worldwide
                </p>
            </div>
        </footer>
    );
}
