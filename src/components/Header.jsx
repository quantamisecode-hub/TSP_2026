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
                        <li className="nav-item-dropdown group">
                            <div className="flex items-center justify-between w-full md:w-auto">
                                <Link to="/programs" onClick={() => setIsMenuOpen(false)}>Programs</Link>
                                <button
                                    className="md:hidden ml-4 p-2"
                                    onClick={(e) => { e.preventDefault(); setMobileProgramsOpen(!mobileProgramsOpen); }}
                                >
                                    <span className={`inline-block w-2.5 h-2.5 border-r-2 border-b-2 border-[var(--color-deep-purple)] transition-transform duration-300 ${mobileProgramsOpen ? '-rotate-[135deg]' : 'rotate-45'}`}></span>
                                </button>
                            </div>
                            <div className={`dropdown-menu ${mobileProgramsOpen ? 'mobile-open' : ''}`}>
                                <Link to="/programs" className="dropdown-item overview-btn" onClick={() => setIsMenuOpen(false)}>Overview</Link>
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
                                Book Now
                                <span className={`inline-block w-2 h-2 border-r-2 border-b-2 border-white mb-1 transition-transform ${mobileBookNowOpen ? '-rotate-[135deg]' : 'rotate-45'}`}></span>
                            </button>
                            <div className={`dropdown-menu mx-auto ${mobileBookNowOpen ? 'mobile-open' : ''}`}>
                                <Link to="/inner-stars#enrollment-form" className="dropdown-item inner-stars-btn w-full text-center" onClick={() => { setIsMenuOpen(false); setMobileBookNowOpen(false); }}>Inner Stars</Link>
                                <Link to="/learning-stars#assessment-section" className="dropdown-item learning-stars-btn w-full text-center" onClick={() => { setIsMenuOpen(false); setMobileBookNowOpen(false); }}>Learning Stars</Link>
                            </div>
                        </li>
                    </ul>
                </nav>

                <div className="cta-container nav-item-dropdown group relative z-[100]">
                    <a className="btn-join font-bold text-white no-underline flex items-center gap-2 cursor-pointer">
                        Book Now
                    </a>
                    <div className="dropdown-menu !left-1/2 !-translate-x-1/2 opacity-0 invisible group-hover:!opacity-100 group-hover:!visible group-hover:!-translate-y-1 transition-all duration-300 mt-4">
                        <Link to="/inner-stars#enrollment-form" className="dropdown-item inner-stars-btn" onClick={() => setIsMenuOpen(false)}>Inner Stars</Link>
                        <Link to="/learning-stars#assessment-section" className="dropdown-item learning-stars-btn" onClick={() => setIsMenuOpen(false)}>Learning Stars</Link>
                    </div>
                </div>
            </div>
        </header>

    );
};

export default Header;
