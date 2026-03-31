/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Performance: compress responses
  compress: true,
  // Export as static site for CDN deployment
  output: 'standalone',
  env: {
    NEXT_PUBLIC_SITE_STATE: process.env.NEXT_PUBLIC_SITE_STATE || 'pre-launch',
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
  },
};

module.exports = nextConfig;
