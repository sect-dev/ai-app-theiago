import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.aigo.sect.dev"],
    formats: ["image/webp"],
    // unoptimized: true,
  },
};

export default nextConfig;
