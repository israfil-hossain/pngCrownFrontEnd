/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: false, // keep ESLint enabled during development
  },

  images: {
    unoptimized: true,
    loader: "default",
    domains: [
      "https://pngcrownbucket.s3.ap-south-1.amazonaws.com",
      "https://pngcrownslider.s3.ap-south-1.amazonaws.com",
    ],
    formats: ["image/avif", "image/webp"],
  },

  publicRuntimeConfig: {
    AWS_ACCESS_KEY_ID: "AKIA5LGXXBT4NM2BXUNO",
    AWS_SECRET_ACCESS_KEY: "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",
    AWS_REGION: "ap-south-1",
    AWS_BUCKET_NAME: "pngcrownbucket",
  },
};

module.exports = nextConfig;
