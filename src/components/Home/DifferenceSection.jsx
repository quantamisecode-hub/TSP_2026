import React from 'react';
import { Link } from 'react-router-dom';
import Puzzle from '../../assets/images/Homepage/Puzzle.svg';

const DifferenceSection = () => {
    return (
        <React.Fragment>
            <section className="bg-[var(--color-yellow-gold)] text-white py-12 md:py-32 px-6 md:px-12 rounded-[20px] md:rounded-[30px] mx-4 md:mx-auto max-w-[1200px] my-8 md:my-16 relative shadow-2xl">
                <div className="text-center mb-8 md:mb-12" data-aos="fade-down">
                    <h2 className="text-2xl md:text-4xl font-[var(--font-heading)] uppercase tracking-wide font-bold">
                        WHAT MAKES US DIFFERENT
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-5xl mx-auto">

                    {/* Left: Puzzle Image */}
                    <div className="flex-1 flex flex-col items-center" data-aos="fade-right">
                        <p className="text-[var(--color-dark-navy)] font-[var(--font-accent)] text-lg md:text-xl self-center md:ml-8 font-bold">
                            The Starry Path integrates
                        </p>
                        <img
                            src={Puzzle}
                            alt="Psychology & Education Puzzle"
                            className="w-full max-w-[600px] object-contain"
                        />
                    </div>

                    {/* Right: Text Content */}
                    <div className="flex-1 text-left md:pl-8" data-aos="fade-left">
                        <h3 className="font-[var(--font-heading)] text-2xl uppercase mb-6 font-bold text-center md:text-left">
                            THE FOCUS IS ON
                        </h3>
                        <ul className="space-y-4 font-[var(--font-accent)] text-lg" style={{ color: '#122f52', wordSpacing: '-0.02em', hyphens: 'auto', wordBreak: 'break-word', textJustify: 'inter-word' }}>
                            <li className="flex items-start gap-4">
                                <span className="mt-1 text-xl leading-none flex-shrink-0" style={{ color: '#122f52' }}>•</span>
                                <span className="leading-tight text-justify">Understanding self and thinking frameworks</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="mt-1 text-xl leading-none flex-shrink-0" style={{ color: '#122f52' }}>•</span>
                                <span className="leading-tight text-justify">Evidence-aligned tools that turn research into everyday practice</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="mt-1 text-xl leading-none flex-shrink-0" style={{ color: '#122f52' }}>•</span>
                                <span className="leading-tight text-justify">Healthy habits of mind</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="mt-1 text-xl leading-none flex-shrink-0" style={{ color: '#122f52' }}>•</span>
                                <span className="leading-tight text-justify">Skills that sustain learning far beyond the classroom</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>


            <div className="flex justify-center mb-8 md:mb-16 px-4" data-aos="zoom-in">
                <Link to="/story" className="btn-join font-bold uppercase text-sm md:text-2xl px-6 py-3 md:px-12 md:py-4 w-full md:w-auto rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                    OUR JOURNEY
                </Link>
            </div>
        </React.Fragment>
    );
};

export default DifferenceSection;
