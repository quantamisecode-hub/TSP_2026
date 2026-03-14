import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/programs.css';
import SEO from '../components/SEO';

// Import Components
import ProgramsHero from '../components/Programs/ProgramsHero';
import InnerStarsProgram from '../components/Programs/InnerStarsProgram';
import LearningStarsProgram from '../components/Programs/LearningStarsProgram';
import ProgramComparison from '../components/Programs/ProgramComparison';
import ProgramCTA from '../components/Programs/ProgramCTA';

const ProgramsPage = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: false });

        // Handle anchor scroll
        const handleHashScroll = () => {
            const hash = window.location.hash;
            if (hash) {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    setTimeout(() => {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }
            }
        };

        handleHashScroll();
        window.addEventListener('hashchange', handleHashScroll);
        return () => window.removeEventListener('hashchange', handleHashScroll);
    }, []);

    return (
        <div className="programs-page">
            <SEO 
                title="Children's Resilience & Literacy Programs | The Starry Path"
                description="Explore our specialized programs for kids. From 'Inner Stars' for resilience and life skills to 'Learning Stars' for science-based literacy support and reading success."
            />
            <ProgramsHero />
            <div id="inner-stars">
                <InnerStarsProgram />
            </div>
            <div id="learning-stars">
                <LearningStarsProgram />
            </div>
            <ProgramComparison />
            <ProgramCTA />
        </div>
    );
};

export default ProgramsPage;
