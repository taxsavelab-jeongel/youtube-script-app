// Design Ref: §7 Authentication — 회원가입 API Route (5개 필드)
import { NextRequest, NextResponse } from 'next/server'
import { signUp } from '@/lib/auth/session'
import { createProfile } from '@/lib/db/profileRepo'

export async function POST(request: NextRequest) {
  const { email, phone, company, job, password } = await request.json()

  if (!email || !password || !phone || !company || !job) {
    return NextResponse.json(
      { error: '모든 필드를 입력해주세요.' },
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

  // bkend.ai에 추가 프로필 정보 저장 (실패해도 가입은 완료 처리)
  try {
    await createProfile(
      { userId: result.user.id, phone, company, job },
      result.token
    )
  } catch {
    // 프로필 저장 실패는 로그만 남기고 진행
    console.error('프로필 저장 실패 (계정은 생성됨)')
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
