/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.STRAPI_DOMAIN],
  },
};

module.exports = nextConfig;
