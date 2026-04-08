import React from 'react';
import { Link } from 'react-router-dom';

const StarKeepersSection = () => {
    return (
        <section className="bg-[var(--color-dark-navy)] text-white py-12 md:py-16 px-4 rounded-[20px] md:rounded-[30px] mx-4 md:mx-auto max-w-[1200px] mt-20 mb-12 md:my-24 relative overflow-visible shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-5xl mx-auto">

                {/* Left: Umbrella Image Container */}
                <div className="relative flex-1 flex flex-col items-center md:items-center justify-center" data-aos="fade-right">
                    <div className="bg-transparent rounded-[40px] p-6 pb-0 w-full max-w-[500px] relative z-10 flex flex-col items-center">
                        <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 647.9 623.69" className="w-full h-auto">
                            <defs>
                                <style>{`
                                    .st0 { fill: #523cac; stroke: #fff; stroke-miterlimit: 10; }
                                    .st1 { fill: #adc716; }
                                    .st2 { fill: #33c5b5; }
                                    .st3 { fill: #fff; }
                                    .st4 { fill: #e44c17; }
                                    .st5 { fill: #f7008d; }
                                    .st6 { fill: #f9a700; }
                                    
                                    @keyframes twinkle {
                                        0%, 100% { opacity: 1; transform: scale(1); }
                                        50% { opacity: 0.6; transform: scale(0.8); }
                                    }
                                    
                                    .star {
                                        transform-origin: center;
                                        animation: twinkle 3s ease-in-out infinite;
                                    }
                                    
                                    .star-1 { animation-delay: 0s; }
                                    .star-2 { animation-delay: 0.5s; }
                                    .star-3 { animation-delay: 1.2s; }
                                    .star-4 { animation-delay: 1.8s; }
                                    .star-5 { animation-delay: 2.3s; }
                                    .star-6 { animation-delay: 0.8s; }
                                `}</style>
                            </defs>
                            <g>
                                <path className="st3" d="M148.51,240.39v276.63c0,9.17,7.44,16.61,16.61,16.61h317.68c9.17,0,16.61-7.44,16.61-16.61V240.17s-84.02-22.7-169.39-23.26c-88.77-.58-179.06,21.04-181.5,23.48Z" />
                                <path className="st1" d="M499.63,240.17c-36.92-102.99-122.91-127.84-158.88-133.78-.22-9.05-7.62-16.33-16.73-16.33s-15.96,6.75-16.68,15.34c-98.15,9.14-141.99,89.69-159.02,135-3.03,8.06,4.67,15.81,10.98,11.09,44.16-33.03,80.45-.82,93.26,13.46,2.86,3.19,7.33,3.23,10.25.11,20.32-21.72,40.23-30.31,58.27-31.56.27,34.2.79,68.43,1.3,101.87.22,14.33.44,71.9.64,86.23.14,10.22.3,21.81-4.76,30.65-4.75,8.29-15.38,12.79-24.82,12.8-8.4,0-17.04-4.31-20.83-11.81-2.9-5.73-2.68-12.33-1.98-18.54.53-4.63.35-10.98-6.19-10.66-11.25.54-6.35,27.91-3.49,34.22,4.18,9.24,13.31,15.74,23.19,18.04,16.88,3.92,36.21-2.34,45.06-17.78,6.78-11.83,6.59-25.84,6.43-37.09-.2-14.33-.42-71.91-.64-86.24-.51-33.28-1.02-67.35-1.3-101.39,28.3,3.23,50.51,22.89,59.99,32.71,2.88,2.98,7.2,2.93,10.04-.11,36.05-38.62,66.18-29.4,84.86-15.3,6.27,4.73,13.96-2.83,11.06-10.92Z" />
                            </g>
                            <path className="st2 star star-1" d="M197.33,306.61l-6.52-9.37c-1.66-2.38.16-5.63,3.06-5.45l11.39.69c1.16.07,2.28-.44,2.98-1.37l6.89-9.1c1.75-2.31,5.4-1.58,6.13,1.23l2.86,11.05c.29,1.12,1.13,2.03,2.22,2.41l10.78,3.74c2.74.95,3.17,4.65.73,6.21l-9.62,6.14c-.98.62-1.58,1.7-1.6,2.86l-.23,11.41c-.06,2.9-3.44,4.45-5.68,2.61l-8.81-7.26c-.9-.74-2.1-.98-3.21-.64l-10.92,3.31c-2.78.84-5.3-1.89-4.24-4.59l4.18-10.62c.43-1.08.28-2.3-.38-3.25Z" />
                            <path className="st5 star star-2" d="M412.72,426.41l-10.18-5.16c-2.59-1.31-2.52-5.03.12-6.25l10.37-4.78c1.05-.49,1.8-1.47,1.98-2.62l1.76-11.28c.45-2.87,4.01-3.95,5.98-1.82l7.75,8.38c.79.85,1.95,1.25,3.1,1.07l11.27-1.81c2.87-.46,5,2.59,3.58,5.12l-5.57,9.96c-.57,1.01-.59,2.24-.06,3.28l5.2,10.16c1.32,2.58-.92,5.55-3.77,4.99l-11.2-2.22c-1.14-.23-2.32.13-3.14.96l-8.06,8.09c-2.05,2.06-5.56.84-5.91-2.04l-1.35-11.33c-.14-1.15-.84-2.16-1.88-2.69Z" />
                            <path className="st6 star star-3" d="M370.79,334.89l-3.5-5.1c-.89-1.3.11-3.05,1.68-2.94l6.17.42c.63.04,1.24-.23,1.62-.73l3.77-4.9c.96-1.25,2.93-.84,3.32.69l1.51,6c.15.61.6,1.1,1.19,1.31l5.83,2.07c1.48.53,1.7,2.53.37,3.37l-5.24,3.29c-.53.33-.86.91-.88,1.54l-.17,6.18c-.04,1.57-1.88,2.4-3.09,1.39l-4.75-3.96c-.48-.4-1.14-.54-1.74-.36l-5.93,1.75c-1.51.45-2.86-1.05-2.28-2.5l2.3-5.74c.23-.58.16-1.25-.19-1.76Z" />
                            <path className="st0 star star-4" d="M435.13,312.45l-3.5-5.1c-.89-1.3.11-3.05,1.68-2.94l6.17.42c.63.04,1.24-.23,1.62-.73l3.77-4.9c.96-1.25,2.93-.84,3.32.69l1.51,6c.15.61.6,1.1,1.19,1.31l5.83,2.07c1.48.53,1.7,2.53.37,3.37l-5.24,3.29c-.53.33-.86.91-.88,1.54l-.17,6.18c-.04,1.57-1.88,2.4-3.09,1.39l-4.75-3.96c-.48-.4-1.14-.54-1.74-.36l-5.93,1.75c-1.51.45-2.86-1.05-2.28-2.5l2.3-5.74c.23-.58.16-1.25-.19-1.76Z" />
                            <path className="st4 star star-5" d="M240.68,378.62l-3.99-5c-1.01-1.27-.11-3.15,1.51-3.16l6.39-.03c.65,0,1.26-.33,1.61-.87l3.52-5.33c.9-1.36,2.96-1.08,3.47.46l2,6.07c.2.62.7,1.09,1.33,1.27l6.16,1.7c1.57.43,1.94,2.48.63,3.44l-5.15,3.78c-.52.38-.82,1.01-.79,1.66l.29,6.38c.07,1.62-1.76,2.61-3.08,1.66l-5.19-3.74c-.53-.38-1.21-.47-1.82-.24l-5.98,2.25c-1.52.57-3.03-.87-2.53-2.41l1.95-6.09c.2-.62.07-1.3-.33-1.8Z" />
                            <path className="st1 star star-6" d="M202.26,442.39l-3.99-5c-1.01-1.27-.11-3.15,1.51-3.16l6.39-.03c.65,0,1.26-.33,1.61-.87l3.52-5.33c.9-1.36,2.96-1.08,3.47.46l2,6.07c.2.62.7,1.09,1.33,1.27l6.16,1.7c1.57.43,1.94,2.48.63,3.44l-5.15,3.78c-.52.38-.82,1.01-.79,1.66l.29,6.38c.07,1.62-1.76,2.61-3.08,1.66l-5.19-3.74c-.53-.38-1.21-.47-1.82-.24l-5.98,2.25c-1.52.57-3.03-.87-2.53-2.41l1.95-6.09c.2-.62.07-1.3-.33-1.8Z" />
                        </svg>
                    </div>
                    {/* Button overlapping the bottom of the card */}
                    <div className="relative -mt-10 md:-mt-20 z-20 flex justify-center md:block">
                        <Link to="/story" className="btn-join font-bold uppercase whitespace-nowrap text-sm px-8 py-3 shadow-md" style={{ borderRadius: '10px' }}>
                            READ OUR STORY
                        </Link>
                    </div>
                </div>

                {/* Right: Text Content */}
                <div className="flex-1 text-center md:text-left md:pl-8 text-white" data-aos="fade-left">
                    <h2 className="font-[var(--font-heading)] text-2xl md:text-4xl mb-4 md:mb-6 uppercase leading-tight font-bold whitespace-nowrap md:whitespace-normal">
                        MEET THE STAR KEEPERS
                    </h2>
                    <p className="font-[var(--font-accent)] text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0 opacity-90 text-justify md:text-left">
                        Created by an experienced teacher with a background in psychology, The Starry Path blends child development research with intentional, engaging learning.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default StarKeepersSection;
