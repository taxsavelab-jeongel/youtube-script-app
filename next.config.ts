import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Claude API 스트리밍을 위한 Edge Runtime 허용
  experimental: {
    serverActions: {
      allowedOrigins: process.env.NEXT_PUBLIC_APP_URL
        ? [process.env.NEXT_PUBLIC_APP_URL, 'localhost:3000']
        : ['localhost:3000'],
    },
  },
}

export default nextConfig
