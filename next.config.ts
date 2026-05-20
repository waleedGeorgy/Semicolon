import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "img.clerk.com" }],
  },
  experimental: {
    optimizePackageImports: ["@monaco-editor/react", "monaco-editor"],
  },
};

export default nextConfig;
