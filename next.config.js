/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["strapi-s3-tricolor.s3.us-east-2.amazonaws.com"],
  },
};

module.exports = nextConfig;
