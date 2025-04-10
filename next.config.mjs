/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["yzqvipgjhmieuxxskspv.supabase.co", "drive.google.com"],
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  compiler: {
    emotion: true,
  },
};

export default nextConfig;
