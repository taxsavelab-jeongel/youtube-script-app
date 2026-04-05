'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const PAGE_NAMES: Record<string, string> = {
  '/': '홈',
  '/tax-simulator': '절세 시뮬레이터',
  '/tax-script': '절세 콘텐츠',
  '/generate': '일반 스크립트',
  '/scripts': '내 스크립트',
  '/admin/review': '세무사 감수',
  '/admin/verify': '법령 검증',
  '/admin/users': '사용자 관리',
}

const AUTH_PATHS = ['/login', '/register']

export default function NavBar() {
  const pathname = usePathname()
  const router = useRouter()

  // 인증 페이지에서는 네비게이션 숨김
  if (AUTH_PATHS.some((p) => pathname.startsWith(p))) return null

  const currentName = PAGE_NAMES[pathname] ?? '페이지'
  const isHome = pathname === '/'

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        {!isHome && (
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v9h5v-5h4v5h5v-9" />
            </svg>
            홈
          </Link>
        )}
        {!isHome && <span className="text-gray-300 text-sm">/</span>}
        <span className="text-sm font-semibold text-gray-900">{currentName}</span>
      </div>

      <div className="flex items-center gap-4">
        {isHome && (
          <Link href="/" className="text-sm font-bold text-blue-600">
            AI 절세 플랫폼
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-red-600 transition-colors"
        >
          로그아웃
        </button>
      </div>
    </nav>
  )
}
