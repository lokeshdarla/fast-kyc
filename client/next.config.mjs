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
        destination: "https://8d4e-2401-4900-6572-217e-69a4-f6c9-dc8-6519.ngrok-free.app/api/:path*", // Backend URL
      },
    ];
  },
};

export default nextConfig;
