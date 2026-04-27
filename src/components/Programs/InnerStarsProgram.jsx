import React from 'react';
import { Link } from 'react-router-dom';
import InnerStarsImg from '../../assets/images/Programs/Inner Stars.svg';

const InnerStarsProgram = () => {
    return (
        <>
            <div className="max-w-[1280px] mx-4 md:mx-10 xl:mx-auto mt-12 mb-8" data-aos="fade-up">
                <div className="w-full py-4 md:py-6 bg-[var(--color-orange)] text-white text-lg md:text-3xl font-[var(--font-heading)] text-center uppercase rounded-xl md:rounded-2xl shadow-2xl px-8 flex items-center justify-center font-bold">
                    Life skills for every child <br className='md:hidden' /> Ages 5-12
                </div>
            </div>

            <section className="max-w-7xl mx-auto px-8 py-8 flex flex-col md:flex-row items-center gap-10 md:gap-24">
                <div className="flex-1 flex flex-col items-center text-center" data-aos="zoom-in">
                    <img src={InnerStarsImg} alt="Inner Stars" className="w-[240px] md:w-[360px] h-auto mb-4 drop-shadow-xl" />
                </div>
                <div className="flex-[1.5] flex justify-center md:justify-start" data-aos="fade-left">
                    <div className="w-fit">
                        <h3 className="text-xl md:text-3xl font-[var(--font-heading)] text-[var(--color-dark-navy)] mb-6 leading-tight font-bold text-left">
                            A character building program that helps children build: Resilience, Courage, Kindness, Gratitude, Perseverance, and Integrity.
                        </h3>
                        <p className="text-lg md:text-xl font-[var(--font-body)] mb-4 text-left" style={{ color: 'var(--color-grey-text)' }}>Children learn these strengths through:</p>
                        <ul className="mb-8 space-y-3 text-left">
                            {["Language", "Visual Tools", "Stories and Reflection", "Everyday Practice"].map((item) => (
                                <li key={item} className="text-lg md:text-xl font-[var(--font-body)] flex items-start gap-3" style={{ color: 'var(--color-grey-text)' }}>
                                    <span className="mt-1 text-xl leading-none flex-shrink-0" style={{ color: 'var(--color-grey-text)' }}>•</span>
                                    <span className="leading-tight">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-lg md:text-xl font-[var(--font-body)] mb-8 opacity-90 max-w-lg text-left" style={{ color: 'var(--color-grey-text)' }}>
                            <strong style={{ color: 'var(--color-dark-navy)' }}>Perfect for:</strong> Every child aged 5-12 because healthy habits of mind matter.
                        </p>
                        <div className="flex justify-start">
                            <Link to="/programs/inner-stars" className="btn-join uppercase text-sm md:text-xl px-10 py-3 md:px-12 md:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-bold">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default InnerStarsProgram;
