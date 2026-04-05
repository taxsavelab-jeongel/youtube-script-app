// Design Ref: §7.1 Route Protection — 비로그인 시 전체 앱 접근 차단
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUTH_ROUTES = ['/login', '/register']
const PUBLIC_API_PREFIX = '/api/auth'
const ADMIN_PAGE_ROUTES = ['/admin/users']

/** JWT payload에서 이메일 추출 (Edge Runtime용, 서명 미검증 — API에서 검증) */
function getEmailFromToken(token: string): string | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(base64)).email ?? null
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth_token')?.value

  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r))
  const isPublicApi = pathname.startsWith(PUBLIC_API_PREFIX)
  const isAdminPageRoute = ADMIN_PAGE_ROUTES.some((r) => pathname.startsWith(r))

  // 인증 API는 항상 통과
  if (isPublicApi) {
    return NextResponse.next()
  }

  // 로그인/회원가입 페이지: 이미 로그인된 경우 홈으로
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 로그인/회원가입 페이지는 미인증 허용
  if (isAuthRoute) {
    return NextResponse.next()
  }

  // 그 외 모든 라우트: 로그인 필수
  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // 관리자 전용 페이지: 관리자 이메일과 일치하지 않으면 홈으로
  if (isAdminPageRoute) {
    const adminEmail = process.env.ADMIN_EMAIL
    const userEmail = getEmailFromToken(token)
    if (!adminEmail || userEmail !== adminEmail) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
  ],
}
