// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.buymeacoffee.com', // For the yellow buy me a coffee on the footer and.
      },
       {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // For accessing the blog images hosted on cloudinary
      },
    ],
  },
};

module.exports = nextConfig;