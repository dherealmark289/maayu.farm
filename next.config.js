/** @type {import('next').NextConfig} */
const nextConfig = { 
  reactStrictMode: true,
  output: 'standalone', // Can be changed to 'export' for fully static export
  // For static generation, ensure data fetching happens at build time
  // The backend API should be accessible during build
};
module.exports = nextConfig;




