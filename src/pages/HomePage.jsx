import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/home.css';
import SEO from '../components/SEO';
import Hero from '../components/Home/Hero';
import ScaleSection from '../components/Home/ScaleSection';
import StarSection from '../components/Home/StarSection';
import StrengthsSection from '../components/Home/StrengthsSection';
import InnerStarsSection from '../components/Home/InnerStarsSection';
import DifferenceSection from '../components/Home/DifferenceSection';
import BigIdeasSection from '../components/Home/BigIdeasSection';
import StarKeepersSection from '../components/Home/StarKeepersSection';

const HomePage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div className="home-page">
      <SEO 
        title="The Starry Path | Resilience, Life Skills & Literacy for Children"
        description="Empower your child with The Starry Path. We combine child psychology and education to build resilience, emotional intelligence, and science-based literacy skills in children aged 5-12."
      />
      <Hero />
      <ScaleSection />
      <StarSection />
      <StrengthsSection />
      <InnerStarsSection />
      <DifferenceSection />
      <BigIdeasSection />
      <StarKeepersSection />
    </div>
  );
};

export default HomePage;
