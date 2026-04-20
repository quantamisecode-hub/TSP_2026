import React from 'react';
import BoxImg from '../../assets/images/Programs/Box.svg';

const ProgramsHero = () => {
    return (
        <section className="max-w-[1280px] mx-4 md:mx-10 xl:mx-auto mt-6">
            <div className="bg-[#002147] text-white rounded-xl md:rounded-2xl py-8 md:py-12 lg:py-16 px-8 md:px-12 lg:px-16 flex flex-col md:flex-row items-center gap-10 md:gap-12 lg:gap-16 shadow-2xl">
                <div className="flex-1 w-full flex justify-center md:justify-start" data-aos="fade-right">
                    <img
                        src={BoxImg}
                        alt="Inner Strengths Box"
                        className="w-full max-w-[900px] lg:max-w-[1200px] h-auto drop-shadow-2xl"
                    />
                </div>
                <div className="flex-1 flex justify-center md:justify-start" data-aos="fade-left">
                    <div className="max-w-fit">
                        <h1 className="sr-only">
                            Programs
                        </h1>
                        <h2 className="font-[var(--font-heading)] text-[var(--color-yellow-gold)] text-2xl md:text-4xl lg:text-6xl mb-4 leading-tight lg:leading-tight tracking-tight font-bold text-center md:text-left uppercase">
                            INNER STRENGTHS <br className="xl:hidden" /> THAT GUIDE.
                        </h2>
                        <h3 className="font-[var(--font-heading)] text-[var(--color-teal)] text-2xl md:text-4xl lg:text-6xl mb-6 md:mb-8 leading-tight lg:leading-tight tracking-tight font-bold text-center md:text-left uppercase">
                            LITERACY SKILLS <br className="xl:hidden" /> THAT EMPOWER.
                        </h3>
                        <p className="text-lg md:text-xl lg:text-2xl font-[var(--font-accent)] leading-relaxed text-white max-w-lg lg:mx-0 opacity-95 text-center md:text-left">
                            At The Starry Path, children grow <br className="xl:hidden" /> inner strengths through the <span className="font-bold">Inner Stars Program</span> and receive targeted literacy support through <span className="font-bold">Learning Stars</span>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProgramsHero;
