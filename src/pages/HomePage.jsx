import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/home.css';
import SEO from '../components/SEO';
import Hero from '../components/Home/Hero'
import HiddenNavigation from '../components/HiddenNavigation';
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

  const seoLinks = [
    { label: "Programs", to: "/programs" },
    { label: "Inner Stars", to: "/inner-stars" },
    { label: "Learning Stars", to: "/learning-stars" },
    { label: "Story", to: "/story" },
    { label: "Book Now", to: "/programs" }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://thestarrypath.com.au/#organization",
        "name": "The Starry Path",
        "url": "https://thestarrypath.com.au/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://thestarrypath.com.au/android-chrome-512x512.png",
          "width": 512,
          "height": 512
        },
        "description": "Building Life Skills & Resilience in Children through a blend of child psychology and education."
      },
      {
        "@type": "WebSite",
        "@id": "https://thestarrypath.com.au/#website",
        "name": "The Starry Path",
        "url": "https://thestarrypath.com.au/",
        "publisher": { "@id": "https://thestarrypath.com.au/#organization" },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://thestarrypath.com.au/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "EducationalOrganization",
        "@id": "https://thestarrypath.com.au/#local-business",
        "name": "The Starry Path",
        "url": "https://thestarrypath.com.au/",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Point Cook",
          "addressRegion": "VIC",
          "addressCountry": "AU"
        },
        "description": "Providing Inner Stars mindset programs and Learning Stars literacy support for children aged 5-12 in Point Cook, Victoria.",
        "parentOrganization": { "@id": "https://thestarrypath.com.au/#organization" }
      }, {
        "@type": "Organization",
        "@id": "https://thestarrypath.com.au/#organization",
        "name": "The Starry Path",
        "url": "https://thestarrypath.com.au/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://thestarrypath.com.au/android-chrome-512x512.png",
          "width": 512,
          "height": 512
        },
        "description": "The Starry Path offers children’s programs in Point Cook for ages 5–12, including life skills, mindset, and resilience through Inner Stars and literacy support through Learning Stars."
      }
    ]
  };

  return (
    <div className="home-page">
      <SEO
        title="The Starry Path | Children’s Programs in Point Cook"
        description="The Starry Path offers children’s programs in Point Cook for ages 5–12, including life skills, mindset, and resilience through Inner Stars and literacy support through Learning Stars."
        keywords={[
          "Children’s programs Point Cook",
          "after school programs Point Cook",
          "life skills for kids",
          "literacy support for children",
          "kids programs Point Cook",
          "children’s programs Melbourne west"
        ]}
        schema={schema}
      />
      <ScaleSection />
      <InnerStarsSection />
      <Hero />
      <DifferenceSection />
      <StarSection />
      <StrengthsSection />
      <BigIdeasSection />
      <StarKeepersSection />
      <HiddenNavigation links={seoLinks} />
    </div>
  );
};

export default HomePage;
