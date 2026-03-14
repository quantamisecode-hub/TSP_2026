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
import InnerStarsDifferentSvg from '../assets/Story/Different.svg';
import HowToJoinSvg from '../assets/images/Inner Stars/How to Join.svg';
import InnerStarsTailSvg from '../assets/Story/Inner Stars.svg';

const InnerStarsPage = () => {
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
            subtitleColor: "var(--color-teal)",
            highlightColor: "var(--color-teal)",
            isBlockHighlight: true,
            isBoldSubtitle: true
        }
    ];

    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

        // Handle anchor scroll
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
            // Aliases
            user_name: parentName,
            user_email: form.parent_email.value,
            reply_to: form.parent_email.value,
            to_email: EMAILJS_CONFIG.ADMIN_EMAIL,
            from_name: parentName
        };

        setIsLoading(true);

        // Send email to Admin
        emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams,
            EMAILJS_CONFIG.PUBLIC_KEY
        ).then((result) => {
            console.log('Email successfully sent!', result.text);
            setIsLoading(false);
            setSnackbar({
                show: true,
                message: 'Thank you! Your enrollment request has been sent successfully.',
                type: 'success'
            });
            form.reset();
        }, (error) => {
            console.error('Email failed to send:', error);
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
            <section className="inner-stars-hero-section">
                <div className="inner-stars-card" data-aos="fade-up">
                    <div className="card-content flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">
                        <div className="card-image w-full lg:w-1/2 flex justify-center lg:justify-start" data-aos="fade-right" data-aos-delay="200">
                            <img src={BoxSvg} alt="Inner Stars Box" className="box-svg-asset" />
                        </div>
                        <div className="card-text w-full lg:w-1/2 text-center lg:text-left" data-aos="fade-left" data-aos-delay="400">
                            <h1 className="is-title">INNER STARS</h1>
                            <h2 className="is-subtitle">Character building</h2>
                            <p className="is-description">
                                Foundations for resilience and habits<br className="hidden lg:block" />
                                of mind for learning and life
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="why-carousel-section pt-20 lg:pt-32 pb-10 lg:pb-16 overflow-hidden">
                <div className="max-w-[1280px] mx-auto px-6 relative h-[800px] md:h-[600px] lg:h-[550px]">
                    <div className="carousel-container h-full">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`carousel-slide absolute inset-0 transition-opacity duration-1000 
                                ${index === currentSlide ? 'opacity-1 active' : 'opacity-0 pointer-events-none'}`}
                            >
                                <div className="carousel-card bg-white rounded-[2rem] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 h-full">
                                    <div className="flex-1 order-2 lg:order-1 slide-text-content text-center lg:text-left">
                                        <h2 className="why-title mb-6">WHY INNER STRENGTHS MATTER</h2>
                                        <div className="why-questions mb-8">
                                            <div className="text-[var(--color-grey-text)] text-lg md:text-xl leading-relaxed">
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
                                        <p className="text-[var(--color-grey-text)] opacity-80 text-base md:text-lg mb-10 max-w-md mx-auto lg:mx-0">
                                            {slide.description}
                                        </p>
                                        <a 
                                            href="#" 
                                            onClick={openCalendly}
                                            className="why-cta-btn"
                                        >
                                            BOOK A FREE 15 MINUTE CALL
                                        </a>
                                    </div>
                                    <div className="flex-1 order-1 lg:order-2 flex justify-center lg:justify-end slide-image-content">
                                        <img src={slide.image} alt="Why Strengths Matter" className="w-full max-w-[450px] h-auto" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Dots */}
                    <div className="carousel-dots flex justify-center gap-4 absolute bottom-0 left-0 right-0 z-10 p-4">
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

            <section className="life-skills-section pt-10 lg:pt-16 pb-4 lg:pb-8 bg-[var(--color-white)] text-center">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div data-aos="fade-up">
                        <h2 className="life-skills-title " style={{ color: 'var(--color-dark-navy)', fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>LIFE SKILLS</h2>
                        <p className="life-skills-subtitle text-[var(--color-grey-text)] text-lg md:text-xl max-w-2xl mx-auto opacity-80">
                            Inner Stars brings life skills into education by building resilience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8 lg:gap-12 max-w-[1200px] mx-auto" data-aos="fade-up" data-aos-delay="200">
                        {/* Card 1: Growing Strong Humans */}
                        <div className="relative w-full aspect-[377.77/424.54] overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                            <img src={LifeSkillsSvg} alt="" aria-hidden="true" className="absolute top-0 h-full w-[347.603%] max-w-none" style={{ left: '-13.94%' }} />
                            <div className="absolute left-0 right-0 flex items-center justify-center px-4 pointer-events-none" style={{ top: '56.78%', height: '26.89%' }}>
                                <h3 className="text-white font-bold text-center text-base sm:text-lg lg:text-xl leading-tight mt-8 sm:mt-10 lg:mt-12">Growing Strong Humans</h3>
                            </div>
                        </div>

                        {/* Card 2: Building Habits of Mind */}
                        <div className="relative w-full aspect-[377.77/424.54] overflow-hidden group hover:-translate-y-2 transition-transform duration-300 -mt-[100px] md:mt-0">
                            <img src={LifeSkillsSvg} alt="" aria-hidden="true" className="absolute top-0 h-full w-[347.603%] max-w-none" style={{ left: '-123.8%' }} />
                            <div className="absolute left-0 right-0 flex items-center justify-center px-4 pointer-events-none" style={{ top: '56.78%', height: '26.89%' }}>
                                <h3 className="text-white font-bold text-center text-base sm:text-lg lg:text-xl leading-tight mt-8 sm:mt-10 lg:mt-12">Building Habits of Mind</h3>
                            </div>
                        </div>

                        {/* Card 3: Shaping Character & Values */}
                        <div className="relative w-full aspect-[377.77/424.54] overflow-hidden group hover:-translate-y-2 transition-transform duration-300 -mt-[100px] md:mt-0">
                            <img src={LifeSkillsSvg} alt="" aria-hidden="true" className="absolute top-0 h-full w-[347.603%] max-w-none" style={{ left: '-233.66%' }} />
                            <div className="absolute left-0 right-0 flex items-center justify-center px-2 pointer-events-none" style={{ top: '56.78%', height: '26.89%' }}>
                                <h3 className="text-white font-bold text-center text-base sm:text-lg lg:text-xl leading-tight mt-8 sm:mt-10 lg:mt-12">Shaping Character & Values</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="what-children-learn-section pt-4 lg:pt-8 pb-16 lg:pb-24">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div data-aos="fade-up" className="text-center mb-8 lg:mb-12">
                        <h2 className="mb-4" style={{ color: 'var(--color-dark-navy)', fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                            WHAT CHILDREN LEARN
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-[1200px] mx-auto" data-aos="fade-up" data-aos-delay="200">
                        {/* Card 1: Yellow */}
                        <div className="relative w-full aspect-[377.77/230.79] overflow-hidden rounded-[23px] group hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md">
                            <img src={WhatChildrenLearnSvg} alt="" aria-hidden="true" className="absolute top-0 h-auto w-[347.603%] max-w-none" style={{ left: '-14.97%', top: '-21.43%' }} />
                            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col items-center justify-start text-white text-center pt-8 sm:pt-10">
                                <h3 className="font-bold text-base sm:text-lg leading-tight tracking-wide mb-1">NOTICE & NAME</h3>
                                <p className="text-xs sm:text-sm leading-tight">Emotions to build</p>
                                <p className="font-bold text-xs sm:text-sm mt-0.5">Resilience</p>
                            </div>
                        </div>

                        {/* Card 2: Green */}
                        <div className="relative w-full aspect-[377.77/230.79] overflow-hidden rounded-[23px] group hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md">
                            <img src={WhatChildrenLearnSvg} alt="" aria-hidden="true" className="absolute top-0 h-auto w-[347.603%] max-w-none" style={{ left: '-123.8%', top: '-21.43%' }} />
                            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col items-start justify-center text-white w-[65%]">
                                <h3 className="font-bold text-base sm:text-lg leading-tight tracking-wide mb-2">TAKE<br />BRAVE STEPS</h3>
                                <p className="text-xs sm:text-sm leading-tight">and try new things</p>
                                <p className="text-xs sm:text-sm leading-tight mt-1">to build <span className="font-bold">Courage</span></p>
                            </div>
                        </div>

                        {/* Card 3: Orange */}
                        <div className="relative w-full aspect-[377.77/230.79] overflow-hidden rounded-[23px] group hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md">
                            <img src={WhatChildrenLearnSvg} alt="" aria-hidden="true" className="absolute top-0 h-auto w-[347.603%] max-w-none" style={{ left: '-232.63%', top: '-21.43%' }} />
                            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col items-start justify-start text-white pt-8 sm:pt-10 pl-6 sm:pl-8">
                                <h3 className="font-bold text-base sm:text-lg leading-tight tracking-wide mb-1">KEEP GOING</h3>
                                <p className="text-xs sm:text-sm leading-tight">with effort and focus</p>
                                <p className="text-xs sm:text-sm leading-tight mt-1">to build <span className="font-bold">Perseverance</span></p>
                            </div>
                        </div>

                        {/* Card 4: Purple */}
                        <div className="relative w-full aspect-[377.77/230.79] overflow-hidden rounded-[23px] group hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md">
                            <img src={WhatChildrenLearnSvg} alt="" aria-hidden="true" className="absolute top-0 h-auto w-[347.603%] max-w-none" style={{ left: '-14.97%', top: '-137.31%' }} />
                            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col items-start justify-center text-white pl-[35%] sm:pl-[40%]">
                                <h3 className="font-bold text-base sm:text-lg leading-tight tracking-wide mb-1">SHOW CARE,</h3>
                                <p className="text-xs sm:text-sm leading-tight">empathy, & compassion</p>
                                <p className="text-xs sm:text-sm leading-tight mt-1">to build <span className="font-bold">Kindness</span></p>
                            </div>
                        </div>

                        {/* Card 5: Pink */}
                        <div className="relative w-full aspect-[377.77/230.79] overflow-hidden rounded-[23px] group hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md">
                            <img src={WhatChildrenLearnSvg} alt="" aria-hidden="true" className="absolute top-0 h-auto w-[347.603%] max-w-none" style={{ left: '-123.8%', top: '-137.31%' }} />
                            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col items-start justify-center text-white w-2/3">
                                <h3 className="font-bold text-base sm:text-lg leading-tight tracking-wide mb-2">LOOK<br />FOR THE GOOD</h3>
                                <p className="text-xs sm:text-sm leading-tight">and practise</p>
                                <p className="text-xs sm:text-sm leading-tight">thankfulness</p>
                                <p className="text-xs sm:text-sm leading-tight mt-1">to build <span className="font-bold">Gratitude</span></p>
                            </div>
                        </div>

                        {/* Card 6: Teal */}
                        <div className="relative w-full aspect-[377.77/230.79] overflow-hidden rounded-[23px] group hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md">
                            <img src={WhatChildrenLearnSvg} alt="" aria-hidden="true" className="absolute top-0 h-auto w-[347.603%] max-w-none" style={{ left: '-232.63%', top: '-137.31%' }} />
                            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col items-center justify-start text-white text-center pt-8 sm:pt-10">
                                <h3 className="font-bold text-base sm:text-lg leading-tight tracking-wide mb-1">MAKE CHOICES</h3>
                                <p className="text-xs sm:text-sm leading-tight">that match their values</p>
                                <p className="text-xs sm:text-sm leading-tight mt-1">to build <span className="font-bold">Integrity</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="inside-a-lesson-section pt-10 lg:pt-16 pb-10 lg:pb-16">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div data-aos="fade-up" className="text-center mb-8 lg:mb-12">
                        <h2 className="mb-4" style={{ color: 'var(--color-dark-navy)', fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                            INSIDE A LESSON
                        </h2>
                    </div>

                    <div className="w-full max-w-[1280px] mx-auto relative group" data-aos="fade-up" data-aos-delay="200">
                        <img src={InsideALessonSvg} alt="Inside a Lesson Interactive Journey" className="w-full h-auto scale-110 origin-top" />

                        {/* Interactive Sneak Peek Button Overlay */}
                        <a
                            href="#enrollment-form"
                            className="absolute cursor-pointer rounded-full transition-all duration-300 hover:bg-white/10"
                            style={{
                                top: '10%',
                                left: '60%',
                                width: '13%',
                                height: '22%',
                                transform: 'translate(-50%, -50%)'
                            }}
                            title="Take a Sneak Peek"
                        >
                        </a>
                    </div>
                </div>
            </section>

            <section className="how-different-section pt-12 lg:pt-20 pb-4 lg:pb-6">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="bg-[var(--color-dark-navy)] rounded-[2.5rem] lg:rounded-[4rem] px-8 py-10 lg:px-16 lg:py-16 flex flex-col shadow-lg" data-aos="fade-up">

                        {/* Title */}
                        <div className="text-center mb-10 lg:mb-16">
                            <h2 className="mb-0" style={{ color: '#ecaa19', fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                HOW INNER STARS IS DIFFERENT
                            </h2>
                        </div>

                        {/* Content Grid */}
                        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-[1050px] mx-auto gap-12 lg:gap-16">

                            {/* Left: Illustration */}
                            <div className="w-full lg:w-[45%] flex justify-center lg:justify-end" data-aos="fade-right" data-aos-delay="100">
                                <img src={InnerStarsDifferentSvg} alt="Inner Stars Characters Holding Hands" className="w-[90%] max-w-[450px] lg:max-w-none h-auto mix-blend-screen scale-110 lg:scale-125 lg:origin-right" />
                            </div>

                            {/* Right: Text Content */}
                            <div className="w-full lg:w-1/2 flex flex-col justify-center" data-aos="fade-left" data-aos-delay="200">
                                <h3 className="text-[var(--color-hot-pink)] font-bold text-xl lg:text-2xl mb-6 tracking-wide drop-shadow-sm">
                                    INNER STARS BUILDS:
                                </h3>

                                <ul className="space-y-4 mb-10 pl-2 lg:pl-0">
                                    <li className="flex items-start">
                                        <span className="text-[var(--color-white)] mr-4 text-xl leading-snug">•</span>
                                        <span className="text-[var(--color-white)] text-base lg:text-[1.1rem] leading-snug font-light tracking-wide">Everyday language children use in real life</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[var(--color-white)] mr-4 text-xl leading-snug">•</span>
                                        <span className="text-[var(--color-white)] text-base lg:text-[1.1rem] leading-snug font-light tracking-wide">Simple visuals they can remember</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[var(--color-white)] mr-4 text-xl leading-snug">•</span>
                                        <span className="text-[var(--color-white)] text-base lg:text-[1.1rem] leading-snug font-light tracking-wide">Habits of mind they can practise anywhere</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[var(--color-white)] mr-4 text-xl leading-snug">•</span>
                                        <span className="text-[var(--color-white)] text-base lg:text-[1.1rem] leading-snug font-light tracking-wide">Character and mindset taught through stories,<br className="hidden lg:block" /> movement, and reflection</span>
                                    </li>
                                </ul>

                                <p className="text-[#ecaa19] text-base lg:text-[1.1rem] leading-snug lg:pr-10">
                                    This isn't a lesson about wellbeing. It's a way<br className="hidden lg:block" /> of growing from the inside out.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="two-ways-to-join-section pt-0 lg:pt-6 pb-0 lg:pb-8 bg-white">
                <div className="max-w-[1000px] mx-auto px-6">
                    <div className="text-center mb-0 lg:mb-8" data-aos="fade-up">
                        <h2 className="ls-join-section-title">
                            TWO WAYS TO JOIN
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 -mt-12 md:mt-0">

                        {/* Pink Card */}
                        <div className="ls-join-card pink-variant" data-aos="fade-up" data-aos-delay="100">
                            {/* SVG Background Slice (Left Half) */}
                            <img src={HowToJoinSvg} alt="" aria-hidden="true" className="ls-join-svg-bg left-slice" />

                            {/* Text Content */}
                            <div className="ls-join-card-content pink-text-offset">
                                <div className="ls-join-card-header">
                                    <h3 className="ls-join-card-title pink-title">SATURDAYS SESSIONS</h3>
                                    <p className="ls-join-card-subtitle pink-subtitle">Weekend Sessions</p>
                                </div>

                                <ul className="ls-join-card-list">
                                    <li>Two inner strengths<br />each term</li>
                                    <li>All six strengths explored<br />over the year</li>
                                    <li>Builds skills step by step<br />through the term</li>
                                </ul>
                            </div>
                        </div>

                        {/* Green Card */}
                        <div className="ls-join-card green-variant" data-aos="fade-up" data-aos-delay="200">
                            {/* SVG Background Slice (Right Half) */}
                            <img src={HowToJoinSvg} alt="" aria-hidden="true" className="ls-join-svg-bg right-slice" />

                            {/* Text Content */}
                            <div className="ls-join-card-content green-text-offset">
                                <div className="ls-join-card-header">
                                    <h3 className="ls-join-card-title green-title">HOLIDAYS INTENSIVES</h3>
                                    <p className="ls-join-card-subtitle green-subtitle">2 to 6 Days Over 2 Weeks*</p>
                                </div>

                                <ul className="ls-join-card-list">
                                    <li>Two inner strengths<br />at a time</li>
                                    <li>Immersive, hands on,<br />and fun</li>
                                    <li>Ideal for school holiday<br />learning</li>
                                </ul>

                                <p className="ls-join-card-disclaimer">*Starting mid 2026</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Bottom Tail Graphic */}
            <div className="ls-tail-container" data-aos="fade-up">
                <img
                    src={InnerStarsTailSvg}
                    alt=""
                    aria-hidden="true"
                    className="ls-tail-image"
                />
            </div>

            {/* Enrollment Form Section */}
            <section id="enrollment-form" className="ls-enrollment-section">
                <div className="max-w-[800px] mx-auto px-6">
                    <div className="text-center mb-12" data-aos="fade-up">
                        <h2 className="text-[1.8rem] lg:text-[2.2rem] font-bold tracking-wider uppercase text-[#122f52]" style={{ fontFamily: 'var(--font-heading)' }}>
                            SECURE YOUR CHILD'S PLACE
                        </h2>
                    </div>

                    <form className="space-y-6" data-aos="fade-up" data-aos-delay="200" onSubmit={handleEnrollSubmit}>
                        {/* Row 1: Child Name & Age */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="sm:col-span-2">
                                <input
                                    type="text"
                                    name="child_name"
                                    placeholder="Child Name"
                                    required
                                    className="w-full px-6 py-4 rounded-[20px] border border-gray-300 bg-white/50 focus:outline-none focus:border-[var(--color-hot-pink)] text-gray-600 font-medium placeholder:text-gray-400"
                                />
                            </div>
                            <div className="sm:col-span-1">
                                <input
                                    type="text"
                                    name="child_age"
                                    placeholder="Age"
                                    required
                                    className="w-full px-6 py-4 rounded-[20px] border border-gray-300 bg-white/50 focus:outline-none focus:border-[var(--color-hot-pink)] text-gray-600 font-medium placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Row 2: Parent Name */}
                        <div>
                            <input
                                type="text"
                                name="parent_name"
                                placeholder="Parent Name"
                                required
                                className="w-full px-6 py-4 rounded-[20px] border border-gray-300 bg-white/50 focus:outline-none focus:border-[var(--color-hot-pink)] text-gray-600 font-medium placeholder:text-gray-400"
                            />
                        </div>

                        {/* Row 3: Email */}
                        <div>
                            <input
                                type="email"
                                name="parent_email"
                                placeholder="Email"
                                required
                                className="w-full px-6 py-4 rounded-[20px] border border-gray-300 bg-white/50 focus:outline-none focus:border-[var(--color-hot-pink)] text-gray-600 font-medium placeholder:text-gray-400"
                            />
                        </div>

                        {/* Row 4: Phone */}
                        <div>
                            <input
                                type="tel"
                                name="parent_phone"
                                placeholder="Phone"
                                required
                                className="w-full px-6 py-4 rounded-[20px] border border-gray-300 bg-white/50 focus:outline-none focus:border-[var(--color-hot-pink)] text-gray-600 font-medium placeholder:text-gray-400"
                            />
                        </div>

                        {/* Row 5: Program Selection */}
                        <div className="relative">
                            <select
                                name="program"
                                required
                                className="w-full px-6 py-4 rounded-[20px] border border-gray-300 bg-white/50 focus:outline-none focus:border-[var(--color-hot-pink)] text-gray-400 font-medium appearance-none"
                                defaultValue=""
                            >
                                <option value="" disabled>Program</option>
                                <option value="saturday">Saturday Sessions</option>
                                <option value="holiday">Holiday Intensives</option>
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 7.5L10 12.5L15 7.5" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>

                        <div className="text-center pt-8">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`btn-join inline-block font-bold uppercase tracking-widest px-12 py-4 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-3">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        SENDING...
                                    </div>
                                ) : (
                                    'ENROL NOW'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="is-testimonial-section pt-4 pb-16 lg:pt-6 lg:pb-24">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="testimonial-container relative bg-[#002147] rounded-[2.5rem] lg:rounded-[4rem] p-10 lg:p-20 overflow-hidden" data-aos="zoom-in">
                        <div className="testimonial-card relative bg-[#f15a24] rounded-[2rem] lg:rounded-[3rem] p-8 lg:p-16 z-10 flex flex-col items-center text-center">
                            {/* Quote Icon Top */}
                            <div className="absolute top-6 left-8 lg:top-10 lg:left-12 opacity-80">
                                <svg width="60" height="45" viewBox="0 0 75 56" fill="#002147">
                                    <path d="M0 56V34C0 23.3333 2.33333 14.8333 7 8.5C11.6667 2.16667 19.3333 0 30 0V11C23.3333 11 19 12.5 17 15.5C15 18.5 14 22.5 14 27.5V31H30V56H0ZM45 56V34C45 23.3333 47.3333 14.8333 52 8.5C56.6667 2.16667 64.3333 0 75 0V11C68.3333 11 64 12.5 62 15.5C60 18.5 59 22.5 59 27.5V31H75V56H45Z" />
                                </svg>
                            </div>

                            <p className="testimonial-text text-white text-lg lg:text-2xl font-medium leading-relaxed mb-8 relative z-10 px-4 lg:px-12">
                                As a mum, I've been amazed by the positive impact Inner Stars has had. My child is learning to understand their feelings, and I've noticed they are better able to express themselves and calm down when upset. I feel so grateful to have found a program that nurtures both the heart and the mind.
                            </p>

                            <div className="testimonial-author px-4 lg:px-8">
                                <p className="text-[#002147] font-bold text-lg lg:text-xl">— Mansi, parent of a 5 year old</p>
                            </div>

                            {/* Quote Icon Bottom */}
                            <div className="absolute bottom-6 right-8 lg:bottom-12 lg:right-16 opacity-80 rotate-180">
                                <svg width="60" height="45" viewBox="0 0 75 56" fill="#002147">
                                    <path d="M0 56V34C0 23.3333 2.33333 14.8333 7 8.5C11.6667 2.16667 19.3333 0 30 0V11C23.3333 11 19 12.5 17 15.5C15 18.5 14 22.5 14 27.5V31H30V56H0ZM45 56V34C45 23.3333 47.3333 14.8333 52 8.5C56.6667 2.16667 64.3333 0 75 0V11C68.3333 11 64 12.5 62 15.5C60 18.5 59 22.5 59 27.5V31H75V56H45Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
