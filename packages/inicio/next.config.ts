import type { NextConfig } from "next";
const path = require("path");

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: path.resolve(__dirname),
  },
  
  // Add transpilation for the shared package
  transpilePackages: ['shared'],
  
  // Configure webpack to resolve the shared package
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'shared': path.resolve(__dirname, '../shared'),
    };
    
    return config;
  },
};

export default nextConfig;
