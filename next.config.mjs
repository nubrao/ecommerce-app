/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            net: false,
            tls: false,
        };

        if (!isServer) {
            config.infrastructureLogging = {
                level: 'error'
            };
        }

        return config;
    },

    images: {
        domains: ['fakestoreapi.com'],
    }
};

export default nextConfig;