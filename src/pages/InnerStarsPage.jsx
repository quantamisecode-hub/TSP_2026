import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailConfig';
import Snackbar from '../components/Snackbar';
import SEO from '../components/SEO';
import '../styles/inner-stars.css';

// Asset Import
import BoxSvg from '../assets/images/Inner Stars/Box.svg';
import WhyMatterSvg1 from '../assets/images/Inner Stars/Why Inner Strengths Matter 01.svg';
import WhyMatterSvg2 from '../assets/images/Inner Stars/Why Inner Strengths Matter 02.svg';
import WhyMatterSvg3 from '../assets/images/Inner Stars/Why Inner Strengths Matter 03.svg';
import WhyMatterSvg4 from '../assets/images/Inner Stars/Why Inner Strengths Matter 04.svg';
import LifeSkillsSvg from '../assets/images/Inner Stars/Life Skills.svg';
import WhatChildrenLearnSvg from '../assets/images/Inner Stars/What Children Learn.svg';
import InsideALessonSvg from '../assets/images/Inner Stars/Inside a Lessonsvg.svg';
import InsideALessonMobileSvg from '../assets/images/Inner Stars/Inside a Lessonsvg copy.svg';
import InnerStarsDifferentSvg from '../assets/Story/Different.svg';
import HowToJoinSvg from '../assets/images/Inner Stars/How to Join.svg';
import InnerStarsTailSvg from '../assets/Story/Inner Stars.svg';

import PebbleMeteorSvg from '../assets/images/Inner Stars/Pebble Or Meteor.svg';
import RocksStarsSvg from '../assets/images/Inner Stars/Rocks or Stars.svg';
import StarBreathSvg from '../assets/Story/Star Breath.svg';
import InsideALesson2Svg from '../assets/images/Inner Stars/Inside a Lesson 2.svg';

