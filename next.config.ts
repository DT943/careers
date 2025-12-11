import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['flycham.com'],
  },
  reactStrictMode: false,  // Keep React strict mode on (for better performance)
  experimental: {
    disableOptimizedLoading: true,  // Disables some Next.js debugging features
  },
};

export default nextConfig;
