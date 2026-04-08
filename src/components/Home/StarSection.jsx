import React from 'react';
import { Link } from 'react-router-dom';
import Star from '../../assets/images/Homepage/Star.svg';

const StarSection = () => {
    return (
        <section className="bg-transparent py-16 px-4 max-w-[1200px] mx-auto text-left relative">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 max-w-[1000px] mx-auto">

                {/* Left: Star Image */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end" data-aos="fade-right">
                    <img
                        src={Star}
                        alt="Star Graphic"
                        className="w-[280px] md:w-[380px] object-contain"
                    />
                </div>

                {/* Right: Text Content */}
                <div className="w-full md:w-1/2 text-left" data-aos="fade-left">
                    <h2 className="text-[var(--color-dark-navy)] font-[var(--font-heading)] text-2xl md:text-4xl mb-6 uppercase leading-tight font-bold text-center md:text-left">
                        WHAT WILL YOUR CHILD LEARN? (AGES 5-12)
                    </h2>
                    <div className="flex justify-center md:justify-start">
                        <ul className="star-bullet-list space-y-4 font-[var(--font-accent)] text-lg text-left w-fit" style={{ color: '#636466' }}>
                            {[
                                "Respond when things feel hard",
                                "Identify what’s within their control",
                                "Understand how effort and focus work",
                                "Keep trying when learning is challenging",
                                "Acknowledge how emotions shape decisions",
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="text-sm mt-1.5" style={{ color: '#636466' }}>•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-8 flex justify-center md:justify-start">
                        <Link to="/programs" className="btn-join inline-block uppercase text-sm md:text-lg px-10 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 no-underline font-bold">
                            UNLOCK THEIR POTENTIAL
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StarSection;
