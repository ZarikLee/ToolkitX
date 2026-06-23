import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        ssh2: "commonjs ssh2",
      });
    }
    return config;
  },
};

export default nextConfig;
