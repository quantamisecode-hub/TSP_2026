import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailConfig';
import Snackbar from '../components/Snackbar';
import SEO from '../components/SEO';
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
    const [openFaq, setOpenFaq] = React.useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [insideSlide, setInsideSlide] = useState(0);
    const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'success' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        window.scrollTo(0, 0);

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % researchSlides.length);
        }, 6000);

        const insideTimer = setInterval(() => {
            setInsideSlide((prev) => (prev + 1) % 2);
        }, 4000);

        return () => {
            clearInterval(timer);
            clearInterval(insideTimer);
        };
    }, []);

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
            logo_url: 'https://the-starry-path.vercel.app/Logo.png',
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
            leftHeading: "THE RESEARCH BEHIND OUR APPROACH",
            leftText: (
                <>
                    <p>Research across Australian literacy<br />organisations is consistent:</p>
                    <ul className="ls-research-bullets space-y-4">
                        <li>Foundational reading skills must<br />be taught directly and practised</li>
                        <li>Early intervention leads to stronger<br />long term outcomes</li>
                    </ul>
                </>
            ),
            rightHeading: <>LEARNING STARS<br />HELPS CHILDREN:</>,
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
            leftHeading: "THE RESEARCH BEHIND OUR APPROACH",
            leftText: (
                <>
                    <p>Research across Australian literacy<br />organisations is consistent:</p>
                    <ul className="ls-research-bullets space-y-4">
                        <li>Foundational reading skills must<br />be taught directly and practised</li>
                        <li>Early intervention leads to stronger<br />long term outcomes</li>
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
            leftHeading: "THE RESEARCH BEHIND OUR APPROACH",
            leftText: (
                <>
                    <p>Research across Australian literacy<br />organisations is consistent:</p>
                    <ul className="ls-research-bullets space-y-4">
                        <li>Foundational reading skills must<br />be taught directly and practised</li>
                        <li>Early intervention leads to stronger<br />long term outcomes</li>
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

    return (
        <div className="learning-stars-page">
            <SEO
                title="Science-Based Literacy Support & Free Assessment | Learning Stars"
                description="Is your child struggling with reading or spelling? Book a free literacy assessment and join our science-based program for phonics, fluency, and comprehension."
            />
            {/* Hero Section */}
            <section className="learning-stars-hero-section">
                <div className="learning-stars-hero-card" data-aos="fade-up">
                    <div className="ls-hero-content flex flex-col-reverse lg:flex-row items-center justify-center gap-10 lg:gap-16">
                        <div className="ls-hero-text w-full lg:w-1/2 text-center lg:text-left lg:pl-24" data-aos="fade-right" data-aos-delay="200">
                            <h1 className="ls-title">LEARNING STARS</h1>
                            <h2 className="ls-subtitle">Structured literacy support</h2>
                            <p className="ls-description">
                                Foundations for reading and writing<br className="hidden lg:block" />
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
            <section className="why-literacy-section py-20 lg:py-24">
                <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center gap-16 lg:gap-24">
                    {/* Left: Light Illustration */}
                    <div className="flex-1 flex justify-center" data-aos="fade-up">
                        <img src={LightSvg} alt="Literacy Support Illustration" className="ls-light-svg w-full max-w-[450px]" />
                    </div>

                    {/* Right: Text Content */}
                    <div className="flex-1 text-white" data-aos="fade-left">
                        <h2 className="why-literacy-title mb-8">WHY LITERACY<br />SUPPORT MATTERS</h2>

                        <div className="why-literacy-content space-y-6 text-lg lg:text-xl font-light opacity-90 leading-relaxed">
                            <p>
                                In Australia, 1 in 4 children fall behind in reading<br className="hidden lg:block" />
                                and writing by the middle years of primary school.
                            </p>
                            <p>Without support, small gaps grow.</p>
                            <p>
                                Reading and writing do not develop on their own.<br className="hidden lg:block" />
                                They need clear and intentional teaching.
                            </p>
                            <p className="font-semibold text-[var(--color-yellow-gold)] pt-4">
                                Concerned about your child's reading and spelling?
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
            <section className="ls-learn-section py-20 lg:py-24 bg-[var(--color-dark-navy)]">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center mb-10 lg:mb-16" data-aos="fade-up">
                        <h2 className="ls-learn-title">WHAT CHILDREN LEARN</h2>
                        <p className="ls-learn-subtitle mt-4 text-white opacity-90 text-lg md:text-xl font-body">
                            Build the foundation skills needed for reading and writing
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
                                        <img src={skill.icon} alt="Skill icon" className="w-full h-full object-contain" />
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
                        <p className="text-white opacity-80 text-base md:text-xl font-light italic font-body">
                            Build the foundation skills needed for reading and writing
                        </p>
                    </div>
                </div>
            </section>

            {/* Inside the Program Section */}
            <section className="ls-inside-program-section py-20 lg:py-24 bg-[var(--color-dark-navy)]">
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
            <section className="ls-intentional-section py-20 lg:py-24 bg-[var(--color-dark-navy)]">
                <div className="ls-intentional-wrapper px-6">
                    <h2 className="ls-intentional-title mb-0" data-aos="fade-up">
                        AN INTENTIONAL TEACHING APPROACH
                    </h2>

                    <div className="ls-intentional-info-box" data-aos="fade-up">
                        <p className="ls-intentional-info-text">
                            Learning Stars is based on how children learn to read and write. Teaching is structured and responsive at each child's point of need.
                        </p>
                    </div>

                    <div className="ls-intentional-asset-container mb-0" data-aos="zoom-in">
                        <img src={IntentionalApproachSvg} alt="An Intentional Teaching Approach" className="ls-intentional-asset" />
                    </div>


                </div>
            </section>

            {/* Research Section with Carousel */}
            <section className="ls-research-section py-20 lg:py-24 bg-[var(--color-dark-navy)]">
                <div className="max-w-[1300px] mx-auto px-6">
                    <div className="ls-research-carousel-wrapper">
                        {researchSlides.map((slide, index) => (
                            <div
                                key={index}
                                className={`ls-research-slide ${currentSlide === index ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
                            >
                                <div className="ls-research-container flex flex-col lg:flex-row items-stretch">
                                    {/* Left Column */}
                                    <div className="ls-research-left flex-1 ls-navy-panel p-10 lg:p-14 lg:pr-20 flex flex-col justify-center relative z-10">
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
                                    <div className={`ls-research-right flex-1 ${slide.panelColor} ${slide.rightHeading ? 'p-10 lg:p-14 lg:pl-32' : 'p-4 lg:p-6'} flex flex-col justify-center ${index === 0 ? 'items-center text-center' : 'items-start'} relative z-10 overflow-hidden`}>
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
                                onClick={() => setCurrentSlide(index)}
                                className={`ls-dot w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'ls-dot-active w-10 bg-[#FFCC00]' : 'bg-white/30 hover:bg-white/50'}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Why I Created Learning Stars Section */}
            <section className="ls-creator-section pt-20 pb-4 bg-[var(--color-dark-navy)]">
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
            <section className="ls-difference-section py-20 lg:py-24 bg-[var(--color-dark-navy)] text-white overflow-hidden">
                <div className="max-w-[1300px] mx-auto px-6">
                    <h2 className="ls-difference-title" data-aos="fade-up">
                        HOW LEARNING STARS IS DIFFERENT FROM TUTORING
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
            <section className="ls-clarity-section py-20 lg:py-24 bg-[var(--color-dark-navy)] mt-0 mb-0">
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
            <section id="assessment-section" className="ls-booking-section pt-4 pb-20 bg-[var(--color-dark-navy)]">
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
                                className={`ls-booking-btn text-white px-10 py-4 rounded-xl font-bold uppercase tracking-wider shadow-lg transition-all active:scale-95 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`}
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
            <section className="ls-faq-section py-20 bg-[var(--color-dark-navy)]">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="ls-faq-container bg-[#FCF8F2] rounded-[40px] p-8 lg:p-14 shadow-xl" data-aos="fade-up">
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
                                    <div className={`ls-faq-answer overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 pb-3' : 'max-h-0'}`}>
                                        <p className="text-[#4A4A4A] text-[1rem] lg:text-[1.1rem] font-body font-light leading-relaxed">
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            ))}
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

export default LearningStarsPage;
