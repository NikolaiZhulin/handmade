const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3012',
      },
      {
        protocol: 'https',
        hostname: 'api-test.unlim.ge',
      },
      {
        protocol: 'https',
        hostname: 'api.unlim.ge',
        port: '3012',
      },
    ],
  },
  i18n,
};

module.exports = nextConfig;
