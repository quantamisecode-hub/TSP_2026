import React from 'react';
import PuzzleImg from '../../assets/images/Programs/Puzzle.svg';
import MobilePuzzleImg from '../../assets/images/Programs/Mobile Puzzle.svg';

const ProgramComparison = () => {
    return (
        <section className="max-w-7xl mx-auto px-8 py-12 text-center">
            <h2 className="text-3xl md:text-5xl font-[var(--font-heading)] text-[var(--color-dark-navy)] mb-6 uppercase font-extrabold leading-tight max-w-4xl mx-auto">
                WHICH PROGRAM <br className="block md:hidden" /> IS RIGHT FOR <br className='block' /> YOUR CHILD?
            </h2>

            <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center my-4 md:my-8 px-4 md:px-4" data-aos="zoom-in">
                {/* Desktop Version */}
                <img
                    src={PuzzleImg}
                    alt="Life skills and resilience visual showing the balance between exam preparation and preparing children for life"
                    className="hidden md:block w-full h-auto mb-2"
                />
                <img
                    src={MobilePuzzleImg}
                    alt="Life skills and resilience visual showing the balance between exam preparation and preparing children for life"
                    className="block md:hidden w-full h-auto mb-6 mt-8 scale-[1.5] origin-center"
                />
                <svg viewBox="0 0 900 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full text-gray-400 opacity-60 scale-[1.6] md:scale-[] lg:scale-10 origin-center md:mt-0 mt-5 px-10 md:px-20">
                    <path d="M10,10 Q10,50 50,50 H425 Q450,50 450,80 Q450,50 475,50 H850 Q890,50 890,10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
                </svg>
            </div>

            <div className="w-full max-w-3xl mx-auto my-8 divide-y divide-gray-200 border-t border-gray-200 px-8 md:px-0" data-aos="fade-up">
                <div className="py-6">
                    <h5 className="text-xl font-[var(--font-heading)] text-[var(--color-dark-navy)] uppercase font-bold">SOME CHILDREN BENEFIT <br className='md:hidden' /> FROM BOTH</h5>
                </div>
                {[
                    <span key="inner">Inner Stars develops life skills and  habits of mind.</span>,
                    <span key="learning">Learning Stars strengthens <br className='md:hidden' /> essential literacy skills.</span>,
                    <span key="together">Together, they support learning <br className='md:hidden' /> at school and beyond.</span>
                ].map((content, index) => (
                    <div key={index} className="py-6">
                        <p className="text-lg font-[var(--font-body)]" style={{ color: 'var(--color-grey-text)' }}>{content}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProgramComparison;
