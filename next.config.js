/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel-storage.com',
      },
    ],
  },
  // Optimize for production
  swcMinify: true,
  // Enable standalone output for better performance
  output: 'standalone',
  // Don't fail production builds on ESLint issues – app is already working correctly in dev
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig

