// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.buymeacoffee.com', // For the yellow buy me a coffee on the footer.
      },
    ],
  },
};

module.exports = nextConfig;