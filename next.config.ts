import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.aigo.sect.dev", "aigo.b-cdn.net"],
    formats: ["image/webp"],
    unoptimized: true,
  },
  // headers: async () => {
  //   return [
  //     {
  //       source: "/:path*",
  //       headers: [
  //         {
  //           key: 'Content-Security-Policy',
  //           value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https://*.payprocc.com https://cdn.aigo.sect.dev https://aigo.b-cdn.net https://*.googleapis.com https://*.google.com; img-src 'self' data: https://*.payprocc.com https://cdn.aigo.sect.dev https://aigo.b-cdn.net https://*.google.com https://*.googletagmanager.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.payprocc.com https://*.googletagmanager.com https://*.google.com https://*.googleapis.com; style-src 'self' 'unsafe-inline'; connect-src 'self' https://*.payprocc.com https://identitytoolkit.googleapis.com https://*.googleapis.com https://*.google.com https://*.googletagmanager.com https://*.theaigo.com:*; frame-src 'self' https://*.theaigo.com:* https://*.payprocc.com;"
  //         }
  //       ]
  //     }
  //   ]
  // }
};

export default withSentryConfig(withNextIntl(nextConfig), {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "devsect",
  project: "web-theaigo",
  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
