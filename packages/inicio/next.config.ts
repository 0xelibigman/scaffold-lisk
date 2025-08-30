import type { NextConfig } from "next";
const path = require("path");
const nextConfig: NextConfig = {
  /* config options here */
   turbopack: {
    root: path.resolve(__dirname), 
  },

};

export default nextConfig;
