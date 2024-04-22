/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "*" }],
  },
  experimental: {
    instrumentationHook: true,
  },
};

module.exports = nextConfig;
