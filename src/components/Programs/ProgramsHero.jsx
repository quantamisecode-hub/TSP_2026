import React from 'react';
import BoxImg from '../../assets/images/Programs/Box.svg';

const ProgramsHero = () => {
    return (
        <section className="max-w-[1280px] mx-4 md:mx-10 xl:mx-auto mt-6">
            <div className="bg-[#002147] text-white rounded-xl md:rounded-2xl py-8 md:py-12 lg:py-16 px-6 md:px-12 lg:px-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 shadow-2xl">
                <div className="flex-1 w-full flex justify-center lg:justify-start" data-aos="fade-right">
                    <img src={BoxImg} alt="Inner Strengths Box" className="w-full max-w-[320px] lg:max-w-[420px] h-auto drop-shadow-xl" />
                </div>
                <div className="flex-1 text-center lg:text-left" data-aos="fade-left">
                    <h1 className="font-[var(--font-heading)] text-[var(--color-yellow-gold)] text-2xl md:text-3xl lg:text-5xl mb-2 leading-tight tracking-wide font-bold">
                        INNER STRENGTHS<br className="hidden lg:block" /> THAT GUIDE.
                    </h1>
                    <h2 className="font-[var(--font-heading)] text-[var(--color-teal)] text-2xl md:text-3xl lg:text-5xl mb-6 md:mb-8 leading-tight tracking-wide font-bold">
                        LITERACY SKILLS<br className="hidden lg:block" /> THAT EMPOWER.
                    </h2>
                    <p className="text-lg md:text-xl font-[var(--font-accent)] leading-relaxed text-white max-w-lg mx-auto lg:mx-0 opacity-95 text-center md:text-left">
                        At The Starry Path, children grow inner strengths through the <span className="font-bold">Inner Stars Program</span> and receive targeted literacy support through <span className="font-bold">Learning Stars</span>.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ProgramsHero;
