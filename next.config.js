/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com', 'github.com', 'img.pokemondb.net', 'upload.wikimedia.org'],
  },
}

module.exports = nextConfig
