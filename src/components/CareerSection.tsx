import { careerCards } from '../data/content';

const yearMap: Record<string, string> = {
    'international-debut': '2008',
    'world-cup-2011': '2011',
    'test-captaincy': '2014',
    'icc-awards': '2017',
};

export default function CareerSection() {
    return (
        <section id="career" className="px-6 py-20 md:py-28">
            <div className="mx-auto max-w-5xl">
                <h2 className="mb-14 text-center font-display italic text-4xl md:text-5xl text-text-primary" data-reveal="up">
                    Career Highlights
                </h2>

                {/* Timeline layout */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-stroke/40 md:-translate-x-1/2" />

                    <div className="flex flex-col gap-12">
                        {careerCards.map((card, index) => {
                            const isLeft = index % 2 === 0;
                            return (
                                <div
                                    key={card.id}
                                    className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full accent-gradient border-2 border-bg -translate-x-1/2 z-10 mt-1" />

                                    {/* Horizontal connector line from dot to card */}
                                    <div
                                        className="hidden md:block absolute top-[0.55rem] h-[2px] bg-stroke/60"
                                        style={{
                                            left: isLeft ? 'auto' : '50%',
                                            right: isLeft ? '50%' : 'auto',
                                            width: '2rem',
                                            marginLeft: isLeft ? undefined : '0.5rem',
                                            marginRight: isLeft ? '0.5rem' : undefined,
                                        }}
                                    />

                                    {/* Card */}
                                    <div data-reveal={isLeft ? 'left' : 'right'} className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-0 md:mr-auto' : 'md:pl-0 md:ml-auto'}`}>
                                        <div className="group rounded-xl border border-stroke/50 bg-surface/60 p-5 transition-all duration-500 hover:bg-surface hover:-translate-y-1 hover:scale-[1.02]">
                                            <span className="inline-block text-xs font-mono text-[#FF6A00] mb-2 px-2 py-0.5 rounded-full bg-[#FF6A00]/10">
                                                {yearMap[card.id]}
                                            </span>
                                            <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-[#FF6A00] transition-colors">
                                                {card.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-muted">
                                                {card.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
