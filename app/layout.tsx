import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI 절세 컨설팅 & 유튜브 콘텐츠 플랫폼',
  description: '2026년 최신 세법 기준 AI 맞춤 절세 전략 추천 + 유튜브 절세 콘텐츠 자동 생성',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
