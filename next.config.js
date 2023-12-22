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
};

module.exports = nextConfig;
