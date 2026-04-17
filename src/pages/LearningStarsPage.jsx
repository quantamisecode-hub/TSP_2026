import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailConfig';
import Snackbar from '../components/Snackbar';
import SEO from '../components/SEO';
import HiddenNavigation from '../components/HiddenNavigation';
import '../styles/learning-stars.css';

// Assets
import BoxSvg from '../assets/images/Learning Star/Box.svg';
import LightSvg from '../assets/images/Learning Star/Light.svg';
import PhonemicSvg from '../assets/images/Learning Star/Phonemic.svg';
import SpellingSvg from '../assets/images/Learning Star/Spelling.svg';
import ReadingFluencySvg from '../assets/images/Learning Star/Reading Fluency.svg';
import VocabularySvg from '../assets/images/Learning Star/Vocabulary.svg';
import ComprehensionSvg from '../assets/images/Learning Star/Comprehension.svg';
import SentenceStructureSvg from '../assets/images/Learning Star/sentence structure.svg';

import InsideProgramSvg from '../assets/images/Learning Star/Inside a Program.svg';
import GlumKidsSvg from '../assets/images/Learning Star/6 glum kids.svg';
import IntentionalApproachSvg from '../assets/images/Learning Star/An intentional teaching approach.svg';
import ResearchIconsSvg from '../assets/images/Learning Star/The Research Icons.svg';
import HiFiveSvg from '../assets/images/Learning Star/Hi Five.svg';
import LearningStarsDiffSvg from '../assets/images/Learning Star/Learning Stars.svg';
import TutoringSvg from '../assets/images/Learning Star/Tutoring.svg';
import ClaritySvg from '../assets/images/Learning Star/Clarity.svg';
import ReadingRopeSvg from '../assets/images/Learning Star/Reading Rope.svg';
import BigSixSvg from '../assets/images/Learning Star/This Big Six.svg';
import InsideProgramPhoto from '../assets/images/Learning Star/Image_TSP.png';

