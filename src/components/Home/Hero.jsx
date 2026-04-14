import React from 'react';
import BannerBox from '../../assets/images/Homepage/Homepage Banner.svg';

const Hero = () => {
    return (
        <section className="hero-section py-8 md:py-12 flex flex-col items-center justify-center">
            <div className="w-full max-w-[1000px] px-4 mx-auto">
                <img
                    src={BannerBox}
                    alt="Life skills and resilience visual showing the balance between exam preparation and preparing children for life"
                    className="w-full h-auto object-contain drop-shadow-lg"
                    loading="eager"
                    fetchPriority="high"
                />
            </div>
        </section>
    );
};

export default Hero;
