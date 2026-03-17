import React from 'react';
import { Link } from 'react-router-dom';
import WaveImg from '../../assets/images/Programs/Wave.svg';
import "../../styles/components.css";

const ProgramCTA = () => {
    return (
        <section className="explore-section mt-4 mb-12 hidden md:block">
            <div className="footer-wave-container">

                {/* 🌊 Background Wave */}
                <img
                    src={WaveImg}
                    alt="Transition Wave"
                    className="footer-wave-bg"
                />

                {/* ✨ Text Flow SVG - Animated Text Layer aligned to Wave.svg coordinates */}
                <svg
                    viewBox="0 0 1621.97 456.18"
                    className="wave-text-overlay"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <defs>
                        {/* 🟡 CENTER PATH - teal stripe top edge from Wave.svg */}
                        <path
                            id="programWavePath"
                            d="M33.29,207.17c29.66,14.41,59.75,29.97,92.28,36.74,32.53,6.77,67.35,2.71,98.44-12.11,56.24-26.81,93.28-80.69,147.29-111.05,52.02-29.24,114.62-40.51,173.6-31.25,27.95,4.39,54.86,13.2,79.99,26.17,22.4,11.56,43.45,25.55,64.16,39.86,40.77,28.15,81.35,59.1,129.01,74.65,23.04,7.52,47.7,10.77,71.85,8.12,30.01-3.29,58.45-14.27,84.11-30,28.95-17.75,54.3-40.55,82.23-59.76,25.65-17.65,55.14-33.88,87.01-34.85,54.52-1.66,88.02,46.17,111.96,88.64,12.95,22.99,27.85,46.2,48.19,63.39,21.39,18.08,47.15,26.97,75.13,22.69,16.75-2.56,32.63-9.1,48.59-14.49,8.26-2.79,16.61-5.36,25.16-7.07,5.37-.96,8.07-1.36,5.41-.57,25.12-2.82,51.16-2.81,75.92,2.63,13.33,2.92,26.12,7.41,37.87,14.42 c29.66,14.41,59.75,29.97,92.28,36.74,32.53,6.77,67.35,2.71,98.44-12.11,56.24-26.81,93.28-80.69,147.29-111.05,52.02-29.24,114.62-40.51,173.6-31.25,27.95,4.39,54.86,13.2,79.99,26.17,22.4,11.56,43.45,25.55,64.16,39.86,40.77,28.15,81.35,59.1,129.01,74.65,23.04,7.52,47.7,10.77,71.85,8.12,30.01-3.29,58.45-14.27,84.11-30,28.95-17.75,54.3-40.55,82.23-59.76,25.65-17.65,55.14-33.88,87.01-34.85,54.52-1.66,88.02,46.17,111.96,88.64,12.95,22.99,27.85,46.2,48.19,63.39,21.39,18.08,47.15,26.97,75.13,22.69,16.75-2.56,32.63-9.1,48.59-14.49,8.26-2.79,16.61-5.36,25.16-7.07,5.37-.96,8.07-1.36,5.41-.57,25.12-2.82,51.16-2.81,75.92,2.63,13.33,2.92,26.12,7.41,37.87,14.42"
                            fill="none"
                        />
                        {/* 🎭 SVG-native gradient mask — fixed to viewport coords */}
                        <linearGradient id="progFadeGrad" gradientUnits="userSpaceOnUse" x1="0" x2="1621.97" y1="0" y2="0">
                            <stop offset="0"        stopColor="white" stopOpacity="0" />
                            <stop offset="97"       stopColor="white" stopOpacity="1" />
                            <stop offset="1524"     stopColor="white" stopOpacity="1" />
                            <stop offset="1621.97"  stopColor="white" stopOpacity="0" />
                        </linearGradient>
                        <mask id="progTextFade" maskUnits="userSpaceOnUse">
                            <rect x="0" y="0" width="1621.97" height="456.18" fill="url(#progFadeGrad)" />
                        </mask>
                    </defs>

                    {/* 📝 Flowing Text - Seamless Infinite Scroll */}
                    <text
                        className="wave-text"
                        dominantBaseline="middle"
                        dy="32"
                        mask="url(#progTextFade)"
                        style={{
                            fontSize: '22px',
                            letterSpacing: '6px',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            fontFamily: 'Quicksand, sans-serif'
                        }}
                    >
                        <textPath href="#programWavePath">
                            {[...Array(6)].map((_, i) => (
                                <React.Fragment key={i}>
                                    <tspan fill="var(--color-orange)">INNER STARS BUILDS CHARACTER.{"\u00A0\u00A0\u00A0\u00A0"} </tspan>
                                    <tspan fill="var(--color-navy)">LEARNING STARS BUILDS LITERACY.{"\u00A0\u00A0\u00A0\u00A0"} </tspan>
                                </React.Fragment>
                            ))}
                            <animate
                                attributeName="startOffset"
                                from="-100%"
                                to="0%"
                                dur="80s"
                                repeatCount="indefinite"
                            />
                        </textPath>
                    </text>
                </svg>

                {/* 🔘 Button - Using footer-wave-button for consistency with ExploreSection */}
                <Link to="/inner-stars#enrollment-form" className="footer-wave-button flex items-center justify-center text-center no-underline" data-aos="zoom-in">
                    START YOUR CHILD'S JOURNEY
                </Link>
            </div>
        </section>
    );
};

export default ProgramCTA;

