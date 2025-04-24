import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  poweredByHeader: false,

  // Optimize image loading
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Optimize CSS and JS bundle sizes
  experimental: {
    optimizeCss: true, // Uses Critters to inline critical CSS
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
