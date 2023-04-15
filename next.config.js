/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,

  images:{
    unoptimized:true,
    domains: ['res.cloudinary.com'],
    formats: ["image/avif", "image/webp"],
  }
}

module.exports = nextConfig
