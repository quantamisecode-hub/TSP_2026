import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailConfig';
import Snackbar from '../components/Snackbar';
import SEO from '../components/SEO';
import HiddenNavigation from '../components/HiddenNavigation';
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

import PopUp1Svg from '../assets/images/Learning Star/Pop up/1.svg';
import PopUp2Svg from '../assets/images/Learning Star/Pop up/2.svg';
import PopUp3Svg from '../assets/images/Learning Star/Pop up/3.svg';
import PopUp4Svg from '../assets/images/Learning Star/Pop up/4.svg';
import PopUp5Svg from '../assets/images/Learning Star/Pop up/5.svg';
import PopUp6Svg from '../assets/images/Learning Star/Pop up/6.svg';

const InnerStarsPage = () => {
    const location = useLocation();
    const [isSneakPeekOpen, setIsSneakPeekOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [openFaq, setOpenFaq] = useState(0);
    const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'success' });
    const [isLoading, setIsLoading] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const testimonialTimerRef = useRef(null);

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
    }, [location]);

    const testimonials = [
        {
            text: "As a mum, I've been amazed by the positive impact Inner Stars has had. My child is learning to understand their feelings, and I've noticed they are better able to express themselves and calm down when upset. I feel so grateful to have found a program that nurtures both the heart and the mind.",
            author: "— Mansi, parent of a 5 year old"
        },
        {
            text: "Thank you for starting this initiative. My daughter likes to attend all sessions and is learning a lot about her big emotions in a fun and playful way. I am hopeful it would help her to deal with emotions and life gradually by following all strategies and frameworks to understand self and the world. I definitely recommend The Starry Path way to learn life skills to all the children to make them stronger and resilient.",
            author: "— Shruti K, parent of a 5 year old"
        }
    ];

    const startTestimonialAutoplay = () => {
        if (testimonialTimerRef.current) clearInterval(testimonialTimerRef.current);
        testimonialTimerRef.current = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
    };

    const handleTestimonialDotClick = (index) => {
        setActiveTestimonial(index);
        startTestimonialAutoplay();
    };

    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        startTestimonialAutoplay();

        return () => {
            clearInterval(timer);
            if (testimonialTimerRef.current) {
                clearInterval(testimonialTimerRef.current);
            }
        };
    }, []);

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
            logo_url: 'https://thestarrypath.com.au/Logo.png',
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

    const seoLinks = [
        { label: "Programs", to: "/programs" },
        { label: "Learning Stars", to: "/programs/learning-stars" },
        { label: "Homepage", to: "/" },
        { label: "Book Now", to: "/book-now" }
    ];

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://thestarrypath.com.au/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Programs",
                        "item": "https://thestarrypath.com.au/programs"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Inner Stars",
                        "item": "https://thestarrypath.com.au/programs/inner-stars"
                    }
                ]
            },
            {
                "@type": "Service",
                "name": "Inner Stars Life Skills Program",
                "description": "A life skills program for children aged 5-12 in Point Cook, building resilience, mindset, and emotional intelligence.",
                "provider": {
                    "@type": "EducationalOrganization",
                    "name": "The Starry Path",
                    "url": "https://thestarrypath.com.au/"
                },
                "areaServed": "Point Cook, VIC",
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Inner Stars Sessions",
                    "itemListElement": [
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Saturday Sessions" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Holiday Intensives" } }
                    ]
                }
            }
        ]
    };

    return (
        <div className="inner-stars-page">
            <SEO
                title="Inner Stars | Life Skills Program for Kids Point Cook"
                description="Inner Stars is a life skills program for children aged 5–12 in Point Cook, helping children build resilience, mindset, emotional intelligence, and positive habits for everyday life."
                keywords={[
                    "life skills for kids Point Cook",
                    "kids life skills program Point Cook",
                    "resilience for children",
                    "mindset for kids",
                    "emotional intelligence for children",
                    "positive behaviour development",
                    "life skills program for children"
                ]}
                schema={schema}
            />

            {/* Hero Section */}
            <section className="inner-stars-hero-section">
                <div className="inner-stars-card" data-aos="fade-up">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-24">
                        <div className="w-full md:w-[50%] flex justify-center md:justify-end" data-aos="fade-right" data-aos-delay="200">
                            <img src={BoxSvg} alt="Inner Stars Box" className="box-svg-asset max-w-[320px] md:max-w-none md:w-full h-auto" />
                        </div>
                        <div className="w-full md:w-[50%] text-center md:text-left" data-aos="fade-left" data-aos-delay="400">
                            <h1 className="is-title tracking-widest">INNER STARS</h1>
                            <h2 className="is-subtitle" style={{ color: 'var(--color-teal)', textTransform: 'none', letterSpacing: 'normal' }}>Character building</h2>
                            <p className="is-description mt-4">
                                Habits of minds for resilience<br className="hidden md:block" />
                                and life skills for learning and life
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Strengths Matter Section */}
            <section className="why-carousel-section is-standard-section-py overflow-hidden">
                <div className="max-w-[1280px] mx-auto px-8 relative h-auto">
                    <div className="carousel-card bg-white rounded-[2rem] p-8 md:p-12 lg:p-16 h-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-24 relative overflow-hidden shadow-sm">

                        <div className="flex-1 order-2 lg:order-1 flex flex-col w-full h-full">
                            <h2 className="why-title mb-6 md:mb-8 text-center lg:text-left">WHY INNER <br className='md:hidden' /> STRENGTHS MATTER</h2>

                            <div className="grid grid-cols-1 grid-rows-1">
                                {slides.map((slide, index) => (
                                    <div
                                        key={index}
                                        className={`col-start-1 row-start-1 transition-all duration-1000 ${index === currentSlide ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-4 z-0 pointer-events-none'}`}
                                    >
                                        <div className="why-questions mb-6 md:mb-8 text-center lg:text-left">
                                            <div className="text-[var(--color-grey-text)] text-lg md:text-xl lg:text-2xl leading-tight">
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
                                                        className={`font-bold ${slide.isBlockHighlight ? 'block' : 'ml-1'}`}
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
                                        <img src={slide.image} alt="Inner Stars section explaining why life skills, resilience, and healthy habits matter for children during the primary school years" className="w-full max-w-[320px] md:max-w-[450px] h-full object-contain" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="carousel-dots flex justify-center gap-4 py-4">
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
                <div className="max-w-[1280px] mx-auto px-8">
                    <div data-aos="fade-up">
                        <h2 className="is-section-title" style={{ textTransform: 'none' }}>Life Skills in Education</h2>
                        <p className="life-skills-subtitle text-[var(--color-grey-text)] text-lg md:text-xl max-w-2xl mx-auto opacity-80 mb-8 md:mb-12 leading-[1.1]">
                            Teaching life lessons and core is human values. for resilience and character development
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-12 max-w-[1200px] mx-auto mb-[-60px] md:mb-0" data-aos="fade-up" data-aos-delay="200">
                        <div className="relative w-full aspect-[377.77/424.54] overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                            <img src={LifeSkillsSvg} alt="Section highlighting life skills in education and the role of Inner Stars in building resilience and mindset for children" className="absolute top-0 h-full w-[347.603%] max-w-none" style={{ left: '-13.94%' }} />

                        </div>
                        <div className="relative w-full aspect-[377.77/424.54] overflow-hidden group hover:-translate-y-2 transition-transform duration-300 -mt-[100px] md:mt-0">
                            <img src={LifeSkillsSvg} alt="Section highlighting life skills in education and the role of Inner Stars in building resilience and mindset for children" className="absolute top-0 h-full w-[347.603%] max-w-none" style={{ left: '-123.8%' }} />

                        </div>
                        <div className="relative w-full aspect-[377.77/424.54] overflow-hidden group hover:-translate-y-2 transition-transform duration-300 -mt-[100px] md:mt-0">
                            <img src={LifeSkillsSvg} alt="Section highlighting life skills in education and the role of Inner Stars in building resilience and mindset for children" className="absolute top-0 h-full w-[347.603%] max-w-none" style={{ left: '-233.66%' }} />

                        </div>
                    </div>
                </div>
            </section>

            {/* What Children Learn Section */}
            <section className="what-children-learn-section is-standard-section-py">
                <div className="max-w-[1280px] mx-auto px-8">
                    <div data-aos="fade-up" className="text-center mb-8 lg:mb-12">
                        <h2 className="is-section-title">WHAT CHILDREN LEARN</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-[1200px] mx-auto" data-aos="fade-up" data-aos-delay="200">
                        {/* 6 learning cards code here... (truncating for brevity in thought, but full in CodeContent) */}
                        <div className="relative w-full aspect-[377.77/230.79] overflow-hidden rounded-[23px] group shadow-sm">
                            <img src={WhatChildrenLearnSvg} alt="Life skills lesson cards showing children learning to notice thoughts, take brave steps, keep going, look for the good, and make wise choices" className="absolute top-0 h-auto w-[347.603%] max-w-none" style={{ left: '-14.97%', top: '-21.43%' }} />
                            <div className="absolute inset-0 p-6 flex flex-col items-start justify-start text-white pt-8 pl-10">
                                <h3 className="font-bold text-base sm:text-lg leading-tight mb-1">NOTICE & NAME</h3>
                                <p className="text-xs sm:text-sm">Emotions to build</p>
                                <p className="font-bold text-xs sm:text-sm mt-0.5">Resilience</p>
                            </div>
                        </div>
                        <div className="relative w-full aspect-[377.77/230.79] overflow-hidden rounded-[23px] group shadow-sm">
                            <img src={WhatChildrenLearnSvg} alt="Life skills lesson cards showing children learning to notice thoughts, take brave steps, keep going, look for the good, and make wise choices" className="absolute top-0 h-auto w-[347.603%] max-w-none" style={{ left: '-123.8%', top: '-21.43%' }} />
                            <div className="absolute inset-0 p-6 flex flex-col items-start justify-center text-white w-[65%]">
                                <h3 className="font-bold text-base sm:text-lg leading-tight mb-2">TAKE BRAVE STEPS</h3>
                                <p className="text-xs sm:text-sm">and try new things</p>
                                <p className="text-xs sm:text-sm mt-1">to build <span className="font-bold">Courage</span></p>
                            </div>
                        </div>
                        <div className="relative w-full aspect-[377.77/230.79] overflow-hidden rounded-[23px] group shadow-sm">
                            <img src={WhatChildrenLearnSvg} alt="Life skills lesson cards showing children learning to notice thoughts, take brave steps, keep going, look for the good, and make wise choices" className="absolute top-0 h-auto w-[347.603%] max-w-none" style={{ left: '-232.63%', top: '-21.43%' }} />
                            <div className="absolute inset-0 p-6 flex flex-col items-start justify-start text-white pt-8 pl-6">
                                <h3 className="font-bold text-base sm:text-lg leading-tight mb-1">KEEP GOING</h3>
                                <p className="text-xs sm:text-sm">with effort and focus</p>
                                <p className="text-xs sm:text-sm mt-1">to build <span className="font-bold">Perseverance</span></p>
                            </div>
                        </div>
                        <div className="relative w-full aspect-[377.77/230.79] overflow-hidden rounded-[23px] group shadow-sm">
                            <img src={WhatChildrenLearnSvg} alt="Life skills lesson cards showing children learning to notice thoughts, take brave steps, keep going, look for the good, and make wise choices" className="absolute top-0 h-auto w-[347.603%] max-w-none" style={{ left: '-14.97%', top: '-137.31%' }} />
                            <div className="absolute inset-0 p-6 flex flex-col items-start justify-center text-white pl-[35%]">
                                <h3 className="font-bold text-base sm:text-lg leading-tight mb-1">SHOW CARE,</h3>
                                <p className="text-xs sm:text-sm">empathy, & compassion</p>
                                <p className="text-xs sm:text-sm mt-1">to build <span className="font-bold">Kindness</span></p>
                            </div>
                        </div>
                        <div className="relative w-full aspect-[377.77/230.79] overflow-hidden rounded-[23px] group shadow-sm">
                            <img src={WhatChildrenLearnSvg} alt="Life skills lesson cards showing children learning to notice thoughts, take brave steps, keep going, look for the good, and make wise choices" className="absolute top-0 h-auto w-[347.603%] max-w-none" style={{ left: '-123.8%', top: '-137.31%' }} />
                            <div className="absolute inset-0 p-6 flex flex-col items-start justify-center text-white w-2/3">
                                <h3 className="font-bold text-base sm:text-lg leading-tight mb-2">LOOK FOR THE GOOD</h3>
                                <p className="text-xs sm:text-sm">and practise thankfulness</p>
                                <p className="text-xs sm:text-sm mt-1">to build <span className="font-bold">Gratitude</span></p>
                            </div>
                        </div>
                        <div className="relative w-full aspect-[377.77/230.79] overflow-hidden rounded-[23px] group shadow-sm">
                            <img src={WhatChildrenLearnSvg} alt="Life skills lesson cards showing children learning to notice thoughts, take brave steps, keep going, look for the good, and make wise choices" className="absolute top-0 h-auto w-[347.603%] max-w-none" style={{ left: '-232.63%', top: '-137.31%' }} />
                            <div className="absolute inset-0 p-6 flex flex-col items-start justify-start text-white pt-8 pl-10">
                                <h3 className="font-bold text-base sm:text-lg leading-tight mb-1">MAKE CHOICES</h3>
                                <p className="text-xs sm:text-sm">that match their values</p>
                                <p className="text-xs sm:text-sm mt-1">to build <span className="font-bold">Integrity</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <br className='hidden md:block' /><br className='hidden md:block' /><br className='hidden md:block' />

            {/* Inside a Lesson Section */}
            <section className="inside-a-lesson-section is-standard-section-py">
                <div className="max-w-[1280px] mx-auto px-8">
                    <div data-aos="fade-up" className="text-center mb-6 lg:mb-10">
                        <h2 className="is-section-title" style={{ color: 'var(--color-dark-navy)', textTransform: 'none' }}>INSIDE A LESSON</h2>
                    </div>
                    <div className="w-full max-w-[1280px] mx-auto relative group" data-aos="fade-up">
                        <picture>
                            <source media="(max-width: 768px)" srcSet={InsideALessonMobileSvg} />
                            <img src={InsideALessonSvg} alt="Illustration showing what children learn in an Inner Stars lesson, including life skills, resilience, mindset, and positive habits" className="inside-lesson-img w-full h-auto origin-top" />
                        </picture>
                        <a onClick={(e) => { e.preventDefault(); setIsSneakPeekOpen(true); }} className="sneak-peek-btn absolute cursor-pointer" style={{ top: '18%', left: '70.3%', transform: 'translate(-50%, -50%)' }}>
                            Sneak Peek
                        </a>
                    </div>
                </div>
            </section>

            {/* How Different Section */}
            <section className="how-different-section is-standard-section-py">
                <div className="max-w-[1280px] mx-auto px-8">
                    <div className="bg-[var(--color-dark-navy)] rounded-[2.5rem] lg:rounded-[4rem] px-8 py-10 lg:px-16 lg:py-16 flex flex-col shadow-lg" data-aos="fade-up">
                        <div className="text-center mb-8 md:mb-12">
                            <h2 className="is-diff-title">HOW INNER STARS <br className='md:hidden' /> IS DIFFERENT</h2>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1050px] mx-auto gap-12 md:gap-16">
                            <div className="w-full md:w-[45%] flex justify-center md:justify-end">
                                <img src={InnerStarsDifferentSvg} alt="Different" className="w-[90%] max-w-[450px]  scale-110 md:scale-125 md:origin-right" />
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col justify-center">
                                <h3 className="text-[var(--color-hot-pink)] pl-4 md:pl-0 font-bold text-xl md:text-2xl mb-6">INNER STARS BUILDS:</h3>
                                <ul className="space-y-4 mb-10 text-white">
                                    <li className="flex items-start"><span className="mr-4">•</span>Everyday language children use in real life</li>
                                    <li className="flex items-start"><span className="mr-4">•</span>Simple visuals they can remember</li>
                                    <li className="flex items-start"><span className="mr-4">•</span>Habits of mind they can practise anywhere</li>
                                    <li className="flex items-start"><span className="mr-4">•</span>Character and mindset taught through stories, movement, and reflection</li>
                                </ul>
                                <p className="text-[#ecaa19] text-base pl-4 md:pl-0 lg:text-[1.1rem]">This isn't a lesson about wellbeing. It's a way of growing from the inside out.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Two Ways To Join Section */}
            <section className="two-ways-to-join-section is-standard-section-py bg-white">
                <div className="max-w-[1000px] mx-auto px-8">
                    <div className="text-center mb-0 lg:mb-4" data-aos="fade-up">
                        <h2 className="ls-join-section-title">TWO WAYS TO JOIN</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 -mt-16 md:-mt-8">
                        <div className="ls-join-card pink-variant" data-aos="fade-up">
                            <img src={HowToJoinSvg} alt="" className="ls-join-svg-bg left-slice" />
                            <div className="ls-join-card-content ls-pink-nudge">
                                <h3 className="ls-join-card-title pink-title">SATURDAY SESSIONS</h3>
                                <p className="ls-join-card-subtitle pink-subtitle">Weekend Sessions</p>
                                <ul className="ls-join-card-list">
                                    <li>Two inner strengths<br /> each term</li>
                                    <li>All six strengths explored<br /> over the year</li>
                                    <li>Builds skills step-by-step<br />through the term</li>
                                </ul>
                            </div>
                        </div>
                        <div className="ls-join-card green-variant" data-aos="fade-up" data-aos-delay="200">
                            <img src={HowToJoinSvg} alt="" className="ls-join-svg-bg right-slice" />
                            <div className="ls-join-card-content ls-green-nudge">
                                <h3 className="ls-join-card-title green-title">HOLIDAY INTENSIVES</h3>
                                <p className="ls-join-card-subtitle green-subtitle">2 to 6 Days Over 2 Weeks*</p>
                                <ul className="ls-join-card-list">
                                    <li>Two inner strengths<br /> at a time</li>
                                    <li>Immersive, hands on,<br /> and fun</li>
                                    <li>Ideal for school holiday<br /> learning</li>
                                    <li>*Coming soon</li>
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
                <div className="max-w-[800px] mx-auto px-8">
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

            <section className="ls-faq-section py-12 bg-white">
                <div className="max-w-[1200px] mx-auto px-8">
                    <div className="ls-faq-container bg-[#FCF8F2] rounded-[40px] p-8 lg:p-14 shadow-xl" data-aos="fade-up">
                        <h2 className="ls-faq-title">
                            FREQUENTLY ASKED QUESTIONS
                        </h2>

                        <div className="ls-faq-list space-y-0">
                            {[
                                {
                                    q: "Is this program for all children?",
                                    a: "Yes. Inner Stars is designed for children aged 5-12. It supports children who are doing well at school and those who are still developing, by building strong habits of mind that support learning and life."
                                },
                                {
                                    q: "Is this counselling or therapy?",
                                    a: "No. Inner Stars is an educational program. Children learn simple language, practical tools, and habits they can use in everyday moments at home, at school, and with friends."
                                },
                                {
                                    q: "Will this help my child who sometimes worries or feels overwhelmed?",
                                    a: "Yes. Inner Stars does not promise a life without worry. That is not realistic for any child. It helps children recognise what they are feeling, steady themselves, and choose helpful actions in real situations."
                                },
                                {
                                    q: "How is Inner Stars different from wellbeing lessons at school?",
                                    a: "School wellbeing lessons often introduce ideas. Inner Stars helps children use them. Children learn clear language, visual tools, and habits of mind they can apply when something feels hard, friendships feel uncertain, or big emotions show up. Families also learn how to support these skills at home, so children can use them in real life situations. Through repetition and consistent practice, these habits become part of how children think and respond."
                                },
                                {
                                    q: "How is this different from doing more academics after school?",
                                    a: "More academic practice builds knowledge and skills. Inner Stars builds how children approach learning. It strengthens focus, effort, decision making, and the ability to keep going when learning feels challenging. These habits support academic learning and help children use what they know more effectively."
                                }
                            ].map((faq, index) => (
                                <div key={index} className="ls-faq-item border-b border-[#2DD4BF]/30 last:border-0 border-solid">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                                        className="w-full py-3 flex items-center justify-between text-left transition-all"
                                    >
                                        <span className={`text-[#E44C17] text-lg lg:text-xl font-bold font-heading ${openFaq === index ? 'opacity-100' : 'opacity-90'}`}>
                                            {faq.q}
                                        </span>
                                        <span className="text-[#002B49] text-2xl font-light">
                                            {openFaq === index ? '−' : '+'}
                                        </span>
                                    </button>
                                    <div className={`ls-faq-answer overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-[500px] pb-3' : 'max-h-0'}`}>
                                        <p className="text-[#4A4A4A] text-[1rem] lg:text-[1.1rem] font-body font-light leading-relaxed" style={{ textJustify: 'inter-word' }}>
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="is-testimonial-section pt-4 pb-16 lg:pt-6 lg:pb-24">
                <div className="max-w-[1200px] mx-auto px-8">
                    <div className="testimonial-container relative bg-[#002147] rounded-[2.5rem] p-10 lg:p-20 overflow-hidden" data-aos="zoom-in">
                        <div className="relative flex flex-col items-center">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className={`testimonial-card w-full z-10 bg-[#b0d236] rounded-[2rem] p-10 lg:p-20 flex flex-col items-center text-center overflow-hidden transition-all duration-700 ${index === activeTestimonial ? 'opacity-100 translate-x-0 relative' : 'opacity-0 translate-x-12 absolute pointer-events-none'}`}
                                >
                                    {/* Opening Quote */}
                                    <svg className="absolute -top-2 left-4 lg:top-4 lg:left-8 w-16 h-16 lg:w-24 lg:h-24 text-[#002147] opacity-10" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M14.017 21L14.017 18C14.017 16.899 15.015 15 16.015 15H19.015V12C19.015 9.791 17.224 8 15.015 8H14.017V5H15.015C18.881 5 22.015 8.134 22.015 12V21H14.017ZM3.015 21L3.015 18C3.015 16.899 4.012 15 5.012 15H8.012V12C8.012 9.791 6.221 8 4.012 8H3.015V5H4.012C7.878 5 11.012 8.134 11.012 12V21H3.015Z" />
                                    </svg>

                                    <p className="testimonial-text text-[#002147] text-lg lg:text-2xl font-medium leading-relaxed mb-8 px-4 lg:px-12 relative z-10">
                                        {testimonial.text}
                                    </p>
                                    <p className="text-[#002147] font-bold relative z-10">{testimonial.author}</p>

                                    {/* Closing Quote */}
                                    <svg className="absolute -bottom-2 right-4 lg:bottom-4 lg:right-8 w-16 h-16 lg:w-24 lg:h-24 text-[#002147] opacity-10" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M10.983 3L10.983 6C10.983 7.101 9.985 9 8.985 9H5.985V12C5.985 14.209 7.776 16 9.985 16H10.983V19H9.985C6.119 19 2.985 15.866 2.985 12V3H10.983ZM22.015 3L22.015 6C22.015 7.101 21.018 9 20.018 9H17.018V12C17.018 14.209 18.809 16 21.018 16H22.015V19H21.018C17.222 19 14.018 15.866 14.018 12V3H22.015Z" />
                                    </svg>
                                </div>
                            ))}

                            {/* Carousel Dots */}
                            <div className="flex justify-center gap-3 mt-8 relative z-20">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleTestimonialDotClick(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeTestimonial ? 'bg-[#b0d236] w-8' : 'bg-white/30 hover:bg-white/50'}`}
                                        aria-label={`Go to testimonial ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sneak Peek Modal */}
            {isSneakPeekOpen && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 lg:p-8"
                    onClick={() => setIsSneakPeekOpen(false)}
                >
                    <div
                        className="bg-[#fff8f1] w-full max-w-[1250px] max-h-[90vh] rounded-[30px] lg:rounded-[60px] p-6 lg:p-14 relative shadow-2xl overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-6 lg:top-8 lg:right-10 text-4xl lg:text-5xl text-[#1a2b4b] hover:scale-110 transition-transform leading-none z-50 select-none pb-2"
                            onClick={() => setIsSneakPeekOpen(false)}
                        >
                            &times;
                        </button>

                        {/* Title */}
                        <h2 className="text-center font-outfit font-bold text-2xl lg:text-4xl text-[#1a2b4b] mb-6 lg:mb-16 tracking-widest" style={{ textTransform: 'none' }}>
                            Sneak Peek
                        </h2>

                        {/* Responsive Container: Scrollable on Mobile, Stacked/Overlapping on Desktop */}
                        <div className="flex-1 overflow-x-auto lg:overflow-visible no-scrollbar pb-4 lg:pb-0">
                            <div className="flex flex-row items-center justify-start lg:justify-center min-w-min gap-6 lg:gap-0 px-4 lg:px-0 snap-x snap-mandatory">
                                {/* Card 1 */}
                                <div className="ls-flip-scene flex-shrink-0 w-[280px] lg:w-[360px] h-[380px] lg:h-[480px] snap-center">
                                    <div className="ls-flip-card-inner">
                                        <div className="ls-flip-card-front">
                                            <div className="w-full h-full flex justify-center items-center">
                                                <img src={PopUp2Svg} alt="Visual 1" className="w-[90%] h-auto object-contain" />
                                            </div>
                                        </div>
                                        <div className="ls-flip-card-back">
                                            <div className="w-full h-full flex justify-center items-center">
                                                <img src={PopUp1Svg} alt="Detail 1" className="ls-back-illustration" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 2 */}
                                <div className="ls-flip-scene flex-shrink-0 w-[280px] lg:w-[360px] h-[380px] lg:h-[480px] lg:-ml-12 snap-center">
                                    <div className="ls-flip-card-inner">
                                        <div className="ls-flip-card-front">
                                            <div className="w-full h-full flex justify-center items-center">
                                                <img src={PopUp4Svg} alt="Visual 2" className="w-[90%] h-auto object-contain" />
                                            </div>
                                        </div>
                                        <div className="ls-flip-card-back">
                                            <div className="w-full h-full flex justify-center items-center">
                                                <img src={PopUp3Svg} alt="Detail 2" className="ls-back-illustration-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 3 */}
                                <div className="ls-flip-scene flex-shrink-0 w-[280px] lg:w-[360px] h-[380px] lg:h-[480px] lg:-ml-12 snap-center">
                                    <div className="ls-flip-card-inner">
                                        <div className="ls-flip-card-front">
                                            <div className="w-full h-full flex justify-center items-center">
                                                <img src={PopUp6Svg} alt="Visual 3" className="w-[90%] h-auto object-contain" />
                                            </div>
                                        </div>
                                        <div className="ls-flip-card-back">
                                            <div className="w-full h-full flex justify-center items-center">
                                                <img src={PopUp5Svg} alt="Detail 3" className="ls-back-illustration-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Swipe Hint */}
                        <div className="lg:hidden text-center text-[#1a2b4b]/40 text-xs mt-2 uppercase font-bold tracking-widest animate-pulse">
                            &larr; Swipe to explore &rarr;
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
            {/* SEO Footer for links */}
            <div className="is-seo-footer py-12 bg-white border-t border-gray-100">
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[#002B49]/40 text-sm uppercase tracking-widest font-bold">
                    <Link to="/" className="hover:text-[var(--color-hot-pink)] transition-colors">Homepage</Link>
                    <Link to="/programs" className="hover:text-[var(--color-hot-pink)] transition-colors">Programs</Link>
                    <Link to="/programs/learning-stars" className="hover:text-[var(--color-hot-pink)] transition-colors">Learning Stars</Link>
                    <Link to="/book-now" className="hover:text-[var(--color-hot-pink)] transition-colors text-[var(--color-hot-pink)]">Book Now</Link>
                </div>
            </div>
            <HiddenNavigation links={seoLinks} />
        </div>
    );
};

export default InnerStarsPage;
