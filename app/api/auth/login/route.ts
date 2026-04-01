// Design Ref: §7 Authentication — 로그인 API Route
import { NextRequest, NextResponse } from 'next/server'
import { signIn } from '@/lib/auth/session'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: '이메일과 비밀번호를 입력해주세요.' },
      { status: 400 }
    )
  }

  const result = await signIn(email, password)

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 401 })
  }

  const response = NextResponse.json({ user: result.user })
  response.cookies.set('auth_token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7일
    path: '/',
  })
  return response
}
