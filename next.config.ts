import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.aigo.sect.dev"],
    unoptimized: true,
  },
};

export default nextConfig;
