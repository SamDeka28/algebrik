import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = "eval-source-map"; // ✅ Shows actual source files in errors
    }
    return config;
  },
  /* config options here */
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  output:"export"
};

export default nextConfig;

