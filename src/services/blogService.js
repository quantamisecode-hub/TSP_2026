const WP_API_URL = 'https://blogs.thestarrypath.com.au/wp-json/wp/v2';

/**
 * Fetch the source_url of a featured media item directly by its ID.
 * This is needed because the _embedded wp:featuredmedia endpoint on this
 * WordPress instance returns 401 (rest_forbidden) for the embedded response.
 */
async function fetchMediaUrl(mediaId) {
    if (!mediaId) return null;
    try {
        const res = await fetch(`${WP_API_URL}/media/${mediaId}`);
        if (!res.ok) return null;
        const media = await res.json();
        // Prefer the full-size source, fall back to any available size
        return (
            media.source_url ||
            media.media_details?.sizes?.full?.source_url ||
            media.media_details?.sizes?.large?.source_url ||
            media.media_details?.sizes?.medium_large?.source_url ||
            null
        );
    } catch {
        return null;
    }
}

/**
 * Extract the featured image URL from a post object, trying all known
 * WordPress REST API response shapes before giving up.
 */
function extractEmbeddedImage(post) {
    // 1. Standard _embedded — only valid when NOT a rest_forbidden error
    const embedded = post._embedded?.['wp:featuredmedia']?.[0];
    if (embedded?.source_url) return embedded.source_url;

    // 2. Jetpack
    if (post.jetpack_featured_media_url) return post.jetpack_featured_media_url;

    // 3. Better Featured Image plugin
    if (post.better_featured_image?.source_url) return post.better_featured_image.source_url;

    return null; // will be resolved via direct media fetch
}

export const blogService = {
    async getPosts(page = 1, perPage = 10) {
        try {
            const response = await fetch(
                `${WP_API_URL}/posts?_embed&page=${page}&per_page=${perPage}`
            );
            if (!response.ok) throw new Error('Failed to fetch posts');
            const data = await response.json();

            // Resolve all posts (including their featured images) in parallel
            const posts = await Promise.all(
                data.map(async (post) => {
                    // 1. Try the new custom field from our snippet (most reliable)
                    let featuredImage = post.featured_image_url;

                    // 2. Fallbacks
                    if (!featuredImage) {
                        featuredImage = extractEmbeddedImage(post);
                    }

                    // 3. Last resort: direct fetch (if permissions ever allow it)
                    if (!featuredImage && post.featured_media) {
                        featuredImage = await fetchMediaUrl(post.featured_media);
                    }

                    return {
                        id: post.id,
                        title: post.title.rendered,
                        content: post.content.rendered,
                        excerpt: post.excerpt.rendered,
                        date: post.date,
                        slug: post.slug,
                        featuredImage,
                        author: post._embedded?.author?.[0]?.name || 'Admin',
                    };
                })
            );

            return posts;
        } catch (error) {
            console.error('Error fetching blogs:', error);
            return [];
        }
    },

    async getPostBySlug(slug) {
        try {
            const response = await fetch(`${WP_API_URL}/posts?_embed&slug=${slug}`);
            if (!response.ok) throw new Error('Failed to fetch post');
            const data = await response.json();
            if (data.length === 0) return null;
            const post = data[0];

            let featuredImage = post.featured_image_url || extractEmbeddedImage(post);

            if (!featuredImage && post.featured_media) {
                featuredImage = await fetchMediaUrl(post.featured_media);
            }

            return {
                id: post.id,
                title: post.title.rendered,
                content: post.content.rendered,
                excerpt: post.excerpt.rendered,
                date: post.date,
                slug: post.slug,
                featuredImage,
                author: post._embedded?.author?.[0]?.name || 'Admin',
            };
        } catch (error) {
            console.error('Error fetching blog post:', error);
            return null;
        }
    },
};
