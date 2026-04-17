import React from 'react';
import { Link } from 'react-router-dom';
import LearningStarsImg from '../../assets/images/Programs/Learning Stars.svg';

const LearningStarsProgram = () => {
    return (
        <>
            <div className="max-w-[1280px] mx-4 md:mx-10 xl:mx-auto mt-12 mb-8" data-aos="fade-up">
                <div className="w-full py-4 md:py-6 bg-[var(--color-dark-navy)] text-white text-lg md:text-3xl font-[var(--font-heading)] text-center uppercase rounded-xl md:rounded-2xl shadow-2xl px-4 flex items-center justify-center font-bold">
                    Literacy skills for confident readers and writers
                </div>
            </div>

            <section className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center gap-10 md:gap-24">
                <div className="flex-1 flex flex-col items-center text-center" data-aos="zoom-in">
                    <img src={LearningStarsImg} alt="Learning Stars" className="w-[240px] md:w-[360px] h-auto mb-4 drop-shadow-xl" />
                </div>
                <div className="flex-[1.5] flex justify-center md:justify-start" data-aos="fade-left">
                    <div className="w-fit">
                        <h3 className="text-xl md:text-3xl font-[var(--font-heading)] text-[var(--color-dark-navy)] mb-6 leading-tight font-bold text-left">
                            Structured literacy support that builds: Reading, Spelling, Writing, and Strong Academic Foundations.
                        </h3>
                        <p className="text-lg md:text-xl font-[var(--font-body)] mb-4 text-left" style={{ color: 'var(--color-grey-text)' }}>Children strengthen these skills through:</p>
                        <ul className="mb-8 space-y-3 text-left">
                            {["Explicit Teaching", "Step-by-step Practice", "Structured Literacy Tools", "Mastery over time"].map((item) => (
                                <li key={item} className="text-lg md:text-xl font-[var(--font-body)] flex items-start gap-3" style={{ color: 'var(--color-grey-text)' }}>
                                    <span className="mt-1 text-xl leading-none flex-shrink-0" style={{ color: 'var(--color-grey-text)' }}>•</span>
                                    <span className="leading-tight">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-lg md:text-xl font-[var(--font-body)] mb-8 opacity-90 max-w-lg text-left" style={{ color: 'var(--color-grey-text)' }}>
                            <strong style={{ color: 'var(--color-dark-navy)' }}>Perfect for:</strong> Children who find reading, spelling, writing or school work harder than expected.
                        </p>
                        <div className="flex justify-start">
                            <Link to="/programs/learning-stars" className="btn-join uppercase text-sm md:text-xl px-10 py-3 md:px-12 md:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-bold">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LearningStarsProgram;