const LearningStarsPage = () => {
    const location = useLocation();
    const [openFaq, setOpenFaq] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [insideSlide, setInsideSlide] = useState(0);
    const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'success' });
    const [isLoading, setIsLoading] = useState(false);
    const researchTimerRef = useRef(null);
    const insideTimerRef = useRef(null);

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

    const handleAssessmentSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const childName = form.child_name.value;
        const parentName = form.parent_name.value;
        const programName = "Learning Stars Assessment";
        const userMessage = form.message.value;

        // Prepare template parameters to ensure all common aliases are covered
        const templateParams = {
            child_name: childName,
            child_age: form.child_age.value,
            parent_name: parentName,
            parent_email: form.parent_email.value,
            parent_phone: form.parent_phone.value,
            preferred_time: form.preferred_time.value,
            subject: `Literacy Assessment Request - ${childName}`,
            heading: "Literacy Assessment Booking",
            subheading: "A new assessment screening has been requested.",
            auto_reply_message: `Our team will carefully review your screening request and will reach out to you soon to confirm the assessment schedule and next steps.`,
            message: userMessage || "No additional notes provided.",
            program: programName,
            logo_url: 'https://thestarrypath.com.au/Logo.png',
            // Aliases for common EmailJS template variables
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
                message: 'Thank you! Your assessment request has been sent successfully.',
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

        // Trigger Calendly Popup
        if (window.Calendly) {
            window.Calendly.showPopupWidget('https://calendly.com/hello-thestarrypath-mglz/free-literacy-assessment');
        }

        // Reset form
        form.reset();
    };

    const openCalendly = (e) => {
        e.preventDefault();
        if (window.Calendly) {
            window.Calendly.showPopupWidget('https://calendly.com/hello-thestarrypath-mglz/learning-stars-parent-call');
        }
    };

    const skills = [
        { icon: PhonemicSvg, title: "PHONEMIC\nAWARENESS", color: 'var(--color-yellow-gold)', delay: 100 },
        { icon: SpellingSvg, title: "DECODING THROUGH\nPHONICS & SPELLING", color: 'var(--color-hot-pink)', delay: 200 },
        { icon: ReadingFluencySvg, title: "READING\nFLUENCY", color: 'var(--color-red-orange)', delay: 300 },
        { icon: VocabularySvg, title: "VOCABULARY\n& MORPHOLOGY", color: 'var(--color-lime-green)', delay: 400 },
        { icon: ComprehensionSvg, title: "READING\nCOMPREHENSION", color: 'var(--color-teal)', delay: 500 },
        { icon: SentenceStructureSvg, title: "SENTENCE STRUCTURE\nFOR CLEAR WRITING", color: 'var(--color-deep-purple)', delay: 600 }
    ];

    const researchSlides = [
        {
            leftHeading: "RESEARCH BEHIND OUR APPROACH",
            leftText: (
                <>
                    <p>Research across Australian literacy <br className="hidden lg:block" /> organisations is consistent:</p>
                    <ul className="ls-research-bullets space-y-4">
                        <li>Foundational reading skills must <br className="hidden lg:block" /> be taught directly and practised</li>
                        <li>Early intervention leads to stronger <br className="hidden lg:block" /> long term outcomes</li>
                    </ul>
                </>
            ),
            rightHeading: <>LEARNING STARS <br className="hidden lg:block" /> HELPS CHILDREN:</>,
            rightContent: (
                <div className="flex justify-center w-full">
                    <ul className="ls-research-checklist text-white space-y-1.5 text-xl lg:text-2xl font-light text-left inline-block">
                        <li>• Hear sounds in words</li>
                        <li>• Work with sounds</li>
                        <li>• Decode words</li>
                        <li>• Read smoothly</li>
                        <li>• Spell accurately</li>
                        <li>• Write clearly</li>
                    </ul>
                </div>
            ),
            panelColor: "ls-orange-panel",
            headingStyle: "ls-research-heading-white"
        },
        {
            leftHeading: "RESEARCH BEHIND OUR APPROACH",
            leftText: (
                <>
                    <p>Research across Australian literacy <br className="hidden lg:block" /> organisations is consistent:</p>
                    <ul className="ls-research-bullets space-y-4">
                        <li>Foundational reading skills must <br className="hidden lg:block" /> be taught directly and practised</li>
                        <li>Early intervention leads to stronger <br className="hidden lg:block" /> long term outcomes</li>
                    </ul>
                </>
            ),
            rightHeading: "",
            rightContent: (
                <div className="ls-research-image-content flex items-center justify-end w-full h-full p-0">
                    <img
                        src={ReadingRopeSvg}
                        alt="Reading Rope"
                        className="w-full h-auto max-w-[1200px] lg:scale-[1.3] lg:translate-x-8 object-contain transition-all duration-700"
                    />
                </div>
            ),
            panelColor: "ls-white-panel",
            headingStyle: "ls-research-heading-turquoise"
        },
        {
            leftHeading: "RESEARCH BEHIND OUR APPROACH",
            leftText: (
                <>
                    <p>Research across Australian literacy <br className="hidden lg:block" /> organisations is consistent:</p>
                    <ul className="ls-research-bullets space-y-4">
                        <li>Foundational reading skills must <br className="hidden lg:block" /> be taught directly and practised</li>
                        <li>Early intervention leads to stronger <br className="hidden lg:block" /> long term outcomes</li>
                    </ul>
                </>
            ),
            rightHeading: "",
            rightContent: (
                <div className="ls-research-image-content flex items-center justify-end h-full">
                    <img src={BigSixSvg} alt="Big Six" className="w-full max-w-[550px] h-auto lg:translate-x-10 object-contain" />
                </div>
            ),
            panelColor: "ls-yellow-panel",
            headingStyle: "ls-research-heading-navy"
        }
    ];

    const startResearchAutoplay = () => {
        if (researchTimerRef.current) {
            clearInterval(researchTimerRef.current);
        }

        researchTimerRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % researchSlides.length);
        }, 6000);
    };

    const startInsideAutoplay = () => {
        if (insideTimerRef.current) {
            clearInterval(insideTimerRef.current);
        }

        insideTimerRef.current = setInterval(() => {
            setInsideSlide((prev) => (prev + 1) % 2);
        }, 4000);
    };

    const handleResearchDotClick = (index) => {
        setCurrentSlide(index);
        startResearchAutoplay();
    };

    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

        startResearchAutoplay();
        startInsideAutoplay();

        return () => {
            if (researchTimerRef.current) {
                clearInterval(researchTimerRef.current);
            }

            if (insideTimerRef.current) {
                clearInterval(insideTimerRef.current);
            }
        };
    }, []);

    const seoLinks = [
        { label: "Programs", to: "/programs" },
        { label: "Inner Stars", to: "/programs/inner-stars" },
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
                        "name": "Learning Stars",
                        "item": "https://thestarrypath.com.au/programs/learning-stars"
                    }
                ]
            },
            {
                "@type": "Service",
                "name": "Learning Stars Literacy Support",
                "description": "Structured literacy support for children aged 5-12 in Point Cook, focusing on reading, spelling, and writing mastery.",
                "provider": {
                    "@type": "EducationalOrganization",
                    "name": "The Starry Path",
                    "url": "https://thestarrypath.com.au/"
                },
                "areaServed": "Point Cook, VIC",
                "serviceType": "Literacy Tutoring",
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Literacy Services",
                    "itemListElement": [
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Literacy Assessment" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Structured Literacy Support" } }
                    ]
                }
            }
        ]
    };

    return (
        <div className="learning-stars-page">
            <SEO
                title="Learning Stars | Literacy Support for Kids Point Cook"
                description="Learning Stars provides structured literacy support for children aged 5–12 in Point Cook, helping build reading, spelling, writing, and strong academic foundations."
                keywords={[
                    "literacy support Point Cook",
                    "reading help for kids Point Cook",
                    "spelling help for children",
                    "writing support for primary school children",
                    "structured literacy support",
                    "primary school tutoring Point Cook"
                ]}
                schema={schema}
            />
            {/* Hero Section */}
            <section className="learning-stars-hero-section">
                <div className="learning-stars-hero-card" data-aos="fade-up">
                    <div className="ls-hero-content flex flex-col-reverse lg:flex-row items-center justify-center gap-10 lg:gap-16">
                        <div className="ls-hero-text w-full lg:w-1/2 text-center lg:text-left lg:pl-24" data-aos="fade-right" data-aos-delay="200">
                            <h1 className="ls-title">LEARNING STARS</h1>
                            <h2 className="ls-subtitle">Structured literacy support</h2>
                            <p className="ls-description">
                                Foundations for reading and writing{" "}<br className="hidden lg:block" />
                                for school success
                            </p>
                        </div>
                        <div className="ls-hero-image w-full lg:w-1/2 flex justify-center lg:justify-end" data-aos="fade-left" data-aos-delay="400">
                            <img src={BoxSvg} alt="Learning Stars Box" className="ls-box-svg" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Literacy Support Matters Section */}
            <section className="why-literacy-section py-12 lg:py-16">
                <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center gap-16 lg:gap-24">
                    {/* Left: Light Illustration */}
                    <div className="flex-1 flex justify-center" data-aos="fade-up">
                        <img src={LightSvg} alt="Literacy Support Illustration" className="ls-light-svg w-full max-w-[450px]" />
                    </div>

                    {/* Right: Text Content */}
                    <div className="flex-1 text-white" data-aos="fade-left">
                        <h2 className="why-literacy-title mb-8">WHY LITERACY <br className="hidden lg:block" /> SUPPORT MATTERS</h2>

                        <div className="why-literacy-content space-y-6 text-lg lg:text-xl font-light opacity-90 leading-relaxed">
                            <p>
                                In Australia, 1 in 4 children fall behind <br className='md:hidden' /> in reading and writing by the middle years of primary school.
                            </p>
                            <p>Without support, small gaps grow.</p>
                            <p>
                                Reading and writing do not develop <br className='md:hidden' /> on their own. They need clear <br className='md:hidden' /> and intentional teaching.
                            </p>
                            <p className="font-semibold text-[var(--color-yellow-gold)] pt-4">
                                Concerned about your child's reading <br className='md:hidden' /> and spelling?
                            </p>
                        </div>

                        <div className="mt-12" data-aos="fade-up">
                            <a
                                href="#"
                                onClick={openCalendly}
                                className="why-cta-btn"
                            >
                                BOOK A FREE 15-MINUTE CALL
                            </a>
                        </div>
                    </div>
                </div>
            </section>


            {/* What Children Learn Section */}
            <section className="ls-learn-section py-12 lg:py-16 bg-[var(--color-dark-navy)]">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center mb-10 lg:mb-16" data-aos="fade-up">
                        <h2 className="ls-learn-title">WHAT CHILDREN LEARN</h2>
                        <p className="ls-learn-subtitle mt-4 text-white opacity-90 text-lg md:text-xl font-body">
                            Build the foundations needed for reading and writing
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className="ls-flip-card h-[250px] cursor-pointer"
                                data-aos="zoom-in"
                                data-aos-delay={skill.delay}
                            >
                                <div className="ls-flip-card-inner">
                                    {/* Front: Original Asset */}
                                    <div className="ls-flip-card-front flex items-center justify-center p-0">
                                        <img src={skill.icon} alt={`${skill.title.replace('\n', ' ')} illustration`} className="w-full h-full object-contain" />
                                    </div>
                                    {/* Back: Text on Colored Background */}
                                    <div
                                        className="ls-flip-card-back flex items-center justify-center p-8 text-center shadow-lg"
                                        style={{ backgroundColor: skill.color }}
                                    >
                                        <h3 className="text-white text-xl lg:text-2xl font-extrabold uppercase tracking-wider font-heading leading-tight whitespace-pre-line">
                                            {skill.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-6 lg:mt-8" data-aos="fade-up">
                    </div>
                </div>
            </section>

            {/* Inside the Program Section */}
            <section className="ls-inside-program-section py-12 lg:py-16 bg-[var(--color-dark-navy)]">
                <div className="ls-inside-wrapper">
                    <h2 className="ls-inside-title" data-aos="fade-up">INSIDE THE PROGRAM</h2>

                    <div className="ls-inside-content">
                        {/* Left: Program Asset (Books) */}
                        <div className="ls-inside-asset ls-program-asset" data-aos="fade-right">
                            <img src={InsideProgramSvg} alt="Inside the Program" />
                        </div>

                        {/* Right: Kids Asset (Carousel) */}
                        <div className="ls-inside-asset ls-kids-asset" data-aos="fade-left">
                            <img
                                src={GlumKidsSvg}
                                alt="Six Glum Kids"
                                className={`ls-carousel-img ls-kids-illustration-asset ${insideSlide === 0 ? 'active' : ''}`}
                            />
                            <img
                                src={InsideProgramPhoto}
                                alt="Magnetic Letters Activity"
                                className={`ls-carousel-img ls-photo-asset ${insideSlide === 1 ? 'active' : ''}`}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Intentional Teaching Approach Section */}
            <section className="ls-intentional-section py-12 lg:py-16 bg-[var(--color-dark-navy)]">
                <div className="ls-intentional-wrapper px-6">
                    <h2 className="ls-intentional-title mb-0" data-aos="fade-up">
                        AN INTENTIONAL <br className="md:hidden" />
                        TEACHING APPROACH
                    </h2>

                    <div className="ls-intentional-info-box" data-aos="fade-up">
                        <p className="ls-intentional-info-text">
                            Learning Stars is based on how children learn to read and write. Teaching is structured and responsive at each child's point of need.
                        </p>
                    </div>

                    {/* Desktop View: Single SVG */}
                    <div className="ls-intentional-asset-container mb-0" data-aos="zoom-in">
                        <img src={IntentionalApproachSvg} alt="An Intentional Teaching Approach" className="ls-intentional-asset" />
                    </div>

                    {/* Mobile View: Individual Cards */}
                    <div className="ls-intentional-cards">
                        <div className="ls-intentional-card" data-aos="fade-up">
                            <div className="ls-intentional-card-top">
                                <svg viewBox="200 240 220 200">
                                    <path fill="#adc716" d="M366.8,319.31v-5.82h-21.75v30.78c0,1.83-3.62,4.75-5.36,4.75h-36.3v30.78c0,1.44-3.36,4.44-4.75,4.44h-36.91v31.86h112.73v-88.37s.43-.46.46-.46h11.49v96.64c0,1.11-2.6,3.57-3.76,3.9-42.94.35-86.1.47-129.05-.06-2-.97-3.67-2.77-3.81-5.07.96-14.41-1.29-30.51-.02-44.73.16-1.84,1.17-3.92,2.86-4.8.28-.14,2.37-.86,2.51-.86h35.99v-30.17c0-1.7,3.06-5.05,4.75-5.05h36.91v-30.48c0-1.71,3.31-5.05,5.05-5.05h28.95v-5.82l19.9,11.79-19.9,11.79Z" />
                                </svg>
                            </div>
                            <div className="ls-intentional-card-bottom" style={{ backgroundColor: '#adc716' }}>
                                Step by Step
                            </div>
                        </div>

                        <div className="ls-intentional-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="ls-intentional-card-top">
                                <svg viewBox="690 240 140 180">
                                    <path fill="#33c5b5" d="M766.65,369.65c13.96,6.53,18.5,25.45,9.69,38.01l13.58,13.82c2.06,5.52-3.19,9.57-8.11,5.85-2.03-1.53-11.64-12.19-12.51-12.36-9.76,6.17-22.61,5.78-31.59-1.67-.95-.79-2.97-3.36-3.89-3.54h-45.2c-5.82-.85-10.64-5.03-12.28-10.66-.83-30.92-.71-62.17-.06-93.11,1.56-5.83,6.63-10.24,12.65-10.92h64.6c7.13.78,12.24,6.41,13.06,13.42l.06,61.15ZM756.59,366.47v-57.98c0-1.59-3.6-4.09-5.32-3.73h-60.08c-2.9.04-5.21,2.04-5.33,5,.18,28.88-.29,57.83.23,86.68.3,1.56,2.62,3.61,4.14,3.61h38.91c-3.95-13.61,4.02-27.89,17.26-32.31.81-.27,4.27-1.28,4.85-1.28h5.33ZM752.97,376.58c-21.85,1.59-18.2,36.58,4.66,32.44,19.76-3.58,16.55-33.99-4.66-32.44Z" />
                                    <path fill="#33c5b5" d="M696.32,332.12c-2.81-2.81-1.34-7.68,2.62-8.29h44.57c5.71,1.18,5.12,8.72-.33,9.7-14.08-.92-29.71,1.22-43.6.01-1.29-.11-2.33-.49-3.26-1.42Z" />
                                    <path fill="#33c5b5" d="M696.32,351.17c-2.81-2.81-1.34-7.68,2.62-8.29h44.57c5.71,1.18,5.12,8.72-.33,9.7-14.08-.92-29.71,1.22-43.6.01-1.29-.11-2.33-.49-3.26-1.42Z" />
                                    <path fill="#33c5b5" d="M731.93,370.23c-.66.66-1.7,1.3-2.62,1.41-9.27,1.13-20.82-.83-30.33-.04-5.15-1.14-5.67-8.15-.33-9.64h30.95c3.78.85,5.11,5.49,2.34,8.26Z" />
                                </svg>
                            </div>
                            <div className="ls-intentional-card-bottom" style={{ backgroundColor: '#33c5b5' }}>
                                Research Informed
                            </div>
                        </div>

                        <div className="ls-intentional-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="ls-intentional-card-top">
                                <svg viewBox="1060 280 160 140">
                                    <path fill="#e44c17" d="M1076.96,292.46c.38-.37.96-.6,1.46-.79,46.38-.63,93.01-.6,139.39-.01,1.93.79,2.67,2.63,2.63,4.66v132.16c-.07,1.69-.8,3.45-2.42,4.17h-139.81c-1.04-.46-1.76-1.33-2.08-2.43-.61-45.28-.42-90.78-.09-136.08.26-.53.51-1.27.92-1.68ZM1216.61,295.11h-136.99v11.1h136.99v-11.1ZM1216.61,310.02h-136.99v118.95h136.99v-118.95Z" />
                                    <path fill="#e44c17" d="M1119.15,401.58c-3.22-12.46,3.6-27.22,15.03-33.01.85-.43,4.57-1.49,4.74-1.68.13-.14.05-.48-.22-.72-1.12-1-2.67-1.56-3.93-2.93-12.92-14.04,1.54-36.11,19.59-29.65,12.22,4.38,15.8,20.19,7.09,29.65-1.26,1.37-2.82,1.92-3.93,2.93-.27.24-.35.58-.22.72.17.18,3.89,1.25,4.74,1.68,11.42,5.78,18.16,20.56,15.03,33.01h-57.92Z" />
                                    <path fill="#e44c17" d="M1094.08,298.31c5.25-1.19,4.34,6.32.08,4.98-2.36-.74-2.37-4.46-.08-4.98Z" />
                                    <path fill="#e44c17" d="M1088.88,302.64c-2.19,2.19-6.53-.8-4.07-3.55,2.39-2.68,6.67.96,4.07,3.55Z" />
                                    <path fill="#e44c17" d="M1105.17,302.63c-2.54,2.32-6.26-1.1-4.06-3.54,2.45-2.71,6.73,1.09,4.06,3.54Z" />
                                </svg>
                            </div>
                            <div className="ls-intentional-card-bottom" style={{ backgroundColor: '#e44c17' }}>
                                Personalised
                            </div>
                        </div>
                    </div>


                </div>
            </section>

            {/* Research Section with Carousel */}
            <section className="ls-research-section py-12 lg:py-16 bg-[var(--color-dark-navy)]">
                <div className="max-w-[1300px] mx-auto px-6">
                    <div className="ls-research-carousel-wrapper">
                        {researchSlides.map((slide, index) => (
                            <div
                                key={index}
                                className={`ls-research-slide ${currentSlide === index ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
                            >
                                <div className="ls-research-container flex flex-col lg:flex-row items-stretch">
                                    {/* Left Column */}
                                    <div className="ls-research-left flex-1 ls-navy-panel p-6 md:p-10 lg:p-14 lg:pr-20 flex flex-col justify-center relative z-10">
                                        <h2 className="ls-research-heading-yellow mb-8">
                                            {slide.leftHeading}
                                        </h2>
                                        <div className="ls-research-text text-white opacity-90 space-y-6 text-lg lg:text-xl font-light">
                                            {slide.leftText}
                                        </div>
                                    </div>

                                    {/* Center Column: Iconic Strip */}
                                    <div className="ls-research-center ls-icon-strip">
                                        <img src={ResearchIconsSvg} alt="Research Icons" />
                                    </div>

                                    {/* Right Column (Transitions) */}
                                    <div className={`ls-research-right flex-1 ${slide.panelColor} ${slide.rightHeading ? 'p-6 md:p-10 lg:p-14 lg:pl-32' : 'p-4 lg:p-6'} flex flex-col justify-center ${index === 0 ? 'items-center text-center' : 'items-start'} relative z-10 overflow-hidden`}>
                                        {slide.rightHeading && (
                                            <h2 className={`${slide.headingStyle} mb-8 ${index === 0 ? 'text-center ls-research-heading-reduced' : ''}`}>
                                                {slide.rightHeading}
                                            </h2>
                                        )}
                                        {slide.rightContent && (
                                            <div className={`w-full ${index === 0 ? 'lg:-translate-x-6' : ''}`}>
                                                {slide.rightContent}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Carousel Dots */}
                    <div className="ls-carousel-dots flex justify-center gap-4">
                        {researchSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleResearchDotClick(index)}
                                className={`ls-dot w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'ls-dot-active w-10 bg-[#FFCC00]' : 'bg-white/30 hover:bg-white/50'}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Why I Created Learning Stars Section */}
            <section className="ls-creator-section py-12 lg:py-16 bg-[var(--color-dark-navy)]">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="ls-creator-container relative bg-[#FCF8F2] rounded-[30px] flex flex-col lg:flex-row shadow-lg">
                        {/* Left Side: Image */}
                        <div className="ls-creator-image-wrapper p-6 lg:p-0 lg:w-[43%] z-10 lg:-ml-11 lg:-mr-12 lg:-my-24 flex items-center shrink-0">
                            <img src={HiFiveSvg} alt="Why I Created Learning Stars" className="ls-creator-image w-full h-auto object-contain drop-shadow-lg" />
                        </div>

                        {/* Right Side: Text lines */}
                        <div className="ls-creator-content py-8 pr-8 pl-0 lg:py-8 lg:pr-16 lg:pl-0 flex-1 flex flex-col justify-center w-full overflow-hidden">
                            <div className="border-b-2 border-gray-300 border-solid pb-0 w-full -ml-4 pl-12 lg:-ml-12 lg:pl-24">
                                <h2 className="ls-creator-title">
                                    WHY I CREATED LEARNING STARS
                                </h2>
                            </div>

                            <div className="ls-creator-text-lines text-[#6B6B6B] font-body font-normal text-base lg:text-[1.1rem]">
                                <p className="py-2.5 border-b-2 border-gray-300 border-solid w-full -ml-4 pl-12 lg:-ml-12 lg:pl-24">My path into literacy began early. I saw how explicit teaching helped</p>
                                <p className="py-2.5 border-b-2 border-gray-300 border-solid w-full -ml-4 pl-12 lg:-ml-12 lg:pl-24">a close family member, and later worked as a reading specialist using</p>
                                <p className="py-2.5 border-b-2 border-gray-300 border-solid w-full -ml-4 pl-12 lg:-ml-12 lg:pl-24">diagnostic, evidence based methods grounded in the Big Six of Literacy</p>
                                <p className="py-2.5 border-b-2 border-gray-300 border-solid w-full -ml-4 pl-12 lg:-ml-12 lg:pl-24">and the Reading Rope.</p>
                                <p className="py-2.5 border-b-2 border-gray-300 border-solid w-full -ml-4 pl-12 lg:-ml-12 lg:pl-24 md:mt-3">Reading and writing do not develop automatically for every child.</p>
                                <p className="py-2.5 border-b-2 border-gray-300 border-solid w-full -ml-4 pl-12 lg:-ml-12 lg:pl-24">The building blocks of written language need to be taught clearly</p>
                                <p className="py-2.5 border-b-2 border-gray-300 border-solid w-full -ml-4 pl-12 lg:-ml-12 lg:pl-24">and step by step, especially when a child finds literacy hard.</p>
                                <p className="py-2.5 border-b-2 border-gray-300 border-solid w-full -ml-4 pl-12 lg:-ml-12 lg:pl-24 md:mt-3">Learning Stars was created to provide structured, evidence based</p>
                                <p className="py-2.5 border-b-2 border-gray-300 border-solid w-full -ml-4 pl-12 lg:-ml-12 lg:pl-24">teaching that makes reading, spelling, and writing make sense.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Difference From Tutoring Section */}
            <section className="ls-difference-section pt-4 pb-12 lg:py-16 bg-[var(--color-dark-navy)] text-white overflow-hidden">
                <div className="max-w-[1300px] mx-auto px-6">
                    <h2 className="ls-difference-title" data-aos="fade-up">
                        HOW LEARNING STARS IS DIFFERENT <br className='hidden lg:block' /> FROM TUTORING
                    </h2>

                    <div className="ls-difference-rows lg:-mt-10">
                        {/* Learning Stars Row */}
                        <div className="ls-diff-row flex flex-col md:flex-row items-center gap-0 md:gap-12 lg:gap-16 pt-0" data-aos="fade-up">
                            <div className="ls-diff-image-wrapper w-full md:w-[45%] max-w-[600px]">
                                <img src={LearningStarsDiffSvg} alt="Learning Stars Approach" className="w-full h-auto object-contain drop-shadow-xl" />
                            </div>
                            <div className="ls-diff-content flex-1 -mt-12 md:mt-0 pt-0 pb-8 md:py-8">
                                <h3 className="text-[#E44C17] text-2xl font-bold font-heading mb-4 tracking-wide">
                                    LEARNING STARS
                                </h3>
                                <div className="space-y-4 text-[#E2E8F0] font-body text-lg font-light leading-relaxed">
                                    <p>Builds the foundations needed for reading, spelling, and writing</p>
                                    <p>Identifies what the child needs next and teaches it directly</p>
                                    <p>Explicit, step by step teaching</p>
                                    <p>Practice that builds accuracy and automaticity</p>
                                    <p>Long term literacy growth</p>
                                </div>
                            </div>
                        </div>

                        {/* Tutoring Row */}
                        <div className="ls-diff-row flex flex-col md:flex-row items-center gap-0 md:gap-12 lg:gap-16 md:-mt-12 lg:-mt-20" data-aos="fade-up" data-aos-delay="200">
                            <div className="ls-diff-image-wrapper w-full md:w-[45%] max-w-[600px]">
                                <img src={TutoringSvg} alt="Traditional Tutoring" className="w-full h-auto object-contain drop-shadow-xl" />
                            </div>
                            <div className="ls-diff-content flex-1 -mt-12 md:mt-0 pt-0 pb-8 md:py-8">
                                <h3 className="text-[#2DD4BF] text-2xl font-bold font-heading mb-4 tracking-wide">
                                    TUTORING
                                </h3>
                                <div className="space-y-4 text-[#E2E8F0] font-body text-lg font-light leading-relaxed">
                                    <p>Helps with school tasks or homework</p>
                                    <p>Practises current classroom content</p>
                                    <p>Often assumes the child already has the building blocks in place</p>
                                    <p>Focuses on finishing work and improving grades</p>
                                    <p>Short term support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ready for Clarity Section */}
            <section className="ls-clarity-section py-12 lg:py-16 bg-[var(--color-dark-navy)] mt-0 mb-0">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="ls-clarity-container bg-[#5E3FB2] rounded-[40px] p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 shadow-2xl" data-aos="zoom-in">
                        {/* Left Side: Asset */}
                        <div className="ls-clarity-image-wrapper w-full lg:w-1/2 flex justify-center">
                            <img src={ClaritySvg} alt="Ready for Clarity" className="w-full max-w-[700px] lg:scale-110 h-auto object-contain" />
                        </div>

                        {/* Right Side: Text */}
                        <div className="ls-clarity-content w-full lg:w-1/2 text-white lg:-ml-10 lg:-mt-12">
                            <h2 className="ls-clarity-title">
                                READY FOR CLARITY?
                            </h2>
                            <p className="text-lg lg:text-xl font-body font-light mb-6 leading-relaxed opacity-90">
                                Understand exactly where your child is in:
                            </p>
                            <div className="space-y-3 text-lg lg:text-xl font-body font-light">
                                <p className="relative pl-5">
                                    <span className="absolute left-0 text-[#FBB03B] font-bold">•</span> Phonemic Awareness
                                </p>
                                <p className="relative pl-5">
                                    <span className="absolute left-0 text-[#FBB03B] font-bold">•</span> Phonics
                                </p>
                                <p className="relative pl-5">
                                    <span className="absolute left-0 text-[#FBB03B] font-bold">•</span> Fluency
                                </p>
                                <p className="relative pl-5">
                                    <span className="absolute left-0 text-[#FBB03B] font-bold">•</span> Comprehension
                                </p>
                                <p className="relative pl-5">
                                    <span className="absolute left-0 text-[#FBB03B] font-bold">•</span> Sentence Structure
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Assessment Booking Form Section */}
            <section id="assessment-section" className="ls-booking-section py-12 lg:py-16 bg-[var(--color-dark-navy)]">
                <div className="max-w-[1000px] mx-auto px-6" data-aos="fade-up">
                    <form className="ls-booking-form space-y-6" onSubmit={handleAssessmentSubmit}>
                        <div className="text-center mb-10">
                            <h2 className="ls-booking-title">
                                BOOK A FREE LITERACY ASSESSMENT
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                name="child_name"
                                placeholder="Child's Name"
                                required
                                className="w-full bg-[#002B49] border border-[#E2E8F0]/30 rounded-2xl px-6 py-4 text-white placeholder:text-[#E2E8F0]/60 focus:outline-none focus:border-[#FBB03B] transition-colors"
                            />
                            <input
                                type="text"
                                name="child_age"
                                placeholder="Child's Age"
                                required
                                className="w-full bg-[#002B49] border border-[#E2E8F0]/30 rounded-2xl px-6 py-4 text-white placeholder:text-[#E2E8F0]/60 focus:outline-none focus:border-[#FBB03B] transition-colors"
                            />
                        </div>

                        {/* Other Fields */}
                        <div className="space-y-6">
                            <input
                                type="text"
                                name="parent_name"
                                placeholder="Parent Name"
                                required
                                className="w-full bg-[#002B49] border border-[#E2E8F0]/30 rounded-2xl px-6 py-4 text-white placeholder:text-[#E2E8F0]/60 focus:outline-none focus:border-[#FBB03B] transition-colors"
                            />
                            <input
                                type="email"
                                name="parent_email"
                                placeholder="Email"
                                required
                                className="w-full bg-[#002B49] border border-[#E2E8F0]/30 rounded-2xl px-6 py-4 text-white placeholder:text-[#E2E8F0]/60 focus:outline-none focus:border-[#FBB03B] transition-colors"
                            />
                            <input
                                type="tel"
                                name="parent_phone"
                                placeholder="Phone"
                                required
                                className="w-full bg-[#002B49] border border-[#E2E8F0]/30 rounded-2xl px-6 py-4 text-white placeholder:text-[#E2E8F0]/60 focus:outline-none focus:border-[#FBB03B] transition-colors"
                            />
                            <input
                                type="text"
                                name="preferred_time"
                                placeholder="Preferred Day or Time for Screening (open text)"
                                className="w-full bg-[#002B49] border border-[#E2E8F0]/30 rounded-2xl px-6 py-4 text-white placeholder:text-[#E2E8F0]/60 focus:outline-none focus:border-[#FBB03B] transition-colors"
                            />
                            <textarea
                                name="message"
                                placeholder="Brief Notes About Your Child&#10;(Are there any prior assessments, diagnoses, challenges, or reports you would like to share)"
                                rows="5"
                                className="w-full bg-[#002B49] border border-[#E2E8F0]/30 rounded-2xl px-6 py-4 text-white placeholder:text-[#E2E8F0]/60 focus:outline-none focus:border-[#FBB03B] transition-colors resize-none"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-8 flex justify-center">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`ls-booking-btn max-w-[420px] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider shadow-lg transition-all active:scale-95 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`}
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
                                    'BOOK A FREE LITERACY ASSESSMENT'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="ls-faq-section py-12 bg-transparent">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="ls-faq-container" data-aos="fade-up">
                        <h2 className="ls-faq-title">
                            FREQUENTLY ASKED QUESTIONS
                        </h2>

                        <div className="ls-faq-list space-y-0">
                            {[
                                {
                                    q: "How is this different from tutoring?",
                                    a: "Tutoring reviews classroom work. Learning Stars builds the skills needed for reading, spelling, and writing."
                                },
                                {
                                    q: "Who is this program for?",
                                    a: "This program is for any child who needs foundational support in their reading and writing journey."
                                },
                                {
                                    q: "What happens in the free literacy screening?",
                                    a: "During the screening, we assess your child's current level of phonemic awareness, phonics, and fluency to identify specific needs."
                                },
                                {
                                    q: "How long does the program run?",
                                    a: "Program length varies depending on each child's individual needs and progress milestones."
                                },
                                {
                                    q: "Is this based on a specific approach?",
                                    a: "Yes, our approach is evidence-based and aligned with structured literacy and the Big Six of Literacy."
                                },
                                {
                                    q: "Can this support children with learning differences?",
                                    a: "Absolutely. The structured, step-by-step nature of our program is ideal for children with various learning differences."
                                },
                                {
                                    q: "How do I know if my child is ready?",
                                    a: "If you're noticing gaps in their foundation skills, then your child is ready for the clarity our program provides."
                                }
                            ].map((faq, index) => (
                                <div key={index} className="ls-faq-item">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                                        className="w-full flex items-center justify-between text-left transition-all"
                                    >
                                        <span className={`ls-faq-question ${openFaq === index ? 'opacity-100' : 'opacity-90'}`}>
                                            {faq.q}
                                        </span>
                                        <span className="ls-faq-toggle">
                                            {openFaq === index ? '−' : '+'}
                                        </span>
                                    </button>
                                    <div className={`ls-faq-answer overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40' : 'max-h-0'}`}>
                                        <p>
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Discovery Links */}
            <div className="max-w-[1200px] mx-auto px-6 py-8 text-center border-t border-white/10">
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-white/60 text-sm uppercase tracking-widest font-bold">
                    <Link to="/" className="hover:text-[var(--color-yellow-gold)] transition-colors">Homepage</Link>
                    <Link to="/programs" className="hover:text-[var(--color-yellow-gold)] transition-colors">Programs</Link>
                    <Link to="/programs/inner-stars" className="hover:text-[var(--color-yellow-gold)] transition-colors">Inner Stars</Link>
                    <Link to="/book-now" className="hover:text-[var(--color-yellow-gold)] transition-colors text-[var(--color-yellow-gold)]">Book Now</Link>
                </div>
            </div>

            <Snackbar
                show={snackbar.show}
                message={snackbar.message}
                type={snackbar.type}
                onClose={() => setSnackbar({ ...snackbar, show: false })}
            />
            <HiddenNavigation links={seoLinks} />
        </div>
    );
};

export default LearningStarsPage;
