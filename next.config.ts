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
};

export default nextConfig;
