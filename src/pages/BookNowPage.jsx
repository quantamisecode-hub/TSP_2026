import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const BookNowPage = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
    }, []);

    const schema = {
        "@context": "https://schema.org",
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
                "name": "Book Now",
                "item": "https://thestarrypath.com.au/book-now"
            }
        ]
    };

    return (
        <div className="book-now-page py-20 px-6 min-h-screen">
            <SEO
                title="Book Now | The Starry Path Point Cook"
                description="Book your child’s place in The Starry Path programs in Point Cook, including Inner Stars and Learning Stars for children aged 5–12."
                keywords={[
                    "book children’s program Point Cook",
                    "book Inner Stars",
                    "book Learning Stars",
                    "enrol kids program Point Cook"
                ]}
                schema={schema}
            />

            <div className="max-w-[1000px] mx-auto text-center" data-aos="fade-up">
                <h1 className="text-4xl md:text-6xl font-[var(--font-heading)] font-bold mb-8 text-[var(--color-dark-navy)]">
                    Book Now
                </h1>
                <p className="text-xl md:text-2xl font-[var(--font-accent)] text-[#4A4A4A] mb-16 max-w-2xl mx-auto">
                    Take the next step in your child's journey. Choose a program below to secure their place or book a screening.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Inner Stars Card */}
                    <div className="bg-[#FCF8F2] rounded-[2.5rem] p-10 shadow-xl border-t-8 border-[var(--color-hot-pink)] flex flex-col items-center transform transition hover:scale-[1.02]">
                        <h2 className="text-3xl font-bold mb-4 font-[var(--font-heading)] text-[var(--color-dark-navy)]">Inner Stars</h2>
                        <p className="text-lg mb-8 opacity-80">Life Skills, Mindset & Resilience</p>
                        <ul className="text-left mb-10 space-y-3 opacity-90">
                            <li>• Saturday Sessions</li>
                            <li>• Holiday Intensives</li>
                        </ul>
                        <Link to="/programs/inner-stars#enrollment-form" className="btn-join px-12 py-4 mt-auto">
                            ENROL IN INNER STARS
                        </Link>
                    </div>

                    {/* Learning Stars Card */}
                    <div className="bg-[#FCF8F2] rounded-[2.5rem] p-10 shadow-xl border-t-8 border-[var(--color-teal)] flex flex-col items-center transform transition hover:scale-[1.02]">
                        <h2 className="text-3xl font-bold mb-4 font-[var(--font-heading)] text-[var(--color-dark-navy)]">Learning Stars</h2>
                        <p className="text-lg mb-8 opacity-80">Structured Literacy Support</p>
                        <ul className="text-left mb-10 space-y-3 opacity-90">
                            <li>• Free Literacy Assessment</li>
                            <li>• Weekly Support Sessions</li>
                        </ul>
                        <Link to="/programs/learning-stars#assessment-section" className="btn-join px-12 py-4 mt-auto">
                            BOOK ASSESSMENT
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookNowPage;
