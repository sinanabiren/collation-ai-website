/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable static export for better LLM crawlability
  // output: 'export', // Uncomment for static export

  // Configure allowed external image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
        pathname: '/**',
      },
    ],
  },

  // Disable the Next.js dev indicator (the "N" icon in bottom left)
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
}

module.exports = nextConfig
