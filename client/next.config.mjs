const isProd = process.env.NODE_ENV === "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  transpilePackages: ["wallet-adapter-react", "wallet-adapter-plugin"],
  assetPrefix: isProd ? "/aptos-wallet-adapter" : "",
  basePath: isProd ? "/aptos-wallet-adapter" : "",
  webpack: (config) => {
    config.resolve.fallback = { "@solana/web3.js": false };
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: "https://a2b5-103-217-237-57.ngrok-free.app/api/:path*", // Backend URL
      },
    ];
  },
};

export default nextConfig;
