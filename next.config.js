/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.STRAPI_DOMAIN],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
