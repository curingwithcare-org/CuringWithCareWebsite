/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // The 2025 Cancer Awareness & Action Challenge page now lives on the Research hub.
      { source: "/caac", destination: "/research", permanent: true },
    ];
  },
  images: {
    // 55 for the full-screen hero, 65 for other large photos, 75 everywhere else.
    qualities: [55, 65, 75],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
