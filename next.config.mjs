/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["yzqvipgjhmieuxxskspv.supabase.co"],
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  compiler: {
    emotion: true,
  },
};

export default nextConfig;
