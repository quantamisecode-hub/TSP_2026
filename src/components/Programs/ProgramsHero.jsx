import React from 'react';
import BoxImg from '../../assets/images/Programs/Box.svg';

const ProgramsHero = () => {
    return (
        <section className="max-w-[1280px] mx-4 md:mx-10 xl:mx-auto mt-6">
            <div className="bg-[#002147] text-white rounded-xl md:rounded-2xl py-8 md:py-12 lg:py-16 px-6 md:px-12 lg:px-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 shadow-2xl">
                <div className="flex-1 w-full flex justify-center lg:justify-start" data-aos="fade-right">
                    <img src={BoxImg} alt="Inner Strengths Box" className="w-full max-w-[320px] lg:max-w-[420px] h-auto drop-shadow-xl" />
                </div>
                <div className="flex-1 flex justify-center lg:justify-start" data-aos="fade-left">
                    <div className="max-w-fit">
                        <h1 className="sr-only">
                            Programs
                        </h1>
                        <h2 className="font-[var(--font-heading)] text-[var(--color-yellow-gold)] text-2xl md:text-5xl lg:text-6xl mb-4 leading-tight lg:leading-tight tracking-tight font-bold text-center lg:text-left uppercase">
                            INNER STRENGTHS <br className="md:hidden" /> THAT GUIDE.
                        </h2>
                        <h3 className="font-[var(--font-heading)] text-[var(--color-teal)] text-2xl md:text-5xl lg:text-6xl mb-6 md:mb-8 leading-tight lg:leading-tight tracking-tight font-bold text-center lg:text-left uppercase">
                            LITERACY SKILLS <br className="md:hidden" /> THAT EMPOWER.
                        </h3>
                        <p className="text-lg md:text-2xl font-[var(--font-accent)] leading-relaxed text-white max-w-lg lg:mx-0 opacity-95 text-center lg:text-left">
                            At The Starry Path, children grow <br className="md:hidden" /> inner strengths through the <span className="font-bold">Inner Stars Program</span> and receive targeted literacy support through <span className="font-bold">Learning Stars</span>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProgramsHero;
