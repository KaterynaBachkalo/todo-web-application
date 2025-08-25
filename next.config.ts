import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_URL for production build");
}

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
