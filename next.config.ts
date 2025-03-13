import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Essential config options */
  images: {
    domains: ['images.unsplash.com', 'cdn.shopify.com', 'plus.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
  },
  
  // Basic production optimizations
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  
  // Handle redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // Add headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;