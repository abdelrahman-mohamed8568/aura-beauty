/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  compiler: {
    emotion: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
