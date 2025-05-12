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
            value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https://*.payprocc.com https://cdn.aigo.sect.dev https://aigo.b-cdn.net; img-src 'self' data: https://*.payprocc.com https://cdn.aigo.sect.dev https://aigo.b-cdn.net; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.payprocc.com; style-src 'self' 'unsafe-inline'; connect-src 'self' https://*.payprocc.com;"
          }
        ]
      }
    ]
  }
};

export default nextConfig;
