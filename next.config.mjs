/** @type {import('next').NextConfig} */
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

export default nextConfig;
