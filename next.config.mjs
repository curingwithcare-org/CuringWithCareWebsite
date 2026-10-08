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
    async redirects() {
        return [
            // The 2025 Cancer Awareness & Action Challenge page now lives on the Research hub.
            { source: "/caac", destination: "/research", permanent: true },
        ];
    },
    images: {
        // 65 is used for full-bleed hero photos, 75 everywhere else.
        qualities: [55, 65, 75],
        formats: ["image/avif", "image/webp"],
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
