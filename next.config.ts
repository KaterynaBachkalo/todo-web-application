import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? "/todo-web-application" : "",
  assetPrefix: isProd ? "/todo-web-application/" : "",
};

export default nextConfig;
