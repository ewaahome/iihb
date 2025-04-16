/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true,
  },
  swcMinify: true,
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
    domains: [
      'res.cloudinary.com', 
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'images.unsplash.com',
      'plus.unsplash.com',
      'images.pexels.com',
      'blog.wasalt.sa',
      'www.al-madina.com',
      'cdn.alweb.com',
      'media.istockphoto.com',
      'yawmiyati.com',
      'i.ibb.co'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.wasalt.sa',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.al-madina.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.alweb.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.istockphoto.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.githubusercontent.com',
        pathname: '/**',
      }
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // تحسين التوافق مع مكتبات الخرائط
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false
    };
    
    return config;
  },
  trailingSlash: true,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
    NEXT_PUBLIC_MAPBOX_STYLE: process.env.NEXT_PUBLIC_MAPBOX_STYLE
  },
}

module.exports = nextConfig
