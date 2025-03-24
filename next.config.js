/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: false,
  distDir: "build",
  compress: true,
  env: {
    REACT_APP_HOST_DOMAIN: process.env.REACT_APP_HOST_DOMAIN,
    REACT_APP_BACKEND_API_URL: process.env.REACT_APP_BACKEND_API_URL,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
