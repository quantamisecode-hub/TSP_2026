import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import BounceBack from '../../assets/images/Homepage/Bounce back.svg';
import StandTall from '../../assets/images/Homepage/Stand Tall.svg';
import ChooseKind from '../../assets/images/Homepage/Choose Kind.svg';
import KeepGoing from '../../assets/images/Homepage/Keep Going.svg';
import FindTheGood from '../../assets/images/Homepage/Feel The Good.svg';
import StayTrue from '../../assets/images/Homepage/Stay True.svg';

const StrengthsSection = () => {
    const [ref, isVisible] = useScrollAnimation(0.1);
    const strengths = [
        {
            img: BounceBack,
            title: "Bounce Back",
            alt: "Bounce Back character card representing resilience and coping skills in children’s life skills learning",
            description: "RESILIENCE\nGrowing through challenges.",
            bgColor: "var(--color-yellow-gold)"
        },
        {
            img: StandTall,
            title: "Stand Tall",
            alt: "Stand Tall character card representing courage and brave choices in children’s life skills learning",
            description: "COURAGE\nTrying even when afraid.",
            bgColor: "var(--color-lime-green)"
        },
        {
            img: KeepGoing,
            title: "Keep Going",
            alt: "Keep Going character card representing perseverance and persistence in children’s life skills learning",
            description: "PERSEVERANCE\nTrying when it's hard.",
            bgColor: "var(--color-deep-purple)"
        },
        {
            img: ChooseKind,
            title: "Choose Kind",
            alt: "Choose Kind character card representing kindness and empathy in children’s life skills learning",
            description: "KINDNESS AND EMPATHY\nShowing compassion for self & others.",
            bgColor: "var(--color-red-orange)"
        },
        {
            img: FindTheGood,
            title: "Find the Good",
            alt: "Find the Good character card representing gratitude and positive thinking in children’s life skills learning",
            description: "GRATITUDE\nNoticing what is good.",
            bgColor: "var(--color-hot-pink)"
        },
        {
            img: StayTrue,
            title: "Stay True",
            alt: "Stay True character card representing honesty and integrity in children’s life skills learning",
            description: "INTEGRITY\nMaking wise choices.",
            bgColor: "var(--color-teal)"
        }
    ];

    return (
        <section className="pt-12 md:pt-20 pb-4 md:pb-6 px-8 max-w-[1200px] mx-auto text-center">
            <h2 className="text-2xl md:text-4xl text-[var(--color-navy)] mb-4 uppercase font-[var(--font-heading)] leading-tight font-bold" data-aos="fade-up">
                SIX ESSENTIAL STRENGTHS<br />THAT SHAPE CHARACTER
            </h2>
            <p className="text-base md:text-lg mb-8 md:mb-12 font-[var(--font-accent)]" style={{ color: '#636466' }} data-aos="fade-up" data-aos-delay="100">
                Values of life that define thoughts and actions
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 items-start" data-aos="fade-up" data-aos-delay="200">
                {strengths.map((s, index) => (
                    <div
                        key={index}
                        className="flip-card mx-auto w-full max-w-[320px] px-2"
                    >
                        <div className="flip-card-inner">
                            {/* Front of card */}
                            <div className="flip-card-front">
                                <img
                                    src={s.img}
                                    alt={s.alt}
                                    className="w-full h-auto block drop-shadow-2xl"
                                />
                            </div>

                            {/* Back of card */}
                            <div
                                className="flip-card-back shadow-2xl"
                                style={{ backgroundColor: s.bgColor }}
                            >
                                <div className="text-center">
                                    <h3 className="text-xl md:text-2xl font-bold font-[var(--font-heading)] text-white">{s.description.split('\n')[0]}</h3>
                                    <p className="text-base md:text-lg font-[var(--font-body)] leading-relaxed mt-2 text-white">
                                        {s.description.split('\n')[1] || ""}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mb-2 md:mb-4 px-4" data-aos="zoom-in" data-aos-offset="100">
                <Link to="/programs/inner-stars" className="btn-join font-bold uppercase text-sm md:text-2xl px-6 py-3 md:px-12 md:py-4 w-full md:w-auto rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                    BUILD LIFELONG STRENGTHS
                </Link>
            </div>
        </section>
    );
};

export default StrengthsSection;
