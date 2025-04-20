import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "luminaqa.stembascc.com",
        port: "",
        pathname: "/public/**",
      },
    ],
  },
};

export default nextConfig;
