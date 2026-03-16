import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/images/Logo/Logo.svg';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
    const [mobileBookNowOpen, setMobileBookNowOpen] = useState(false);
    const location = useLocation();
    const isLearningStars = location.pathname === '/learning-stars';

    const openInnerStarsCalendly = (e) => {
        e.preventDefault();
        if (window.Calendly) {
            window.Calendly.showPopupWidget('https://calendly.com/hello-thestarrypath-mglz/inner-stars-parent-call');
        }
        setIsMenuOpen(false);
        setMobileBookNowOpen(false);
    };

    const openLearningStarsCalendly = (e) => {
        e.preventDefault();
        if (window.Calendly) {
            window.Calendly.showPopupWidget('https://calendly.com/hello-thestarrypath-mglz/learning-stars-parent-call');
        }
        setIsMenuOpen(false);
        setMobileBookNowOpen(false);
    };

    return (
        <header className={`header ${isLearningStars ? 'header-learning-stars' : ''}`}>
            <div className="header-container">
                <Link to="/" className="logo-container">
                    <img src={Logo} alt="The Starry Path" className="logo" />
                </Link>

                {/* Hamburger Toggle */}
                <button
                    className={`nav-toggle ${isMenuOpen ? 'open' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <ul>
                        <li><Link to="/story" onClick={() => setIsMenuOpen(false)}>Story</Link></li>
                        <li className="nav-item-dropdown max-md:w-full max-md:flex-col max-md:items-start group">
                            <div className="flex items-center justify-between w-full lg:w-auto gap-2">
                                <Link to="/programs" onClick={() => setIsMenuOpen(false)}>Programs</Link>
                                <button className="p-1 md:pointer-events-none text-[var(--color-deep-purple)]" onClick={(e) => { e.preventDefault(); setMobileProgramsOpen(!mobileProgramsOpen); }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${mobileProgramsOpen ? 'rotate-180' : ''} group-hover:md:-rotate-180`}><path d="M6 9l6 6 6-6" /></svg>
                                </button>
                            </div>
                            <div className={`dropdown-menu ${mobileProgramsOpen ? 'mobile-open' : ''}`}>
                                <Link to="/inner-stars" className="dropdown-item inner-stars-btn" onClick={() => setIsMenuOpen(false)}>Inner Stars</Link>
                                <Link to="/learning-stars" className="dropdown-item learning-stars-btn" onClick={() => setIsMenuOpen(false)}>Learning Stars</Link>
                            </div>
                        </li>
                        <li><span className="nav-disabled">Resources</span></li>
                        <li className="mobile-cta nav-item-dropdown max-md:w-full max-md:flex-col text-center">
                            <button
                                className="btn-join font-bold w-full flex items-center justify-center gap-2 group mx-auto"
                                onClick={(e) => { e.preventDefault(); setMobileBookNowOpen(!mobileBookNowOpen); }}
                            >
                                Book now
                                <span className={`inline-block w-2 h-2 border-r-2 border-b-2 border-white mb-1 transition-transform ${mobileBookNowOpen ? '-rotate-[135deg]' : 'rotate-45'}`}></span>
                            </button>
                            <div className={`dropdown-menu mx-auto ${mobileBookNowOpen ? 'mobile-open' : ''}`}>
                                <a href="#" className="dropdown-item inner-stars-btn w-full text-center" onClick={openInnerStarsCalendly}>Inner Stars</a>
                                <a href="#" className="dropdown-item learning-stars-btn w-full text-center" onClick={openLearningStarsCalendly}>Learning Stars</a>
                            </div>
                        </li>
                    </ul>
                </nav>

                <div className="cta-container nav-item-dropdown group relative z-[100]">
                    <a className="btn-join font-bold text-white no-underline flex items-center gap-2 cursor-pointer">
                        Book now
                    </a>
                    <div className="dropdown-menu !left-auto !right-[-20px] !transform-none opacity-0 invisible group-hover:!opacity-100 group-hover:!visible group-hover:!-translate-y-1 transition-all duration-300 mt-4">
                        <a href="#" className="dropdown-item inner-stars-btn" onClick={openInnerStarsCalendly}>Inner Stars</a>
                        <a href="#" className="dropdown-item learning-stars-btn" onClick={openLearningStarsCalendly}>Learning Stars</a>
                    </div>
                </div>
            </div>
        </header>

    );
};

export default Header;
