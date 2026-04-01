// Design Ref: §7 Authentication — 회원가입 API Route
import { NextRequest, NextResponse } from 'next/server'
import { signUp } from '@/lib/auth/session'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: '이메일과 비밀번호를 입력해주세요.' },
      { status: 400 }
    )
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: '비밀번호는 8자 이상이어야 합니다.' },
      { status: 400 }
    )
  }

  const result = await signUp(email, password)

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  const response = NextResponse.json({ user: result.user }, { status: 201 })
  response.cookies.set('auth_token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
  return response
}
