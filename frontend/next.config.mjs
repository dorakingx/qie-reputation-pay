/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.resolve.fallback = { ...config.resolve.fallback, fs: false, net: false, tls: false };
    config.ignoreWarnings = [{ module: /@metamask\/sdk/ }];
    return config;
  },
};

export default nextConfig;
