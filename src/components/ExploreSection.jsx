import React from "react";
import { useLocation } from "react-router-dom";
import LastCurve from "../assets/images/Homepage/Asset 1.svg";
import "../styles/components.css";

const ExploreSection = () => {
    const location = useLocation();
    const isStoryPage = location.pathname === '/story';
    const isLearningStarsPage = location.pathname === '/learning-stars';
    const isInnerStarsPage = location.pathname === '/inner-stars';

    return (
        <section className={`explore-section hidden md:block ${isLearningStarsPage ? 'bg-[var(--color-dark-navy)]' : ''}`}>
            <div className="footer-wave-container">

                {/* 🌊 Background Wave */}
                <img
                    src={LastCurve}
                    alt="Wave"
                    className="footer-wave-bg"
                />

                {/* ✨ Text Flow SVG - Centered in Gold Ribbon */}
                <svg
                    viewBox="0 0 1375.03 483.06"
                    className="wave-text-overlay"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <defs>
                        {/* 🟡 CENTER PATH of gold ribbon */}
                        <path
                            id="goldWavePath"
                            d="M-32,258c50.86,5,102.51,10,154.56,-0.12c28.5,-2.84,56.19,-8.67,83.33,-17.76c21.86,-7.32,43.24,-16.03,65.28,-22.83c24.3,-7.5,49.31,-12.47,74.49,-15.92c55.57,-7.43,112.4,-7.74,167.99,-0.33c61.14,8.34,118.96,29.96,179,43.2c33.38,7.36,67.71,12.1,101.94,11.94c39.16,-0.18,78.45,-6.44,116.07,-17.15c38.62,-10.99,76.2,-24.8,116.19,-30.24c21.58,-2.8,43.37,-3.52,64.98,-0.68c15.12,2.11,29.86,5.95,43.98,11.79c10.52,4.44,20.56,9.9,30.07,16.22c8.86,5.9,17.25,12.39,26.49,17.72c28.96,16.73,61.89,25.33,95.31,25.49c23.59,0.12,47.06,-4.34,70.36,-7.52c41.91,-5.62,85.73,-6.13,127.66,-0.53c7.68,1.07,15.3,2.41,22.83,4.24 c50.86,5,102.51,10,154.56,-0.12c28.5,-2.84,56.19,-8.67,83.33,-17.76c21.86,-7.32,43.24,-16.03,65.28,-22.83c24.3,-7.5,49.31,-12.47,74.49,-15.92c55.57,-7.43,112.4,-7.74,167.99,-0.33c61.14,8.34,118.96,29.96,179,43.2c33.38,7.36,67.71,12.1,101.94,11.94c39.16,-0.18,78.45,-6.44,116.07,-17.15c38.62,-10.99,76.2,-24.8,116.19,-30.24c21.58,-2.8,43.37,-3.52,64.98,-0.68c15.12,2.11,29.86,5.95,43.98,11.79c10.52,4.44,20.56,9.9,30.07,16.22c8.86,5.9,17.25,12.39,26.49,17.72c28.96,16.73,61.89,25.33,95.31,25.49c23.59,0.12,47.06,-4.34,70.36,-7.52c41.91,-5.62,85.73,-6.13,127.66,-0.53c7.68,1.07,15.3,2.41,22.83,4.24"
                            fill="none"
                        />
                        {/* 🎭 SVG-native gradient mask — fixed to viewport coords */}
                        <linearGradient id="goldFadeGrad" gradientUnits="userSpaceOnUse" x1="0" x2="1375.03" y1="0" y2="0">
                            <stop offset="0"        stopColor="white" stopOpacity="0" />
                            <stop offset="110"      stopColor="white" stopOpacity="1" />
                            <stop offset="1265"     stopColor="white" stopOpacity="1" />
                            <stop offset="1375.03"  stopColor="white" stopOpacity="0" />
                        </linearGradient>
                        <mask id="goldTextFade" maskUnits="userSpaceOnUse">
                            <rect x="0" y="0" width="1375.03" height="483.06" fill="url(#goldFadeGrad)" />
                        </mask>
                    </defs>

                    {/* 📝 Flowing Text - Seamless Infinite Scroll */}
                    <text
                        className="wave-text"
                        dominantBaseline="middle"
                        dy="12"
                        mask="url(#goldTextFade)"
                        style={{
                            fontSize: '22px',
                            letterSpacing: '6px',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            fontFamily: 'Quicksand, sans-serif'
                        }}
                    >
                        <textPath href="#goldWavePath">
                            {isStoryPage ? (
                                [...Array(10)].map((_, i) => (
                                    <React.Fragment key={i}>
                                        <tspan fill="#ffffff">Learning that goes beyond the classroom{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"} </tspan>
                                    </React.Fragment>
                                ))
                            ) : isLearningStarsPage ? (
                                [...Array(12)].map((_, i) => (
                                    <React.Fragment key={i}>
                                        <tspan fill="var(--color-navy)">Learning Stars builds literacy{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"} </tspan>
                                    </React.Fragment>
                                ))
                            ) : isInnerStarsPage ? (
                                [...Array(12)].map((_, i) => (
                                    <React.Fragment key={i}>
                                        <tspan fill="var(--color-navy)">Inner Stars builds character{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"} </tspan>
                                    </React.Fragment>
                                ))
                            ) : (
                                [...Array(6)].map((_, i) => (
                                    <React.Fragment key={i}>
                                        <tspan fill="var(--color-navy)">Learning that goes beyond the classroom{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"} </tspan>
                                        <tspan fill="var(--color-navy)">The habits of mind that build character{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"} </tspan>
                                        <tspan fill="var(--color-navy)">Build them early. Build them with intention{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"} </tspan>
                                    </React.Fragment>
                                ))
                            )}
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



            </div>
        </section>
    );
};

export default ExploreSection;
