/** @type {import('next').NextConfig} */

import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "fakestoreapi.com",
        protocol: "https",
      },
      {
        hostname: "source.unsplash.com",
        protocol: "https",
      }
    ],
  },
};

export default withPlaiceholder(nextConfig);