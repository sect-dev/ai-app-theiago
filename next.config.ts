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
            value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https://*.payprocc.com https://cdn.aigo.sect.dev https://aigo.b-cdn.net https://*.googleapis.com https://*.google.com; img-src 'self' data: https://*.payprocc.com https://cdn.aigo.sect.dev https://aigo.b-cdn.net https://*.google.com https://*.googletagmanager.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.payprocc.com https://*.googletagmanager.com https://*.google.com https://*.googleapis.com; style-src 'self' 'unsafe-inline'; connect-src 'self' https://*.payprocc.com https://identitytoolkit.googleapis.com https://*.googleapis.com https://*.google.com https://*.googletagmanager.com;"
          }
        ]
      }
    ]
  }
};

export default nextConfig;
