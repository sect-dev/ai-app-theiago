import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.aigo.sect.dev","aigo.b-cdn.net"],
    formats: ["image/webp"],
    unoptimized: true,
  }
};

export default nextConfig;
