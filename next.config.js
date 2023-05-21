/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const nextConfig = {
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
        // formats: ['image/avif', 'image/webp', 'image/jpg', 'image/jpeg'],
        // remotePatterns: [
        //     {
        //         protocol: 'https',
        //         hostname: 'googleusercontent.com',
        //         port: '',
        //         pathname: '/**',
        //     },
        // ],
        domains: ["lh3.googleusercontent.com"],
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        };
        return config;
    },
};

module.exports = nextConfig;