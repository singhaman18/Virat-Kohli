import { records } from '../data/content';

export default function RecordsSection() {
    return (
        <section id="records" className="px-6 py-20 md:py-28 relative overflow-hidden">
            <div className="absolute top-10 right-10 w-32 h-32 rounded-full border-2 border-stroke/20 opacity-10" />
            <div className="absolute bottom-20 left-10 w-20 h-20 rounded-full border-2 border-stroke/20 opacity-10" />

            <div className="mx-auto max-w-5xl relative z-10">
                <p data-reveal="up" className="text-center text-sm uppercase tracking-[0.3em] text-muted mb-4">Breaking Boundaries</p>
                <h2 data-reveal="up" className="mb-4 text-center font-display italic text-4xl md:text-5xl text-text-primary">
                    Records &amp; Achievements
                </h2>
                <p className="text-center text-muted mb-14 max-w-xl mx-auto text-sm">
                    Numbers that define a legacy. Every record a testament to relentless pursuit of greatness.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {records.map((entry, index) => (
                        <div
                            key={entry.id}
                            data-reveal="scale"
                            className="group relative rounded-2xl border border-stroke/50 bg-gradient-to-br from-surface/90 to-surface/40 backdrop-blur-sm p-6 transition-all duration-500 hover:border-transparent hover:-translate-y-2 overflow-hidden"
                        >
                            {/* Animated gradient border on hover */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px]">
                                <div className="absolute inset-0 rounded-2xl accent-gradient opacity-30" />
                            </div>

                            {/* Large faded number background */}
                            <span className="absolute -top-4 -right-2 text-[7rem] font-bold leading-none text-text-primary/[0.03] group-hover:text-[#FF6A00]/[0.08] transition-colors duration-500 select-none pointer-events-none">
                                {String(index + 1).padStart(2, '0')}
                            </span>

                            {/* Content */}
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-[2px] accent-gradient rounded-full" />
                                    <span className="text-xs font-mono text-[#FF6A00]/70 tracking-wider">
                                        RECORD #{String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-[#FF6A00] transition-colors duration-300">
                                    {entry.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-muted group-hover:text-muted/80 transition-colors">
                                    {entry.detail}
                                </p>
                            </div>

                            {/* Bottom accent bar */}
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] accent-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
