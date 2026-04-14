import React from 'react';
import PuzzleImg from '../../assets/images/Programs/Puzzle.svg';

const ProgramComparison = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-12 text-center">
            <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] text-[var(--color-dark-navy)] mb-12 uppercase font-bold">
                WHICH PROGRAM IS RIGHT FOR YOUR CHILD?
            </h2>

            <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center my-8 md:my-12 px-4" data-aos="zoom-in">
                <img
                    src={PuzzleImg}
                    alt="Life skills and resilience visual showing the balance between exam preparation and preparing children for life"
                    className="w-full h-auto mb-2"
                />
                <svg viewBox="0 0 900 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full text-gray-400 opacity-60">
                    <path d="M10,10 Q10,50 50,50 H425 Q450,50 450,80 Q450,50 475,50 H850 Q890,50 890,10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
                </svg>
            </div>

            <div className="w-full max-w-3xl mx-auto my-8 divide-y divide-gray-200 border-t border-gray-200" data-aos="fade-up">
                <div className="py-6">
                    <h5 className="text-xl font-[var(--font-heading)] text-[var(--color-dark-navy)] uppercase font-bold">SOME CHILDREN BENEFIT FROM BOTH</h5>
                </div>
                {["Inner Stars develops life skills and habits of mind.", "Learning Stars strengthens essential literacy skills.", "Together, they support learning at school and beyond."].map((text) => (
                    <div key={text} className="py-6">
                        <p className="text-lg font-[var(--font-body)]" style={{ color: 'var(--color-grey-text)' }}>{text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProgramComparison;
