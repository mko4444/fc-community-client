/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MERKLE_SECRET: process.env.MERKLE_SECRET,
    SIMPLEHASH_KEY: process.env.SIMPLEHASH_KEY,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
