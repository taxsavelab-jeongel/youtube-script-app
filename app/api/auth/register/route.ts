// Design Ref: §7 Authentication — 회원가입 API Route (5개 필드)
import { NextRequest, NextResponse } from 'next/server'
import { signUp } from '@/lib/auth/session'
import { updateUserProfile } from '@/lib/auth/session'

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

  // 추가 프로필 정보 저장
  try {
    updateUserProfile(result.userId, { phone, company, job })
  } catch {
    console.error('프로필 저장 실패 (계정은 생성됨)')
  }

  // 승인 대기 상태 — 쿠키 없이 pending 응답만 반환
  return NextResponse.json({ pending: true }, { status: 201 })
}
