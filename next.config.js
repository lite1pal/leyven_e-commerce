const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["images.prom.ua"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "images.prom.ua",
    //     port: "",
    //     pathname: "",
    //   },
    // ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

module.exports = withBundleAnalyzer(nextConfig);
