import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [10, 25, 50, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
