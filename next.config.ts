import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Claude API 스트리밍을 위한 Edge Runtime 허용
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
}

export default nextConfig
