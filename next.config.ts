import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    loader: "default",
  },
  basePath: isProd ? "/todo-web-application" : "",
  assetPrefix: isProd ? "/todo-web-application/" : "",
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
