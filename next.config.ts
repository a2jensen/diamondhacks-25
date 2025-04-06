import type { NextConfig } from "next";

const removeImports = require('next-remove-imports')();

const nextConfig: NextConfig = removeImports({
  /* Your config options here */
  // For example:
  // reactStrictMode: true,
  // experimental: { ... }
});

export default nextConfig;