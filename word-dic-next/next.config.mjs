const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;