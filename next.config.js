/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      'files.stripe.com'
    ],
    unoptimized: true
  }
  
}

module.exports = nextConfig
