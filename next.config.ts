import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd
    ? "/https://github.com/KaterynaBachkalo/todo-web-application"
    : "",
  assetPrefix: isProd
    ? "/https://github.com/KaterynaBachkalo/todo-web-application"
    : "",
};

export default nextConfig;
