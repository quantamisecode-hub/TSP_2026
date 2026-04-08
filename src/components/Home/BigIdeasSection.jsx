import React from 'react';
import { Link } from 'react-router-dom';
import BigIdeasDesktop from '../../assets/images/Homepage/Big Ideas copy.svg';
import BigIdeasMobile from '../../assets/images/Homepage/Big Ideas copy 2.svg';

const BigIdeasSection = () => {
    return (
        <section className="section big-ideas-section">
            <picture>
                <source media="(max-width: 768px)" srcSet={BigIdeasMobile} />
                <img
                    src={BigIdeasDesktop}
                    alt="Big Ideas"
                    className="big-ideas-image"
                />
            </picture>
            <div className="big-ideas-cta flex justify-center px-4" data-aos="fade-up" data-aos-delay="200">
                <Link
                    to="/programs"
                    className="btn-join font-bold uppercase text-sm md:text-2xl px-6 py-3 md:px-12 md:py-4 w-full md:w-auto rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{ backgroundColor: '#E91E63' }}
                >
                    EXPLORE HOW TSP WORKS
                </Link>
            </div>
        </section>
    );
};

export default BigIdeasSection;
