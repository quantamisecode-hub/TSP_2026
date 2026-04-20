import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreSection from '../components/ExploreSection';
import Loader from '../components/Loader';
import Breadcrumbs from '../components/Breadcrumbs';

import { useLocation } from 'react-router-dom';

const MainLayout = ({ children }) => {
    const location = useLocation();
    // Default to true on initial load
    const [loading, setLoading] = useState(true);
    const showExploreSection = true; // ExploreSection shows on all pages (handles per-page text internally)

    useEffect(() => {
        window.scrollTo(0, 0);

        // Trigger loading on mount and route change
        setLoading(true);

        // Show loading in tab title
        const originalTitle = document.title;
        document.title = "Loading... | The Starry Path";

        const timer = setTimeout(() => {
            setLoading(false);
            document.title = originalTitle;
        }, 800); // 800ms delay for smooth transition

        return () => {
            clearTimeout(timer);
            document.title = originalTitle;
        };
    }, [location]);

    return (
        <div className="main-layout relative">
            {loading && <Loader />}

            {/* 
               Ideally, we might want to hide content while loading, 
               but often a full-screen loader overlay is enough.
               If we hide content, we might cause layout shifts after.
               Let's keep content mounted but covered by Loader z-index.
            */}

            <Header />
            <main className="content">
                <Breadcrumbs />
                {children}
            </main>
            {showExploreSection && <ExploreSection />}
            <Footer />
        </div>
    );
};

export default MainLayout;
