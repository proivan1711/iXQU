import { readFileSync } from "node:fs";
import type { NextConfig } from "next";

const packageJson = JSON.parse(readFileSync("./package.json", "utf8"));

const nextConfig: NextConfig = {
  reactCompiler: true,
  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
  },
};

export default nextConfig;
