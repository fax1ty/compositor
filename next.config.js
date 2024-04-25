/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "*" }],
  },
  experimental: {
    instrumentationHook: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;
