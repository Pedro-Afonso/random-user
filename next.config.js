/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL
  },
  images: {
    domains: ['randomuser.me']
  }
}

module.exports = nextConfig
