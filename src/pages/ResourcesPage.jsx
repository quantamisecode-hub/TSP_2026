import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogService } from '../services/blogService';
import '../styles/resources.css';
// import HomepageBanner from '../assets/images/Homepage/Homepage Banner.svg';
import ResourcesBanner from '../assets/resources/Resources Banner.svg'
import SEO from '../components/SEO';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ResourcesPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1000, once: false });

        const fetchPosts = async () => {
            try {
                const fetchedPosts = await blogService.getPosts();
                setPosts(fetchedPosts);
                setLoading(false);
                setTimeout(() => AOS.refresh(), 500);
            } catch (err) {
                console.error('Error loading blogs:', err);
                setError('Failed to load resources. Please try again later.');
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handlePostClick = (post) => {
        // Using the built-in WordPress slug (already lowercase) for URLs
        navigate(`/resources/blogs-post/${post.slug}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const defaultColors = ["#E91E63", "#56469c", "#fcb116", "#b0d236", "#f04c23", "#45bfb4"];
    const hoverColors = ["#fcb116", "#b0d236", "#f04c23", "#56469c", "#ed2480", "#45bfb4"];

    return (
        <div className="resources-page pb-0">
            <SEO
                title="Resources & Blog | The Starry Path"
                description="Explore our latest articles, guides and insights on building resilience, mindset and emotional intelligence for children."
            />

            <div className="resources-hero container mx-auto px-4 mb-0" data-aos="fade-up">
                <div className="flex flex-col items-center text-center">
                    <div className="puzzle-hero flex justify-center mb-2 w-full pl-10 md:pl-64">
                        <img src={ResourcesBanner} alt="The Starry Path Banner" className="w-[125%] md:w-full max-w-none md:max-w-7xl h-auto mx-auto transform translate-x-[2%]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-navy)] tracking-[0.1em] mb-4">Resources to Support Your Child</h1>
                    <div className="w-24 h-1.5 bg-[var(--color-hot-pink)] rounded-full mb-8"></div>
                </div>
            </div>

            <div className="container mx-auto px-4 pt-4 mb-4">
                {loading ? (
                    <div className="flex justify-center items-center py-32">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--color-hot-pink)]"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500 font-bold bg-red-50 rounded-[2rem] border border-red-100 p-12" data-aos="zoom-in">
                        <p className="text-xl mb-4">Oops! Something went wrong.</p>
                        <p className="text-sm opacity-70">{error}</p>
                    </div>
                ) : (
                    <div className="resources-grid">
                        {posts.map((post, index) => (
                            <div
                                key={post.id}
                                className="resource-card group"
                                style={{ "--card-hover-color": hoverColors[index % hoverColors.length] }}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                onClick={() => handlePostClick(post)}
                            >
                                <div className="card-image-wrapper">
                                    {post.featuredImage ? (
                                        <img src={post.featuredImage} alt={post.title} className="card-image" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center p-8 text-white"
                                            style={{ backgroundColor: defaultColors[index % defaultColors.length] }}>
                                            <svg className="w-20 h-20 opacity-30" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                                                <path d="M14 17H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                <div className="card-content">
                                    <div className="card-meta">
                                        <div className="meta-item">
                                            <svg className="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </div>
                                        <div className="meta-item">
                                            <svg className="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            {post.author}
                                        </div>
                                    </div>

                                    <h3
                                        className="card-title"
                                        dangerouslySetInnerHTML={{ __html: post.title }}
                                    />

                                    <div
                                        className="card-excerpt"
                                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                                    />

                                    <div className="card-action">
                                        Read Full Article
                                        <svg className="action-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResourcesPage;


