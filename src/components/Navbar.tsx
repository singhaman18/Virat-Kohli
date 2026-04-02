import { useState, useCallback } from 'react';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { navLinks } from '../data/content';

export function Navbar() {
    const scrollY = useScrollPosition();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrolled = scrollY > 50;

    const handleNavClick = useCallback((targetId: string) => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
    }, []);

    return (
        <nav
            role="navigation"
            aria-label="Main navigation"
            className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4 py-3 transition-all duration-300 ${scrolled
                    ? 'backdrop-blur-md bg-[hsl(0_0%_4%/0.8)] border-b border-stroke'
                    : 'bg-transparent'
                }`}
        >
            <div className="flex items-center justify-between">
                {/* VK Logo */}
                <button
                    onClick={() => handleNavClick('hero')}
                    className="text-2xl font-display italic text-text-primary hover:text-[#FF6A00] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] rounded"
                    aria-label="VK logo — scroll to top"
                >
                    VK
                </button>

                {/* Desktop Nav Links */}
                <ul className="hidden md:flex items-center gap-6" role="list">
                    {navLinks.map((link) => (
                        <li key={link.targetId}>
                            <button
                                onClick={() => handleNavClick(link.targetId)}
                                className="text-sm font-body text-muted hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] rounded px-1 py-0.5"
                                aria-label={`Navigate to ${link.label} section`}
                            >
                                {link.label}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Desktop Fan Zone Button + Mobile Hamburger */}
                <div className="flex items-center gap-3">
                    <button
                        className="hidden md:inline-flex accent-gradient text-bg text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                        aria-label="Fan Zone"
                    >
                        Fan Zone
                    </button>

                    {/* Hamburger Button (mobile only) */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] rounded"
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    >
                        <span
                            className={`block w-5 h-0.5 bg-text-primary transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[4px]' : ''
                                }`}
                        />
                        <span
                            className={`block w-5 h-0.5 bg-text-primary transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''
                                }`}
                        />
                        <span
                            className={`block w-5 h-0.5 bg-text-primary transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                id="mobile-menu"
                role="menu"
                className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-80 mt-3' : 'max-h-0'
                    }`}
            >
                <ul className="flex flex-col gap-2 pb-3" role="list">
                    {navLinks.map((link) => (
                        <li key={link.targetId} role="none">
                            <button
                                role="menuitem"
                                onClick={() => handleNavClick(link.targetId)}
                                className="w-full text-left text-sm font-body text-muted hover:text-text-primary transition-colors py-2 px-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]"
                                aria-label={`Navigate to ${link.label} section`}
                            >
                                {link.label}
                            </button>
                        </li>
                    ))}
                    <li role="none">
                        <button
                            role="menuitem"
                            className="w-full accent-gradient text-bg text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity mt-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]"
                            aria-label="Fan Zone"
                        >
                            Fan Zone
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
