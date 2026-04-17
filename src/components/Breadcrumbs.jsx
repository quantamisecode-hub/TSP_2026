import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from './SEO';

const Breadcrumbs = () => {
    const location = useLocation();
    const isLearningStars = location.pathname.includes('/learning-stars');
    const pathnames = location.pathname.split('/').filter((x) => x);

    // Don't show breadcrumbs on the homepage
    if (location.pathname === '/' || location.pathname === '') {
        return null;
    }

    const breadcrumbMap = {
        'programs': 'Programs',
        'inner-stars': 'Inner Stars',
        'learning-stars': 'Learning Stars',
        'story': 'Our Story',
    };

    // Construct breadcrumb items
    const breadcrumbItems = [
        { label: 'Home', to: '/' },
    ];

    let currentPath = '';
    pathnames.forEach((name, index) => {
        currentPath += `/${name}`;
        
        // Skip 'blogs-post' from breadcrumbs as requested
        if (name === 'blogs-post') {
            return;
        }

        // Logical nesting for Specific Programs
        if ((name === 'inner-stars' || name === 'learning-stars') && !breadcrumbItems.find(i => i.to === '/programs')) {
            // If we are on a specific program page but haven't added "Programs" yet (due to flat routing)
            breadcrumbItems.push({ label: 'Programs', to: '/programs' });
        }

        breadcrumbItems.push({
            label: breadcrumbMap[name] || name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' '),
            to: currentPath,
        });
    });

    // Generate Schema.org BreadcrumbList
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": item.to === '/' 
                ? "https://thestarrypath.com.au/" 
                : `https://thestarrypath.com.au${item.to}`
        }))
    };

    return (
        <nav className={`breadcrumbs ${isLearningStars ? 'breadcrumbs-learning-stars' : ''}`} aria-label="Breadcrumb">
            <SEO schema={schema} />
            <div className="breadcrumbs-container">
                <ol className="breadcrumbs-list">
                    {breadcrumbItems.map((item, index) => {
                        const isLast = index === breadcrumbItems.length - 1;
                        return (
                            <li key={item.to} className="breadcrumb-item">
                                {isLast ? (
                                    <span className="breadcrumb-current" aria-current="page">
                                        {item.label}
                                    </span>
                                ) : (
                                    <>
                                        <Link to={item.to} className="breadcrumb-link">
                                            {item.label}
                                        </Link>
                                        <span className="breadcrumb-separator">/</span>
                                    </>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </nav>
    );
};

export default Breadcrumbs;
