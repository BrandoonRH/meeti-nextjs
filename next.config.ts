import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  /* cacheComponents: true, */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qofx7jg8fg.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
