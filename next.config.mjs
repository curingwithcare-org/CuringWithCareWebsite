/** @type {import('next').NextConfig} */
const nextConfig = {
    // Branch pages renamed by care-data/branches-2026-27.sql. Chapters currently come
    // from data/chapters.js and the slugs haven't been renamed, so these stay off.
    // Uncomment them when switching src/utils/chapters.js back to "supabase".
    // async redirects() {
    //     return [
    //         { source: "/branches/san-francisco", destination: "/branches/san-jose", permanent: true },
    //         { source: "/branches/robbinsville", destination: "/branches/new-jersey", permanent: true },
    //         { source: "/branches/toronto", destination: "/branches/ontario", permanent: true },
    //     ];
    // },
    images: {
        // Vercel's free plan includes 5,000 image transformations a month, and every
        // photo resized to a new width counts as one. A short list of widths and a
        // long cache keep the event galleries well under that.
        deviceSizes: [640, 828, 1200, 1920],
        imageSizes: [128, 256, 384],
        minimumCacheTTL: 2678400, // 31 days
        remotePatterns: [
            {
                protocol: "https",
                hostname: "amwtgoclmijtxlsifzqi.supabase.co",
                port: '',
            }
        ]
    }
};

export default nextConfig;
