import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
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
    reactCompiler: true,
    optimizeCss: true,
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
