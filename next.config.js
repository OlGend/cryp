/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,  // ← добавь эту строку
  },
  images: {
    domains: ['born.topbon.us'],
  },
}

module.exports = nextConfig
