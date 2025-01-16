import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  output:"export"
};

export default nextConfig;

