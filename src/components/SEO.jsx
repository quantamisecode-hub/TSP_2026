import { useEffect } from 'react';

const SEO = ({ title, description, keywords, schema }) => {
  useEffect(() => {
    // Update Document Title
    if (title) {
      document.title = title; // Removed the suffix to match exact requested title
    }

    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    }

    // Update Meta Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && keywords) {
      const keywordsString = Array.isArray(keywords) ? keywords.join(', ') : keywords;
      metaKeywords.setAttribute('content', keywordsString);
    }

    // Update OG Title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && title) {
      ogTitle.setAttribute('content', title);
    }

    // ... (rest of the OG/Twitter tags)
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription && description) {
      ogDescription.setAttribute('content', description);
    }

    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle && title) {
      twitterTitle.setAttribute('content', title);
    }

    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription && description) {
      twitterDescription.setAttribute('content', description);
    }

    // Handle Canonical Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const currentUrl = window.location.origin + window.location.pathname;
    canonical.setAttribute('href', currentUrl);

    // Handle hreflang alternate (x-default)
    let altHreflang = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
    if (altHreflang) {
      altHreflang.setAttribute('href', currentUrl);
    }

    // Handle Schema injection
    if (schema) {
      const existingScript = document.getElementById('json-ld-schema');
      if (existingScript) {
        existingScript.textContent = JSON.stringify(schema);
      } else {
        const script = document.createElement('script');
        script.id = 'json-ld-schema';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      }
    } else {
      const existingScript = document.getElementById('json-ld-schema');
      if (existingScript) {
        existingScript.remove();
      }
    }

  }, [title, description, keywords, schema]);

  return null;
};

export default SEO;
