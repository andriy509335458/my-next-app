import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config, { dev }) {
    if (dev) {
      config.devtool = "source-map"; // Enables source maps in development
    }
    return config;
  },
};

export default nextConfig;
