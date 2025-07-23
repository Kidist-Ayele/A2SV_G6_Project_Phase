import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    domains: ['i.pravatar.cc'], // ✅ Add this line
  },
};

export default nextConfig;
