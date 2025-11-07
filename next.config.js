/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable static export for better LLM crawlability
  // output: 'export', // Uncomment for static export

  // Disable the Next.js dev indicator (the "N" icon in bottom left)
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
}

module.exports = nextConfig
