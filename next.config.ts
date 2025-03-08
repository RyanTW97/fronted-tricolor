import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["strapi-s3-tricolor.s3.us-east-2.amazonaws.com"],
  },
};

export default nextConfig;
