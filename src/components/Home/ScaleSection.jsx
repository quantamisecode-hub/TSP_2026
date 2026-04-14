import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import Slide1 from '../../assets/images/Homepage/Both Matter_1.svg';
import Slide2 from '../../assets/images/Homepage/Both Matter_2.svg';
import Slide3 from '../../assets/images/Homepage/Both Matter_3.svg';
import Slide4 from '../../assets/images/Homepage/Both Matter_4.svg';

// Array of slides with descriptive alt text for SEO
const slides = [
    { 
        src: Slide1, 
        alt: "Graphic showing exam preparation and life skills both matter in children’s education" 
    },
    { 
        src: Slide2, 
        alt: "Graphic showing academic learning and understanding a child’s inner world both matter in education" 
    },
    { 
        src: Slide3, 
        alt: "Graphic showing practical life safety and emotional resilience both matter in children’s learning" 
    },
    { 
        src: Slide4, 
        alt: "Graphic showing academic learning and real-life decision making both matter in children’s education" 
    }
];

const ScaleSection = () => {
    const [ref, isVisible] = useScrollAnimation(0.2);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 5000); // 5 seconds per slide
        return () => clearInterval(interval);
    }, []);

    // Manual navigation
    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="scale-section py-12 md:py-20 px-4 max-w-[1200px] mx-auto text-center relative min-h-[50vh] md:min-h-[75vh] flex flex-col justify-center overflow-hidden">
            <h2 className="text-[var(--color-dark-navy)] font-[var(--font-heading)] text-2xl md:text-4xl mb-2 md:mb-4 uppercase tracking-wide px-2 w-full font-bold" data-aos="fade-up">
                ACADEMICS + LIFE SKILLS = REAL EDUCATION
            </h2>

            <div className="relative w-full max-w-[900px] mx-auto min-h-[250px] md:min-h-[500px] flex flex-col items-center justify-end mb-4" data-aos="zoom-in">
                {/* Slides - Animated SVGs Container */}
                <div className="relative w-full flex-grow flex items-end justify-center mb-[-2.25rem] md:mb-[-4rem] overflow-visible">
                    {/* Map SVG slides */}
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 flex flex-col items-center justify-end transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            {/* Seesaw Animation applied to the active image */}
                            <div className="flex-grow flex items-end justify-center w-full mb-0 pb-0 relative z-0">
                                <img
                                    src={slide.src}
                                    alt={slide.alt}
                                    className={`w-full h-auto object-contain align-bottom ${index === 0 ? 'mb-[0.75rem] md:mb-[1.25rem]' : index === 1 ? 'mb-[0.4rem] md:mb-[0.6rem]' : index === 3 ? 'mb-[-0.5rem] md:mb-[-1rem]' : ''} ${index === currentIndex ? 'animate-seesaw' : ''}`}
                                    style={{ maxHeight: '450px' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Static Purple Bar - Always visible at the bottom */}
                <div className="relative w-full max-w-[700px] z-20 px-2 md:px-0">
                    <div className="bg-[#512DA8] text-white py-2 md:py-3.5 px-4 md:px-8 rounded-xl md:rounded-2xl w-full text-center shadow-2xl flex items-center justify-center">
                        <span className="font-[var(--font-heading)] uppercase tracking-wider text-xs md:text-lg leading-tight font-bold">
                            HABITS OF MIND FOR REAL-LIFE LEARNING
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ScaleSection;
