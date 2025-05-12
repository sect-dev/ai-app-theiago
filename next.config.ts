import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.aigo.sect.dev", "aigo.b-cdn.net"],
    formats: ["image/webp"],
    unoptimized: true,
  },
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https://*.payprocc.com"
          }
        ]
      }
    ]
  }
};

export default nextConfig;
