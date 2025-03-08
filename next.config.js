const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["strapi-s3-tricolor.s3.us-east-2.amazonaws.com"],
    unoptimized: true,
  },
  output: "standalone", // 🚀 Asegura que el proyecto se ejecute como standalone
};

export default nextConfig;
