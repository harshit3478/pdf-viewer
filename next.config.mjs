/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['formidable-serverless'],
      },
      webpack: (config) => {
        config.externals = [...config.externals, 'formidable-serverless'];
        config.resolve.alias.canvas = false;
        return config;
      },
};

export default nextConfig;
