/** @type {import('next').NextConfig} */
const nextConfig = {
    // Branch pages renamed for 2026-27 (see care-data/branches-2026-27.sql)
    async redirects() {
        return [
            { source: "/branches/san-francisco", destination: "/branches/san-jose", permanent: true },
            { source: "/branches/robbinsville", destination: "/branches/new-jersey", permanent: true },
            { source: "/branches/toronto", destination: "/branches/ontario", permanent: true },
        ];
    },
    images: {
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
