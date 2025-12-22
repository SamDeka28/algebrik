import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    // if (dev) {
    //   config.devtool = "eval-source-map"; // ✅ Shows actual source files in errors
    // }
    return config;
  },
  // Turbopack configuration for Next.js 16
  turbopack: {},
  /* config options here */
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  output:"export"
};

export default nextConfig;

