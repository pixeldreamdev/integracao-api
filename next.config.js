/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos', // Domínio permitido
        port: '', // Pode ser omitido se não houver uma porta específica
        pathname: '/**', // Permite todas as rotas sob o domínio
      },
    ],
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;