const InnerStarsPage = () => {
    const [isSneakPeekOpen, setIsSneakPeekOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'success' });
    const [isLoading, setIsLoading] = useState(false);

    const slides = [
        {
            subtitle: "We prepare children for tests.",
            highlight: "But what prepares them for life?",
            description: "Want to strengthen your child's resilience and habits of mind?",
            image: WhyMatterSvg1,
            highlightColor: "var(--color-hot-pink)",
            isBlockHighlight: true
        },
        {
            subtitle: "In a world shaped by AI, the most powerful skills are still human: ",
            highlight: [
                { text: "Courage.", color: "var(--color-lime-green)" },
                { text: " Resilience.", color: "var(--color-yellow-gold)" },
                { text: " Empathy.", color: "var(--color-deep-purple)" },
                { text: " Honesty.", color: "var(--color-teal)" }
            ],
            description: "Want to strengthen your child's resilience and habits of mind?",
            image: WhyMatterSvg2
        },
        {
            subtitle: "Between ages 5 to 12, children build the mindsets that guide them for life. And with 1 in 7 Australian children facing anxiety in primary school, ",
            highlight: "these skills matter more than ever.",
            description: "Want to strengthen your child's resilience and habits of mind?",
            image: WhyMatterSvg3,
            highlightColor: "var(--color-deep-purple)"
        },
        {
            subtitle: "Inner strengths are not optional.",
            highlight: "They are the foundation.",
            description: "Want to strengthen your child's resilience and habits of mind?",
            image: WhyMatterSvg4,
            isBlockHighlight: true,
            isBoldSubtitle: true,
            subtitleColor: "var(--color-teal)",
            highlightColor: "var(--color-teal)"
        }
    ];

    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

        const handleHashScroll = () => {
            const hash = window.location.hash;
            if (hash) {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    setTimeout(() => {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }
            } else {
                window.scrollTo(0, 0);
            }
        };

        handleHashScroll();
        window.addEventListener('hashchange', handleHashScroll);

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => {
            clearInterval(timer);
            window.removeEventListener('hashchange', handleHashScroll);
        };
    }, [slides.length]);

    const openCalendly = (e) => {
        e.preventDefault();
        if (window.Calendly) {
            window.Calendly.showPopupWidget('https://calendly.com/hello-thestarrypath-mglz/inner-stars-parent-call');
        }
    };

    const handleEnrollSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const programName = form.program.options[form.program.selectedIndex].text;
        const parentName = form.parent_name.value;
        const childName = form.child_name.value;

        const templateParams = {
            child_name: childName,
            child_age: form.child_age.value,
            parent_name: parentName,
            parent_email: form.parent_email.value,
            parent_phone: form.parent_phone.value,
            program: programName,
            preferred_time: "",
            subject: `Inner Stars Enrollment - ${childName}`,
            heading: "Inner Stars Enrollment",
            subheading: "A new enrollment request has been received.",
            auto_reply_message: `Our team will carefully review your request for the ${programName} program and will reach out to you soon to discuss the next steps for enrollment.`,
            message: "New enrollment request for Inner Stars.",
            logo_url: 'https://the-starry-path.vercel.app/Logo.png',
            user_name: parentName,
            user_email: form.parent_email.value,
            reply_to: form.parent_email.value,
            to_email: EMAILJS_CONFIG.ADMIN_EMAIL,
            from_name: parentName
        };

        setIsLoading(true);

        emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams,
            EMAILJS_CONFIG.PUBLIC_KEY
        ).then((result) => {
            setIsLoading(false);
            setSnackbar({
                show: true,
                message: 'Thank you! Your enrollment request has been sent successfully.',
                type: 'success'
            });
            form.reset();
        }, (error) => {
            setIsLoading(false);
            setSnackbar({
                show: true,
                message: 'Something went wrong. Please try again later.',
                type: 'error'
            });
        });
    };

    return (
        <div className="inner-stars-page">
            <SEO
                title="Building Resilience & Life Skills for Children | Inner Stars"
                description="Strengthen your child's emotional intelligence, courage, and resilience with the Inner Stars program. Evidence-based life skills coaching for children aged 5-12."
            />

            {/* Hero Section */}
            <section className="inner-stars-hero-section">
                <div className="inner-stars-card" data-aos="fade-up">
                    <div className="card-content flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">
                        <div className="card-image w-full lg:w-[55%] flex justify-center lg:justify-start" data-aos="fade-right" data-aos-delay="200">
                            <img src={BoxSvg} alt="Inner Stars Box" className="box-svg-asset" />
                        </div>
                        <div className="card-text w-full lg:w-[45%] text-center lg:text-left" data-aos="fade-left" data-aos-delay="400">
                            <h1 className="is-title">INNER STARS</h1>
                            <h2 className="is-subtitle">Character building</h2>
                            <p className="is-description">
                                Habits of minds for resilience<br />
                                and life skills for learning and life
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Strengths Matter Section */}
            <section className="why-carousel-section is-standard-section-py overflow-hidden">
                <div className="max-w-[1280px] mx-auto px-6 relative h-auto">
                    <div className="carousel-card bg-white rounded-[2rem] p-8 md:p-12 lg:p-16 h-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-24 relative overflow-hidden shadow-sm">

                        <div className="flex-1 order-2 lg:order-1 flex flex-col w-full h-full">
                            <h2 className="why-title mb-6 md:mb-8 text-center lg:text-left">WHY INNER STRENGTHS MATTER</h2>

                            <div className="grid grid-cols-1 grid-rows-1">
                                {slides.map((slide, index) => (
                                    <div
                                        key={index}
                                        className={`col-start-1 row-start-1 transition-all duration-1000 ${index === currentSlide ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-4 z-0 pointer-events-none'}`}
                                    >
                                        <div className="why-questions mb-6 md:mb-8 text-center lg:text-left">
                                            <div className="text-[var(--color-grey-text)] text-lg md:text-xl lg:text-2xl leading-relaxed">
                                                <span
                                                    className={slide.isBoldSubtitle ? 'font-bold' : ''}
                                                    style={{ color: slide.subtitleColor || 'var(--color-grey-text)' }}
                                                >
                                                    {slide.subtitle}
                                                </span>
                                                {Array.isArray(slide.highlight) ? (
                                                    slide.highlight.map((h, i) => (
                                                        <span key={i} className="font-bold" style={{ color: h.color }}>
                                                            {h.text}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span
                                                        className={`font-bold ${slide.isBlockHighlight ? 'block mt-1' : 'ml-1'}`}
                                                        style={{ color: slide.highlightColor }}
                                                    >
                                                        {slide.highlight}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-[var(--color-grey-text)] opacity-80 text-base md:text-lg lg:text-xl mb-8 md:mb-12 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                                            {slide.description}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center lg:text-left mt-4 md:mt-8">
                                <a href="#" onClick={openCalendly} className="why-cta-btn">
                                    BOOK A FREE 15-MINUTE CALL
                                </a>
                            </div>
                        </div>

                        <div className="flex-1 order-1 lg:order-2 flex justify-center lg:justify-end w-full h-[300px] md:h-[400px] lg:h-[450px] relative">
                            <div className="grid grid-cols-1 grid-rows-1 w-full h-full">
                                {slides.map((slide, index) => (
                                    <div
                                        key={index}
                                        className={`col-start-1 row-start-1 flex items-center justify-center lg:justify-end transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                                    >
                                        <img src={slide.image} alt="Why Strengths Matter" className="w-full max-w-[320px] md:max-w-[450px] h-full object-contain" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="carousel-dots flex justify-center gap-4 py-8">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-[var(--color-hot-pink)] w-10' : 'bg-gray-300 hover:bg-gray-400'}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Life Skills Section */}
            <section className="life-skills-section is-standard-section-py bg-[var(--color-white)] text-center">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div data-aos="fade-up">
                        <h2 className="is-section-title">LIFE SKILLS IN EDUCATION</h2>
                        <p className="life-skills-subtitle text-[var(--color-grey-text)] text-lg md:text-xl max-w-2xl mx-auto opacity-80 mb-8 md:mb-12">
                            Inner Stars brings life skills into education by building resilience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-12 max-w-[1200px] mx-auto mb-[-60px] md:mb-0" data-aos="fade-up" data-aos-delay="200">
                        <div className="relative w-full aspect-[377.77/424.54] overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                            <img src={LifeSkillsSvg} alt="" className="absolute top-0 h-full w-[347.603%] max-w-none" style={{ left: '-13.94%' }} />
                            <div className="absolute left-0 right-0 flex items-center justify-center px-4" style={{ top: '56.78%', height: '26.89%' }}>
                                <h3 className="text-white font-bold text-center text-base sm:text-lg lg:text-xl leading-tight mt-8">Growing Strong Humans</h3>
                            </div>
                        </div>
                        <div className="relative w-full aspect-[377.77/424.54] overflow-hidden group hover:-translate-y-2 transition-transform duration-300 -mt-[100px] md:mt-0">
                            <img src={LifeSkillsSvg} alt="" className="absolute top-0 h-full w-[347.603%] max-w-none" style={{ left: '-123.8%' }} />
                            <div className="absolute left-0 right-0 flex items-center justify-center px-4" style={{ top: '56.78%', height: '26.89%' }}>
                                <h3 className="text-white font-bold text-center text-base sm:text-lg lg:text-xl leading-tight mt-8">Building Habits of Mind</h3>
                            </div>
                        </div>
                        <div className="relative w-full aspect-[377.77/424.54] overflow-hidden group hover:-translate-y-2 transition-transform duration-300 -mt-[100px] md:mt-0">
                            <img src={LifeSkillsSvg} alt="" className="absolute top-0 h-full w-[347.603%] max-w-none" style={{ left: '-233.66%' }} />
                            <div className="absolute left-0 right-0 flex items-center justify-center px-2" style={{ top: '56.78%', height: '26.89%' }}>
                                <h3 className="text-white font-bold text-center text-base sm:text-lg lg:text-xl leading-tight mt-8">Shaping Character & Values</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What Children Learn Section */}
            <section className="what-children-learn-section is-standard-section-py">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div data-aos="fade-up" className="text-center mb-8 lg:mb-12">
                        <h2 className="is-section-title">WHAT CHILDREN LEARN</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-[1200px] mx-auto" data-aos="fade-up" data-aos-delay="200">
                        {/* 6 learning cards code here... (truncating for brevity in thought, but full in CodeContent) */}
                        <div className="relative w-full aspect-[377.77/230.79] overflow-hidden rounded-[23px] group shadow-sm">
                            <img src={WhatChildrenLearnSvg} alt="" className="absolute top-0 h-auto w-[347.603%] max-w-none" style={{ left: '-14.97%', top: '-21.43%' }} />
                            <div className="absolute inset-0 p-6 flex flex-col items-start justify-start text-white pt-8 pl-10">
                                <h3 className="font-bold text-base sm:text-lg leading-tight mb-1">NOTICE & NAME</h3>
                                <p className="text-xs sm:text-sm">Emotions to build</p>
                                <p className="font-bold text-xs sm:text-sm mt-0.5">Resilience</p>
                            </div>
                        </div>
                        <div className="relative w-full aspect-[377.77/230.79] overflow-hidden rounded-[23px] group shadow-sm">
                            <img src={WhatChildrenLearnSvg} alt="" className="absolute top-0 h-auto w-[347.603%] max-w-none" style={{ left: '-123.8%', top: '-21.43%' }} />
                            <div className="absolute inset-0 p-6 flex flex-col items-start justify-center text-white w-[65%]">
                                <h3 className="font-bold text-base sm:text-lg leading-tight mb-2">TAKE BRAVE STEPS</h3>
                                <p className="text-xs sm:text-sm">and try new things</p>
                                <p className="text-xs sm:text-sm mt-1">to build <span className="font-bold">Courage</span></p>
                            </div>
                        </div>
                        <div className="relative w-full aspect-[377.77/230.79] overflow-hidden rounded-[23px] group shadow-sm">
                            <img src={WhatChildrenLearnSvg} alt="" className="absolute top-0 h-auto w-[347.603%] max-w-none" style={{ left: '-232.63%', top: '-21.43%' }} />
                            <div className="absolute inset-0 p-6 flex flex-col items-start justify-start text-white pt-8 pl-6">
                                <h3 className="font-bold text-base sm:text-lg leading-tight mb-1">KEEP GOING</h3>
                                <p className="text-xs sm:text-sm">with effort and focus</p>
                                <p className="text-xs sm:text-sm mt-1">to build <span className="font-bold">Perseverance</span></p>
                            </div>
                        </div>
                        <div className="relative w-full aspect-[377.77/230.79] overflow-hidden rounded-[23px] group shadow-sm">
                            <img src={WhatChildrenLearnSvg} alt="" className="absolute top-0 h-auto w-[347.603%] max-w-none" style={{ left: '-14.97%', top: '-137.31%' }} />
                            <div className="absolute inset-0 p-6 flex flex-col items-start justify-center text-white pl-[35%]">
                                <h3 className="font-bold text-base sm:text-lg leading-tight mb-1">SHOW CARE,</h3>
                                <p className="text-xs sm:text-sm">empathy, & compassion</p>
                                <p className="text-xs sm:text-sm mt-1">to build <span className="font-bold">Kindness</span></p>
                            </div>
                        </div>
                        <div className="relative w-full aspect-[377.77/230.79] overflow-hidden rounded-[23px] group shadow-sm">
                            <img src={WhatChildrenLearnSvg} alt="" className="absolute top-0 h-auto w-[347.603%] max-w-none" style={{ left: '-123.8%', top: '-137.31%' }} />
                            <div className="absolute inset-0 p-6 flex flex-col items-start justify-center text-white w-2/3">
                                <h3 className="font-bold text-base sm:text-lg leading-tight mb-2">LOOK FOR THE GOOD</h3>
                                <p className="text-xs sm:text-sm">and practise thankfulness</p>
                                <p className="text-xs sm:text-sm mt-1">to build <span className="font-bold">Gratitude</span></p>
                            </div>
                        </div>
                        <div className="relative w-full aspect-[377.77/230.79] overflow-hidden rounded-[23px] group shadow-sm">
                            <img src={WhatChildrenLearnSvg} alt="" className="absolute top-0 h-auto w-[347.603%] max-w-none" style={{ left: '-232.63%', top: '-137.31%' }} />
                            <div className="absolute inset-0 p-6 flex flex-col items-start justify-start text-white pt-8 pl-10">
                                <h3 className="font-bold text-base sm:text-lg leading-tight mb-1">MAKE CHOICES</h3>
                                <p className="text-xs sm:text-sm">that match their values</p>
                                <p className="text-xs sm:text-sm mt-1">to build <span className="font-bold">Integrity</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inside a Lesson Section */}
            <section className="inside-a-lesson-section is-standard-section-py">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div data-aos="fade-up" className="text-center mb-8 lg:mb-12">
                        <h2 className="is-section-title" style={{ color: 'var(--color-dark-navy)' }}>INSIDE A LESSON</h2>
                    </div>
                    <div className="w-full max-w-[1280px] mx-auto relative group" data-aos="fade-up">
                        <picture>
                            <source media="(max-width: 768px)" srcSet={InsideALessonMobileSvg} />
                            <img src={InsideALessonSvg} alt="Inside a Lesson" className="inside-lesson-img w-full h-auto origin-top" />
                        </picture>
                        <a onClick={(e) => { e.preventDefault(); setIsSneakPeekOpen(true); }} className="sneak-peek-btn absolute cursor-pointer" style={{ top: '18%', left: '70.3%', transform: 'translate(-50%, -50%)' }}>
                            Sneak Peak
                        </a>
                    </div>
                </div>
            </section>

            {/* How Different Section */}
            <section className="how-different-section is-standard-section-py">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="bg-[var(--color-dark-navy)] rounded-[2.5rem] lg:rounded-[4rem] px-8 py-10 lg:px-16 lg:py-16 flex flex-col shadow-lg" data-aos="fade-up">
                        <div className="text-center mb-8 md:mb-12">
                            <h2 className="is-diff-title">HOW INNER STARS IS DIFFERENT</h2>
                        </div>
                        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-[1050px] mx-auto gap-12 lg:gap-16">
                            <div className="w-full lg:w-[45%] flex justify-center lg:justify-end">
                                <img src={InnerStarsDifferentSvg} alt="Different" className="w-[90%] max-w-[450px] mix-blend-screen scale-110 lg:scale-125 lg:origin-right" />
                            </div>
                            <div className="w-full lg:w-1/2 flex flex-col justify-center">
                                <h3 className="text-[var(--color-hot-pink)] font-bold text-xl lg:text-2xl mb-6">INNER STARS BUILDS:</h3>
                                <ul className="space-y-4 mb-10 text-white">
                                    <li className="flex items-start"><span className="mr-4">•</span>Everyday language children use in real life</li>
                                    <li className="flex items-start"><span className="mr-4">•</span>Simple visuals they can remember</li>
                                    <li className="flex items-start"><span className="mr-4">•</span>Habits of mind they can practise anywhere</li>
                                    <li className="flex items-start"><span className="mr-4">•</span>Character and mindset taught through stories, movement, and reflection</li>
                                </ul>
                                <p className="text-[#ecaa19] text-base lg:text-[1.1rem]">This isn't a lesson about wellbeing. It's a way of growing from the inside out.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Two Ways To Join Section */}
            <section className="two-ways-to-join-section is-standard-section-py bg-white">
                <div className="max-w-[1000px] mx-auto px-6">
                    <div className="text-center mb-0 lg:mb-4" data-aos="fade-up">
                        <h2 className="ls-join-section-title">TWO WAYS TO JOIN</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 -mt-16 md:-mt-8">
                        <div className="ls-join-card pink-variant" data-aos="fade-up">
                            <img src={HowToJoinSvg} alt="" className="ls-join-svg-bg left-slice" />
                            <div className="ls-join-card-content ls-pink-nudge">
                                <h3 className="ls-join-card-title pink-title">SATURDAYS SESSIONS</h3>
                                <p className="ls-join-card-subtitle pink-subtitle">Weekend Sessions</p>
                                <ul className="ls-join-card-list">
                                    <li>Two inner strengths<br /> each term</li>
                                    <li>All six strengths explored<br /> over the year</li>
                                    <li>Builds skills step by step<br />through the term</li>
                                </ul>
                            </div>
                        </div>
                        <div className="ls-join-card green-variant" data-aos="fade-up" data-aos-delay="200">
                            <img src={HowToJoinSvg} alt="" className="ls-join-svg-bg right-slice" />
                            <div className="ls-join-card-content ls-green-nudge">
                                <h3 className="ls-join-card-title green-title">HOLIDAYS INTENSIVES</h3>
                                <p className="ls-join-card-subtitle green-subtitle">2 to 6 Days Over 2 Weeks*</p>
                                <ul className="ls-join-card-list">
                                    <li>Two inner strengths<br /> at a time</li>
                                    <li>Immersive, hands on,<br /> and fun</li>
                                    <li>Ideal for school holiday<br /> learning</li>
                                    <li>*Starting mid 2026</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tail Graphic */}
            <div className="ls-tail-container" data-aos="fade-up">
                <img src={InnerStarsTailSvg} alt="" className="ls-tail-image" />
            </div>

            {/* Enrollment Section */}
            <section id="enrollment-form" className="ls-enrollment-section is-standard-section-py">
                <div className="max-w-[800px] mx-auto px-6">
                    <div className="text-center mb-12" data-aos="fade-up">
                        <h2 className="is-enroll-title">SECURE YOUR CHILD'S PLACE</h2>
                    </div>
                    <form className="space-y-6" onSubmit={handleEnrollSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <input name="child_name" placeholder="Child Name" required className="sm:col-span-2 w-full px-6 py-4 rounded-[20px] border" />
                            <input name="child_age" placeholder="Age" required className="sm:col-span-1 w-full px-6 py-4 rounded-[20px] border" />
                        </div>
                        <input name="parent_name" placeholder="Parent Name" required className="w-full px-6 py-4 rounded-[20px] border" />
                        <input name="parent_email" type="email" placeholder="Email" required className="w-full px-6 py-4 rounded-[20px] border" />
                        <input name="parent_phone" type="tel" placeholder="Phone" required className="w-full px-6 py-4 rounded-[20px] border" />
                        <select name="program" required className="w-full px-6 py-4 rounded-[20px] border" defaultValue="">
                            <option value="" disabled>Program</option>
                            <option value="saturday">Saturday Sessions</option>
                            <option value="holiday">Holiday Intensives</option>
                        </select>
                        <div className="text-center pt-8">
                            <button type="submit" disabled={isLoading} className="btn-join px-12 py-4">
                                {isLoading ? 'SENDING...' : 'ENROL NOW'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="is-testimonial-section pt-4 pb-16 lg:pt-6 lg:pb-24">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="testimonial-container relative bg-[#002147] rounded-[2.5rem] p-10 lg:p-20 overflow-hidden" data-aos="zoom-in">
                        <div className="testimonial-card relative bg-[#f15a24] rounded-[2rem] p-8 lg:p-16 z-10 flex flex-col items-center text-center">
                            <p className="testimonial-text text-white text-lg lg:text-2xl font-medium leading-relaxed mb-8 px-4 lg:px-12">
                                As a mum, I've been amazed by the positive impact Inner Stars has had. My child is learning to understand their feelings, and I've noticed they are better able to express themselves and calm down when upset. I feel so grateful to have found a program that nurtures both the heart and the mind.
                            </p>
                            <p className="text-[#002147] font-bold">— Mansi, parent of a 5 year old</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sneak Peek Modal */}
            {isSneakPeekOpen && (
                <div className="ls-modal-overlay" onClick={() => setIsSneakPeekOpen(false)}>
                    <div className="ls-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="ls-modal-close" onClick={() => setIsSneakPeekOpen(false)}>&times;</button>
                        <h2 className="ls-modal-main-title">INSIDE A LESSON</h2>
                        <div className="ls-flip-scene">
                            <div className="ls-flip-card-inner">
                                <div className="ls-flip-card-front">
                                    <div className="ls-modal-cards-container">
                                        <div className="ls-peek-card ls-card-orange">
                                            <h3 className="ls-card-title">
                                                <span>Is this <br /> a pebble problem <br /> or a <br /> meteor problem?</span>
                                            </h3>
                                            <div className="ls-card-svg-wrapper ls-pebble-wrapper">
                                                <img src={PebbleMeteorSvg} alt="Pebble or Meteor" />
                                                <span className="ls-or-overlay">OR</span>
                                            </div>
                                            <div className="ls-card-labels"><span>Pebble</span><span>Meteor</span></div>
                                        </div>
                                        <div className="ls-peek-card ls-card-teal">
                                            <h3 className="ls-card-title">
                                                <span>Is your <br /> jar full <br /> of stars <br /> or rocks?</span>
                                            </h3>
                                            <div className="ls-card-svg-wrapper">
                                                <img src={RocksStarsSvg} alt="Rocks or Stars" />
                                                <span className="ls-or-overlay">OR</span>
                                            </div>
                                        </div>
                                        <div className="ls-peek-card ls-card-green">
                                            <h3 className="ls-card-title"><span>Star Breathing</span></h3>
                                            <div className="ls-card-svg-wrapper ls-star-wrapper">
                                                <img src={StarBreathSvg} alt="Star Breath" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ls-flip-card-back">
                                    <img src={InsideALesson2Svg} alt="Inside a Lesson Details" className="ls-back-illustration" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Snackbar
                show={snackbar.show}
                message={snackbar.message}
                type={snackbar.type}
                onClose={() => setSnackbar({ ...snackbar, show: false })}
            />
        </div>
    );
};

export default InnerStarsPage;
