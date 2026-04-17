import React from 'react';
import { Link } from 'react-router-dom';
import Tangle from '../../assets/images/Homepage/Tangle.svg';

const InnerStarsSection = () => {
    return (
        <section className="py-20 lg:py-24 px-4 max-w-[1200px] mx-auto relative text-center">
            <div className="max-w-5xl mx-auto mb-16" data-aos="fade-up">
                <h2 className="text-2xl md:text-4xl text-[var(--color-dark-navy)] mb-6 uppercase leading-tight font-[var(--font-heading)] font-bold text-left md:text-center">
                    WHY DOES YOUR CHILD <br className="block md:hidden" /> NEED INNER STARS?
                </h2>
                <p className="text-lg font-[var(--font-accent)] leading-relaxed mx-auto text-left md:text-center" style={{ color: '#636466', wordSpacing: '-0.02em', hyphens: 'auto', wordBreak: 'break-word', textJustify: 'inter-word' }}>
                    1 in 7 Australian children experience challenges such as anxiety, worry, or low confidence during their primary school years (ABS, 2023).
                </p>
            </div>

            {/* Breakout Tangle Image - Using overflow-hidden on a 100% width container */}
            <div className="w-full mt-12 overflow-hidden" data-aos="fade-up">
                <img
                    src={Tangle}
                    alt="Inner Stars section explaining why children need life skills, resilience, and healthy habits during the primary school years"
                    className="w-full h-auto block"
                    style={{ transform: 'scale(1.1)' }}
                />
            </div>
        </section>
    );
};

export default InnerStarsSection;
