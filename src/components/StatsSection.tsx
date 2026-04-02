import { useCountUp } from '../hooks/useCountUp';
import { useInView } from '../hooks/useInView';
import { stats } from '../data/content';
import type { StatItem } from '../types';

function StatCard({ stat, enabled }: { stat: StatItem; enabled: boolean }) {
    const value = useCountUp(stat.value, 2000, enabled);

    return (
        <div className="flex flex-1 flex-col items-center gap-2 px-4 py-6" role="group" aria-label={`${stat.label}: ${stat.value}${stat.suffix}`}>
            <span className="text-4xl font-bold text-text-primary md:text-5xl" aria-hidden="true">
                {stat.id === 'rankings' && '#'}
                {value.toLocaleString()}
                {stat.suffix}
            </span>
            <span className="text-sm text-muted md:text-base">{stat.label}</span>
        </div>
    );
}

export default function StatsSection() {
    const [ref, inView] = useInView({ triggerOnce: true });

    return (
        <section id="stats" className="px-6 py-20 md:py-28" ref={ref}>
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 md:flex-row md:gap-0 md:divide-x md:divide-stroke">
                {stats.map((stat) => (
                    <StatCard key={stat.id} stat={stat} enabled={inView} />
                ))}
            </div>
        </section>
    );
}
