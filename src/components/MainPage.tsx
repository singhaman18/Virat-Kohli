import { Navbar } from './Navbar';
import HeroSection from './HeroSection';
import CareerSection from './CareerSection';
import RecordsSection from './RecordsSection';
import MomentsSection from './MomentsSection';
import StatsSection from './StatsSection';
import FooterSection from './FooterSection';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function MainPage() {
    const ref = useScrollReveal();

    return (
        <main ref={ref}>
            <Navbar />
            <HeroSection />
            <CareerSection />
            <RecordsSection />
            <MomentsSection />
            <StatsSection />
            <FooterSection />
        </main>
    );
}
